<?php

namespace App\Filament\Resources\ContactMessages\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class ContactMessageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('General Enquiry')
                    ->description('Contact message details from the public website.')
                    ->icon('heroicon-m-chat-bubble-left-right')
                    ->schema([
                        Group::make([
                            TextInput::make('name')
                                ->label('Full Name')
                                ->placeholder('Jane Doe')
                                ->prefixIcon('heroicon-m-user')
                                ->required(),

                            TextInput::make('email')
                                ->label('Email Address')
                                ->placeholder('jane@example.com')
                                ->prefixIcon('heroicon-m-at-symbol')
                                ->email()
                                ->required(),
                        ])->columns(2),

                        TextInput::make('subject')
                            ->placeholder('What is this regarding?')
                            ->prefixIcon('heroicon-m-hashtag')
                            ->required(),

                        Textarea::make('message')
                            ->label('Message Content')
                            ->placeholder('Type the message here...')
                            ->rows(8)
                            ->required()
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
