<?php

namespace App\Http\Controllers;

use App\Models\ContentBlock;
use Inertia\Inertia;
use Inertia\Response;

class LegacyPageController extends Controller
{
    public function __invoke(): Response
    {
        $sections = ContentBlock::query()
            ->where('page_slug', 'legacy')
            ->orderBy('sort_order')
            ->get()
            ->mapWithKeys(fn (ContentBlock $b) => [$b->block_key => $b->payload])
            ->all();

        return Inertia::render('Legacy', [
            'content' => $sections,
            'meta' => [
                'title' => 'Legacy | The Dynasty',
                'description' => 'Forty Years. Two Generations. The story of Jenkins Motorsports is the story of British Truck Racing itself. Explore the timeline from 1984 to 2026.',
                'image' => '/images/tony_jenkins_championship_truck.jpg',
            ],
        ]);
    }
}
