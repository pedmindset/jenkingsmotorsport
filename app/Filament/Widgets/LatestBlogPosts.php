<?php

declare(strict_types=1);

namespace App\Filament\Widgets;

use App\Filament\Resources\BlogPosts\BlogPostResource;
use App\Models\BlogPost;
use Filament\Actions\Action;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

/**
 * Recently updated posts with publication status at a glance.
 */
class LatestBlogPosts extends BaseWidget
{
    protected static bool $isLazy = false;

    protected static ?int $sort = 4;

    /**
     * @var int|string|array<string, int|string|null>
     */
    protected int|string|array $columnSpan = [
        'default' => 'full',
        'lg' => 2,
    ];

    public function table(Table $table): Table
    {
        return $table
            ->heading('Latest blog activity')
            ->description('Most recently touched posts — drafts show as unpublished')
            ->query(
                BlogPost::query()->with(['category', 'author'])->latest('updated_at')
            )
            ->defaultPaginationPageOption(5)
            ->paginated([5, 10])
            ->recordUrl(
                fn (BlogPost $record): string => BlogPostResource::getUrl('edit', ['record' => $record])
            )
            ->headerActions([
                Action::make('viewAll')
                    ->label('View all')
                    ->url(BlogPostResource::getUrl('index'))
                    ->link(),
            ])
            ->emptyStateHeading('No blog posts yet')
            ->emptyStateDescription('Create a post to see it listed here.')
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->wrap(),
                TextColumn::make('category.name')
                    ->badge()
                    ->color('gray')
                    ->placeholder('—'),
                TextColumn::make('author.name')
                    ->label('Author')
                    ->placeholder('—'),
                TextColumn::make('published_at')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn ($state): string => $state && $state <= now() ? 'Published' : 'Draft')
                    ->color(fn ($state): string => $state && $state <= now() ? 'success' : 'warning'),
                TextColumn::make('updated_at')
                    ->label('Updated')
                    ->since()
                    ->sortable(),
            ]);
    }
}
