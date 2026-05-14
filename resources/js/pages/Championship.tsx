import LandingLayout from '@/layouts/LandingLayout';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Trophy, TrendingUp, Calendar, Zap, Volume2, Eye, Target, ChevronRight, Crown, Medal, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PageProps } from '@inertiajs/core';
import type { CareerResultRow, ContenderRow, StandingRow, StandingSeasonPayload } from '@/types/motorsport';
import { standingsStatusLabel, standingsTableRowClassNames } from '@/lib/standings-visual';

type ChampionshipPageProps = PageProps & {
    standingSeasons: StandingSeasonPayload[];
    careerResults: CareerResultRow[];
    contenders2026: ContenderRow[];
};

function podiumCardClassNames(rank: number): string {
    if (rank === 1) {
        return 'order-1 border-yellow-300/70 bg-[linear-gradient(145deg,rgba(250,204,21,0.28),rgba(24,24,27,0.92)_38%,rgba(0,0,0,1))] shadow-[0_0_80px_rgba(250,204,21,0.2)] md:order-2 md:-mt-14';
    }

    if (rank === 2) {
        return 'order-2 border-zinc-200/50 bg-[linear-gradient(145deg,rgba(228,228,231,0.2),rgba(24,24,27,0.9)_42%,rgba(0,0,0,1))] md:order-1';
    }

    return 'order-3 border-orange-700/60 bg-[linear-gradient(145deg,rgba(194,65,12,0.2),rgba(24,24,27,0.9)_42%,rgba(0,0,0,1))]';
}

function podiumBadgeClassNames(rank: number): string {
    if (rank === 1) {
        return 'border-yellow-200 bg-yellow-300 text-black shadow-[0_0_24px_rgba(250,204,21,0.35)]';
    }

    if (rank === 2) {
        return 'border-zinc-100 bg-zinc-200 text-black';
    }

    return 'border-orange-500 bg-orange-700 text-white';
}

function podiumPlinthClassNames(rank: number): string {
    if (rank === 1) {
        return 'h-20 border-yellow-300/50 bg-gradient-to-t from-yellow-500/35 to-yellow-300/10';
    }

    if (rank === 2) {
        return 'h-14 border-zinc-100/30 bg-gradient-to-t from-zinc-300/20 to-white/5';
    }

    return 'h-10 border-orange-600/40 bg-gradient-to-t from-orange-700/25 to-orange-500/5';
}

function podiumOrdinal(rank: number): string {
    if (rank === 1) {
        return '1st';
    }

    if (rank === 2) {
        return '2nd';
    }

    return '3rd';
}

