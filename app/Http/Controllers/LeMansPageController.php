<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use Inertia\Inertia;
use Inertia\Response;

class LeMansPageController extends Controller
{
    public function __invoke(): Response
    {
        $sections = ContentBlock::query()
            ->where('page_slug', 'le-mans')
            ->orderBy('sort_order')
            ->get()
            ->mapWithKeys(fn (ContentBlock $b) => [$b->block_key => $b->payload])
            ->all();

        return Inertia::render('LeMans', [
            'content' => $sections,
            'meta' => [
                'title' => 'Le Mans International | 24 Heures Camions',
                'description' => 'Jenkins Motorsports takes on the world at the iconic Circuit Bugatti, Le Mans. Experience the journey from Stone to France for the 24 Heures Camions.',
                'image' => '/images/multiple_trucks_on_racing_tracks_2.jpg',
            ],
        ]);
    }
}
