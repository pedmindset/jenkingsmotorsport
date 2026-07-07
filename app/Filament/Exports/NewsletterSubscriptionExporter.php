<?php

namespace App\Filament\Exports;

use App\Models\NewsletterSubscription;
use Filament\Actions\Exports\Enums\ExportFormat;
use Filament\Actions\Exports\ExportColumn;
use Filament\Actions\Exports\Exporter;
use Filament\Actions\Exports\Models\Export;
use Illuminate\Support\Number;

/**
 * Exports {@see NewsletterSubscription} records for marketing list downloads.
 */
class NewsletterSubscriptionExporter extends Exporter
{
    protected static ?string $model = NewsletterSubscription::class;

    /**
     * @return array<int, ExportColumn>
     */
    public static function getColumns(): array
    {
        return [
            ExportColumn::make('email')
                ->label('Email address'),
            ExportColumn::make('is_active')
                ->label('Active')
                ->formatStateUsing(fn (bool $state): string => $state ? 'Yes' : 'No'),
            ExportColumn::make('subscribed_at')
                ->label('Subscribed at'),
            ExportColumn::make('created_at')
                ->label('Created at'),
        ];
    }

    /**
     * @return array<int, ExportFormat>
     */
    public function getFormats(): array
    {
        return [
            ExportFormat::Xlsx,
        ];
    }

    public static function getCompletedNotificationBody(Export $export): string
    {
        $body = 'Your newsletter list export has completed and '.Number::format($export->successful_rows).' '.str('row')->plural($export->successful_rows).' exported.';

        if ($failedRowsCount = $export->getFailedRowsCount()) {
            $body .= ' '.Number::format($failedRowsCount).' '.str('row')->plural($failedRowsCount).' failed to export.';
        }

        return $body;
    }
}
