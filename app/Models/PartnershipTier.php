<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $slug
 * @property string $name
 * @property string $impact
 * @property list<string> $benefits
 * @property string $cta_label
 * @property string $cta_link
 * @property bool $is_highlighted
 * @property int $sort_order
 */
class PartnershipTier extends Model
{
    protected $fillable = [
        'slug',
        'name',
        'impact',
        'benefits',
        'cta_label',
        'cta_link',
        'is_highlighted',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'benefits' => 'array',
            'is_highlighted' => 'boolean',
        ];
    }
}
