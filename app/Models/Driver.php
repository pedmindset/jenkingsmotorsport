<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string|null $truck_model
 * @property string|null $racing_number
 * @property bool $is_team_driver
 * @property string|null $profile_image_path
 * @property int $sort_order
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Standing> $standings
 * @property-read \Illuminate\Database\Eloquent\Collection<int, SeasonContender> $seasonContenders
 * @property-read \Illuminate\Database\Eloquent\Collection<int, RaceResult> $raceResults
 */
class Driver extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'truck_model',
        'racing_number',
        'is_team_driver',
        'bio',
        'sort_order',
        'profile_image_path',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_team_driver' => 'boolean',
        ];
    }

    /**
     * @return HasMany<Standing, $this>
     */
    public function standings(): HasMany
    {
        return $this->hasMany(Standing::class);
    }

    /**
     * @return HasMany<SeasonContender, $this>
     */
    public function seasonContenders(): HasMany
    {
        return $this->hasMany(SeasonContender::class);
    }

    /**
     * @return HasMany<RaceResult, $this>
     */
    public function raceResults(): HasMany
    {
        return $this->hasMany(RaceResult::class);
    }
}
