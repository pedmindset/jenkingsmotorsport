<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $vehicle_id
 * @property string $label
 * @property string $value
 * @property string|null $icon_key
 * @property int $sort_order
 */
class VehicleSpecification extends Model
{
    protected $fillable = [
        'vehicle_id',
        'label',
        'value',
        'icon_key',
        'sort_order',
    ];

    /**
     * @return BelongsTo<Vehicle, $this>
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
