<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string $role
 * @property string $description
 * @property string $technical_fact
 * @property string $logo_path
 * @property string $image_path
 * @property string $url
 * @property array<string, mixed>|null $theme
 * @property bool $is_active
 * @property int $sort_order
 */
class Partner extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'role',
        'description',
        'technical_fact',
        'logo_path',
        'image_path',
        'url',
        'theme',
        'is_active',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'theme' => 'array',
            'is_active' => 'boolean',
        ];
    }
}
