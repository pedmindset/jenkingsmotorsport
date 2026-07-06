<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Support\Motorsport\StandingsSnapshot;
use Illuminate\Console\Command;
use RuntimeException;

/**
 * Import championship standings from a portable JSON snapshot file.
 */
class MotorsportImportStandingsSnapshotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'motorsport:import-standings-snapshot
        {file : Path to the JSON snapshot file}
        {--dry-run : Preview rows without saving}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import standings from a JSON snapshot file exported locally.';

    /**
     * Execute the console command.
     */
    public function handle(StandingsSnapshot $snapshot): int
    {
        $file = $this->argument('file');
        if (! is_string($file) || $file === '') {
            $this->error('Provide a snapshot file path.');

            return self::FAILURE;
        }

        try {
            $payload = $snapshot->readFile($file);
            $result = $snapshot->importFromPayload($payload, (bool) $this->option('dry-run'));
        } catch (RuntimeException $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $this->table(
            ['Driver', 'Rank', 'Points', 'Division', 'Status'],
            array_map(
                fn (array $row) => [$row['driver'], $row['rank'], $row['points'], $row['division'], $row['status']],
                $result['rows'],
            ),
        );

        if ($result['skipped'] !== []) {
            $this->warn('Skipped rows (driver slug not found on this server):');
            foreach (array_unique($result['skipped']) as $slug) {
                $this->line(' - '.$slug);
            }
        }

        if ((bool) $this->option('dry-run')) {
            $this->info('Dry run: no database writes performed.');

            return self::SUCCESS;
        }

        $this->info("Imported {$result['imported']} standing row(s).");

        return self::SUCCESS;
    }
}
