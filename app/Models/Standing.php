<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $season_id
 * @property int $driver_id
 * @property int $rank
 * @property int $points
 * @property string $division
 * @property string $status
 */
class Standing extends Model
{
    protected $fillable = [
        'season_id',
        'driver_id',
        'rank',
        'points',
        'division',
        'status',
    ];

    /**
     * @return BelongsTo<Season, $this>
     */
    public function season(): BelongsTo
    {
        return $this->belongsTo(Season::class);
    }

    /**
     * @return BelongsTo<Driver, $this>
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(Driver::class);
    }
}
