import { AnimatePresence, motion } from 'framer-motion';
import { Award, Crown, Medal } from 'lucide-react';
import type { StandingRow } from '@/types/motorsport';
import { standingsStatusLabel, standingsTableRowClassNames } from '@/lib/standings-visual';

export type StandingsTableBlockProps = {
    /** Short label above the title (e.g. section number or “Championship”). */
    eyebrow: string;
    /** Main heading for the block. */
    title: string;
    rows: StandingRow[];
    standingStatus: string;
};

/**
 * Championship-style standings grid (rank, driver, truck, points or status).
 */
export function StandingsTableBlock({ eyebrow, title, rows, standingStatus }: StandingsTableBlockProps) {
    const isFinalStandings = standingStatus === 'final';

    return (
        <div className="overflow-hidden border border-white/10">
            <div className="border-b border-white/10 bg-white/5 px-4 py-3 md:px-6">
                <span className="font-heading mb-1 block text-sm uppercase tracking-[0.3em] text-primary">{eyebrow}</span>
                <h2 className="font-heading text-2xl font-black uppercase italic text-white md:text-3xl">{title}</h2>
            </div>
            <table className="w-full border-collapse text-left">
                <thead className="bg-white/5">
                    <tr>
                        <th className="w-16 border-b border-white/10 p-4 font-heading text-xs uppercase text-muted-foreground">Rank</th>
                        <th className="border-b border-white/10 p-4 font-heading text-xs uppercase text-muted-foreground">Driver</th>
                        <th className="hidden border-b border-white/10 p-4 font-heading text-xs uppercase text-muted-foreground md:table-cell">Truck</th>
                        <th className="border-b border-white/10 p-4 text-right font-heading text-xs uppercase text-muted-foreground">Points</th>
                    </tr>
                </thead>
                <tbody>
                    <AnimatePresence mode="wait">
                        {rows.map((driver, index) => (
                            <motion.tr
                                key={`${driver.rank}-${driver.name}`}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.06,
                                    ease: 'easeOut',
                                }}
                                className={standingsTableRowClassNames(driver.rank, Boolean(driver.isJenkins))}
                            >
                                {driver.isJenkins && driver.rank > 3 && (
                                    <td className="pointer-events-none absolute inset-0">
                                        <div className="absolute inset-0 animate-pulse bg-primary/10" />
                                        <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
                                    </td>
                                )}

                                <td className="border-b border-white/10 p-4">
                                    <div className="flex items-center justify-center">
                                        {driver.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                                        {driver.rank === 2 && <Medal className="h-5 w-5 text-neutral-300" />}
                                        {driver.rank === 3 && <Award className="h-5 w-5 text-amber-600" />}
                                        {driver.rank > 3 && (
                                            <span
                                                className={`font-heading text-lg font-black ${driver.isJenkins ? 'text-primary' : 'text-white/50'}`}
                                            >
                                                {driver.rank}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td
                                    className={`border-b border-white/10 p-4 font-bold ${driver.isJenkins ? 'text-white' : 'text-white/90'}`}
                                >
                                    <span className="flex items-center gap-3">
                                        {driver.profileImage ? (
                                            <img
                                                src={driver.profileImage}
                                                alt={driver.name}
                                                className="h-9 w-9 shrink-0 rounded-full border border-white/15 object-cover"
                                            />
                                        ) : null}
                                        <span>
                                            {driver.name}
                                            {driver.isJenkins && (
                                                <span className="ml-2 bg-primary/50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                                                    #{driver.racingNumber ?? '69'}
                                                </span>
                                            )}
                                        </span>
                                    </span>
                                </td>
                                <td
                                    className={`hidden border-b border-white/10 p-4 md:table-cell ${
                                        driver.isJenkins ? 'text-white/80' : 'text-muted-foreground'
                                    }`}
                                >
                                    {driver.truck}
                                </td>
                                <td className="border-b border-white/10 p-4 text-right">
                                    <div className="flex flex-col items-end gap-1 md:flex-row md:items-baseline md:justify-end md:gap-2">
                                        {!isFinalStandings ? (
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                                                {standingsStatusLabel(standingStatus)}
                                            </span>
                                        ) : null}
                                        <span className={`font-heading text-xl font-black ${driver.isJenkins ? 'text-primary' : 'text-white'}`}>
                                            {driver.points}
                                        </span>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </tbody>
            </table>
        </div>
    );
}
