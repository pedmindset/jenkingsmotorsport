<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $year
 * @property string $slug
 * @property string $title
 * @property string|null $summary
 * @property bool $is_active
 * @property array<int, array{title: string, description: string, icon: string}>|null $objectives
 * @property array<string, mixed>|null $previous_season_banner
 * @property array<string, mixed>|null $meta
 * @property-read \Illuminate\Database\Eloquent\Collection<int, RaceEvent> $raceEvents
 * @property-read \Illuminate\Database\Eloquent\Collection<int, MediaAsset> $mediaAssets
 */
class Season extends Model
{
    protected $fillable = [
        'year',
        'slug',
        'title',
        'summary',
        'is_active',
        'objectives',
        'previous_season_banner',
        'meta',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'objectives' => 'array',
            'previous_season_banner' => 'array',
            'meta' => 'array',
        ];
    }

    /**
     * @return HasMany<RaceEvent, $this>
     */
    public function raceEvents(): HasMany
    {
        return $this->hasMany(RaceEvent::class)->orderBy('sort_order');
    }

    /**
     * @return HasMany<Standing, $this>
     */
    public function standings(): HasMany
    {
        return $this->hasMany(Standing::class)->orderBy('rank');
    }

    /**
     * @return HasMany<SeasonContender, $this>
     */
    public function contenders(): HasMany
    {
        return $this->hasMany(SeasonContender::class)->orderBy('sort_order');
    }

    /**
     * @return HasMany<MediaAsset, $this>
     */
    public function mediaAssets(): HasMany
    {
        return $this->hasMany(MediaAsset::class);
    }

    /**
     * Season showcased at `/season` when no slug is given: active flag first, else newest year.
     */
    public static function resolveForPublicRedirect(): self
    {
        $active = static::query()
            ->where('is_active', true)
            ->orderByDesc('year')
            ->first();

        if ($active instanceof self) {
            return $active;
        }

        return static::query()->orderByDesc('year')->firstOrFail();
    }
}
