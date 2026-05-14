<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $page_slug
 * @property string $block_key
 * @property array<string, mixed> $payload
 * @property int $sort_order
 */
class ContentBlock extends Model
{
    protected $fillable = [
        'page_slug',
        'block_key',
        'payload',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'payload' => 'array',
        ];
    }
}
