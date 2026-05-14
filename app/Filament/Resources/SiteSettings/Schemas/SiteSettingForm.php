<?php

namespace App\Filament\Resources\SiteSettings\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SiteSettingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Setting')
                    ->description('Site settings are JSON-backed values keyed for use in templates and Inertia shared props.')
                    ->schema([
                        TextInput::make('key')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true)
                            ->helperText('Stable identifier (e.g. site.nav_links).'),
                        Textarea::make('value')
                            ->rows(12)
                            ->columnSpanFull()
                            ->helperText('Use JSON for objects/arrays; strings or numbers can be quoted JSON or plain text.')
                            ->formatStateUsing(function (mixed $state): string {
                                if ($state === null) {
                                    return '';
                                }
                                if (is_string($state)) {
                                    return $state;
                                }
                                if (is_scalar($state)) {
                                    return (string) $state;
                                }
                                $enc = json_encode($state, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

                                return $enc !== false ? $enc : '';
                            })
                            ->dehydrateStateUsing(function (mixed $state): mixed {
                                if (! is_string($state)) {
                                    return null;
                                }
                                $trim = trim($state);
                                if ($trim === '') {
                                    return null;
                                }

                                if (str_starts_with($trim, '{') || str_starts_with($trim, '[')) {
                                    $decoded = json_decode($trim, true);
                                    if (json_last_error() === JSON_ERROR_NONE) {
                                        return $decoded;
                                    }
                                }

                                return $trim;
                            })
                            ->rule(function (): \Closure {
                                return function (string $attribute, mixed $value, \Closure $fail): void {
                                    if (! is_string($value) || trim($value) === '') {
                                        return;
                                    }
                                    $trim = trim($value);
                                    if (str_starts_with($trim, '{') || str_starts_with($trim, '[')) {
                                        json_decode($trim);
                                        if (json_last_error() !== JSON_ERROR_NONE) {
                                            $fail('Value must be valid JSON when it starts with { or [.');
                                        }
                                    }
                                };
                            }),
                    ]),
            ]);
    }
}
