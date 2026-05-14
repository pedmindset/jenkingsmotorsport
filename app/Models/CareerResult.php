<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $year
 * @property string $result
 * @property string $division
 * @property bool $is_highlight
 * @property int $sort_order
 */
class CareerResult extends Model
{
    protected $fillable = [
        'year',
        'result',
        'division',
        'is_highlight',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'is_highlight' => 'boolean',
        ];
    }
}