export default function Championship() {
    const { standingSeasons, careerResults, contenders2026 } = usePage<ChampionshipPageProps>().props;

    const activeSeasonDefaultYear = useMemo(() => {
        const flagged = standingSeasons.find((s) => s.isActive)?.year;
        if (flagged) {
            return flagged;
        }

        return standingSeasons[0]?.year ?? '2025';
    }, [standingSeasons]);

    const [activeYear, setActiveYear] = useState<string>(activeSeasonDefaultYear);

    const activeSeason = standingSeasons.find((s) => s.year === activeYear);
    const standings: StandingRow[] = activeSeason?.standings ?? [];
    const isFinalStandings = activeSeason?.standingStatus === 'final';
    const divisionLabel = activeSeason?.divisionLabel ?? '';
    const podiumStandings = useMemo(() => {
        const podiumOrder = [2, 1, 3];

        return podiumOrder
            .map((rank) => standings.find((driver) => driver.rank === rank))
            .filter((driver): driver is StandingRow => driver !== undefined);
    }, [standings]);

    return (
        <LandingLayout
            title="Championship | The Leaderboard"
            description="The Leaderboard. Numbers Don't Lie. Grit Doesn't Quit. Follow the 2026 British Truck Racing Championship standings and history."
            image="/images/dave_standing_and_lifting_trophy_as_first_with_the_other_winners.jpg"
        >
            <div className="bg-black min-h-screen">

                {/* Hero Section */}
                <div className="relative pt-32 pb-24 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-50"
                        style={{ backgroundImage: 'url("/images/dave_standing_and_lifting_trophy_as_first_with_the_other_winners.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/65 to-black" />

                    <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 block">
                                The Leaderboard
                            </span>
                            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase italic text-white mb-6 leading-none">
                                Numbers Don't Lie.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Grit Doesn't Quit.</span>
                            </h1>
                            <p className="font-heading font-bold text-xl md:text-2xl text-muted-foreground uppercase tracking-wide max-w-3xl mx-auto">
                                Twenty-five years at the limit. One goal remains.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-background relative z-10 py-24">
                    <div className="container px-4 md:px-6 mx-auto">

                        {/* Section 01: Rankings Table */}
                        <section className="mb-32">
                            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                                <div>
                                    <span className="font-heading text-primary text-sm uppercase tracking-[0.3em] mb-2 block">01</span>
                                    <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                        {activeYear} {divisionLabel}: Division 1
                                    </h2>
                                </div>

                                {/* Rankings Switcher */}
                                <div className="flex bg-secondary/30 border border-white/10 p-1">
                                    {standingSeasons.map((season) => (
                                        <button
                                            key={season.year}
                                            type="button"
                                            onClick={() => setActiveYear(season.year)}
                                            className={`px-6 py-3 font-heading font-bold uppercase text-sm transition-all ${activeYear === season.year
                                                ? 'bg-primary text-white'
                                                : 'text-muted-foreground hover:text-white'
                                                }`}
                                        >
                                            {season.year} {season.divisionLabel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {podiumStandings.length === 3 && (
                                <motion.div
                                    key={`${activeYear}-podium`}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.45, ease: 'easeOut' }}
                                    className="relative mb-12 overflow-hidden border border-white/10 bg-black/70 p-4 md:p-6"
                                >
                                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.16),transparent_28%)]" />
                                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                                    <div className="relative mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                        <div>
                                            <span className="font-heading text-xs font-bold uppercase tracking-[0.35em] text-primary">
                                                Podium
                                            </span>
                                            <h3 className="font-heading mt-2 text-3xl font-black uppercase italic text-white md:text-4xl">
                                                Top three pressure zone
                                            </h3>
                                        </div>
                                        <p className="max-w-xl text-sm text-muted-foreground md:text-right">
                                            Current Division 1 leaders, ranked by published championship points.
                                        </p>
                                    </div>

                                    <div className="relative grid gap-4 md:grid-cols-3 md:items-end">
                                        {podiumStandings.map((driver) => (
                                            <motion.div
                                                key={`${activeYear}-podium-${driver.rank}-${driver.name}`}
                                                layout
                                                whileHover={{ y: -6 }}
                                                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                                                className={`group relative overflow-hidden border ${podiumCardClassNames(driver.rank)}`}
                                            >
                                                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_34%,transparent_64%,rgba(255,255,255,0.06))] opacity-70" />
                                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform duration-500 group-hover:scale-125" />

                                                <div className="relative p-5">
                                                    <div className="mb-5 flex items-start justify-between gap-4">
                                                        <div>
                                                            <span
                                                                className={`font-heading inline-flex h-12 w-12 items-center justify-center rounded-full border text-xl font-black ${podiumBadgeClassNames(driver.rank)}`}
                                                            >
                                                                {driver.rank}
                                                            </span>
                                                            <p className="font-heading mt-3 text-xs font-bold uppercase tracking-[0.3em] text-white/55">
                                                                {driver.rank === 1 ? 'Leader' : podiumOrdinal(driver.rank)}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            {driver.rank === 1 && <Crown className="ml-auto h-9 w-9 text-yellow-300" />}
                                                            {driver.rank === 2 && <Medal className="ml-auto h-9 w-9 text-zinc-100" />}
                                                            {driver.rank === 3 && <Award className="ml-auto h-9 w-9 text-orange-500" />}
                                                            <span className="font-heading mt-2 block text-[10px] font-bold uppercase tracking-[0.28em] text-white/40">
                                                                BTRC D1
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-end gap-4">
                                                        <div
                                                            className={`relative shrink-0 overflow-hidden rounded-full border bg-white/5 p-1 ${
                                                                driver.rank === 1 ? 'border-yellow-300/50' : 'border-white/20'
                                                            }`}
                                                        >
                                                            {driver.profileImage ? (
                                                                <img
                                                                    src={driver.profileImage}
                                                                    alt={driver.name}
                                                                    className={`rounded-full object-cover ${
                                                                        driver.rank === 1 ? 'h-28 w-28' : 'h-24 w-24'
                                                                    }`}
                                                                />
                                                            ) : (
                                                                <div
                                                                    className={`rounded-full bg-white/10 ${
                                                                        driver.rank === 1 ? 'h-28 w-28' : 'h-24 w-24'
                                                                    }`}
                                                                />
                                                            )}
                                                            <span className="absolute inset-x-3 bottom-2 h-4 rounded-full bg-black/50 blur-md" />
                                                        </div>

                                                        <div className="min-w-0 pb-1">
                                                            <h4 className="font-heading truncate text-2xl font-black uppercase italic leading-none text-white">
                                                                {driver.name}
                                                            </h4>
                                                            <p className="mt-2 truncate text-sm text-muted-foreground">{driver.truck}</p>
                                                            {driver.isJenkins && (
                                                                <span className="mt-3 inline-flex bg-primary/50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                                                                    #{driver.racingNumber ?? '69'} Jenkins
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-4">
                                                        <div>
                                                            <span className="font-heading block text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
                                                                Total
                                                            </span>
                                                            <span className="font-heading text-5xl font-black leading-none text-white">
                                                                {driver.points}
                                                            </span>
                                                            <span className="ml-2 text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                                                                pts
                                                            </span>
                                                        </div>
                                                        <span className="font-heading text-7xl font-black leading-none text-white/5">
                                                            {podiumOrdinal(driver.rank)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={`relative border-t ${podiumPlinthClassNames(driver.rank)}`}>
                                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.08)_0,rgba(255,255,255,0.08)_1px,transparent_1px,transparent_10px)]" />
                                                    <div className="relative flex h-full items-center justify-center">
                                                        <span className="font-heading text-4xl font-black text-white/20">
                                                            {podiumOrdinal(driver.rank).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Standings Table */}
                            <div className="overflow-hidden border border-white/10">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 w-16">Rank</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10">Driver</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 hidden md:table-cell">Truck</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 text-right">
                                                Points
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <AnimatePresence mode="wait">
                                            {standings.map((driver, index) => (
                                                <motion.tr
                                                    key={`${activeYear}-${driver.name}`}
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: 50 }}
                                                    transition={{
                                                        duration: 0.4,
                                                        delay: index * 0.08,
                                                        ease: "easeOut"
                                                    }}
                                                    className={standingsTableRowClassNames(driver.rank, Boolean(driver.isJenkins))}
                                                >
                                                    {driver.isJenkins && driver.rank > 3 && (
                                                        <td className="pointer-events-none absolute inset-0">
                                                            <div className="absolute inset-0 animate-pulse bg-primary/10" />
                                                            <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
                                                        </td>
                                                    )}

                                                    <td className="p-4 border-b border-white/10">
                                                        <div className="flex items-center justify-center">
                                                            {driver.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                                                            {driver.rank === 2 && <Medal className="h-5 w-5 text-neutral-300" />}
                                                            {driver.rank === 3 && <Award className="h-5 w-5 text-amber-600" />}
                                                            {driver.rank > 3 && (
                                                                <span className={`font-heading font-black text-lg ${driver.isJenkins ? 'text-primary' : 'text-white/50'}`}>
                                                                    {driver.rank}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className={`p-4 border-b border-white/10 font-bold ${driver.isJenkins ? 'text-white' : 'text-white/90'}`}>
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
                                                                    <span className="ml-2 text-xs bg-primary/50 text-white px-2 py-0.5 uppercase tracking-wider">#{driver.racingNumber ?? '69'}</span>
                                                                )}
                                                            </span>
                                                        </span>
                                                    </td>
                                                    <td className={`p-4 border-b border-white/10 hidden md:table-cell ${driver.isJenkins ? 'text-white/80' : 'text-muted-foreground'}`}>
                                                        {driver.truck}
                                                    </td>
                                                    <td className="p-4 border-b border-white/10 text-right">
                                                        <div className="flex flex-col items-end gap-1 md:flex-row md:items-baseline md:justify-end md:gap-2">
                                                            {!isFinalStandings ? (
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                                                                    {standingsStatusLabel(activeSeason?.standingStatus ?? 'entered')}
                                                                </span>
                                                            ) : null}
                                                            <span
                                                                className={`font-heading text-xl font-black ${driver.isJenkins ? 'text-primary' : 'text-white'}`}
                                                            >
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

                            {/* 2025 Takeaway */}
                            {activeYear === '2025' && isFinalStandings && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-8 bg-primary/10 border border-primary/30 p-6 md:p-8"
                                >
                                    <h3 className="font-heading font-bold uppercase text-primary mb-3 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" /> The 2025 Takeaway
                                    </h3>
                                    <p className="text-white/80 leading-relaxed">
                                        David entered the final round as a mathematical title contender, ultimately clinching <strong className="text-white">3rd Overall</strong>.
                                        His highlight was a dominant <strong className="text-primary">pole-to-flag victory</strong> at the Brands Hatch season finale—a masterclass in defensive driving under immense pressure from the 10-time champion.
                                    </p>
                                </motion.div>
                            )}
                        </section>

                        {/* Section 02: Year-by-Year Legacy */}
                        <section className="mb-32">
                            <div className="mb-12">
                                <span className="font-heading text-primary text-sm uppercase tracking-[0.3em] mb-2 block">02</span>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
                                    The Legacy of <span className="text-primary">Tenacity</span>
                                </h2>
                                <p className="text-muted-foreground max-w-3xl">
                                    Dave Jenkins isn't just a racer; he's the grid's most consistent "Iron Man." While others flicker out, the #69 stays in the mirrors of the leaders, lap after lap, season after season.
                                </p>
                            </div>

                            {/* Quote */}
                            <div className="bg-secondary/20 border-l-4 border-primary p-8 mb-12 max-w-3xl">
                                <p className="font-heading text-2xl font-bold italic text-white">
                                    "In this sport, speed gets you a trophy. Tenacity gets you a dynasty."
                                </p>
                            </div>

                            {/* Year-by-Year Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {careerResults.map((item, index) => (
                                    <motion.div
                                        key={String(item.year)}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative p-6 border text-center group hover:scale-105 transition-transform ${item.highlight
                                            ? 'bg-gradient-to-b from-yellow-500/20 to-yellow-500/5 border-yellow-500'
                                            : 'bg-secondary/20 border-white/10 hover:border-primary/50'
                                            }`}
                                    >
                                        {item.highlight && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <Trophy className="h-6 w-6 text-yellow-500" />
                                            </div>
                                        )}
                                        <span className="block font-heading font-black text-3xl text-white mb-2">{item.year}</span>
                                        <span className={`block text-sm font-bold uppercase tracking-wider ${item.highlight ? 'text-yellow-500' : 'text-primary'
                                            }`}>
                                            {item.result}
                                        </span>
                                        <span className="block text-xs text-muted-foreground mt-1">{item.division}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Jenkins Grit */}
                            <div className="mt-12 bg-white/5 border border-white/10 p-8">
                                <h3 className="font-heading font-black uppercase text-white text-xl mb-4">The "Jenkins Grit"</h3>
                                <p className="text-white/80 leading-relaxed">
                                    Dave's tenacity is legendary. In the 2025 campaign, despite mechanical setbacks mid-season,
                                    he clawed back points through sheer technical intuition. He doesn't just drive the truck; he <em>feels</em> every vibration in the chassis.
                                    That molecular understanding is why he has remained in the <strong className="text-primary">Top 3 for five consecutive years</strong>.
                                </p>
                            </div>
                        </section>

                        {/* Section 03: 2026 The New War */}
                        <section className="mb-32">
                            <div className="mb-12">
                                <span className="font-heading text-primary text-sm uppercase tracking-[0.3em] mb-2 block">03</span>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
                                    2026: The New <span className="text-destructive">War</span>
                                </h2>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <strong className="text-white">Round 1:</strong> Brands Hatch, April 4–5
                                    </span>
                                    <span className="text-white/20">|</span>
                                    <span className="uppercase tracking-widest text-amber-500">Pre-Season Prep</span>
                                </div>
                            </div>

                            {/* Contenders */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {contenders2026.map((contender, index) => (
                                    <motion.div
                                        key={contender.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`relative p-6 border transition-all hover:scale-105 ${contender.threat === 'jenkins'
                                            ? 'bg-primary/20 border-primary'
                                            : contender.threat === 'extreme'
                                                ? 'bg-destructive/10 border-destructive/50'
                                                : 'bg-secondary/20 border-white/10'
                                            }`}
                                    >
                                        <span className="font-heading font-black text-5xl text-white/10 absolute top-2 right-4">
                                            {index + 1}
                                        </span>
                                        {contender.profileImage ? (
                                            <img
                                                src={contender.profileImage}
                                                alt={contender.name}
                                                className="mb-3 h-16 w-16 rounded-full border border-white/15 object-cover"
                                            />
                                        ) : null}
                                        <h3 className={`font-heading font-bold text-xl uppercase mb-2 ${contender.threat === 'jenkins' ? 'text-primary' : 'text-white'
                                            }`}>
                                            {contender.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{contender.title}</p>
                                        {contender.threat === 'jenkins' && (
                                            <div className="mt-4 text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                                                <Target className="h-4 w-4" /> Our Driver
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Section 04: The Vibe */}
                        <section className="mb-16">
                            <div className="mb-12">
                                <span className="font-heading text-primary text-sm uppercase tracking-[0.3em] mb-2 block">04</span>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                    The Vibe: Why We're <span className="text-destructive">Lit</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: Volume2,
                                        title: 'The Noise',
                                        description: 'A 1,200 BHP turbo-diesel scream that you feel in your chest.',
                                        color: 'primary'
                                    },
                                    {
                                        icon: Eye,
                                        title: 'The Sight',
                                        description: '5.5 tonnes of Blue and Black carbon-fiber sliding through Paddock Hill Bend at 100mph.',
                                        color: 'primary'
                                    },
                                    {
                                        icon: Zap,
                                        title: 'The Man',
                                        description: 'Dave Jenkins doesn\'t do "safe." He does precision. He does power. He does victory.',
                                        color: 'destructive'
                                    }
                                ].map((vibe, index) => (
                                    <motion.div
                                        key={vibe.title}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="group bg-secondary/20 border border-white/10 p-8 hover:border-primary/50 transition-colors"
                                    >
                                        <vibe.icon className={`h-10 w-10 mb-6 ${vibe.color === 'destructive' ? 'text-destructive' : 'text-primary'} group-hover:scale-110 transition-transform`} />
                                        <h3 className="font-heading font-black text-2xl uppercase text-white mb-4">{vibe.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{vibe.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <div className="text-center pt-12 border-t border-white/10">
                            <p className="text-muted-foreground mb-6">Want to see the #69 MAN in action?</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-primary text-white font-heading font-bold uppercase italic px-8 hover:bg-white hover:text-black"
                                    asChild
                                >
                                    <Link href="/season">
                                        View 2026 Calendar <ChevronRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/20 text-white font-heading font-bold uppercase italic px-8 hover:bg-white hover:text-black"
                                    asChild
                                >
                                    <Link href="/the-machine">
                                        Meet The Machine
                                    </Link>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
