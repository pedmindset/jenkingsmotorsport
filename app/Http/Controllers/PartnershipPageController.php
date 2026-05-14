<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use App\Models\PartnershipTier;
use App\Support\PublicMediaUrl;
use Inertia\Inertia;
use Inertia\Response;

class PartnershipPageController extends Controller
{
    public function __invoke(): Response
    {
        $partners = Partner::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get()
            ->map(fn (Partner $p) => [
                'name' => $p->name,
                'role' => $p->role,
                'description' => $p->description,
                'technicalFact' => $p->technical_fact,
                'icon' => $p->logo_path,
                'theme' => $p->theme ?? [
                    'glow' => 'from-primary to-primary/50',
                    'iconBg' => 'bg-transparent',
                    'iconText' => '',
                    'bar' => 'bg-primary',
                ],
                'image' => PublicMediaUrl::browserPath($p->image_path),
                'link' => $p->url,
            ])
            ->values()
            ->all();

        $tiers = PartnershipTier::query()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (PartnershipTier $t) => [
                'name' => $t->name,
                'impact' => $t->impact,
                'benefits' => $t->benefits,
                'cta' => $t->cta_label,
                'link' => $t->cta_link,
                'highlight' => $t->is_highlighted,
            ])
            ->values()
            ->all();

        return Inertia::render('Partnerships', [
            'technicalPartners' => $partners,
            'tiers' => $tiers,
            'meta' => [
                'title' => 'Partnerships | Technical Alliances',
                'description' => 'Technical Alliances & ROI. Partner with Jenkins Motorsports to test your products in the most extreme conditions. Join Morris Lubricants, LKQ, Equipment Hub, and more.',
                'image' => '/images/team_working_on_truck.jpg',
            ],
        ]);
    }
}
