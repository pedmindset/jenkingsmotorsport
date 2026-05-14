<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string|null $racing_number
 * @property string|null $hero_image_path
 * @property string|null $description
 */
class Vehicle extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'racing_number',
        'hero_image_path',
        'description',
    ];

    /**
     * @return HasMany<VehicleSpecification, $this>
     */
    public function specifications(): HasMany
    {
        return $this->hasMany(VehicleSpecification::class)->orderBy('sort_order');
    }
}
