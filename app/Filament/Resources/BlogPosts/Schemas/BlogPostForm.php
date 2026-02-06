<?php

namespace App\Filament\Resources\BlogPosts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\RichEditor;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Illuminate\Support\Str;

class BlogPostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)
                    ->schema([
                        Group::make()
                            ->schema([
                                Section::make('Post Content')
                                    ->description('The main body of your blog post.')
                                    ->schema([
                                        TextInput::make('title')
                                            ->placeholder('Enter a catchy title')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn(string $operation, $state, Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),

                                        TextInput::make('slug')
                                            ->placeholder('url-friendly-slug')
                                            ->required()
                                            ->unique(ignoreRecord: true),

                                        RichEditor::make('content')
                                            ->label('Body Content')
                                            ->required()
                                            ->extraAttributes(['style' => 'min-height: 500px;'])
                                            ->columnSpanFull(),

                                        Textarea::make('excerpt')
                                            ->placeholder('A short summary for search results and cards...')
                                            ->rows(3)
                                            ->columnSpanFull(),
                                    ])
                                    ->columns(2),
                            ])
                            ->columnSpan(1),

                        Group::make()
                            ->schema([
                                Section::make('Organization')
                                    ->schema([
                                        Select::make('category_id')
                                            ->relationship('category', 'name')
                                            ->preload()
                                            ->searchable()
                                            ->required()
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->required()
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn(string $operation, $state, Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                                                TextInput::make('slug')->required(),
                                            ]),

                                        Select::make('tags')
                                            ->relationship('tags', 'name')
                                            ->multiple()
                                            ->preload()
                                            ->createOptionForm([
                                                TextInput::make('name')
                                                    ->required()
                                                    ->live(onBlur: true)
                                                    ->afterStateUpdated(fn(string $operation, $state, Set $set) => $operation === 'create' ? $set('slug', Str::slug($state)) : null),
                                                TextInput::make('slug')->required(),
                                            ]),

                                        Select::make('author_id')
                                            ->relationship('author', 'name')
                                            ->searchable()
                                            ->required(),
                                    ]),

                                Section::make('Media')
                                    ->schema([
                                        FileUpload::make('image_path')
                                            ->label('Featured Image')
                                            ->image()
                                            ->imageEditor()
                                            ->directory('blog-images'),

                                        TextInput::make('video_url')
                                            ->placeholder('https://youtube.com/...')
                                            ->url()
                                            ->prefixIcon('heroicon-o-video-camera'),
                                    ]),

                                Section::make('Publishing')
                                    ->schema([
                                        DateTimePicker::make('published_at')
                                            ->label('Publish Date')
                                            ->placeholder('Leave empty for draft'),

                                        Toggle::make('is_featured')
                                            ->label('Featured Post')
                                            ->helperText('Featured posts appear prominently on the home page.')
                                            ->onIcon('heroicon-m-star')
                                            ->offIcon('heroicon-m-minus'),
                                    ]),
                            ])
                            ->columnSpan(1),
                    ])
                    ->columnSpan(2),
            ]);
    }
}