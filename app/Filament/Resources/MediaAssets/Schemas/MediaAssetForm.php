<?php

namespace App\Filament\Resources\MediaAssets\Schemas;

use App\Filament\Support\PublicMediaFileUpload;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Callout;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Str;

/**
 * Filament schema for {@see \App\Models\MediaAsset}: public gallery imagery, reel embeds, or library docs.
 *
 * Tabs separate “what file” from copy and placement so curators scan less noise per step.
 */
class MediaAssetForm
{
    /**
     * @return Schema Schema configured for gallery media CRUD screens.
     */
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make()
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('Media')
                            ->icon(Heroicon::OutlinedPhoto)
                            ->schema([
                                Section::make('Asset kind & source files')
                                    ->description('Photos power the masonry grid and lightbox; the Featured reel consumes one embed-ready video.')
                                    ->icon(Heroicon::OutlinedArrowUpTray)
                                    ->schema([
                                        ToggleButtons::make('media_type')
                                            ->label('What are you saving?')
                                            ->options([
                                                'image' => 'Gallery photo',
                                                'video' => 'Featured reel',
                                                'document' => 'Library document',
                                            ])
                                            ->icons([
                                                'image' => Heroicon::OutlinedPhoto,
                                                'video' => Heroicon::OutlinedVideoCamera,
                                                'document' => Heroicon::OutlinedDocumentText,
                                            ])
                                            ->colors([
                                                'image' => 'gray',
                                                'video' => 'danger',
                                                'document' => 'warning',
                                            ])
                                            ->default('image')
                                            ->inline()
                                            ->grouped()
                                            ->required()
                                            ->live()
                                            ->columnSpanFull()
                                            ->afterStateUpdated(function ($state, Set $set): void {
                                                if ($state === 'video') {
                                                    $set('category', 'gallery');
                                                    $set('path', null);
                                                }
                                                if ($state === 'image') {
                                                    $set('url', null);
                                                }
                                                if ($state === 'document') {
                                                    $set('url', null);
                                                }
                                            })
                                            ->helperText('Images publish to public gallery masonry; the Featured Reel prefers the strongest video embed.'),
                                        Callout::make('Featured reel checklist')
                                            ->warning()
                                            ->description('Paste a full iframe src (YouTube /embed/..., youtube-nocookie /embed/, or player.vimeo.com/video/...). Watch links or short links fail validation intentionally so the reel never breaks silently.')
                                            ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'video')
                                            ->columnSpanFull(),
                                        Callout::make('Photo QA')
                                            ->info()
                                            ->description('Landscape ratio works best in the masonry grid and spotlight ribbon. Aim for descriptive alt text—you will reuse it verbatim on the front end.')
                                            ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'image')
                                            ->columnSpanFull(),
                                        Callout::make('Library document metadata')
                                            ->info()
                                            ->description('Reserve this slot for overlays or internal references that never render in the masonry grid. Most marketing storytelling should remain on the Gallery photo type.')
                                            ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'document')
                                            ->columnSpanFull(),
                                        TextInput::make('url')
                                            ->label('Embed URL')
                                            ->placeholder('https://www.youtube.com/embed/your-video-id')
                                            ->maxLength(2048)
                                            ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'video')
                                            ->required(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'video')
                                            ->rules(fn (Get $get): array => ($get('media_type') ?? 'image') !== 'video' ? [] : [
                                                'required',
                                                'url',
                                                'regex:/^https:\/\/((www\.)?youtube(?:-nocookie)?\.com\/embed\/|player\.vimeo\.com\/video\/)/iu',
                                            ])
                                            ->validationMessages([
                                                'regex' => 'Use a hosted embed URL from YouTube (/embed/...) or Vimeo (player.vimeo.com/video/…).',
                                            ])
                                            ->helperText('Use the iframe src only — not youtube.com/watch or youtu.be short links.')
                                            ->columnSpanFull(),
                                        PublicMediaFileUpload::configure(
                                            FileUpload::make('path')
                                                ->label(fn (string $operation): string => $operation === 'edit' ? 'Replace image' : 'Image file')
                                                ->image()
                                                ->disk('public')
                                                ->directory('media/gallery')
                                                ->visibility('public')
                                                ->imageEditor()
                                                ->nullable()
                                                ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
                                                ->maxSize(12_288)
                                                ->downloadable()
                                                ->openable()
                                        )
                                            ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'image')
                                            ->helperText(fn (string $operation): string => $operation === 'edit'
                                                ? 'The current image is shown above the uploader. Choose a new file only when you want to replace it.'
                                                : 'JPEG, PNG, WebP, or AVIF — uploads land in storage/app/public/media/gallery.')
                                            ->columnSpanFull(),
                                    ]),
                            ]),
                        Tab::make('Copy')
                            ->icon(Heroicon::OutlinedPencilSquare)
                            ->schema([
                                Fieldset::make('Headline identifiers')
                                    ->schema([
                                        TextInput::make('title')
                                            ->placeholder('Victory burnout at Brands Hatch')
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (string $operation, $state, Set $set): void {
                                                if ($operation === 'create' && is_string($state) && $state !== '') {
                                                    $set('slug', Str::slug($state));
                                                }
                                            }),
                                        TextInput::make('slug')
                                            ->placeholder('gallery-brands-hatch-finale')
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->helperText('Immutable ID for deeplinks, imports, or seed merges.'),
                                    ]),
                                Textarea::make('caption')
                                    ->label('Caption / synopsis')
                                    ->placeholder('What is happening in-frame? One or two tight sentences.')
                                    ->rows(4)
                                    ->helperText('Surfaces beneath titles in the grid and beneath the enlarged lightbox headline.')
                                    ->columnSpanFull(),
                                TextInput::make('alt')
                                    ->label('Alt text')
                                    ->maxLength(255)
                                    ->visible(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'image')
                                    ->helperText('Describe decisive action, subject, venue cues, liveries or truck numerals.'),
                            ]),
                        Tab::make('Website placement')
                            ->icon(Heroicon::OutlinedMap)
                            ->schema([
                                Section::make('Context that powers filters')
                                    ->description('Season and tags become chips on /gallery — pick them consistently so patrons can sift stories.')
                                    ->icon(Heroicon::OutlinedSparkles)
                                    ->columns(2)
                                    ->schema([
                                        DatePicker::make('taken_at')
                                            ->label('Date taken')
                                            ->native(false)
                                            ->nullable()
                                            ->helperText('Drives stamped foil typography and chronological ordering.'),
                                        Select::make('season_id')
                                            ->label('Season')
                                            ->relationship('season', 'title', fn ($query) => $query->orderByDesc('year'))
                                            ->searchable()
                                            ->preload()
                                            ->nullable()
                                            ->placeholder('Associate with the active championship story arc'),
                                        Select::make('tags')
                                            ->relationship('tags', 'name')
                                            ->multiple()
                                            ->preload()
                                            ->searchable()
                                            ->helperText('Create tags inline—they drive the refinement chips visitors tap on /gallery.')
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->required()
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(function (string $operation, $state, Set $set): void {
                                                        if ($operation === 'create' && is_string($state) && $state !== '') {
                                                            $set('slug', Str::slug($state));
                                                        }
                                                    }),
                                                TextInput::make('slug')
                                                    ->required()
                                                    ->maxLength(255),
                                            ])
                                            ->columnSpanFull(),
                                    ]),
                                Section::make('Gallery UI controls')
                                    ->description('Featured spots render the hero collage; numeric sort breaks ties.')
                                    ->icon(Heroicon::OutlinedQueueList)
                                    ->columns([
                                        'default' => 1,
                                        'lg' => 3,
                                    ])
                                    ->schema([
                                        Select::make('category')
                                            ->label('Gallery tab')
                                            ->options([
                                                'track' => 'On track',
                                                'workshop' => 'Workshop',
                                                'cockpit' => 'Cockpit',
                                                'legacy' => 'Legacy',
                                                'gallery' => 'Gallery reel (Featured embed)',
                                                'general' => 'General CMS',
                                                'hero' => 'Hero / banners',
                                            ])
                                            ->default('track')
                                            ->required()
                                            ->native(false)
                                            ->disabled(fn (Get $get): bool => ($get('media_type') ?? 'image') === 'video')
                                            ->dehydrated()
                                            ->helperText(fn (Get $get): string => ($get('media_type') ?? 'image') === 'video'
                                                    ? 'Locked to Featured reel whenever you save embed video assets.'
                                                    : 'Public gallery pills map to track / workshop / cockpit / legacy. Non-visual CMS assets use General/Hero.'),
                                        Toggle::make('featured')
                                            ->label('Feature in masonry spotlight')
                                            ->helperText('Boosts sizing and primes the marquee strip when filters allow.')
                                            ->default(false)
                                            ->inline(false),
                                        TextInput::make('sort_order')
                                            ->label('Sort weight')
                                            ->numeric()
                                            ->default(0)
                                            ->required()
                                            ->helperText('Lower numbers win first inside the spotlight group.')
                                            ->suffix('priority'),
                                    ]),
                            ]),
                    ]),
            ]);
    }
}
