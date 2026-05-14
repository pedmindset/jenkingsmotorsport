<?php

namespace App\Http\Controllers;

use App\Models\RaceEvent;
use App\Models\Season;
use App\Models\SiteSetting;
use App\Support\Motorsport\InertiaRaceTransformer;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $settings = SiteSetting::allAsKeyedArray();

        $season = Season::resolveForPublicRedirect();
        $season->load(['raceEvents' => fn ($q) => $q->orderBy('sort_order')]);

        /** @var list<array<string, mixed>> $races */
        $races = $season ? InertiaRaceTransformer::collection($season->raceEvents) : [];

        $nextRacePayload = null;
        $now = Carbon::now();
        if ($season) {
            /** @var RaceEvent|null $next */
            $next = $season->raceEvents->first(fn (RaceEvent $e) => $e->starts_at->isFuture());
            if ($next === null && $season->raceEvents->isNotEmpty()) {
                $next = $season->raceEvents->first();
            }
            if ($next !== null) {
                $nextRacePayload = InertiaRaceTransformer::toSeasonRaceArray($next);
            }
        }

        $heroVideoUrl = $settings['home.hero_video_embed_url'] ?? 'https://www.youtube.com/embed/-jiZDvSDv8Y?autoplay=1&mute=1&loop=1&playlist=-jiZDvSDv8Y&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3';

        $countdownFallback = $settings['home.countdown_fallback_iso'] ?? '2027-04-01T09:00:00';

        return Inertia::render('Welcome', [
            'canRegister' => Features::enabled(Features::registration()),
            'homeRaces' => $races,
            'nextRace' => $nextRacePayload,
            'heroVideoUrl' => $heroVideoUrl,
            'countdownFallbackIso' => $countdownFallback,
            'headlineStats' => $settings['home.headline_stats'] ?? [
                ['value' => '1,160', 'unit' => 'BHP', 'label' => 'Engine Output'],
                ['value' => '5,500', 'unit' => 'Nm', 'label' => 'Torque Peak'],
            ],
            'meta' => [
                'title' => 'Jenkins Motorsports | The Architecture of Power',
                'description' => '1,160 BHP. 5,500 Nm Torque. 40 Years of DNA. Hunt the 2026 Title with Jenkins Motorsports.',
                'image' => '/images/dave_truck_on_racing_tracks_as_first_2.jpg',
            ],
        ]);
    }
}
