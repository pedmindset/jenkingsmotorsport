<?php

declare(strict_types=1);

namespace App\Support\Cms;

use Illuminate\Support\Str;

/**
 * Maps {@see \App\Models\ContentBlock} (page_slug + block_key) pairs to seeded payload shapes used by Legacy & Le Mans Inertia pages.
 */
final class ContentBlockRegistry
{
    /**
     * @return array<string, string>
     */
    public static function presetChoices(): array
    {
        return ContentBlockPreset::presetChoices();
    }

    /**
     * @return non-empty-string
     */
    public static function pairKey(?string $pageSlug, ?string $blockKey): string
    {
        $page = $pageSlug ?? '';
        $block = $blockKey ?? '';

        return ($page !== '' ? $page : '').'|'.($block !== '' ? $block : '');
    }

    public static function supportsStructured(?string $pageSlug, ?string $blockKey): bool
    {
        return ContentBlockPreset::fromPageSlugAndBlockKey($pageSlug, $blockKey) !== null;
    }

    /**
     * @return list<string>
     */
    public static function lucideIconOptions(): array
    {
        return [
            'Activity',
            'ArrowRight',
            'Award',
            'BadgeCheck',
            'Calendar',
            'Camera',
            'ChevronRight',
            'Circle',
            'Clock',
            'Cog',
            'Cpu',
            'Disc',
            'Droplets',
            'Eye',
            'FileText',
            'Flag',
            'Gauge',
            'Globe',
            'Hammer',
            'History',
            'MapPin',
            'Medal',
            'Moon',
            'Package',
            'Scale',
            'Settings',
            'Ship',
            'Sun',
            'Target',
            'Thermometer',
            'Timer',
            'TrendingUp',
            'Trophy',
            'Truck',
            'Users',
            'Wind',
            'Wrench',
            'Zap',
        ];
    }

