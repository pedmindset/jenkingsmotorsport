<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Models\RaceEvent;
use App\Models\Season;
use Filament\Widgets\Widget;
use Illuminate\Support\Facades\Session;

/**
 * Hero banner for the dashboard with live season context and stable daily mottos.
 */
class TeamWelcomeBanner extends Widget
{
    protected static bool $isLazy = false;

    protected string $view = 'filament.widgets.team-welcome-banner';

    protected static ?int $sort = -1;

    protected int|string|array $columnSpan = 'full';

    /**
     * @var list<string>
     */
    private const MOTTOS = [
        'Precision in every turn.',
        'Fueled by passion, driven by excellence.',
        'Chasing the checkered flag together.',
        'Innovation on the track, integrity in the shop.',
    ];

    /**
     * Motto stays fixed for the browser session to avoid flicker on Livewire updates.
     */
    public function getMotto(): string
    {
        $key = 'filament_team_welcome_motto';

        if (! Session::has($key)) {
            Session::put($key, self::MOTTOS[array_rand(self::MOTTOS)]);
        }

        return (string) Session::get($key);
    }

    public function getActiveSeason(): ?Season
    {
        return Season::query()
            ->where('is_active', true)
            ->orderByDesc('year')
            ->first();
    }

    /**
     * Next event for the active season, when one is set.
     */
    public function getNextRaceEvent(): ?RaceEvent
    {
        $season = $this->getActiveSeason();

        if (! $season instanceof Season) {
            return null;
        }

        return RaceEvent::query()
            ->where('season_id', $season->id)
            ->where('starts_at', '>=', now())
            ->orderBy('starts_at')
            ->first();
    }

    /**
     * Count of future events on the active season calendar.
     */
    public function getUpcomingEventsCount(): ?int
    {
        $season = $this->getActiveSeason();

        if (! $season instanceof Season) {
            return null;
        }

        return RaceEvent::query()
            ->where('season_id', $season->id)
            ->where('starts_at', '>=', now())
            ->count();
    }

    /**
     * Approximate schedule progress: share of active-season events that already started.
     */
    public function getSeasonScheduleProgress(): ?int
    {
        $season = $this->getActiveSeason();

        if (! $season instanceof Season) {
            return null;
        }

        $total = $season->raceEvents()->count();

        if ($total === 0) {
            return null;
        }

        $started = $season->raceEvents()->where('starts_at', '<', now())->count();

        return (int) round(($started / $total) * 100);
    }
}
