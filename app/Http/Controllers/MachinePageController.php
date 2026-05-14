<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use App\Support\PublicMediaUrl;
use Inertia\Inertia;
use Inertia\Response;

class MachinePageController extends Controller
{
    public function __invoke(): Response
    {
        $vehicle = Vehicle::query()
            ->where('slug', 'man-tgx-69')
            ->with(['specifications' => fn ($q) => $q->orderBy('sort_order')])
            ->first();

        $specs = $vehicle
            ? $vehicle->specifications->map(fn ($s) => [
                'label' => $s->label,
                'value' => $s->value,
                'iconKey' => $s->icon_key,
            ])->values()->all()
            : [];

        return Inertia::render('TheMachine', [
            'vehicle' => $vehicle ? [
                'name' => $vehicle->name,
                'racingNumber' => $vehicle->racing_number,
                'heroImagePath' => filled($vehicle->hero_image_path)
                    ? PublicMediaUrl::browserPath((string) $vehicle->hero_image_path)
                    : null,
                'description' => $vehicle->description,
            ] : null,
            'techSpecs' => $specs,
            'meta' => [
                'title' => 'The Machine | #69 MAN TGX',
                'description' => 'Discover the 1,160 BHP MAN TGX #69. A 5.5-tonne racing beast engineered by Jenkins Motorsports. See the specs, the engine, and the technology behind British Truck Racing\'s finest.',
                'image' => '/images/dave_truck_on_racing_tracks_2.jpg',
            ],
        ]);
    }
}
