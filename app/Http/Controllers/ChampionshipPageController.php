<?php

namespace App\Http\Controllers;

use App\Models\CareerResult;
use App\Models\Season;
use App\Models\SeasonContender;
use App\Models\Standing;
use App\Support\Motorsport\StandingPresenter;
use App\Support\PublicMediaUrl;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChampionshipPageController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $seasons = Season::query()
            ->whereIn('year', [2025, 2026])
            ->orderByDesc('is_active')
            ->orderByDesc('year')
            ->get();

        /** @var list<array<string, mixed>> $standingSeasons */
        $standingSeasons = [];
        foreach ($seasons as $season) {
            $rows = Standing::query()
                ->where('season_id', $season->id)
                ->orderBy('rank')
                ->with('driver')
                ->get();

            $standingSeasons[] = [
                'year' => (string) $season->year,
                'divisionLabel' => $season->year === 2025 ? 'Final' : 'Entry List',
                'standings' => StandingPresenter::toStandingRows($rows),
                'standingStatus' => $rows->first()?->status ?? 'final',
                'isActive' => $season->is_active,
            ];
        }

        $careerResults = CareerResult::query()
            ->orderByDesc('year')
            ->get()
            ->map(fn (CareerResult $r) => [
                'year' => $r->year,
                'result' => $r->result,
                'division' => $r->division,
                'highlight' => $r->is_highlight,
            ])
            ->values()
            ->all();

        $season2026 = Season::query()->where('year', 2026)->first();
        $contenders = [];
        if ($season2026) {
            $contenders = SeasonContender::query()
                ->where('season_id', $season2026->id)
                ->orderBy('sort_order')
                ->with('driver')
                ->get()
                ->map(function (SeasonContender $c) {
                    $name = $c->driver?->name ?? (string) $c->name;

                    return [
                        'name' => $name,
                        'title' => $c->subtitle,
                        'threat' => $c->threat_level,
                        'profileImage' => $c->driver !== null && filled($c->driver->profile_image_path)
                            ? PublicMediaUrl::browserPath((string) $c->driver->profile_image_path)
                            : null,
                    ];
                })
                ->values()
                ->all();
        }

        return Inertia::render('Championship', [
            'standingSeasons' => $standingSeasons,
            'careerResults' => $careerResults,
            'contenders2026' => $contenders,
            'meta' => [
                'title' => 'Championship | The Leaderboard',
                'description' => 'The Leaderboard. Numbers Don\'t Lie. Grit Doesn\'t Quit. Follow the 2026 British Truck Racing Championship standings and history.',
                'image' => '/images/dave_standing_and_lifting_trophy_as_first_with_the_other_winners.jpg',
            ],
        ]);
    }
}
