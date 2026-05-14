<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property-read \Illuminate\Database\Eloquent\Collection<int, BlogPost> $posts
 * @property-read \Illuminate\Database\Eloquent\Collection<int, MediaAsset> $mediaAssets
 */
class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    /**
     * @return BelongsToMany<BlogPost, $this>
     */
    public function posts(): BelongsToMany
    {
        return $this->belongsToMany(BlogPost::class);
    }

    /**
     * @return BelongsToMany<MediaAsset, $this>
     */
    public function mediaAssets(): BelongsToMany
    {
        return $this->belongsToMany(MediaAsset::class)->withTimestamps();
    }
}
