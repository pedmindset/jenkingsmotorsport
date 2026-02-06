<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class SponsorshipEnquiryInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Sponsorship Enquiry')
                    ->icon('heroicon-m-document-text')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Group::make([
                                    TextEntry::make('name')
                                        ->weight('bold')
                                        ->size('lg'),
                                    TextEntry::make('email')
                                        ->label('Email Address')
                                        ->icon('heroicon-m-envelope')
                                        ->copyable(),
                                ])->columnSpan(1),

                                Group::make([
                                    TextEntry::make('company')
                                        ->label('Company')
                                        ->placeholder('No company listed')
                                        ->icon('heroicon-m-building-office'),
                                    TextEntry::make('interest_tier')
                                        ->label('Tier')
                                        ->badge()
                                        ->color('primary'),
                                ])->columnSpan(1),

                                Group::make([
                                    TextEntry::make('created_at')
                                        ->label('Submitted')
                                        ->dateTime('M j, Y H:i')
                                        ->icon('heroicon-m-calendar'),
                                ])->columnSpan(1),
                            ]),

                        Section::make('Message')
                            ->compact()
                            ->schema([
                                TextEntry::make('message')
                                    ->hiddenLabel()
                                    ->prose()
                                    ->columnSpanFull(),
                            ]),
                    ]),
            ]);
    }
}
