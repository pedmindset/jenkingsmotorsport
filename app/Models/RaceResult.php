<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Per-event finishing record for a driver (distinct from {@see Standing} championship totals).
 *
 * @property int $id
 * @property int $race_event_id
 * @property int $driver_id
 * @property string $division
 * @property int|null $position
 * @property int $points
 * @property string|null $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read RaceEvent|null $raceEvent
 * @property-read Driver|null $driver
 */
class RaceResult extends Model
{
    protected $fillable = [
        'race_event_id',
        'driver_id',
        'division',
        'position',
        'points',
        'status',
        'notes',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'position' => 'integer',
            'points' => 'integer',
        ];
    }

    /**
     * @return BelongsTo<RaceEvent, $this>
     */
    public function raceEvent(): BelongsTo
    {
        return $this->belongsTo(RaceEvent::class);
    }

    /**
     * @return BelongsTo<Driver, $this>
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
