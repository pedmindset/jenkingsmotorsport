<x-filament-widgets::widget>
    <x-filament::section>
        <x-slot name="heading">
            Quick links
        </x-slot>
        <x-slot name="description">
            Jump to the areas you update most often
        </x-slot>

        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            @foreach ($this->getLinks() as $link)
                <x-filament::button :href="$link['url']" tag="a" color="gray" class="justify-center"
                    :icon="$link['icon']">
                    {{ $link['label'] }}
                </x-filament::button>
            @endforeach
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
