<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $season_id
 * @property int|null $driver_id
 * @property string|null $name
 * @property string $subtitle
 * @property string $threat_level
 * @property int $sort_order
 */
class SeasonContender extends Model
{
    protected $fillable = [
        'season_id',
        'driver_id',
        'name',
        'subtitle',
        'threat_level',
        'sort_order',
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