    /**
     * Keeps payloads aligned with the React pages while stripping empty CMS slots.
     *
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    public static function sanitize(?string $pageSlug, ?string $blockKey, array $payload): array
    {
        $preset = ContentBlockPreset::fromPageSlugAndBlockKey($pageSlug, $blockKey);

        return match ($preset) {
            ContentBlockPreset::LegacyTimeline => self::sanitizeLegacyTimelinePayload($payload),
            ContentBlockPreset::LegacyFactRows => self::sanitizeFactRowsPayload($payload),
            ContentBlockPreset::LeMansJourneyLocations => self::sanitizeLocationsPayload($payload),
            ContentBlockPreset::LeMansCircuitFeatures => self::sanitizeSimpleItemsPayload($payload),
            ContentBlockPreset::LeMansTechnicalFocus => self::sanitizeTechnicalFocusPayload($payload),
            ContentBlockPreset::LeMansEventSchema => self::mergeEventSchemaSkeleton($payload),
            default => $payload,
        };
    }

    /**
     * Seeds an empty authoring canvas for the selected preset pair.
     *
     * @return array<string, mixed>
     */
    public static function emptyBlueprintForPreset(string $presetValue): array
    {
        $preset = ContentBlockPreset::tryFrom($presetValue);

        return $preset?->emptyBlueprint() ?? [];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function sanitizeLegacyTimelinePayload(array $payload): array
    {
        $sectionsRaw = $payload['sections'];
        /** @var list<array<string, mixed>> $sectionsRaw */
        if (! is_array($sectionsRaw)) {
            return ['sections' => []];
        }

        /** @var list<array<string, mixed>> $cleaned */
        $cleaned = [];
        foreach ($sectionsRaw as $section) {
            if (! is_array($section)) {
                continue;
            }

            /** @var array<string, mixed> $row */
            $row = [];

            foreach (['year', 'title', 'subTitle', 'image', 'filterClass', 'themeColor'] as $key) {
                if (isset($section[$key]) && is_string($section[$key]) && trim($section[$key]) !== '') {
                    $row[$key] = trim($section[$key]);
                } else {
                    $row[$key] = isset($section[$key]) ? (string) $section[$key] : '';
                }
            }

            $align = $section['align'] ?? 'left';
            $row['align'] = \in_array($align, ['left', 'right'], true) ? $align : 'left';

            /** @var list<string>|mixed $paragraphs */
            $paragraphs = $section['paragraphs'] ?? [];
            $row['paragraphs'] = [];
            if (is_array($paragraphs)) {
                foreach ($paragraphs as $p) {
                    if (! is_string($p)) {
                        continue;
                    }
                    $trim = trim($p);
                    if ($trim === '') {
                        continue;
                    }
                    $row['paragraphs'][] = $trim;
                }
            }

            /** @var list<mixed>|mixed $listItems */
            $listItems = $section['listItems'] ?? [];
            $listClean = [];
            if (is_array($listItems)) {
                foreach ($listItems as $item) {
                    if (! is_array($item)) {
                        continue;
                    }
                    $icon = isset($item['icon']) ? trim((string) $item['icon']) : '';
                    $content = isset($item['content']) ? trim((string) $item['content']) : '';
                    if ($icon === '' && $content === '') {
                        continue;
                    }

                    $listClean[] = [
                        'icon' => $icon !== '' ? $icon : 'Circle',
                        'content' => $content,
                    ];
                }
            }
            $row['listItems'] = $listClean;

            $callout = $section['callout'] ?? null;
            if (is_array($callout)) {
                $calloutTitle = isset($callout['title']) ? trim((string) $callout['title']) : '';
                $calloutBody = isset($callout['body']) ? trim((string) $callout['body']) : '';
                if ($calloutTitle !== '' || $calloutBody !== '') {
                    $row['callout'] = [
                        'title' => $calloutTitle,
                        'body' => $calloutBody,
                    ];
                }
            }

            $badge = $section['badge'] ?? '';
            if (is_string($badge)) {
                $badge = trim($badge);
            } else {
                $badge = '';
            }
            if ($badge !== '') {
                $row['badge'] = $badge;
            }

            /** @var list<mixed>|mixed $stats */
            $stats = $section['stats'] ?? [];
            $statsClean = [];
            if (is_array($stats)) {
                foreach ($stats as $statRow) {
                    if (! is_array($statRow)) {
                        continue;
                    }
                    $value = isset($statRow['value']) ? trim((string) $statRow['value']) : '';
                    $label = isset($statRow['label']) ? trim((string) $statRow['label']) : '';
                    if ($value === '' && $label === '') {
                        continue;
                    }
                    $statsClean[] = ['value' => $value, 'label' => $label];
                }
            }
            if ($statsClean !== []) {
                $row['stats'] = $statsClean;
            }

            $cleaned[] = $row;
        }

        return ['sections' => $cleaned];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function sanitizeFactRowsPayload(array $payload): array
    {
        $rows = $payload['rows'] ?? [];
        if (! is_array($rows)) {
            return ['rows' => []];
        }

        $clean = [];
        foreach ($rows as $line) {
            if (! is_array($line)) {
                continue;
            }
            $info = isset($line['info']) ? trim((string) $line['info']) : '';
            $status = isset($line['status']) ? trim((string) $line['status']) : '';
            $detail = isset($line['detail']) ? trim((string) $line['detail']) : '';
            if ($info === '' && $status === '' && $detail === '') {
                continue;
            }

            $clean[] = compact('info', 'status', 'detail');
        }

        return ['rows' => $clean];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function sanitizeLocationsPayload(array $payload): array
    {
        $locations = $payload['locations'] ?? [];
        if (! is_array($locations)) {
            return ['locations' => []];
        }

        /** @var list<array<string, mixed>> $next */
        $next = [];

        foreach ($locations as $location) {
            if (! is_array($location)) {
                continue;
            }

            /** @var array<string, mixed> $row */
            $id = isset($location['id']) ? trim((string) $location['id']) : '';
            $name = isset($location['name']) ? trim((string) $location['name']) : '';
            if ($name === '') {
                continue;
            }

            $row = [
                'id' => $id !== '' ? $id : Str::slug($name),
                'name' => $name,
                'city' => isset($location['city']) ? trim((string) $location['city']) : '',
                'icon' => isset($location['icon']) ? trim((string) $location['icon']) : 'Circle',
                'color' => isset($location['color']) ? trim((string) $location['color']) : 'text-primary',
                'position' => (int) ($location['position'] ?? 0),
                'tasks' => self::sanitizeStringArray($location['tasks'] ?? []),
                'description' => isset($location['description']) ? trim((string) $location['description']) : '',
            ];

            $next[] = $row;
        }

        usort($next, fn (array $left, array $right): int => ($left['position'] ?? 0) <=> ($right['position'] ?? 0));

        return ['locations' => array_values($next)];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function sanitizeSimpleItemsPayload(array $payload): array
    {
        $items = $payload['items'] ?? [];
        if (! is_array($items)) {
            return ['items' => []];
        }

        $clean = [];
        foreach ($items as $row) {
            if (! is_array($row)) {
                continue;
            }
            $name = isset($row['name']) ? trim((string) $row['name']) : '';
            $description = isset($row['description']) ? trim((string) $row['description']) : '';
            if ($name === '' && $description === '') {
                continue;
            }
            $clean[] = compact('name', 'description');
        }

        return ['items' => $clean];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function sanitizeTechnicalFocusPayload(array $payload): array
    {
        $items = $payload['items'] ?? [];
        if (! is_array($items)) {
            return ['items' => []];
        }

        $clean = [];
        foreach ($items as $row) {
            if (! is_array($row)) {
                continue;
            }
            $icon = isset($row['icon']) ? trim((string) $row['icon']) : 'Circle';
            $title = isset($row['title']) ? trim((string) $row['title']) : '';
            $description = isset($row['description']) ? trim((string) $row['description']) : '';
            $color = isset($row['color']) ? trim((string) $row['color']) : 'text-primary';
            if ($title === '' && $description === '') {
                continue;
            }
            $clean[] = [
                'icon' => $icon,
                'title' => $title,
                'description' => $description,
                'color' => $color,
            ];
        }

        return ['items' => $clean];
    }

    /**
     * @param  array<string, mixed>  $payload
     * @return array<string, mixed>
     */
    private static function mergeEventSchemaSkeleton(array $payload): array
    {
        return array_replace_recursive(ContentBlockPreset::LeMansEventSchema->emptyBlueprint(), $payload);
    }

    /**
     * @return array<string, string>
     */
    public static function tailwindAccentClassOptions(): array
    {
        return [
            'text-primary' => 'Brand primary',
            'text-blue-400' => 'Cool blue highlight',
            'text-orange-400' => 'Heat / hazard orange',
            'text-destructive' => 'Racing red',
            'text-muted-foreground' => 'Muted steel',
            'text-white' => 'Pure white headline',
            'text-yellow-500' => 'Signal yellow',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function timelineThemeColorOptions(): array
    {
        return [
            'white' => 'Neutral cinematic white',
            'jenkins-gold' => 'Legacy gold emphasis',
            'primary' => 'Brand primary kinetic',
        ];
    }

    /**
     * Official schema.org statuses used by Google rich results.
     *
     * @return array<string, string>
     */
    public static function sportsEventStatusOptions(): array
    {
        return [
            'https://schema.org/EventScheduled' => 'Scheduled',
            'https://schema.org/EventPostponed' => 'Postponed',
            'https://schema.org/EventCancelled' => 'Cancelled',
            'https://schema.org/EventRescheduled' => 'Rescheduled',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function lucideIconSelectOptions(): array
    {
        $icons = self::lucideIconOptions();

        return array_combine($icons, $icons) ?: [];
    }

    /**
     * Normalises string lists used for journey task checklists.
     *
     * @return list<string>
     */
    private static function sanitizeStringArray(mixed $candidate): array
    {
        if (! is_array($candidate)) {
            return [];
        }

        $list = [];
        foreach ($candidate as $line) {
            if (! is_string($line)) {
                continue;
            }
            $trim = trim($line);
            if ($trim === '') {
                continue;
            }
            $list[] = $trim;
        }

        return array_values($list);
    }
}
