<?php

namespace App\Filament\Resources\NewsletterSubscriptions\Pages;

use App\Filament\Exports\NewsletterSubscriptionExporter;
use App\Filament\Resources\NewsletterSubscriptions\NewsletterSubscriptionResource;
use Filament\Actions\CreateAction;
use Filament\Actions\ExportAction;
use Filament\Resources\Pages\ListRecords;

class ListNewsletterSubscriptions extends ListRecords
{
    protected static string $resource = NewsletterSubscriptionResource::class;

    /**
     * @return array<int, \Filament\Actions\Action>
     */
    protected function getHeaderActions(): array
    {
        return [
            ExportAction::make()
                ->exporter(NewsletterSubscriptionExporter::class)
                ->label('Download Excel'),
            CreateAction::make(),
        ];
    }
}
