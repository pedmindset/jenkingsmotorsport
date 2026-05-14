<?php

namespace App\Filament\Resources\Vehicles\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

/**
 * {@see \App\Models\VehicleSpecification} rows for a {@see \App\Models\Vehicle}.
 */
class SpecificationsRelationManager extends RelationManager
{
    protected static string $relationship = 'specifications';

    protected static ?string $title = 'Specifications';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Hidden::make('vehicle_id')
                    ->default(fn (): int => (int) $this->ownerRecord->getKey()),
                Section::make('Specification')
                    ->schema([
                        TextInput::make('label')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('value')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('icon_key')
                            ->maxLength(64)
                            ->helperText('Optional Lucide icon name for the public page.'),
                        TextInput::make('sort_order')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(2),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(fn ($query) => $query->orderBy('sort_order'))
            ->recordTitleAttribute('label')
            ->columns([
                TextColumn::make('sort_order')->sortable(),
                TextColumn::make('label')->searchable(),
                TextColumn::make('value')->searchable(),
                TextColumn::make('icon_key')->placeholder('—')->toggleable(isToggledHiddenByDefault: true),
            ])
            ->headerActions([
                CreateAction::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
