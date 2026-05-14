<?php

namespace Database\Seeders;

use App\Models\CareerResult;
use App\Models\ContentBlock;
use App\Models\Driver;
use App\Models\MediaAsset;
use App\Models\Partner;
use App\Models\PartnershipTier;
use App\Models\RaceEvent;
use App\Models\RaceResult;
use App\Models\Season;
use App\Models\SeasonContender;
use App\Models\SiteSetting;
use App\Models\Standing;
use App\Models\Tag;
use App\Models\Vehicle;
use App\Models\VehicleSpecification;
use Illuminate\Database\Seeder;

class MotorsportContentSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedDrivers();
        $this->seedSeasonsRaces();
        $this->seedStandingsAndContenders();
        $this->seedCareerResults();
        $this->seedPartnersAndTiers();
        $this->seedGalleryMedia();
        $this->seedVehicle();
        $this->seedSiteSettings();
        $this->seedContentBlocks();
    }

    private function seedDrivers(): void
    {
        $rows = [
            $this->driverRow('stuart-oliver', 'Stuart Oliver', 'Volvo VNL', false, 1, null, 'STUART OLIVER.jpg'),
            $this->driverRow('michael-oliver', 'Michael Oliver', 'MAN TGS', false, 2, null, 'MICHAEL OLIVER.jpg'),
            $this->driverRow('david-jenkins', 'David Jenkins', 'MAN TGX', true, 3, '69', 'DAVID JENKINS.png'),
            $this->driverRow('ryan-smith', 'Ryan Smith', 'Daimler Freightliner', false, 4, null, 'RYAN SMITH.png'),
            $this->driverRow('craig-reid', 'Craig Reid', 'MAN TGS', false, 5, null, 'CRAIG REID.jpg'),
            $this->driverRow('john-bowler', 'John Bowler', 'MAN TGX', false, 6, null, 'JOHN BOWLER.jpg'),
            $this->driverRow('neil-yates', 'Neil Yates', 'MAN TGS', false, 7, null, 'NEIL YATES.png'),
            $this->driverRow('richard-collett', 'Richard Collett', 'MAN TGS', false, 8, null, 'RICHARD COLLETT.jpg'),
            $this->driverRow('tom-orourke', 'Tom O\'Rourke', 'MAN TGS', false, 9, null, 'TOM O\'ROURKE.jpg'),
            $this->driverRow('steven-powell', 'Steven Powell', 'MAN TGS', false, 10, null, 'STEVEN POWELL.jpg'),
            $this->driverRow('simon-reid', 'Simon Reid', 'MAN TGS', false, 11, null, 'SIMON REID.png'),
            $this->driverRow('nathan-smith', 'Nathan Smith', 'MAN TGS', false, 12, null, 'NATHAN SMITH.jpg'),
            $this->driverRow('martin-gibson', 'Martin Gibson', 'MAN TGS', false, 13, null, null),
        ];

        foreach ($rows as $row) {
            Driver::query()->updateOrCreate(['slug' => $row['slug']], $row);
        }
    }

    /**
     * @param  string|null  $profileDiskFilename  Existing filename under storage/app/public/drivers.
     * @return array<string, mixed>
     */
    private function driverRow(
        string $slug,
        string $name,
        string $truckModel,
        bool $isTeamDriver,
        int $sortOrder,
        ?string $racingNumber = null,
        ?string $profileDiskFilename = null,
    ): array {
        $row = [
            'slug' => $slug,
            'name' => $name,
            'truck_model' => $truckModel,
            'is_team_driver' => $isTeamDriver,
            'sort_order' => $sortOrder,
            'profile_image_path' => $profileDiskFilename !== null && $profileDiskFilename !== ''
                ? 'drivers/'.$profileDiskFilename
                : null,
        ];

        if ($racingNumber !== null) {
            $row['racing_number'] = $racingNumber;
        }

        return $row;
    }

    private function seedSeasonsRaces(): void
    {
        $season = Season::query()->updateOrCreate(
            ['slug' => '2026-btrc'],
            [
                'year' => 2026,
                'title' => '2026 British Truck Racing Championship',
                'summary' => '7 Rounds. 34 Races. The pursuit of the #1 plate.',
                'is_active' => true,
                'objectives' => [
                    ['title' => 'Championship Reclamation', 'description' => 'Converting 2025\'s consistent podiums into 2026 race wins.', 'icon' => 'Trophy'],
                    ['title' => 'Technical Supremacy', 'description' => 'Utilizing the one-month gap between races for deep-data engine and transmission tear-downs.', 'icon' => 'Zap'],
                    ['title' => 'Partner ROI', 'description' => 'Delivering premium visibility for Morris Lubricants, LKQ, and Equipment Hub across UK and international rounds.', 'icon' => 'Users'],
                ],
                'previous_season_banner' => [
                    'eyebrow' => '2025 Season Result',
                    'title' => '3rd Place Overall — 413 Points',
                    'body' => 'A hard-fought campaign with consistent podium finishes. Now, the singular objective: reclaiming the Division 1 Title.',
                ],
                'meta' => [],
            ],
        );

        Season::query()->updateOrCreate(
            ['slug' => '2025-btrc'],
            [
                'year' => 2025,
                'title' => '2025 British Truck Racing Championship',
                'summary' => 'Final championship standings.',
                'is_active' => false,
            ],
        );

        $events = [
            ['event_code' => '01', 'title' => 'The Opener', 'date_display' => 'April 4–5', 'starts_at' => '2026-04-04 09:00:00', 'ends_at' => '2026-04-05 18:00:00', 'venue' => 'Brands Hatch (Indy)', 'country' => 'UK', 'rounds' => '1 – 5', 'description' => 'The high-contact season opener on Easter weekend. Five races in 48 hours — a brutal test of physical endurance and mechanical reliability.', 'highlight' => 'Easter Awakening', 'is_international' => false, 'feature_link' => null, 'sort_order' => 1],
            ['event_code' => '02', 'title' => 'High Speed', 'date_display' => 'May 16–17', 'starts_at' => '2026-05-16 09:00:00', 'ends_at' => '2026-05-17 18:00:00', 'venue' => 'Thruxton', 'country' => 'UK', 'rounds' => '6 – 10', 'description' => 'Britain\'s fastest circuit. The 5.5-tonne machines reach terminal velocity on the long straights, demanding phenomenal braking.', 'highlight' => null, 'is_international' => false, 'feature_link' => null, 'sort_order' => 2],
            ['event_code' => '03', 'title' => 'The Welsh Duel', 'date_display' => 'June 20–21', 'starts_at' => '2026-06-20 09:00:00', 'ends_at' => '2026-06-21 18:00:00', 'venue' => 'Pembrey', 'country' => 'Wales', 'rounds' => '11 – 15', 'description' => 'A technical circuit demanding precision and courage. The Welsh air carries the roar of 1,160 BHP through the valleys.', 'highlight' => null, 'is_international' => false, 'feature_link' => null, 'sort_order' => 3],
            ['event_code' => '04', 'title' => 'Summer Heat', 'date_display' => 'July 11–12', 'starts_at' => '2026-07-11 09:00:00', 'ends_at' => '2026-07-12 18:00:00', 'venue' => 'Snetterton 300', 'country' => 'UK', 'rounds' => '16 – 20', 'description' => 'A test of pure horsepower on the legendary Bentley Straight. Peak summer temperatures push cooling systems to their limits.', 'highlight' => null, 'is_international' => false, 'feature_link' => null, 'sort_order' => 4],
            ['event_code' => '05', 'title' => 'Flagship Weekend', 'date_display' => 'August 8–9', 'starts_at' => '2026-08-08 09:00:00', 'ends_at' => '2026-08-09 18:00:00', 'venue' => 'Donington Park', 'country' => 'UK', 'rounds' => '21 – 25', 'description' => 'Convoy in the Park. 100,000+ spectators. The crown jewel of British trucking — maximum pressure, maximum visibility.', 'highlight' => 'Convoy in the Park', 'is_international' => false, 'feature_link' => null, 'sort_order' => 5],
            ['event_code' => '06', 'title' => 'The International', 'date_display' => 'Sept 26–27', 'starts_at' => '2026-09-26 09:00:00', 'ends_at' => '2026-09-27 18:00:00', 'venue' => 'Le Mans, France', 'country' => 'France', 'rounds' => '26 – 29', 'description' => 'The championship heads to the iconic Circuit Bugatti. Racing in front of a massive European crowd, proving the Jenkins pedigree translates across borders.', 'highlight' => 'Road to France', 'is_international' => true, 'feature_link' => '/le-mans', 'sort_order' => 6],
            ['event_code' => '07', 'title' => 'The Grand Finale', 'date_display' => 'Oct 31 – Nov 1', 'starts_at' => '2026-10-31 09:00:00', 'ends_at' => '2026-11-01 18:00:00', 'venue' => 'Brands Hatch (Indy)', 'country' => 'UK', 'rounds' => '30 – 34', 'description' => 'Trucks & Fireworks. Halloween weekend. Where legends are made and championships are decided under the autumn lights.', 'highlight' => 'Title Decider', 'is_international' => false, 'feature_link' => null, 'sort_order' => 7],
        ];

        foreach ($events as $event) {
            RaceEvent::query()->updateOrCreate(
                ['season_id' => $season->id, 'event_code' => $event['event_code']],
                $event,
            );
        }
    }

    private function seedStandingsAndContenders(): void
    {
        $s2025 = Season::query()->where('slug', '2025-btrc')->first();
        $s2026 = Season::query()->where('slug', '2026-btrc')->first();

        if ($s2025) {
            $final2025 = [
                ['slug' => 'ryan-smith', 'rank' => 1, 'points' => 463, 'status' => 'final'],
                ['slug' => 'stuart-oliver', 'rank' => 2, 'points' => 428, 'status' => 'final'],
                ['slug' => 'david-jenkins', 'rank' => 3, 'points' => 413, 'status' => 'final'],
                ['slug' => 'john-bowler', 'rank' => 4, 'points' => 373, 'status' => 'final'],
                ['slug' => 'michael-oliver', 'rank' => 5, 'points' => 360, 'status' => 'final'],
                ['slug' => 'martin-gibson', 'rank' => 6, 'points' => 337, 'status' => 'final'],
            ];
            foreach ($final2025 as $row) {
                $driver = Driver::query()->where('slug', $row['slug'])->first();
                if ($driver) {
                    Standing::query()->updateOrCreate(
                        ['season_id' => $s2025->id, 'driver_id' => $driver->id],
                        [
                            'rank' => $row['rank'],
                            'points' => $row['points'],
                            'division' => 'BTRC Division 1',
                            'status' => $row['status'],
                        ],
                    );
                }
            }
        }

        if ($s2026) {
            $entry2026 = [
                ['slug' => 'stuart-oliver', 'rank' => 1, 'points' => 78, 'status' => 'provisional'],
                ['slug' => 'michael-oliver', 'rank' => 2, 'points' => 78, 'status' => 'provisional'],
                ['slug' => 'david-jenkins', 'rank' => 3, 'points' => 76, 'status' => 'provisional'],
                ['slug' => 'ryan-smith', 'rank' => 4, 'points' => 75, 'status' => 'provisional'],
                ['slug' => 'craig-reid', 'rank' => 5, 'points' => 56, 'status' => 'provisional'],
                ['slug' => 'john-bowler', 'rank' => 6, 'points' => 54, 'status' => 'provisional'],
                ['slug' => 'neil-yates', 'rank' => 7, 'points' => 53, 'status' => 'provisional'],
                ['slug' => 'richard-collett', 'rank' => 8, 'points' => 45, 'status' => 'provisional'],
                ['slug' => 'tom-orourke', 'rank' => 9, 'points' => 45, 'status' => 'provisional'],
                ['slug' => 'steven-powell', 'rank' => 10, 'points' => 43, 'status' => 'provisional'],
                ['slug' => 'nathan-smith', 'rank' => 11, 'points' => 38, 'status' => 'provisional'],
                ['slug' => 'simon-reid', 'rank' => 12, 'points' => 16, 'status' => 'provisional'],
            ];
            $seeded2026DriverIds = [];
            foreach ($entry2026 as $row) {
                $driver = Driver::query()->where('slug', $row['slug'])->first();
                if ($driver) {
                    $seeded2026DriverIds[] = $driver->id;

                    Standing::query()->updateOrCreate(
                        ['season_id' => $s2026->id, 'driver_id' => $driver->id],
                        [
                            'rank' => $row['rank'],
                            'points' => $row['points'],
                            'division' => 'BTRC Division 1',
                            'status' => $row['status'],
                        ],
                    );
                }
            }

            Standing::query()
                ->where('season_id', $s2026->id)
                ->where('division', 'BTRC Division 1')
                ->whereNotIn('driver_id', $seeded2026DriverIds)
                ->delete();

            $contenders = [
                ['driver_slug' => 'ryan-smith', 'subtitle' => 'Chasing a record 11th title', 'threat' => 'extreme', 'sort_order' => 1],
                ['driver_slug' => 'stuart-oliver', 'subtitle' => 'The 10-time veteran rival', 'threat' => 'high', 'sort_order' => 2],
                ['driver_slug' => 'david-jenkins', 'subtitle' => 'The tactical "Apex Predator"', 'threat' => 'jenkins', 'sort_order' => 3],
                ['driver_slug' => 'michael-oliver', 'subtitle' => 'The rising force in the Oliver dynasty', 'threat' => 'high', 'sort_order' => 4],
            ];
            foreach ($contenders as $c) {
                $driver = Driver::query()->where('slug', $c['driver_slug'])->first();
                if ($driver === null) {
                    continue;
                }

                SeasonContender::query()->updateOrCreate(
                    ['season_id' => $s2026->id, 'driver_id' => $driver->id],
                    [
                        'name' => $driver->name,
                        'subtitle' => $c['subtitle'],
                        'threat_level' => $c['threat'],
                        'sort_order' => $c['sort_order'],
                    ],
                );
            }

            $firstEvent = RaceEvent::query()
                ->where('season_id', $s2026->id)
                ->orderBy('sort_order')
                ->first();
            if ($firstEvent !== null) {
                $ryan = Driver::query()->where('slug', 'ryan-smith')->first();
                $dave = Driver::query()->where('slug', 'david-jenkins')->first();
                if ($ryan !== null) {
                    RaceResult::query()->updateOrCreate(
                        ['race_event_id' => $firstEvent->id, 'driver_id' => $ryan->id],
                        [
                            'division' => 'BTRC Division 1',
                            'position' => 1,
                            'points' => 25,
                            'status' => 'finished',
                        ],
                    );
                }
                if ($dave !== null) {
                    RaceResult::query()->updateOrCreate(
                        ['race_event_id' => $firstEvent->id, 'driver_id' => $dave->id],
                        [
                            'division' => 'BTRC Division 1',
                            'position' => 3,
                            'points' => 18,
                            'status' => 'finished',
                        ],
                    );
                }
            }
        }
    }

    private function seedCareerResults(): void
    {
        $rows = [
            ['year' => '2025', 'result' => '3rd Overall', 'division' => 'BTRC Division 1', 'is_highlight' => false, 'sort_order' => 6],
            ['year' => '2024', 'result' => '3rd Overall', 'division' => 'BTRC Division 1', 'is_highlight' => false, 'sort_order' => 5],
            ['year' => '2023', 'result' => '3rd Overall', 'division' => 'BTRC Division 1', 'is_highlight' => false, 'sort_order' => 4],
            ['year' => '2022', 'result' => 'Runner-Up', 'division' => 'BTRC Division 1', 'is_highlight' => false, 'sort_order' => 3],
            ['year' => '2021', 'result' => 'Runner-Up', 'division' => 'BTRC Division 1', 'is_highlight' => false, 'sort_order' => 2],
            ['year' => '2011', 'result' => 'BRITISH CHAMPION', 'division' => 'Division 1', 'is_highlight' => true, 'sort_order' => 1],
        ];

        foreach ($rows as $row) {
            CareerResult::query()->updateOrCreate(
                ['year' => $row['year']],
                $row,
            );
        }
    }

    private function seedPartnersAndTiers(): void
    {
        $partners = [
            ['slug' => 'lkq-uk-ireland', 'name' => 'LKQ UK and Ireland', 'role' => 'A group of four market-leading businesses', 'description' => 'Driving excellence in parts, equipment and training across automotive, leisure and marine sectors. LKQ UK and Ireland provides Jenkins Motorsports with a seamless, high-velocity supply chain, testing high-performance components under the extreme thermal and mechanical loads of Division 1 racing.', 'technical_fact' => 'Supply chain velocity tested: <12h turnaround for critical race-spec components.', 'logo_path' => '/images/LKQ_white.webp', 'image_path' => '/images/team_working_on_truck.jpg', 'url' => 'https://ukandireland.lkqeurope.com/', 'theme' => ['glow' => 'from-blue-600 to-blue-400/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-blue-600'], 'sort_order' => 1],
            ['slug' => 'morris-lubricants', 'name' => 'Morris Lubricants', 'role' => 'The Chemical Edge', 'description' => 'For over a decade, Jenkins Motorsports has been a primary development partner, testing high-performance oils like the Versimax range.', 'technical_fact' => 'Tested to 140°C engine temperatures to ensure thermal stability under maximum load.', 'logo_path' => '/images/morris_lubricant_logo.jpg', 'image_path' => '/images/morris_lubricant.jpg', 'url' => 'https://www.morrislubricants.co.uk/', 'theme' => ['glow' => 'from-primary to-primary/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-primary'], 'sort_order' => 2],
            ['slug' => 'equipment-hub', 'name' => 'Equipment Hub Ltd', 'role' => 'Precision Procurement for Global Projects', 'description' => 'Equipment Hub Ltd specializes in the procurement and supply of heavy equipment for international engineering and construction projects. This alliance bridges the gap between elite heavy-duty motorsport and the global machinery sector, utilizing the #69 MAN TGX as a flagship for industrial reliability and power.', 'technical_fact' => 'Heavy equipment sourcing network spans 3 continents for project-critical machinery.', 'logo_path' => '/images/Equipment Hub Logo With Text Color White.png', 'image_path' => '/images/exploring-the-abandoned-machinery-and-vehicles-at-2025-10-06-13-42-12-utc.jpg', 'url' => 'https://equipmenthub.ltd/', 'theme' => ['glow' => 'from-blue-600 to-blue-400/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-blue-600'], 'sort_order' => 3],
            ['slug' => 'stan-robinson', 'name' => 'Stan Robinson', 'role' => 'Logistics & Supply Chain Partner', 'description' => 'One of the UK\'s most respected family-owned hauliers. Our partnership with Stan Robinson ensures that the team\'s logistical operations run with the same precision as our race strategy.', 'technical_fact' => 'Network efficiency ensures 100% on-time delivery for race-critical infrastructure.', 'logo_path' => '/images/stan logo.png', 'image_path' => '/images/Stan-50-anni-wagons.jpg', 'url' => 'https://www.stanrobinson.com/', 'theme' => ['glow' => 'from-red-600 to-red-400/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-red-600'], 'sort_order' => 4],
            ['slug' => 'weaver-haulage', 'name' => 'Weaver Haulage', 'role' => 'Strategic Haulage Partner', 'description' => 'Experts in aggregates and heavy haulage. Weaver Haulage\'s support provides the foundation for our transport logistics, mirroring the rugged durability required in truck racing.', 'technical_fact' => 'Specialized fleet capabilities supporting heavy-duty team logistics.', 'logo_path' => '/images/weaver logo wh.png', 'image_path' => '/images/weaver_tanker.jpg', 'url' => 'https://www.weaverhaulage.com/', 'theme' => ['glow' => 'from-orange-600 to-orange-400/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-orange-600'], 'sort_order' => 5],
            ['slug' => 'ped-solution-studios', 'name' => 'PED Solution Studios', 'role' => 'Digital & Technology Partner', 'description' => 'PED Solution Studios powers the digital presence of Jenkins Motorsports, delivering high-performance web solutions and fan engagement platforms. Just as we engineer for the track, PED engineers for the digital world.', 'technical_fact' => 'Precision-engineered digital architecture for maximum user engagement and speed.', 'logo_path' => '/images/ped-logo-transparent-white.png', 'image_path' => '/images/ped_solution_studios_background.jpg', 'url' => 'https://pedsolution.com', 'theme' => ['glow' => 'from-purple-600 to-purple-400/50', 'iconBg' => 'bg-transparent', 'iconText' => '', 'bar' => 'bg-purple-600'], 'sort_order' => 6],
        ];

        foreach ($partners as $p) {
            Partner::query()->updateOrCreate(['slug' => $p['slug']], array_merge($p, ['is_active' => true]));
        }

        $tiers = [
            ['slug' => 'title-legacy-partner', 'name' => 'Title Legacy Partner', 'impact' => 'Global Brand Alignment', 'benefits' => ['Primary real estate on Blue/Black/Red livery', 'Featured in "Road to Le Mans" docu-series', '20 VIP hospitality passes for "Convoy in the Park"', 'Title naming rights'], 'cta_label' => 'Inquire', 'cta_link' => '/contact?tier=title', 'is_highlighted' => true, 'sort_order' => 1],
            ['slug' => 'technical-innovation-partner', 'name' => 'Technical Innovation Partner', 'impact' => 'R&D & Product Authority', 'benefits' => ['Collaborative case studies & "Tested by Jenkins" branding', 'Product display space in mobile workshop', 'Direct access to haulage network', 'Social media technical breakdowns'], 'cta_label' => 'Inquire', 'cta_link' => '/contact?tier=technical', 'is_highlighted' => false, 'sort_order' => 2],
            ['slug' => 'associate-partner', 'name' => 'Associate Partner', 'impact' => 'Strategic Placement', 'benefits' => ['Logo integration on rear aero-fins & driver suit', '5 VIP passes per season', 'Invitation to annual "Season Review" gala', 'Digital race report mentions'], 'cta_label' => 'Inquire', 'cta_link' => '/contact?tier=primary', 'is_highlighted' => false, 'sort_order' => 3],
        ];

        foreach ($tiers as $t) {
            PartnershipTier::query()->updateOrCreate(['slug' => $t['slug']], $t);
        }
    }

    private function seedGalleryMedia(): void
    {
        $season2026Id = Season::query()->where('slug', '2026-btrc')->value('id');

        $galleryTags = [
            ['name' => 'BTRC', 'slug' => 'btrc'],
            ['name' => 'Brands Hatch', 'slug' => 'brands-hatch'],
            ['name' => 'Donington Park', 'slug' => 'donington-park'],
            ['name' => 'Division 1', 'slug' => 'division-1'],
            ['name' => 'Workshop', 'slug' => 'workshop'],
            ['name' => 'Stone', 'slug' => 'stone'],
            ['name' => 'Paddock', 'slug' => 'paddock'],
            ['name' => 'Legacy', 'slug' => 'legacy'],
            ['name' => 'Champion', 'slug' => 'champion'],
            ['name' => 'Podium', 'slug' => 'podium'],
            ['name' => 'Fans', 'slug' => 'fans'],
        ];

        foreach ($galleryTags as $tagRow) {
            Tag::query()->updateOrCreate(
                ['slug' => $tagRow['slug']],
                ['name' => $tagRow['name']],
            );
        }

        $gallery = [
            ['slug' => 'gallery-brands-victory', 'path' => '/images/dave_truck_on_racing_tracks_as_first.jpg', 'alt' => 'David Jenkins taking the chequered flag', 'category' => 'track', 'caption' => 'Victory at Brands Hatch – The #69 MAN crosses the line first.', 'featured' => true, 'sort_order' => 1, 'taken_at' => '2025-04-06 16:30:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'brands-hatch', 'division-1', 'podium']],
            ['slug' => 'gallery-track-brands', 'path' => '/images/dave_truck_on_racing_tracks_2.jpg', 'alt' => 'The #69 MAN on track', 'category' => 'track', 'caption' => 'Full throttle through the Brands Hatch complex.', 'featured' => false, 'sort_order' => 2, 'taken_at' => '2025-04-05 11:00:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'brands-hatch']],
            ['slug' => 'gallery-donington-lead', 'path' => '/images/dave_truck_on_racing_tracks_as_first_2.jpg', 'alt' => 'Leading the pack', 'category' => 'track', 'caption' => 'Dominating the field at Donington Park.', 'featured' => false, 'sort_order' => 3, 'taken_at' => '2024-08-10 14:20:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'donington-park', 'division-1']],
            ['slug' => 'gallery-pack-racing', 'path' => '/images/multiple_trucks_on_racing_tracks_2.jpg', 'alt' => 'Pack racing action', 'category' => 'track', 'caption' => 'Wheel-to-wheel combat in Division 1.', 'featured' => false, 'sort_order' => 4, 'taken_at' => '2024-07-14 15:00:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'division-1']],
            ['slug' => 'gallery-overtake', 'path' => '/images/dave_truck_passing_another_truck.jpg', 'alt' => 'Overtaking maneuver', 'category' => 'track', 'caption' => 'Precision overtake under braking.', 'featured' => false, 'sort_order' => 5, 'taken_at' => '2024-06-22 13:45:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'division-1']],
            ['slug' => 'gallery-three-wide', 'path' => '/images/three_trucks_on_racing_tracks.jpg', 'alt' => 'Three trucks battling', 'category' => 'track', 'caption' => 'The heat of battle – three abreast into the corner.', 'featured' => false, 'sort_order' => 6, 'taken_at' => '2024-05-18 12:10:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'division-1']],
            ['slug' => 'gallery-aerial', 'path' => '/images/dave_truck_overhead_shot_on_tracks.jpg', 'alt' => 'Aerial view of the #69', 'category' => 'track', 'caption' => 'The Blue and Black livery from above.', 'featured' => false, 'sort_order' => 7, 'taken_at' => '2024-04-07 10:00:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'brands-hatch']],
            ['slug' => 'gallery-side-by-side', 'path' => '/images/two_trucks_racing_1.jpg', 'alt' => 'Side by side racing', 'category' => 'track', 'caption' => 'No quarter given – side by side at 100mph.', 'featured' => false, 'sort_order' => 8, 'taken_at' => '2023-09-24 16:00:00', 'season_id' => $season2026Id, 'tags' => ['btrc', 'division-1']],
            ['slug' => 'gallery-workshop', 'path' => '/images/team_working_on_truck.jpg', 'alt' => 'Team working on the MAN TGX', 'category' => 'workshop', 'caption' => 'The Stone workshop – where championships are built.', 'featured' => true, 'sort_order' => 9, 'taken_at' => '2025-03-01 09:00:00', 'season_id' => $season2026Id, 'tags' => ['workshop', 'stone']],
            ['slug' => 'gallery-cockpit', 'path' => '/images/dave_taking_picture_with_truck.jpg', 'alt' => 'David with the #69 MAN', 'category' => 'cockpit', 'caption' => 'The pilot and his machine – a 25-year partnership.', 'featured' => true, 'sort_order' => 10, 'taken_at' => '2025-04-04 08:30:00', 'season_id' => $season2026Id, 'tags' => ['paddock', 'btrc']],
            ['slug' => 'gallery-tony-truck', 'path' => '/images/tony_jenkins_championship_truck.jpg', 'alt' => 'Tony Jenkins championship truck', 'category' => 'legacy', 'caption' => '1984 – Where the legacy began. Tony Jenkins\' pioneering rig.', 'featured' => true, 'sort_order' => 11, 'taken_at' => '1984-09-15 11:00:00', 'season_id' => null, 'tags' => ['legacy']],
            ['slug' => 'gallery-trophy-lift', 'path' => '/images/dave_standing_and_lifting_trophy.jpg', 'alt' => 'David lifting the championship trophy', 'category' => 'legacy', 'caption' => '2011 – The moment of glory. Division 1 Champion.', 'featured' => false, 'sort_order' => 12, 'taken_at' => '2011-10-02 17:45:00', 'season_id' => null, 'tags' => ['legacy', 'champion', 'podium']],
            ['slug' => 'gallery-podium-group', 'path' => '/images/dave_standing_and_lifting_trophy_as_first_with_the_other_winners.jpg', 'alt' => 'Podium celebration', 'category' => 'legacy', 'caption' => 'Standing tall among champions.', 'featured' => false, 'sort_order' => 13, 'taken_at' => '2022-10-03 14:00:00', 'season_id' => null, 'tags' => ['legacy', 'podium']],
            ['slug' => 'gallery-champagne', 'path' => '/images/dave_popping_a_shampaign_for_winnign_a_race.jpg', 'alt' => 'Champagne celebration', 'category' => 'legacy', 'caption' => 'The taste of victory – champagne on the podium.', 'featured' => false, 'sort_order' => 14, 'taken_at' => '2023-07-09 18:30:00', 'season_id' => $season2026Id, 'tags' => ['podium', 'btrc']],
            ['slug' => 'gallery-podium-spray', 'path' => '/images/dave_standing_on_podium_popping_shampaign_as_first.jpg', 'alt' => 'Podium champagne spray', 'category' => 'legacy', 'caption' => 'First place celebrations.', 'featured' => false, 'sort_order' => 15, 'taken_at' => '2023-05-07 17:15:00', 'season_id' => $season2026Id, 'tags' => ['podium']],
            ['slug' => 'gallery-autograph', 'path' => '/images/dave_signing_autograph.jpg', 'alt' => 'David signing autographs', 'category' => 'legacy', 'caption' => 'Connecting with the fans – the human side of racing.', 'featured' => false, 'sort_order' => 16, 'taken_at' => '2024-08-09 13:20:00', 'season_id' => $season2026Id, 'tags' => ['fans', 'paddock']],
        ];

        foreach ($gallery as $g) {
            $tagSlugs = $g['tags'];
            $attributes = $g;
            unset($attributes['tags']);

            $asset = MediaAsset::query()->updateOrCreate(
                ['slug' => $g['slug']],
                array_merge($attributes, ['media_type' => 'image', 'title' => $g['alt']]),
            );

            $tagIds = Tag::query()->whereIn('slug', $tagSlugs)->pluck('id')->all();
            $asset->tags()->sync($tagIds);
        }

        MediaAsset::query()->updateOrCreate(
            ['slug' => 'gallery-featured-video'],
            [
                'title' => 'Gallery featured video',
                'alt' => 'Jenkins Motorsport highlight',
                'path' => null,
                'url' => 'https://www.youtube.com/embed/r0DeCHtDJAk',
                'media_type' => 'video',
                'category' => 'gallery',
                'featured' => false,
                'sort_order' => 100,
            ],
        );
    }

    private function seedVehicle(): void
    {
        $vehicle = Vehicle::query()->updateOrCreate(
            ['slug' => 'man-tgx-69'],
            [
                'name' => '#69 MAN TGX',
                'racing_number' => '69',
                'hero_image_path' => '/images/dave_truck_on_racing_tracks_2.jpg',
                'description' => 'Built & Driven by Dave Jenkins. Handcrafted in Stone, Staffordshire.',
            ],
        );

        $specs = [
            ['label' => 'Engine', 'value' => 'MAN D26 Six-Cylinder Diesel Turbocharged', 'icon_key' => 'Zap', 'sort_order' => 1],
            ['label' => 'Displacement', 'value' => '12.4 Litres', 'icon_key' => 'Gauge', 'sort_order' => 2],
            ['label' => 'Power Output', 'value' => '1,160 BHP (Tested)', 'icon_key' => 'Activity', 'sort_order' => 3],
            ['label' => 'Transmission', 'value' => 'ZF Manual 16-Speed Synchromesh', 'icon_key' => 'Cog', 'sort_order' => 4],
            ['label' => 'Weight', 'value' => '5,500 kg (Regulation Minimum)', 'icon_key' => 'Scale', 'sort_order' => 5],
            ['label' => 'Axle Setup', 'value' => 'MD106 / MD107 with SYN2001K / SYN2002K', 'icon_key' => 'Settings', 'sort_order' => 6],
        ];

        foreach ($specs as $s) {
            VehicleSpecification::query()->updateOrCreate(
                ['vehicle_id' => $vehicle->id, 'label' => $s['label']],
                $s,
            );
        }
    }

    private function seedSiteSettings(): void
    {
        SiteSetting::setValue('nav_links', [
            ['name' => 'The Beast', 'href' => '/the-machine', 'external' => false],
            ['name' => 'Legacy', 'href' => '/legacy', 'external' => false],
            ['name' => 'Partners', 'href' => '/partners', 'external' => false],
            [
                'label' => 'Season',
                'items' => [
                    ['name' => 'Season 2026', 'href' => '/season', 'external' => false],
                    ['name' => 'Championship', 'href' => '/championship', 'external' => false],
                ],
            ],
            ['name' => 'Le Mans', 'href' => '/le-mans', 'external' => false],
            [
                'label' => 'Media',
                'items' => [
                    ['name' => 'Gallery', 'href' => '/gallery', 'external' => false],
                    ['name' => 'Paddock Pass', 'href' => '/blog', 'external' => false],
                ],
            ],
            ['name' => 'Shop', 'href' => config('motorsport.shop_url') ?: '/', 'external' => true],
        ]);

        SiteSetting::setValue('social', [
            'facebook' => 'https://www.facebook.com/jenkins.trucksport/',
            'instagram' => 'https://www.instagram.com/jenkinsmotorsportdevelopment/',
        ]);

        SiteSetting::setValue('contact', [
            'address_lines' => ['Wood Farm, Stone Aston Estate,', 'Stafford, Staffordshire,', 'ST18 9SD, United Kingdom'],
            'emails' => [
                ['label' => 'GENERAL', 'address' => 'info@jenkinstrucksports.com'],
                ['label' => 'SPONSORSHIP', 'address' => 'partner@jenkinstrucksports.com'],
                ['label' => 'PRESS', 'address' => 'press@jenkinstrucksports.com'],
            ],
            'phone_e164' => '+447907777177',
            'phone_display' => '+44 7907 777177',
            'press_blurb' => 'For media accreditation, interview requests, and high-res asset access, please contact our press office directly.',
        ]);

        SiteSetting::setValue('home.hero_video_embed_url', 'https://www.youtube.com/embed/-jiZDvSDv8Y?autoplay=1&mute=1&loop=1&playlist=-jiZDvSDv8Y&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3');

        SiteSetting::setValue('home.countdown_fallback_iso', '2027-04-01T09:00:00');

        SiteSetting::setValue('home.headline_stats', [
            ['value' => '1,160', 'unit' => 'BHP', 'label' => 'Engine Output'],
            ['value' => '5,500', 'unit' => 'Nm', 'label' => 'Torque Peak'],
        ]);

        SiteSetting::setValue('footer.developer_credit', [
            'label' => 'Developed by PED Solution Studios',
            'url' => 'https://pedsolution.com',
        ]);
    }

    private function seedContentBlocks(): void
    {
        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'legacy', 'block_key' => 'timeline'],
            [
                'sort_order' => 1,
                'payload' => [
                    'sections' => [
                        [
                            'year' => '1984',
                            'title' => 'The Big Bang',
                            'subTitle' => 'Tony Jenkins & The Dawn of Heavy Metal',
                            'image' => '/images/tony_jenkins_championship_truck.jpg',
                            'filterClass' => 'grayscale contrast-125',
                            'themeColor' => 'white',
                            'align' => 'left',
                            'paragraphs' => [
                                'In September 1984, the British Truck Racing Association (BTRA) was born out of a dare at Donington Park. Tony Jenkins was one of the few who saw the future. Standing on that inaugural grid among 80,000 stunned fans, Tony helped turn a spectacle into a sport.',
                            ],
                            'listItems' => [
                                ['icon' => 'Clock', 'content' => 'The Pioneer’s Rig: No racing gearboxes. No water-cooled brakes. Just double-declutching and mechanical intuition to prevent 5-tonne machines from overshooting corners at 100mph.'],
                                ['icon' => 'Flag', 'content' => 'The Apprentice: An eight-year-old David Jenkins watched from the pits, absorbing the smell of hot diesel. This was the foundation of the mechanical molecularity that defines his engineering today.'],
                            ],
                        ],
                        [
                            'year' => '1997',
                            'title' => 'The Forge',
                            'subTitle' => 'From Repairing to Engineering',
                            'image' => '/images/team_working_on_truck.jpg',
                            'filterClass' => 'sepia-[.3] contrast-125 brightness-75',
                            'themeColor' => 'white',
                            'align' => 'right',
                            'paragraphs' => [
                                'David Jenkins didn\'t just inherit a seat; he earned it by restoring his father’s old fleet. His 1997 debut at Donington ended in a frame-twisting wreck, but instead of quitting, he went back to the workshop in Stone.',
                            ],
                            'callout' => [
                                'title' => 'The Builder Era',
                                'body' => 'Over the next decade, the team transitioned from "repairing" to "developing." Using his background as a professional technician, David built the team\'s first bespoke racing chassis, moving away from modified road units to specialized Division 1 titans.',
                            ],
                        ],
                        [
                            'year' => '2011',
                            'title' => 'The Zenith',
                            'subTitle' => 'Division 1 Champions',
                            'image' => '/images/dave_standing_and_lifting_trophy.jpg',
                            'filterClass' => '',
                            'themeColor' => 'jenkins-gold',
                            'align' => 'left',
                            'paragraphs' => [
                                'The 2011 season remains etched in history. After 14 years of refining his craft, David Jenkins secured the Division 1 British Truck Racing Championship Title.',
                                'This victory validated forty years of the Jenkins name. It proved that a family-run, technician-led team could out-engineer factory-backed efforts through superior tactical driving and mechanical precision.',
                            ],
                            'badge' => 'Champion Status Verified',
                        ],
                        [
                            'year' => '2026',
                            'title' => 'The Pinnacle',
                            'subTitle' => 'Chasing the Final Tenths',
                            'image' => '/images/dave_truck_on_racing_tracks_as_first.jpg',
                            'filterClass' => 'saturate-150 contrast-110',
                            'themeColor' => 'primary',
                            'align' => 'right',
                            'paragraphs' => [
                                'Today, the #69 MAN TGX is a digital ghost of Tony’s 1984 rig. With a 3rd Place overall finish in 2025 and over 25 years of continuous competition data, we aren\'t just racing against the grid; we are racing against our own history.',
                            ],
                            'stats' => [
                                ['value' => '25+', 'label' => 'Years on Grid'],
                                ['value' => '#3', 'label' => '2025 Rank'],
                            ],
                        ],
                    ],
                ],
            ],
        );

        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'legacy', 'block_key' => 'fact_check_rows'],
            [
                'sort_order' => 2,
                'payload' => [
                    'rows' => [
                        ['info' => 'BTRA Founding', 'status' => 'Verified', 'detail' => 'Founded in 1984; inaugural race at Donington Park.'],
                        ['info' => 'Tony Jenkins', 'status' => 'Verified', 'detail' => 'Pioneer driver on the 1984 grid; sparked David\'s career.'],
                        ['info' => 'David\'s Tenure', 'status' => 'Verified', 'detail' => 'Officially celebrated 25 consecutive years in BTRC.'],
                        ['info' => '2011 Title', 'status' => 'Verified', 'detail' => 'David Jenkins won the Division 1 Championship in 2011.'],
                        ['info' => '2025 Result', 'status' => 'Verified', 'detail' => '3rd Place Overall finish in the 2025 season.'],
                    ],
                ],
            ],
        );

        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'le-mans', 'block_key' => 'journey_locations'],
            [
                'sort_order' => 1,
                'payload' => [
                    'locations' => [
                        [
                            'id' => 'workshop',
                            'name' => 'The Workshop',
                            'city' => 'STONE',
                            'icon' => 'Wrench',
                            'color' => 'text-primary',
                            'position' => 0,
                            'tasks' => [
                                'Complete engine diagnostics & tear-down',
                                'Pack specialized ZF gearbox components',
                                'Prepare pressurized water-cooling tanks',
                                'Load mobile workshop equipment',
                                'Final chassis inspection & sign-off',
                            ],
                            'description' => 'The Stone, Staffordshire workshop transforms into a command center. Every component is checked, documented, and prepared for the 24-hour journey.',
                        ],
                        [
                            'id' => 'ferry',
                            'name' => 'The Channel',
                            'city' => 'DOVER → CALAIS',
                            'icon' => 'Ship',
                            'color' => 'text-blue-400',
                            'position' => 40,
                            'tasks' => [
                                'Customs documentation clearance',
                                'Technical equipment manifests',
                                'International racing permits',
                                'Vehicle weight certification',
                                '24-hour transit coordination',
                            ],
                            'description' => 'The #69 MAN, mobile workshop, and hospitality suite are loaded onto specialized haulers for the crossing. Precision documentation ensures smooth border transitions.',
                        ],
                        [
                            'id' => 'track',
                            'name' => 'The Track',
                            'city' => 'LE MANS',
                            'icon' => 'Flag',
                            'color' => 'text-destructive',
                            'position' => 100,
                            'tasks' => [
                                'Erect Jenkins "Village" compound',
                                'Set up engine tear-down environment',
                                'Calibrate water-spray cooling system',
                                'Coordinate with Giti Tire technicians',
                                'Prepare B2B hospitality suite',
                            ],
                            'description' => 'At Circuit Bugatti, the Jenkins footprint rises — a high-tech compound designed to host international partners and provide race-ready infrastructure.',
                        ],
                    ],
                ],
            ],
        );

        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'le-mans', 'block_key' => 'circuit_features'],
            [
                'sort_order' => 2,
                'payload' => [
                    'items' => [
                        ['name' => 'Dunlop Curve', 'description' => 'The legendary high-speed sweeper requiring precise throttle control through the apex.'],
                        ['name' => 'Chicane de la Chapelle', 'description' => 'Heavy braking zone demanding maximum water-spray cooling to prevent brake fade.'],
                        ['name' => 'Continental Tarmac', 'description' => 'Wide, high-grip surface allowing for 5-wide racing into corners — unlike anything in the UK.'],
                    ],
                ],
            ],
        );

        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'le-mans', 'block_key' => 'technical_focus'],
            [
                'sort_order' => 3,
                'payload' => [
                    'items' => [
                        ['icon' => 'Droplets', 'title' => 'Max-Flow Radiator', 'description' => 'Increased water-spray capacity for Juratek discs to combat extreme thermal energy in Bugatti\'s heavy braking zones.', 'color' => 'text-blue-400'],
                        ['icon' => 'Thermometer', 'title' => 'Heat Management', 'description' => 'September heat requires aggressive cooling strategies. Ambient temperature is the difference between podium and DNF.', 'color' => 'text-orange-400'],
                        ['icon' => 'Settings', 'title' => 'Tire Pressure Calibration', 'description' => 'Giti Tire technicians work alongside David to adjust pressures for higher track temperatures — preventing "cooked" rubber.', 'color' => 'text-primary'],
                    ],
                ],
            ],
        );

        ContentBlock::query()->updateOrCreate(
            ['page_slug' => 'le-mans', 'block_key' => 'event_schema'],
            [
                'sort_order' => 4,
                'payload' => [
                    '@context' => 'https://schema.org',
                    '@type' => 'SportsEvent',
                    'name' => '24 Heures Camions 2026',
                    'startDate' => '2026-09-26',
                    'endDate' => '2026-09-27',
                    'eventStatus' => 'https://schema.org/EventScheduled',
                    'location' => [
                        '@type' => 'Place',
                        'name' => 'Circuit Bugatti',
                        'address' => [
                            '@type' => 'PostalAddress',
                            'addressLocality' => 'Le Mans',
                            'addressCountry' => 'FR',
                        ],
                    ],
                    'performer' => [
                        '@type' => 'SportsTeam',
                        'name' => 'Jenkins Motorsports',
                    ],
                    'description' => 'The French round of the British Truck Racing Championship and 24 Heures Camions at Le Mans.',
                ],
            ],
        );
    }
}
