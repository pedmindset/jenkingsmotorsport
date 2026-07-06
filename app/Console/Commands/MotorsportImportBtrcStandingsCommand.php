<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use App\Support\Motorsport\BtrcStandingsFetcher;
use App\Support\Motorsport\BtrcStandingsHtmlParser;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use RuntimeException;

/**
 * Best-effort import of published BTRC division totals from HTML into {@see Standing} rows.
 *
 * Operational / legal notes (not legal advice): Terms of Use may still restrict automated use.
 * As of implementation, https://btrc.co/robots.txt disallows nothing for User-agent: * — verify
 * periodically. Prefer official PDFs/timing for verification; keep delay between requests; treat
 * output as draft until a human confirms against the championship bulletin.
 */
class MotorsportImportBtrcStandingsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'motorsport:import-btrc-standings
        {--season= : Target championship season year (e.g. 2026)}
        {--division=1 : Published division number (1 = Division 1)}
        {--dry-run : Output parsed rows without saving}
        {--url= : Override standings URL from config}
        {--html= : Import from a local HTML snapshot instead of fetching remotely}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parse BTRC standings HTML and upsert local Standing rows (verify against official results).';

    /**
     * Execute the console command.
     */
    public function handle(BtrcStandingsHtmlParser $parser, BtrcStandingsFetcher $fetcher): int
    {
        $year = $this->option('season');
        if (! is_string($year) || $year === '' || ! ctype_digit($year)) {
            $this->error('Provide a numeric --season year (e.g. --season=2026).');

            return self::FAILURE;
        }

        $season = Season::query()->where('year', (int) $year)->first();
        if ($season === null) {
            $this->error("No local Season model found for year {$year}.");

            return self::FAILURE;
        }

        $divisionKey = (string) $this->option('division');
        if (! ctype_digit($divisionKey) || (int) $divisionKey < 1) {
            $this->error('Provide a positive numeric --division (e.g. --division=1).');

            return self::FAILURE;
        }

        $divisionNumber = (int) $divisionKey;
        $divisionLabel = match ($divisionNumber) {
            1 => 'BTRC Division 1',
            2 => 'BTRC Division 2',
            default => 'BTRC Division '.$divisionNumber,
        };

        $htmlPath = $this->option('html');
        if (is_string($htmlPath) && $htmlPath !== '') {
            $this->info("Reading local HTML: {$htmlPath}");

            try {
                $html = $fetcher->readFromFile($htmlPath);
            } catch (RuntimeException $exception) {
                $this->error($exception->getMessage());

                return self::FAILURE;
            }
        } else {
            $url = $this->option('url');
            $overrideUrl = is_string($url) && $url !== '' ? $url : null;

            try {
                if ($overrideUrl !== null) {
                    $this->info("Fetching: {$overrideUrl}");
                    $html = $fetcher->fetchFromUrl($overrideUrl);
                } else {
                    $result = $fetcher->fetchStandingsHtml();
                    $this->info('Fetching: '.$result['source']);
                    $html = $result['html'];
                }
            } catch (RuntimeException $exception) {
                $this->error($exception->getMessage());

                return self::FAILURE;
            }
        }

        $parsed = $parser->parse($html, $divisionNumber);
        if ($parsed === []) {
            $this->warn('No standings rows were found for division '.$divisionNumber.'. The remote HTML layout or tab structure may have changed.');

            return self::FAILURE;
        }

        $dryRun = (bool) $this->option('dry-run');

        $rowsForDisplay = [];
        $unmatched = [];

        foreach ($parsed as $row) {
            $driver = $this->resolveDriver($row['name']);
            if ($driver === null) {
                $unmatched[] = $row['name'];

                continue;
            }

            $rowsForDisplay[] = [
                'driver' => $driver->name,
                'rank' => $row['rank'],
                'points' => $row['points'],
            ];

            if ($dryRun) {
                continue;
            }

            Standing::query()->updateOrCreate(
                [
                    'season_id' => $season->id,
                    'driver_id' => $driver->id,
                ],
                [
                    'rank' => $row['rank'],
                    'points' => $row['points'],
                    'division' => $divisionLabel,
                    'status' => 'provisional',
                ],
            );
        }

        $this->table(['Driver', 'Rank', 'Points'], array_map(fn (array $r) => [$r['driver'], $r['rank'], $r['points']], $rowsForDisplay));

        if ($unmatched !== []) {
            $this->warn('Unmatched names (add `driver_slug_aliases` in config/btrc_import.php):');
            foreach (array_unique($unmatched) as $name) {
                $this->line(' - '.$name);
            }
        }

        if ($dryRun) {
            $this->info('Dry run: no database writes performed.');

            return self::SUCCESS;
        }

        $this->info('Standing rows updated. Verify figures against the official championship bulletin.');

        return self::SUCCESS;
    }

    private function resolveDriver(string $rawName): ?Driver
    {
        $squished = Str::upper(Str::squish($rawName));

        /** @var array<string, string> $aliases */
        $aliases = config('btrc_import.driver_slug_aliases', []);
        if (isset($aliases[$squished])) {
            return Driver::query()->where('slug', $aliases[$squished])->first();
        }

        return Driver::query()
            ->whereRaw('UPPER(TRIM(name)) = ?', [$squished])
            ->first();
    }
}
