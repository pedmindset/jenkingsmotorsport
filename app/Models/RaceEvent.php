<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $season_id
 * @property string $event_code
 * @property string $title
 * @property string $date_display
 * @property \Illuminate\Support\Carbon $starts_at
 * @property \Illuminate\Support\Carbon|null $ends_at
 * @property string $venue
 * @property string $country
 * @property string $rounds
 * @property string $description
 * @property string|null $highlight
 * @property bool $is_international
 * @property string|null $feature_link
 * @property int $sort_order
 * @property-read \Illuminate\Database\Eloquent\Collection<int, RaceResult> $results
 */
class RaceEvent extends Model
{
    protected $fillable = [
        'season_id',
        'event_code',
        'title',
        'date_display',
        'starts_at',
        'ends_at',
        'venue',
        'country',
        'rounds',
        'description',
        'highlight',
        'is_international',
        'feature_link',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'starts_at' => 'datetime',
            'ends_at' => 'datetime',
            'is_international' => 'boolean',
        ];
    }

    /**
     * @return BelongsTo<Season, $this>
     */
    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    /**
     * @return HasMany<RaceResult, $this>
     */
    public function results(): HasMany
    {
        return $this->hasMany(RaceResult::class);
    }
}
