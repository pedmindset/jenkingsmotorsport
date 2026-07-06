<?php

declare(strict_types=1);

namespace App\Support\Motorsport;

use App\Models\Driver;
use App\Models\Season;
use App\Models\Standing;
use Illuminate\Support\Facades\File;
use RuntimeException;

/**
 * Exports and imports championship standings using season year and driver slug keys.
 */
class StandingsSnapshot
{
    public const int VERSION = 1;

    /**
     * @return array{
     *     version: int,
     *     exported_at: string,
     *     season_year: int,
     *     standings: list<array{
     *         driver_slug: string,
     *         driver_name: string,
     *         rank: int,
     *         points: int,
     *         division: string,
     *         status: string
     *     }>
     * }
     */
    public function exportForSeason(Season $season): array
    {
        $standings = Standing::query()
            ->where('season_id', $season->id)
            ->with('driver:id,slug,name')
            ->orderBy('rank')
            ->get();

        $rows = [];

        foreach ($standings as $standing) {
            $driver = $standing->driver;

            if ($driver === null) {
                continue;
            }

            $rows[] = [
                'driver_slug' => $driver->slug,
                'driver_name' => $driver->name,
                'rank' => $standing->rank,
                'points' => $standing->points,
                'division' => $standing->division,
                'status' => $standing->status,
            ];
        }

        return [
            'version' => self::VERSION,
            'exported_at' => now()->toIso8601String(),
            'season_year' => $season->year,
            'standings' => $rows,
        ];
    }

    /**
     * @return array{
     *     imported: int,
     *     skipped: list<string>,
     *     rows: list<array{driver: string, rank: int, points: int, division: string, status: string}>
     * }
     */
    public function importFromPayload(array $payload, bool $dryRun = false): array
    {
        $this->assertValidPayload($payload);

        $season = Season::query()
            ->where('year', (int) $payload['season_year'])
            ->first();

        if ($season === null) {
            throw new RuntimeException('No local Season model found for year '.(int) $payload['season_year'].'.');
        }

        $imported = 0;
        $skipped = [];
        $rows = [];

        foreach ($payload['standings'] as $row) {
            if (! is_array($row)) {
                continue;
            }

            $driverSlug = (string) ($row['driver_slug'] ?? '');
            $driver = Driver::query()->where('slug', $driverSlug)->first();

            if ($driver === null) {
                $skipped[] = $driverSlug !== ''
                    ? $driverSlug
                    : (string) ($row['driver_name'] ?? 'unknown driver');

                continue;
            }

            $rows[] = [
                'driver' => $driver->name,
                'rank' => (int) $row['rank'],
                'points' => (int) $row['points'],
                'division' => (string) $row['division'],
                'status' => (string) $row['status'],
            ];

            if ($dryRun) {
                $imported++;

                continue;
            }

            Standing::query()->updateOrCreate(
                [
                    'season_id' => $season->id,
                    'driver_id' => $driver->id,
                ],
                [
                    'rank' => (int) $row['rank'],
                    'points' => (int) $row['points'],
                    'division' => (string) $row['division'],
                    'status' => (string) $row['status'],
                ],
            );

            $imported++;
        }

        return [
            'imported' => $imported,
            'skipped' => $skipped,
            'rows' => $rows,
        ];
    }

    /**
     * @return array{
     *     version: int,
     *     exported_at: string,
     *     season_year: int,
     *     standings: list<array{
     *         driver_slug: string,
     *         driver_name: string,
     *         rank: int,
     *         points: int,
     *         division: string,
     *         status: string
     *     }>
     * }
     */
    public function readFile(string $path): array
    {
        if (! is_file($path) || ! is_readable($path)) {
            throw new RuntimeException("Snapshot file not found or not readable: {$path}");
        }

        $contents = file_get_contents($path);

        if ($contents === false || trim($contents) === '') {
            throw new RuntimeException("Snapshot file is empty: {$path}");
        }

        /** @var array<string, mixed>|null $payload */
        $payload = json_decode($contents, true);

        if (! is_array($payload)) {
            throw new RuntimeException("Snapshot file is not valid JSON: {$path}");
        }

        return $payload;
    }

    /**
     * @param  array{
     *     version: int,
     *     exported_at: string,
     *     season_year: int,
     *     standings: list<array<string, mixed>>
     * }  $payload
     */
    public function writeFile(string $path, array $payload): void
    {
        File::ensureDirectoryExists(dirname($path));

        $encoded = json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);

        if (file_put_contents($path, $encoded.PHP_EOL) === false) {
            throw new RuntimeException("Unable to write snapshot file: {$path}");
        }
    }

    /**
     * @param  array<string, mixed>  $payload
     */
    private function assertValidPayload(array $payload): void
    {
        if (! isset($payload['version'], $payload['season_year'], $payload['standings'])) {
            throw new RuntimeException('Snapshot file is missing required fields (version, season_year, standings).');
        }

        if ((int) $payload['version'] !== self::VERSION) {
            throw new RuntimeException('Unsupported snapshot version: '.(int) $payload['version']);
        }

        if (! is_array($payload['standings'])) {
            throw new RuntimeException('Snapshot standings must be an array.');
        }
    }
}
