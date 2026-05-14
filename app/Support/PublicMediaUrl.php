<?php

declare(strict_types=1);

namespace App\Support;

/**
 * Normalizes stored media paths for the public site and admin previews.
 *
 * Supports: absolute URLs, site-root paths (e.g. /images/...), and paths
 * relative to the `public` storage disk (e.g. partners/logos/foo.webp).
 */
final class PublicMediaUrl
{
    /**
     * Browser-ready `src` or CSS `url()` value (root-relative or absolute URL).
     */
    public static function browserPath(?string $stored): string
    {
        if ($stored === null || $stored === '') {
            return '';
        }

        $value = trim($stored);
        if ($value === '') {
            return '';
        }

        if (str_starts_with($value, 'http://') || str_starts_with($value, 'https://')) {
            return $value;
        }

        if (str_starts_with($value, '/')) {
            return $value;
        }

        return '/storage/'.self::encodePublicDiskPathSegments($value);
    }

    /**
     * Encodes each path segment so spaces and reserved characters survive strict web servers (avoids 403/400 on GET).
     *
     * @return non-empty-string
     */
    private static function encodePublicDiskPathSegments(string $relativeToPublicDisk): string
    {
        $segments = explode('/', $relativeToPublicDisk);
        $encoded = [];
        foreach ($segments as $segment) {
            if ($segment === '') {
                continue;
            }
            $encoded[] = rawurlencode($segment);
        }

        return implode('/', $encoded);
    }

    /**
     * Absolute URL for table previews, meta tags, and similar.
     */
    public static function absoluteUrl(?string $stored): ?string
    {
        $relative = self::browserPath($stored);
        if ($relative === '') {
            return null;
        }

        if (str_starts_with($relative, 'http://') || str_starts_with($relative, 'https://')) {
            return $relative;
        }

        return url($relative);
    }
}
