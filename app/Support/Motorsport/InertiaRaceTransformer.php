<?php

namespace App\Support\Motorsport;

use App\Models\RaceEvent;
use Illuminate\Support\Collection;

/**
 * Maps {@see RaceEvent} models to the shape expected by Season2026 Inertia page.
 */
final class InertiaRaceTransformer
{
    /**
     * @return array<string, mixed>
     */
    public static function toSeasonRaceArray(RaceEvent $event): array
    {
        return [
            'event' => $event->event_code,
            'title' => $event->title,
            'date' => $event->date_display,
            'startsAt' => $event->starts_at->toIso8601String(),
            'venue' => $event->venue,
            'country' => $event->country,
            'rounds' => $event->rounds,
            'description' => $event->description,
            'highlight' => $event->highlight,
            'isInternational' => $event->is_international,
            'link' => $event->feature_link,
        ];
    }

    /**
     * @param  Collection<int, RaceEvent>  $events
     * @return list<array<string, mixed>>
     */
    public static function collection(Collection $events): array
    {
        return $events->map(fn (RaceEvent $event) => self::toSeasonRaceArray($event))->values()->all();
    }
}
