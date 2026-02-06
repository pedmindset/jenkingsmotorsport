<x-filament-widgets::widget>
    <x-filament::section class="relative overflow-hidden">
        <div class="flex items-center gap-x-4">
            <div class="p-3 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/20">
                <x-heroicon-m-bolt class="w-8 h-8" />
            </div>

            <div>
                <h2 class="text-xl font-bold tracking-tight text-gray-950 dark:text-white"
                    style="font-family: 'Saira', sans-serif; text-transform: uppercase;">
                    Command Center
                </h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 italic">
                    "{{ $this->getMotto() }}"
                </p>
            </div>
        </div>

        <div class="mt-6 flex flex-wrap gap-4">
            <div
                class="flex-1 min-w-[120px] p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">Race
                    Readiness</span>
                <div class="flex items-center gap-2">
                    <div class="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div class="h-full bg-green-500 w-[95%]"></div>
                    </div>
                    <span class="text-sm font-bold text-green-500">95%</span>
                </div>
            </div>

            <div
                class="flex-1 min-w-[120px] p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                <span class="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-1">2026 Season</span>
                <span class="text-lg font-bold text-blue-600 dark:text-blue-400">Preparation Mode</span>
            </div>

            <div class="flex items-center justify-end flex-1">
                <x-filament::button href="/" tag="a" target="_blank" color="gray"
                    icon="heroicon-m-arrow-top-right-on-square" size="sm">
                    Live Site
                </x-filament::button>
            </div>
        </div>

        {{-- Background Decoration --}}
        <div class="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <x-heroicon-m-flag class="w-32 h-32 rotate-12" />
        </div>
    </x-filament::section>
</x-filament-widgets::widget>