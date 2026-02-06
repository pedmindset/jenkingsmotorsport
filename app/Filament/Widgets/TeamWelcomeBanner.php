<?php

namespace App\Filament\Widgets;

use Filament\Widgets\Widget;

class TeamWelcomeBanner extends Widget
{
    protected string $view = 'filament.widgets.team-welcome-banner';

    protected static ?int $sort = -1; // Make it first

    protected int|string|array $columnSpan = 'half';

    public function getMotto(): string
    {
        $mottos = [
            "Precision in every turn.",
            "Fueled by passion, driven by excellence.",
            "Chasing the checkered flag together.",
            "Innovation on the track, integrity in the shop.",
        ];

        return $mottos[array_rand($mottos)];
    }
}
