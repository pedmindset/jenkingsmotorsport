@php
    use App\Filament\Resources\BlogPosts\BlogPostResource;
    use App\Filament\Resources\RaceEvents\RaceEventResource;
    use App\Filament\Resources\Seasons\SeasonResource;

    $season = $this->getActiveSeason();
    $next = $this->getNextRaceEvent();
    $progress = $this->getSeasonScheduleProgress();
    $upcoming = $this->getUpcomingEventsCount();
@endphp

<x-filament-widgets::widget>
    <x-filament::section class="relative overflow-hidden">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex min-w-0 flex-1 items-center gap-x-4">
                <div
                    class="shrink-0 rounded-lg bg-primary-600 p-3 text-white shadow-lg shadow-primary-500/20 dark:bg-primary-500">
                    <x-heroicon-m-bolt class="h-8 w-8" />
                </div>

                <div class="min-w-0 flex-1">
                    {{-- Avoid raw h2: panel injects global h1–h6 styles that fight custom widget layout --}}
                    <p
                        class="text-xl font-bold tracking-tight text-gray-950 dark:text-white"
                        style="font-family: 'Saira', sans-serif; text-transform: uppercase;">
                        Command center
                    </p>
                    <p class="mt-1 text-sm italic text-gray-500 dark:text-gray-400">
                        "{{ $this->getMotto() }}"
                    </p>
                </div>
            </div>

            <div class="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                <x-filament::button :href="SeasonResource::getUrl('index')" tag="a" color="gray" size="sm"
                    icon="heroicon-m-flag">
                    Seasons
                </x-filament::button>
                <x-filament::button :href="RaceEventResource::getUrl('index')" tag="a" color="gray" size="sm"
                    icon="heroicon-m-map-pin">
                    Race events
                </x-filament::button>
                <x-filament::button :href="BlogPostResource::getUrl('index')" tag="a" color="gray" size="sm"
                    icon="heroicon-m-document-text">
                    Blog
                </x-filament::button>
                <x-filament::button href="/" tag="a" target="_blank" color="gray"
                    icon="heroicon-m-arrow-top-right-on-square" size="sm">
                    Live site
                </x-filament::button>
            </div>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
                class="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Active season
                </span>
                @if ($season)
                    <p class="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {{ $season->year }} — {{ \Illuminate\Support\Str::limit($season->title, 36) }}
                    </p>
                @else
                    <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
                        No season is marked active
                    </p>
                @endif
            </div>

            <div
                class="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Next on calendar
                </span>
                @if ($next)
                    <p class="text-sm font-semibold text-gray-900 dark:text-white">
                        {{ $next->title }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {{ $next->starts_at->timezone(config('app.timezone'))->format('M j, H:i') }}
                        · {{ $next->venue }}
                    </p>
                @else
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        No upcoming events on the active season
                    </p>
                @endif
            </div>

            <div
                class="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Schedule progress
                </span>
                @if ($progress !== null)
                    <div class="flex items-center gap-2">
                        <div class="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                            <div class="h-full rounded-full bg-green-500 transition-all" style="width: {{ $progress }}%">
                            </div>
                        </div>
                        <span class="text-sm font-bold text-green-600 dark:text-green-400">{{ $progress }}%</span>
                    </div>
                    <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Events started vs total on the active season
                    </p>
                @else
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                        Add race events to track progress
                    </p>
                @endif
            </div>

            <div
                class="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <span class="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Upcoming rounds
                </span>
                @if ($upcoming !== null)
                    <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ $upcoming }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                        Future events on the active season
                    </p>
                @else
                    <p class="text-sm text-gray-600 dark:text-gray-300">—</p>
                @endif
            </div>
        </div>

        <div class="pointer-events-none absolute -bottom-4 -right-4 opacity-10">
            <x-heroicon-m-flag class="h-32 w-32 rotate-12" />
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
