<?php

namespace App\Filament\Resources\SponsorshipEnquiries\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Group;
use Filament\Forms\Components\Select;
use Filament\Schemas\Schema;

class SponsorshipEnquiryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Enquiry Details')
                    ->description('Details regarding the sponsorship interest.')
                    ->icon('heroicon-m-envelope')
                    ->schema([
                        Group::make([
                            TextInput::make('name')
                                ->label('Full Name')
                                ->placeholder('John Doe')
                                ->prefixIcon('heroicon-m-user')
                                ->required(),

                            TextInput::make('email')
                                ->label('Email Address')
                                ->placeholder('john@company.com')
                                ->prefixIcon('heroicon-m-at-symbol')
                                ->email()
                                ->required(),
                        ])->columns(2),

                        Group::make([
                            TextInput::make('company')
                                ->label('Company Name')
                                ->placeholder('Acme Corp')
                                ->prefixIcon('heroicon-m-building-office'),

                            Select::make('interest_tier')
                                ->label('Interest Tier')
                                ->options([
                                    'hospitality' => 'Hospitality Packages',
                                    'technical' => 'Technical Partnership',
                                    'primary' => 'Primary Sponsorship',
                                    'title' => 'Title Sponsorship (Tier 1)',
                                ])
                                ->default('hospitality')
                                ->required()
                                ->native(false),
                        ])->columns(2),

                        Textarea::make('message')
                            ->label('Message / Requirements')
                            ->placeholder('Tell us more about your sponsorship goals...')
                            ->rows(8)
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
