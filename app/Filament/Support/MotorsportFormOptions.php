<?php

declare(strict_types=1);

namespace App\Filament\Support;

/**
 * Shared select options for BTRC / motorsport admin forms and relation managers.
 */
class MotorsportFormOptions
{
    /**
     * @return array<string, string>
     */
    public static function standingStatuses(): array
    {
        return [
            'final' => 'Final',
            'entered' => 'Entered',
            'provisional' => 'Provisional',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function divisions(): array
    {
        return [
            'BTRC Division 1' => 'BTRC Division 1',
            'BTRC Division 2' => 'BTRC Division 2',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function raceResultStatuses(): array
    {
        return [
            'finished' => 'Finished',
            'dnf' => 'DNF',
            'dns' => 'DNS',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function threatLevels(): array
    {
        return [
            'jenkins' => 'Team (Jenkins)',
            'extreme' => 'Extreme',
            'high' => 'High',
            'medium' => 'Medium',
            'low' => 'Low',
        ];
    }
}
