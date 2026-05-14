<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

/**
 * @property int $id
 * @property string $key
 * @property array<string, mixed>|scalar|null $value
 */
class SiteSetting extends Model
{
    public const CACHE_KEY = 'site_settings_array';

    protected $fillable = [
        'key',
        'value',
    ];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'value' => 'json',
        ];
    }

    protected static function booted(): void
    {
        static::saved(function (): void {
            Cache::forget(self::CACHE_KEY);
        });

        static::deleted(function (): void {
            Cache::forget(self::CACHE_KEY);
        });
    }

    /**
     * @return array<string, mixed>
     */
    public static function allAsKeyedArray(): array
    {
        return Cache::rememberForever(self::CACHE_KEY, function (): array {
            /** @var array<string, mixed> $out */
            $out = [];
            foreach (self::query()->orderBy('key')->get() as $setting) {
                $out[$setting->key] = $setting->value;
            }

            return $out;
        });
    }

    /**
     * @param  array<string, mixed>|scalar|null  $value
     */
    public static function setValue(string $key, mixed $value): self
    {
        return self::query()->updateOrCreate(
            ['key' => $key],
            ['value' => $value],
        );
    }
}
