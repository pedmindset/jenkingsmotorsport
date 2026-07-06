<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\Season;
use App\Support\Motorsport\StandingsSnapshot;
use Illuminate\Console\Command;
use RuntimeException;

/**
 * Export local championship standings to a portable JSON snapshot file.
 */
class MotorsportExportStandingsSnapshotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'motorsport:export-standings-snapshot
        {--season= : Championship season year to export (e.g. 2026)}
        {--output= : Output file path (defaults to storage/app/exports/standings-{year}.json)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Export standings for a season to a JSON snapshot file for production import.';

    /**
     * Execute the console command.
     */
    public function handle(StandingsSnapshot $snapshot): int
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

        $output = $this->option('output');
        if (! is_string($output) || $output === '') {
            $output = storage_path('app/exports/standings-'.$year.'.json');
        }

        try {
            $payload = $snapshot->exportForSeason($season);
            $snapshot->writeFile($output, $payload);
        } catch (RuntimeException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $count = count($payload['standings']);
        $this->info("Exported {$count} standing row(s) for season {$year} to {$output}");

        return self::SUCCESS;
    }
}
