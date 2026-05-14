<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string|null $slug
 * @property string|null $title
 * @property string|null $alt
 * @property string|null $path
 * @property string|null $url
 * @property string $media_type
 * @property string $category
 * @property bool $featured
 * @property string|null $caption
 * @property \Illuminate\Support\Carbon|null $taken_at
 * @property int|null $season_id
 * @property int $sort_order
 * @property-read Season|null $season
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Tag> $tags
 */
class MediaAsset extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'alt',
        'path',
        'url',
        'media_type',
        'category',
        'featured',
        'caption',
        'taken_at',
        'season_id',
        'sort_order',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'taken_at' => 'datetime',
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
     * @return BelongsToMany<Tag, $this>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
}
