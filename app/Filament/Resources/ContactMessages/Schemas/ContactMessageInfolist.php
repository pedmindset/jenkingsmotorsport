<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class ContactMessageInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Enquiry')
                    ->icon('heroicon-m-chat-bubble-left-right')
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
                                    TextEntry::make('subject')
                                        ->label('Subject')
                                        ->icon('heroicon-m-hashtag'),
                                    TextEntry::make('created_at')
                                        ->label('Received')
                                        ->dateTime('M j, Y H:i')
                                        ->icon('heroicon-m-calendar'),
                                ])->columnSpan(2),
                            ]),

                        Section::make('Message Body')
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
