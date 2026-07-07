<?php

declare(strict_types=1);

namespace App\Filament\Support;

use App\Support\PublicMediaUrl;
use Filament\Forms\Components\FileUpload;
use League\Flysystem\UnableToCheckFileExistence;

/**
 * Configures Filament {@see FileUpload} fields for public-disk uploads and legacy `/images/…` paths.
 */
final class PublicMediaFileUpload
{
    /**
     * Apply preview and hydration rules so existing stored paths render on edit screens.
     */
    public static function configure(FileUpload $field): FileUpload
    {
        return $field
            ->fetchFileInformation(false)
            ->getUploadedFileUsing(self::resolveUploadedFile(...));
    }

    /**
     * Resolve a stored path into the metadata Filament needs to preview an uploaded file.
     *
     * @return array{name: string, size: int, type: string|null, url: string}|null
     */
    public static function resolveUploadedFile(FileUpload $component, string $file, string|array|null $storedFileNames): ?array
    {
        $diskRelative = PublicMediaUrl::publicDiskRelativePath($file);

        if ($diskRelative !== null) {
            $storage = $component->getDisk();

            try {
                if (! $storage->exists($diskRelative)) {
                    return null;
                }
            } catch (UnableToCheckFileExistence) {
                return null;
            }

            return [
                'name' => is_array($storedFileNames)
                    ? ($storedFileNames[$file] ?? basename($diskRelative))
                    : ($storedFileNames ?? basename($diskRelative)),
                'size' => $storage->size($diskRelative),
                'type' => $storage->mimeType($diskRelative),
                'url' => $storage->url($diskRelative),
            ];
        }

        $url = PublicMediaUrl::absoluteUrl($file);

        if ($url === null) {
            return null;
        }

        return [
            'name' => basename($file),
            'size' => 0,
            'type' => null,
            'url' => $url,
        ];
    }
}
