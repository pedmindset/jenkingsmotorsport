<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

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
        {--url= : Override standings URL from config}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Parse BTRC standings HTML and upsert local Standing rows (verify against official results).';

    /**
     * Execute the console command.
     */
    public function handle(): int
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
        $divisionLabel = match ($divisionKey) {
            '1' => 'BTRC Division 1',
            '2' => 'BTRC Division 2',
            default => 'BTRC Division '.$divisionKey,
        };

        $url = $this->option('url');
        if (! is_string($url) || $url === '') {
            $url = (string) config('btrc_import.standings_url');
        }

        $this->info("Fetching: {$url}");

        $response = Http::timeout((int) config('btrc_import.timeout'))
            ->withHeaders([
                'User-Agent' => (string) config('btrc_import.user_agent'),
                'Accept' => 'text/html,application/xhtml+xml',
            ])
            ->get($url);

        usleep((int) config('btrc_import.request_delay_seconds') * 1_000_000);

        if (! $response->successful()) {
            $this->error('HTTP request failed: '.$response->status());

            return self::FAILURE;
        }

        $parsed = $this->parseStandingsTable($response->body());
        if ($parsed === []) {
            $this->warn('No standings table with NAME / POS / POINTS headers was found. The remote HTML layout may have changed.');

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

    /**
     * @return list<array{name: string, rank: int, points: int}>
     */
    private function parseStandingsTable(string $html): array
    {
        libxml_use_internal_errors(true);
        $document = new \DOMDocument;
        $document->loadHTML('<?xml encoding="utf-8" ?>'.$html, LIBXML_NOERROR | LIBXML_NOWARNING);
        libxml_clear_errors();

        $xpath = new \DOMXPath($document);

        foreach ($xpath->query('//table') as $tableNode) {
            if (! $tableNode instanceof \DOMElement) {
                continue;
            }

            $headerCells = $xpath->query('.//thead//tr/th', $tableNode);
            if ($headerCells === false || $headerCells->length === 0) {
                continue;
            }

            $headers = [];
            foreach ($headerCells as $thNode) {
                $headers[] = strtoupper(trim($thNode->textContent));
            }

            if ($headers !== ['NAME', 'POS', 'POINTS']) {
                continue;
            }

            $parsedRows = [];
            $bodyRows = $xpath->query('.//tbody/tr', $tableNode);
            if ($bodyRows === false) {
                continue;
            }

            foreach ($bodyRows as $trNode) {
                if (! $trNode instanceof \DOMElement) {
                    continue;
                }

                $cells = $xpath->query('./td', $trNode);
                if ($cells === false || $cells->length < 3) {
                    continue;
                }

                $name = trim($cells->item(0)?->textContent ?? '');
                if ($name === '') {
                    continue;
                }

                $rankRaw = strtoupper(trim($cells->item(1)?->textContent ?? ''));
                $pointsRaw = strtoupper(trim($cells->item(2)?->textContent ?? ''));

                $rankDigits = preg_replace('/\D+/', '', $rankRaw) ?? '';
                $pointsDigits = preg_replace('/\D+/', '', $pointsRaw) ?? '';

                if ($rankDigits === '' || $pointsDigits === '') {
                    continue;
                }

                $parsedRows[] = [
                    'name' => $name,
                    'rank' => (int) $rankDigits,
                    'points' => (int) $pointsDigits,
                ];
            }

            if ($parsedRows !== []) {
                return $parsedRows;
            }
        }

        return [];
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
