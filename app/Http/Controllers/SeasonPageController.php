<?php

namespace App\Http\Controllers;

use App\Models\RaceEvent;
use App\Models\RaceResult;
use App\Models\Season;
use App\Models\Standing;
use App\Support\Motorsport\InertiaRaceTransformer;
use App\Support\Motorsport\StandingPresenter;
use App\Support\PublicMediaUrl;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Public season page: calendar, published {@see Standing} totals, and optional per-round {@see RaceResult} rows.
 */
class SeasonPageController extends Controller
{
    /**
     * @param  Request  $request  Current HTTP request (unused; retained for invokable consistency).
     */
    public function __invoke(Request $request, Season $season): Response
    {
        $division = (string) config('motorsport.default_championship_division');

        $season->load([
            'raceEvents' => fn ($q) => $q->orderBy('sort_order'),
            'raceEvents.results' => fn ($q) => $q
                ->where('division', $division),
            'raceEvents.results.driver',
        ]);

        $races = InertiaRaceTransformer::collection($season->raceEvents);

        $standingRows = Standing::query()
            ->where('season_id', $season->id)
            ->where('division', $division)
            ->orderBy('rank')
            ->with('driver')
            ->get();

        /** @var list<array<string, mixed>> $roundResults */
        $roundResults = [];
        foreach ($season->raceEvents as $event) {
            $roundResults[] = self::roundPayloadForRaceEvent($event, $division);
        }

        $standingStatus = $standingRows->first()?->status ?? 'entered';

        return Inertia::render('Season2026', [
            'season' => [
                'slug' => $season->slug,
                'year' => $season->year,
                'title' => $season->title,
                'objectives' => $season->objectives ?? [],
                'previousSeasonBanner' => $season->previous_season_banner,
            ],
            'races' => $races,
            'standingTable' => [
                'divisionLabel' => $division,
                'standings' => StandingPresenter::toStandingRows($standingRows),
                'standingStatus' => $standingStatus,
            ],
            'roundResults' => $roundResults,
            'meta' => [
                'title' => "{$season->year} Season | The Pursuit of the #1 Plate",
                'description' => 'Race calendar, championship standings, and round-by-round results. Follow Jenkins Motorsports on track.',
                'image' => '/images/dave_truck_on_racing_tracks_as_first.jpg',
            ],
        ]);
    }

    /**
     * @return array{
     *     event: string,
     *     title: string,
     *     dateDisplay: string,
     *     venue: string,
     *     results: list<array{
     *         driverName: string,
     *         truck: string,
     *         position: int|null,
     *         points: int,
     *         status: string|null,
     *         division: string,
     *         racingNumber: string|null,
     *         isJenkins: bool,
     *         profileImage: string|null
     *     }>
     * }
     */
    private static function roundPayloadForRaceEvent(RaceEvent $event, string $division): array
    {
        /** @var \Illuminate\Support\Collection<int, RaceResult> $sorted */
        $sorted = $event->results
            ->where('division', $division)
            ->values()
            ->sort(function (RaceResult $a, RaceResult $b): int {
                $posA = $a->position;
                $posB = $b->position;
                if ($posA === null && $posB === null) {
                    return $b->points <=> $a->points;
                }
                if ($posA === null) {
                    return 1;
                }
                if ($posB === null) {
                    return -1;
                }
                if ($posA !== $posB) {
                    return $posA <=> $posB;
                }

                return $b->points <=> $a->points;
            });

        $resultRows = [];
        foreach ($sorted as $rr) {
            $driver = $rr->driver;
            if ($driver === null) {
                continue;
            }

            $resultRows[] = [
                'driverName' => $driver->name,
                'truck' => (string) $driver->truck_model,
                'position' => $rr->position,
                'points' => $rr->points,
                'status' => $rr->status,
                'division' => $rr->division,
                'racingNumber' => $driver->racing_number,
                'isJenkins' => (bool) $driver->is_team_driver,
                'profileImage' => filled($driver->profile_image_path)
                    ? PublicMediaUrl::browserPath((string) $driver->profile_image_path)
                    : null,
            ];
        }

        return [
            'event' => $event->event_code,
            'title' => $event->title,
            'dateDisplay' => $event->date_display,
            'venue' => $event->venue,
            'results' => $resultRows,
        ];
    }
}
