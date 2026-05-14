<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\MediaAsset;
use App\Support\PublicMediaUrl;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Public gallery page backed by {@see MediaAsset} image rows.
 */
class GalleryPageController extends Controller
{
    /**
     * Assemble gallery images plus the CMS featured reel embed, preferring usable video URLs over empty rows.
     */
    public function __invoke(): Response
    {
        $images = MediaAsset::query()
            ->with([
                'season',
                'tags' => fn ($q) => $q->orderBy('name'),
            ])
            ->where('media_type', 'image')
            ->where(static function ($q): void {
                $q->whereNotNull('path')->where('path', '!=', '');
            })
            ->orderByDesc('featured')
            ->orderByDesc('taken_at')
            ->orderBy('sort_order')
            ->get()
            ->map(static function (MediaAsset $m): array {
                $takenAt = $m->taken_at;

                /** @var array{day: string, month: string, year: string}|null $dateParts */
                $dateParts = null;
                $dateLabel = null;
                $takenAtIso = null;

                if ($takenAt !== null) {
                    $takenAtIso = $takenAt->toIso8601String();
                    $dateParts = [
                        'day' => $takenAt->format('d'),
                        'month' => strtoupper($takenAt->format('M')),
                        'year' => $takenAt->format('Y'),
                    ];
                    $dateLabel = $takenAt->format('j M Y');
                }

                $seasonModel = $m->season;

                return [
                    'id' => $m->getKey(),
                    'slug' => $m->slug,
                    'src' => PublicMediaUrl::browserPath($m->path ?? ''),
                    'alt' => (string) ($m->alt ?? ''),
                    'title' => (string) ($m->title ?? $m->alt ?? ''),
                    'caption' => $m->caption,
                    'category' => $m->category,
                    'featured' => (bool) $m->featured,
                    'takenAt' => $takenAtIso,
                    'dateLabel' => $dateLabel,
                    'dateParts' => $dateParts,
                    'season' => $seasonModel !== null ? [
                        'slug' => $seasonModel->slug,
                        'year' => (int) $seasonModel->year,
                        'title' => $seasonModel->title,
                    ] : null,
                    'tags' => $m->tags
                        ->map(static fn ($t): array => [
                            'slug' => $t->slug,
                            'name' => $t->name,
                        ])
                        ->values()
                        ->all(),
                ];
            })
            ->values()
            ->all();

        /** @var MediaAsset|null $featuredVideo */
        $featuredVideo = MediaAsset::query()
            ->where('media_type', 'video')
            ->orderByRaw("CASE WHEN COALESCE(url, '') = '' THEN 1 ELSE 0 END")
            ->orderByRaw("CASE WHEN category = 'gallery' THEN 0 WHEN category IN ('general', 'hero') THEN 1 ELSE 2 END")
            ->orderBy('sort_order')
            ->first();

        return Inertia::render('Gallery', [
            'galleryImages' => $images,
            'featuredVideoUrl' => $featuredVideo?->url,
            'meta' => [
                'title' => 'Gallery | Speed in Focus',
                'description' => 'The Theatre of Heavy Metal. A visual chronicle of power, precision, and the paddock. View the Jenkins Motorsports gallery.',
                'image' => '/images/dave_truck_on_racing_tracks_as_first_2.jpg',
            ],
        ]);
    }
}
