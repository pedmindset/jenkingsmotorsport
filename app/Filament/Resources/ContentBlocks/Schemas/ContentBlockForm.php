<?php

declare(strict_types=1);

namespace App\Filament\Resources\ContentBlocks\Schemas;

use App\Support\Cms\ContentBlockFormAdapter;
use App\Support\Cms\ContentBlockPreset;
use App\Support\Cms\ContentBlockRegistry;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Callout;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Validation\ValidationException;

/**
 * Filament authoring UI for reusable {@see \App\Models\ContentBlock} payloads.
 *
 * Structured fields map 1:1 to the seeded JSON layouts consumed by Legacy and Le Mans Inertia routes.
 */
class ContentBlockForm
{
    /**
     * @return Schema<object>
     */
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Callout::make('Structured editing templates')
                    ->visible(fn (string $operation): bool => $operation === 'create')
                    ->icon(Heroicon::OutlinedSparkles)
                    ->info()
                    ->description('Choose a blueprint when creating a row. Each template exposes plain-language fields wired to what the React site renders—avoid raw JSON unless you pick Advanced.')
                    ->columnSpanFull(),
                Select::make('block_preset')
                    ->label('Template picker')
                    ->options(ContentBlockRegistry::presetChoices())
                    ->default(ContentBlockPreset::Custom->value)
                    ->live()
                    ->visible(fn (string $operation): bool => $operation === 'create')
                    ->dehydrated(false)
                    ->afterStateUpdated(function (?string $state, Set $set, string $operation): void {
                        if ($operation !== 'create' || $state === null) {
                            return;
                        }

                        if ($state === ContentBlockPreset::Custom->value) {
                            $set('payload', []);

                            return;
                        }

                        [$page, $block] = explode('|', $state, 2);
                        $set('page_slug', $page);
                        $set('block_key', $block);
                        $set('payload', ContentBlockRegistry::emptyBlueprintForPreset($state));
                    })
                    ->helperText('Advanced mode leaves JSON visible so engineers can freestyle new payloads.')
                    ->columnSpanFull(),
                Section::make('Block placement')
                    ->description('Slugs anchor this record to controllers + front-end lookups (for example legacy + timeline).')
                    ->icon(Heroicon::OutlinedMapPin)
                    ->columns([
                        'default' => 1,
                        'lg' => 3,
                    ])
                    ->schema([
                        TextInput::make('page_slug')
                            ->label('Page slug')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->disabled(function (string $operation, Get $get): bool {
                                if ($operation === 'edit') {
                                    return true;
                                }

                                $preset = $get('block_preset');

                                return is_string($preset)
                                    && $preset !== ''
                                    && $preset !== ContentBlockPreset::Custom->value;
                            })
                            ->dehydrated()
                            ->helperText('Usually legacy or le-mans unless you intentionally wire a novel page.'),
                        TextInput::make('block_key')
                            ->label('Block key')
                            ->required()
                            ->maxLength(255)
                            ->unique(
                                ignoreRecord: true,
                                modifyRuleUsing: function (Unique $rule, Get $get): Unique {
                                    return $rule->where('page_slug', trim((string) ($get('page_slug') ?? '')));
                                },
                            )
                            ->disabled(function (string $operation, Get $get): bool {
                                if ($operation === 'edit') {
                                    return true;
                                }

                                $preset = $get('block_preset');

                                return is_string($preset)
                                    && $preset !== ''
                                    && $preset !== ContentBlockPreset::Custom->value;
                            })
                            ->dehydrated()
                            ->helperText('Unique per page_slug in the database — one block_key per page (e.g. timeline, journey_locations).'),
                        TextInput::make('sort_order')
                            ->label('Display order')
                            ->numeric()
                            ->default(0)
                            ->required()
                            ->helperText('Ascending sort when multiple blocks share one page.'),
                    ])
                    ->columnSpanFull(),
                self::timelineSection(),
                self::factCheckSection(),
                self::leMansJourneySection(),
                self::leMansCircuitFeaturesSection(),
                self::technicalFocusSection(),
                self::eventSchemaSection(),
                Section::make('Manual JSON fallback')
                    ->collapsed()
                    ->description('Use only for experimental block keys—or when duplication from another CMS is unavoidable.')
                    ->icon(Heroicon::OutlinedDocumentText)
                    ->schema([
                        Textarea::make('json_payload_fallback')
                            ->label('Payload JSON')
                            ->hint('Decoded into the payload column on save.')
                            ->rows(20)
                            ->default('{}')
                            ->columnSpanFull()
                            ->rule('nullable')
                            ->formatStateUsing(function (mixed $state): string {
                                if ($state === null || $state === '') {
                                    return '{}';
                                }
                                if (is_string($state)) {
                                    return $state;
                                }
                                $encoded = json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

                                return $encoded !== false ? $encoded : '{}';
                            })
                            ->dehydrated(fn (Get $get): bool => self::needsJsonFallback($get))
                            ->required(fn (Get $get): bool => self::needsJsonFallback($get))
                            ->validationMessages([
                                'required' => 'Provide JSON any time structured templates are unavailable.',
                            ])
                            ->rule(function (Get $get): \Closure {
                                return function (string $attribute, mixed $value, \Closure $fail) use ($get): void {
                                    if (! self::needsJsonFallback($get)) {
                                        return;
                                    }
                                    if (! is_string($value)) {
                                        return;
                                    }
                                    try {
                                        ContentBlockFormAdapter::parseUnstructuredPayloadFromString($value);
                                    } catch (ValidationException $exception) {
                                        foreach ($exception->errors()['json_payload_fallback'] ?? [] as $message) {
                                            $fail($message);
                                        }
                                    }
                                };
                            })
                            ->visible(fn (Get $get): bool => self::needsJsonFallback($get)),
                    ])
                    ->visible(fn (Get $get): bool => self::needsJsonFallback($get))
                    ->columnSpanFull(),
            ]);
    }

    private static function needsJsonFallback(Get $get): bool
    {
        return self::resolvedPreset($get) === null;
    }

    /**
     * @return ContentBlockPreset|null Structured preset recognised for {@see ContentBlockPreset::structuredCases()}
     */
    private static function resolvedPreset(Get $get): ?ContentBlockPreset
    {
        $page = $get('page_slug');
        $block = $get('block_key');

        return ContentBlockPreset::fromPageSlugAndBlockKey(
            $page === null ? null : (string) $page,
            $block === null ? null : (string) $block,
        );
    }

    private static function timelineSection(): Section
    {
        return Section::make('Legacy storyline timeline')
            ->description('Mirrors Legacy.tsx scroll eras with optional lists, badges, highlights, or stat ribbons.')
            ->icon(Heroicon::OutlinedClock)
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LegacyTimeline)
            ->schema([
                Repeater::make('payload.sections')
                    ->label('Timeline panels')
                    ->collapsed()
                    ->cloneable()
                    ->reorderable()
                    ->addActionLabel('Add era')
                    ->itemLabel(function (array $state): ?string {
                        $year = $state['year'] ?? null;
                        $title = $state['title'] ?? null;
                        if (is_string($year) && trim($year) !== '' && is_string($title)) {
                            return "{$year} — {$title}";
                        }
                        if (is_string($title) && trim($title) !== '') {
                            return $title;
                        }

                        return null;
                    })
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('year')->label('Year label')->placeholder('1984')->maxLength(32),
                            TextInput::make('title')->label('Headline')->maxLength(255)->columnSpan(2),
                        ]),
                        TextInput::make('subTitle')->label('Sub headline')->maxLength(255)->columnSpanFull(),
                        TextInput::make('image')->label('Background asset path')->placeholder('/images/example.jpg')->maxLength(255)->columnSpanFull(),
                        Grid::make(3)->schema([
                            TextInput::make('filterClass')
                                ->label('Photo filter utilities')
                                ->placeholder('grayscale contrast-125')
                                ->helperText('Tailwind arbitrary classes appended to each slide background.')
                                ->columnSpan(2),
                            Select::make('themeColor')
                                ->label('Accent palette')
                                ->options(ContentBlockRegistry::timelineThemeColorOptions())
                                ->default('white')
                                ->native(false),
                            Select::make('align')
                                ->label('Story alignment')
                                ->options([
                                    'left' => 'Left anchored',
                                    'right' => 'Right anchored',
                                ])
                                ->default('left'),
                        ]),
                        Repeater::make('paragraphs')
                            ->simple(Textarea::make('paragraph')->rows(4)->placeholder('Leading paragraph'))
                            ->addActionLabel('Add paragraph'),
                        Repeater::make('listItems')
                            ->label('Bulleted captions with icons')
                            ->collapsed()
                            ->addActionLabel('Add bullet row')
                            ->schema([
                                Select::make('icon')
                                    ->options(ContentBlockRegistry::lucideIconSelectOptions())
                                    ->searchable()
                                    ->preload()
                                    ->native(false),
                                Textarea::make('content')->rows(3)->required(),
                            ]),
                        Fieldset::make('Call-out banner')
                            ->schema([
                                TextInput::make('callout.title')->label('Label')->maxLength(255),
                                Textarea::make('callout.body')->rows(4),
                            ]),
                        Grid::make(2)->schema([
                            TextInput::make('badge')->label('Ribbon badge')->maxLength(255),
                            Repeater::make('stats')
                                ->label('Stat ribbons')
                                ->collapsed()
                                ->schema([
                                    TextInput::make('value')->maxLength(32),
                                    TextInput::make('label')->maxLength(255),
                                ]),
                        ]),
                    ])
                    ->columnSpanFull(),
            ])
            ->columnSpanFull();
    }

    private static function factCheckSection(): Section
    {
        return Section::make('Fact checker ribbon')
            ->description('Populates the Verified / Status table at the tail of Legacy.')
            ->icon(Heroicon::OutlinedCheckCircle)
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LegacyFactRows)
            ->schema([
                Repeater::make('payload.rows')
                    ->collapsed()
                    ->reorderable()
                    ->cloneable()
                    ->addActionLabel('Add row')
                    ->schema([
                        TextInput::make('info')->label('Fact headline')->required()->columnSpanFull(),
                        TextInput::make('status')->label('Badge label')->default('Verified')->maxLength(64),
                        Textarea::make('detail')->label('Extended context')->rows(3)->required()->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ])
            ->columnSpanFull();
    }

    private static function leMansJourneySection(): Section
    {
        return Section::make('Le Mans logistic journey')
            ->description('Hotspots powering the waypoint map.')
            ->icon(Heroicon::OutlinedMap)
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LeMansJourneyLocations)
            ->schema([
                Repeater::make('payload.locations')
                    ->collapsed()
                    ->cloneable()
                    ->reorderable()
                    ->addActionLabel('Add waypoint')
                    ->itemLabel(fn (array $state): ?string => $state['city'] ?? $state['name'] ?? null)
                    ->schema([
                        Grid::make(3)->schema([
                            TextInput::make('id')
                                ->label('Anchor id')
                                ->placeholder('workshop')
                                ->helperText('Lowercase slug for React state lookups.')
                                ->maxLength(64),
                            TextInput::make('name')->required()->columnSpan(2),
                        ]),
                        Grid::make(3)->schema([
                            TextInput::make('city')->label('Ribbon label')->required()->columnSpan(2)->placeholder('STONE'),
                            Select::make('color')
                                ->label('Glow color')
                                ->options(ContentBlockRegistry::tailwindAccentClassOptions())
                                ->native(false),
                        ]),
                        Grid::make(3)->schema([
                            Select::make('icon')
                                ->options(ContentBlockRegistry::lucideIconSelectOptions())
                                ->searchable()
                                ->preload()
                                ->native(false),
                            TextInput::make('position')
                                ->label('Map anchor (0-100)')
                                ->numeric()
                                ->default(0)
                                ->rules(['integer', 'min:0', 'max:100']),
                        ]),
                        Textarea::make('description')
                            ->rows(4)
                            ->columnSpanFull(),
                        Repeater::make('tasks')
                            ->simple(Textarea::make('task')->rows(2))
                            ->addActionLabel('Add logistics task'),
                    ])
                    ->columnSpanFull(),
            ])
            ->columnSpanFull();
    }

    private static function leMansCircuitFeaturesSection(): Section
    {
        return Section::make('Circuit feature cards')
            ->description('Highlights marquee corners on Le Mans.tsx.')
            ->icon(Heroicon::OutlinedTrophy)
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LeMansCircuitFeatures)
            ->schema([
                Repeater::make('payload.items')
                    ->collapsed()
                    ->cloneable()
                    ->reorderable()
                    ->addActionLabel('Add corner')
                    ->schema([
                        TextInput::make('name')->required()->columnSpanFull(),
                        Textarea::make('description')->rows(5)->required()->columnSpanFull(),
                    ]),
            ])
            ->columnSpanFull();
    }

    private static function technicalFocusSection(): Section
    {
        return Section::make('Technical focus cards')
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LeMansTechnicalFocus)
            ->icon(Heroicon::OutlinedWrench)
            ->schema([
                Repeater::make('payload.items')
                    ->collapsed()
                    ->cloneable()
                    ->reorderable()
                    ->schema([
                        Select::make('icon')
                            ->options(ContentBlockRegistry::lucideIconSelectOptions())
                            ->required()
                            ->searchable(),
                        TextInput::make('title')->required(),
                        Select::make('color')
                            ->label('Accent')
                            ->options(ContentBlockRegistry::tailwindAccentClassOptions())
                            ->native(false),
                        Textarea::make('description')->rows(6)->required()->columnSpanFull(),
                    ])
                    ->columnSpanFull(),
            ])
            ->columnSpanFull();
    }

    private static function eventSchemaSection(): Section
    {
        return Section::make('Sports event structured data')
            ->visible(fn (Get $get): bool => self::resolvedPreset($get) === ContentBlockPreset::LeMansEventSchema)
            ->icon(Heroicon::OutlinedBolt)
            ->description('Feeds JSON-LD to search engines—the shell (`@context`, nested `@type` nodes) merges automatically.')
            ->schema([
                Grid::make(2)->schema([
                    TextInput::make('payload.name')->label('Event title')->required(),
                    Select::make('payload.eventStatus')
                        ->label('Schema.org status')
                        ->options(ContentBlockRegistry::sportsEventStatusOptions())
                        ->required()
                        ->native(false),
                ]),
                Grid::make(2)->schema([
                    TextInput::make('payload.startDate')->label('Start date')->type('date'),
                    TextInput::make('payload.endDate')->label('End date')->type('date'),
                ]),
                Textarea::make('payload.description')->rows(4)->required()->columnSpanFull(),
                Fieldset::make('Venue Place')
                    ->schema([
                        TextInput::make('payload.location.name')->label('Venue name')->required(),
                        Grid::make(2)->schema([
                            TextInput::make('payload.location.address.addressLocality')->label('City / locality')->required(),
                            TextInput::make('payload.location.address.addressCountry')->label('Country code')->maxLength(3)->placeholder('FR'),
                        ]),
                    ]),
                Fieldset::make('Featured team identity')
                    ->schema([
                        TextInput::make('payload.performer.name')->label('Performer displayed name')->required(),
                    ]),
            ])
            ->columnSpanFull();
    }
}
