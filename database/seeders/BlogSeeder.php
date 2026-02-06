<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use App\Models\Tag;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Clean up
        \Illuminate\Support\Facades\Schema::disableForeignKeyConstraints();
        DB::table('blog_post_tag')->truncate();
        BlogPost::truncate();
        Tag::truncate();
        \Illuminate\Support\Facades\Schema::enableForeignKeyConstraints();

        // 2. Create Tags
        $racingNews = Tag::create([
            'name' => 'Racing News',
            'slug' => 'racing-news'
        ]);

        $season2026 = Tag::create([
            'name' => 'Season 2026',
            'slug' => 'season-2026'
        ]);

        // 3. Create Blog Post with DIRECT public image paths (no storage copy)
        $content = <<<'MARKDOWN'
The air in the workshop is heavy. It smells of cold diesel, fresh Morris Lubricants, and anticipation. The winter silence is about to shatter.

For five months, the British Truck Racing Championship (BTRC) grid has been dormant. But in Stone, the lights haven't turned off. The 2026 season isn't just another entry in the logbook for Jenkins Motorsports; it is a complete strategic reset.

We closed the 2025 chapter with violence—a dominant, pole-to-flag victory at the Brands Hatch finale that reminded the entire paddock of one simple fact: When the #69 MAN TGX has clear air, it is untouchable. That win secured **3rd Overall in the Championship**, marking David Jenkins' fifth consecutive year finishing in the top tier.

For many teams, a five-year podium streak is a legacy. For Dave Jenkins, it's just fuel. The bronze medal is in the trophy cabinet, but the focus is squarely on the gold #1 plate.

![The Jenkins Motorsports #69 MAN TGX](/images/multiple_trucks_on_racing_tracks_3.jpg)

## **THE WINTER TEAR-DOWN: FINDING THE MARGINS**

In Division 1, you don't find seconds over the winter; you find milliseconds.

Following the 2025 finale, the "Man in Black" was stripped to its bare chassis. David Jenkins doesn't just drive this machine; as a master commercial vehicle technician, he understands its molecular structure.

The focus for the 2026 build hasn't just been brute horsepower—the **12-Litre MAN D26 engine** is already pushing the regulation limit at approximately 1,160 BHP. The focus has been on *efficiency* and *reliability*.

We have refined the cooling mapping for the water-cooled **Juratek braking system**, ensuring we can brake deeper into hairpins without risking thermal shock on the discs. We have optimized the low-end torque delivery to ensure that even with the mandated 2026 air restrictors, the #69 still launches off the line like a scalded cat.

![Team working in the workshop](/images/team_working_on_truck.jpg)

> *"We haven't reinvented the wheel this winter. We just made sure it turns faster, stops harder, and lasts longer than anyone else's."* — **David Jenkins**

## **THE LANDSCAPE: A WAR OF ATTRITION**

The 2026 Division 1 grid is the tightest aggregation of heavy-metal talent seen in a decade.

The reigning champion, Ryan Smith, returns with a massive target on the back of his Freightliner. The multi-time champion Stuart Oliver is hungry for redemption. The grid is full of young guns eager to make a name for themselves at the first corner.

But truck racing isn't just about who is fastest over one lap. It's a brutal, 34-race war of attrition. It’s about managing 5.5 tonnes of momentum while your tires are melting and your turbo is glowing white-hot. This is where experience matters. This is where the "Iron Man" of the BTRC thrives. David knows when to push, when to conserve, and exactly where to place the truck to make an overtake inevitable.

## **APRIL 4-5: THE AWAKENING AT BRANDS HATCH**

The waiting ends on Easter Weekend. The cathedral of speed, **Brands Hatch Indy**, hosts the season opener.

Five races. 48 hours. Maximum aggression.

The short, technical Indy circuit favors tactical precision over raw top speed. It is a circuit where David Jenkins has historically excelled. The truck is ready. The team is ready. The goal is simple: Leave Kent leading the championship.

The silence is over. It’s time to make some noise.

![Pack racing at Brands Hatch](/images/multiple_trucks_on_racing_tracks_2.jpg)

**Are you ready for the 2026 season? Follow us on social media for live updates from the pit lane at Round 1.**

**[ FOLLOW THE TEAM ]**
[Instagram](https://www.instagram.com/jenkinsmotorsportdevelopment/?__d=1) | [Facebook](https://web.facebook.com/jenkins.trucksport/)
MARKDOWN;

        $post = BlogPost::updateOrCreate(
            [
                'slug' => 'the-reset-why-2026-is-the-year-of-the-predator',
            ],
            [
                'title' => 'THE RESET: Why 2026 is the Year of the Predator',
                'excerpt' => 'The silence of the off-season is over. The war for the Division 1 title begins now. After five consecutive top-3 finishes, David Jenkins and the #69 MAN TGX are ready for the ultimate prize.',
                'content' => $content,
                'image_path' => '/images/dave_truck_on_racing_tracks_as_first_2.jpg', // Direct public path
                'is_featured' => true,
                'published_at' => now(),
                'author_id' => 1,
            ]
        );

        $post->tags()->attach([$racingNews->id, $season2026->id]);

        $this->command->info('Blog post seeded successfully!');
    }
}
