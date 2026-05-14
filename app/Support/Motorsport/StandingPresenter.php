<?php

namespace App\Support\Motorsport;

use App\Models\Standing;
use App\Support\PublicMediaUrl;
use Illuminate\Support\Collection;

/**
 * Serializes {@see Standing} rows for Inertia championship/season views.
 */
class StandingPresenter
{
    /**
     * @param  Collection<int, Standing>  $rows  Already ordered (e.g. by rank).
     * @return list<array{rank: int, name: string, truck: string, points: int, isJenkins: bool, racingNumber: string|null, profileImage: string|null}>
     */
    public static function toStandingRows(Collection $rows): array
    {
        $standings = [];

        foreach ($rows as $row) {
            $driver = $row->driver;
            if ($driver === null) {
                continue;
            }

            $standings[] = [
                'rank' => $row->rank,
                'name' => $driver->name,
                'truck' => (string) $driver->truck_model,
                'points' => $row->points,
                'isJenkins' => (bool) $driver->is_team_driver,
                'racingNumber' => $driver->racing_number,
                'profileImage' => filled($driver->profile_image_path)
                    ? PublicMediaUrl::browserPath((string) $driver->profile_image_path)
                    : null,
            ];
        }

        return $standings;
    }
}
