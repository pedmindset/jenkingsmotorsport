import { cn } from '@/lib/utils';

/**
 * Human-readable label for a standing row `status` in the public UI.
 */
export function standingsStatusLabel(status: string): string {
    if (status === 'entered') {
        return 'Entered';
    }

    if (status === 'provisional') {
        return 'Provisional';
    }

    return status.replace(/^\w/, (c) => c.toUpperCase());
}

/**
 * Row styling: gold / silver / bronze for ranks 1–3; Jenkins highlight only below the podium.
 */
export function standingsTableRowClassNames(rank: number, isJenkins: boolean): string {
    return cn(
        'relative transition-colors',
        rank === 1 && 'border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-500/15 to-transparent hover:from-yellow-500/20',
        rank === 2 && 'border-l-4 border-neutral-400 bg-gradient-to-r from-neutral-400/10 to-transparent hover:from-neutral-400/15',
        rank === 3 && 'border-l-4 border-amber-700 bg-gradient-to-r from-amber-800/15 to-transparent hover:from-amber-800/20',
        rank > 3 && isJenkins && 'bg-primary/20 hover:bg-primary/30',
        rank > 3 && !isJenkins && 'hover:bg-white/5',
    );
}
