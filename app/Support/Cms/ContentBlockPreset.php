<?php

declare(strict_types=1);

namespace App\Support\Cms;

/**
 * Canonical keys for seeded {@see \App\Models\ContentBlock} rows (Legacy + Le Mans layouts).
 *
 * Matches public Inertia payloads; keep in sync with `resources/js/types/motorsport.ts`.
 */
enum ContentBlockPreset: string
{
    case Custom = '__custom';
    case LegacyTimeline = 'legacy|timeline';
    case LegacyFactRows = 'legacy|fact_check_rows';
    case LeMansJourneyLocations = 'le-mans|journey_locations';
    case LeMansCircuitFeatures = 'le-mans|circuit_features';
    case LeMansTechnicalFocus = 'le-mans|technical_focus';
    case LeMansEventSchema = 'le-mans|event_schema';

    /**
     * @return array<string, string> map of composite key => admin label for Filament select options
     */
    public static function presetChoices(): array
    {
        $map = [];

        foreach (self::cases() as $case) {
            $map[$case->value] = $case->selectLabel();
        }

        return $map;
    }

    /**
     * @return array<string, ContentBlockPreset>
     */
    public static function structuredKeyMap(): array
    {
        $map = [];

        foreach (self::structuredCases() as $case) {
            $map[$case->value] = $case;
        }

        return $map;
    }

    /**
     * @return list<string>
     */
    public static function structuredCompositeKeys(): array
    {
        return array_map(static fn (self $c): string => $c->value, self::structuredCases());
    }

    /**
     * @return list<self>
     */
    public static function structuredCases(): array
    {
        return array_values(array_filter(
            self::cases(),
            static fn (self $case): bool => ! $case->isCustom(),
        ));
    }

    public function isCustom(): bool
    {
        return $this === self::Custom;
    }

    public static function fromPageSlugAndBlockKey(?string $pageSlug, ?string $blockKey): ?self
    {
        $page = isset($pageSlug) ? trim($pageSlug) : '';
        $block = isset($blockKey) ? trim($blockKey) : '';

        if ($page === '' || $block === '') {
            return null;
        }

        $needle = "{$page}|{$block}";

        return self::structuredKeyMap()[$needle] ?? null;
    }

    /**
     * @return array<string, mixed>
     */
    public function emptyBlueprint(): array
    {
        return match ($this) {
            self::LegacyTimeline => ['sections' => []],
            self::LegacyFactRows => ['rows' => []],
            self::LeMansJourneyLocations => ['locations' => []],
            self::LeMansCircuitFeatures, self::LeMansTechnicalFocus => ['items' => []],
            self::LeMansEventSchema => self::freshEventSchemaShell(),
            self::Custom => [],
        };
    }

    /**
     * @return array<string, mixed>
     */
    private static function freshEventSchemaShell(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'SportsEvent',
            'name' => '',
            'startDate' => '',
            'endDate' => '',
            'eventStatus' => 'https://schema.org/EventScheduled',
            'location' => [
                '@type' => 'Place',
                'name' => '',
                'address' => [
                    '@type' => 'PostalAddress',
                    'addressLocality' => '',
                    'addressCountry' => '',
                ],
            ],
            'performer' => [
                '@type' => 'SportsTeam',
                'name' => '',
            ],
            'description' => '',
        ];
    }

    private function selectLabel(): string
    {
        return match ($this) {
            self::Custom => 'Advanced — custom page/key + JSON payload',
            self::LegacyTimeline => 'Legacy — Scroll timeline eras',
            self::LegacyFactRows => 'Legacy — Verified fact checker rows',
            self::LeMansJourneyLocations => 'Le Mans — Journey waypoint map',
            self::LeMansCircuitFeatures => 'Le Mans — Circuit feature cards',
            self::LeMansTechnicalFocus => 'Le Mans — Technical headline cards',
            self::LeMansEventSchema => 'Le Mans — Event structured data (JSON-LD for SEO)',
        };
    }
}
