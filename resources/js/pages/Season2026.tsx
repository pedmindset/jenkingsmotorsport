import LandingLayout from '@/layouts/LandingLayout';
import { StandingsTableBlock } from '@/components/motorsport/StandingsTableBlock';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Calendar, MapPin, Flag, Clock, Target, Users,
    ChevronRight, ChevronDown, Timer, Globe, Flame, Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useMemo } from 'react';
import type { PageProps } from '@inertiajs/core';
import { motorsportLucideIcon } from '@/lib/motorsport-icons';
import { cn } from '@/lib/utils';
import type { RoundResultsRoundPayload, SeasonPageSeason, SeasonRaceRow, SeasonStandingTablePayload } from '@/types/motorsport';

type Season2026Props = PageProps & {
    season: SeasonPageSeason;
    races: SeasonRaceRow[];
    standingTable: SeasonStandingTablePayload;
    roundResults: RoundResultsRoundPayload[];
    meta?: {
        title?: string;
        description?: string;
        image?: string;
    };
};

interface Race extends SeasonRaceRow {
    dateObj: Date;
}

export default function Season2026() {
    const { season, races: raceRows, standingTable, roundResults, meta: pageMeta } = usePage<Season2026Props>().props;

    const races: Race[] = useMemo(
        () => raceRows.map((r) => ({ ...r, dateObj: new Date(r.startsAt) })),
        [raceRows],
    );

    const roundsWithData = useMemo(
        () => roundResults.filter((r) => r.results.length > 0),
        [roundResults],
    );

    const [openRoundEvent, setOpenRoundEvent] = useState<string | null>(
        () => roundResults.find((r) => r.results.length > 0)?.event ?? null,
    );

    const seasonObjectives = useMemo(() => {
        const raw = season.objectives ?? [];
        return raw.map((o) => ({
            icon: motorsportLucideIcon(o.icon),
            title: o.title,
            description: o.description,
        }));
    }, [season.objectives]);

    const banner = season.previousSeasonBanner;
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [nextRace, setNextRace] = useState<Race | null>(null);

    useEffect(() => {
        const findNextRace = () => {
            const now = new Date();
            for (const race of races) {
                if (race.dateObj > now) {
                    return race;
                }
            }
            return races[0]; // Default to first race if all passed
        };

        const updateCountdown = () => {
            const next = findNextRace();
            setNextRace(next);

            if (next) {
                const now = new Date().getTime();
                const target = next.dateObj.getTime();
                const diff = Math.max(0, target - now);

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setCountdown({ days, hours, minutes, seconds });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [races]);

    const seasonSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": `${season.year} British Truck Racing Championship Season`,
        "description": `The ${season.year} race calendar for Jenkins Motorsports.`,
        "itemListElement": races.map((race, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": `${race.venue} - ${race.title}`
        }))
    };

    return (
        <LandingLayout
            title={pageMeta?.title ?? `${season.year} Season | The Pursuit of the #1 Plate`}
            description={pageMeta?.description ?? `Follow Jenkins Motorsports' ${season.year} British Truck Racing Championship campaign — calendar, standings, and round results.`}
            image={pageMeta?.image ?? '/images/dave_truck_on_racing_tracks_as_first.jpg'}
            schema={seasonSchema}
        >
            <div className="bg-black min-h-screen">

                {/* Hero Section */}
                <div className="relative pt-32 pb-24 overflow-hidden">
                    {/* Background image with overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-30"
                        style={{ backgroundImage: 'url("/images/dave_truck_on_racing_tracks_as_first.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />

                    <div className="container px-4 md:px-6 mx-auto relative z-10">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary" />
                                <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                                    <Flag className="h-4 w-4" />
                                    {season.year} BTRC Campaign
                                </span>
                                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary" />
                            </div>

                            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase italic text-white mb-4 leading-tight">
                                7 Rounds. 34 Races.<br />
                                <span className="text-primary">No Margin for Error.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
                                Following a podium-clinching <span className="text-white font-semibold">3rd place finish in 2025</span>,
                                Jenkins Motorsports enters {season.year} to battle the fastest grid in BTRC history.
                            </p>
                        </motion.div>

                        {/* Countdown Timer */}
                        {nextRace && (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="max-w-4xl mx-auto"
                            >
                                <div className="bg-gradient-to-r from-secondary/50 via-secondary/30 to-secondary/50 border border-white/10 p-6 md:p-8">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                        <div className="text-center md:text-left">
                                            <div className="flex items-center gap-2 text-primary mb-2 justify-center md:justify-start">
                                                <Timer className="h-5 w-5" />
                                                <span className="font-heading text-sm uppercase tracking-widest">Next Race</span>
                                            </div>
                                            <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase italic text-white">
                                                {nextRace.title}
                                            </h3>
                                            <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start mt-1">
                                                <MapPin className="h-4 w-4" />
                                                {nextRace.venue}
                                            </p>
                                        </div>

                                        <div className="flex gap-4 md:gap-6">
                                            {[
                                                { value: countdown.days, label: 'Days' },
                                                { value: countdown.hours, label: 'Hrs' },
                                                { value: countdown.minutes, label: 'Min' },
                                                { value: countdown.seconds, label: 'Sec' },
                                            ].map((unit) => (
                                                <div key={unit.label} className="text-center">
                                                    <div className="bg-black border border-primary/50 w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mb-2">
                                                        <span className="font-heading text-3xl md:text-4xl font-bold text-white">
                                                            {String(unit.value).padStart(2, '0')}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs uppercase tracking-widest text-muted-foreground">{unit.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-background relative z-10">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

                    <div className="container px-4 md:px-6 mx-auto py-24">

                        {/* 2025 Result Banner */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-l-4 border-amber-500 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-20 h-20 bg-amber-500/20 rounded-full shrink-0">
                                    <Award className="h-10 w-10 text-amber-500" />
                                </div>
                                <div className="text-center md:text-left">
                                    <span className="text-amber-500 font-heading text-sm uppercase tracking-widest">{banner?.eyebrow ?? '2025 Season Result'}</span>
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase italic text-white mt-1">
                                        {banner?.title ?? '3rd Place Overall — 413 Points'}
                                    </h3>
                                    <p className="text-muted-foreground mt-2">
                                        {banner?.body ?? 'A hard-fought campaign with consistent podium finishes. Now, the singular objective: reclaiming the Division 1 Title.'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Race Calendar */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">Official Schedule</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                    {season.year} Race <span className="text-primary">Calendar</span>
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {races.map((race, index) => (
                                    <motion.div
                                        key={race.event}
                                        initial={{ x: -30, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`group relative bg-gradient-to-r from-secondary/40 to-secondary/20 border border-white/10 hover:border-primary/50 transition-all duration-300 overflow-hidden ${race.isInternational ? 'ring-1 ring-amber-500/30' : ''}`}
                                    >
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        <div className="relative p-6 md:p-8">
                                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                                {/* Event Number */}
                                                <div className="lg:col-span-1">
                                                    <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                                        <span className="font-heading text-2xl font-bold text-primary">{race.event}</span>
                                                    </div>
                                                </div>

                                                {/* Title and Venue */}
                                                <div className="lg:col-span-4">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {race.isInternational && (
                                                            <Globe className="h-4 w-4 text-amber-500" />
                                                        )}
                                                        {race.highlight && (
                                                            <span className="text-xs uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5">
                                                                {race.highlight}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="font-heading text-2xl font-bold uppercase italic text-white group-hover:text-primary transition-colors">
                                                        {race.title}
                                                    </h3>
                                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                                        <MapPin className="h-4 w-4 text-primary/70" />
                                                        {race.venue}
                                                        {race.isInternational && (
                                                            <span className="text-amber-500 text-sm">({race.country})</span>
                                                        )}
                                                    </p>
                                                </div>

                                                {/* Date */}
                                                <div className="lg:col-span-2">
                                                    <div className="flex items-center gap-2 text-white">
                                                        <Calendar className="h-5 w-5 text-primary/70" />
                                                        <span className="font-heading font-bold uppercase">{race.date}</span>
                                                    </div>
                                                </div>

                                                {/* Rounds */}
                                                <div className="lg:col-span-2">
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <Flag className="h-4 w-4 text-primary/70" />
                                                        <span className="text-sm">Rounds {race.rounds}</span>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                <div className="lg:col-span-3">
                                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                                        {race.description}
                                                    </p>
                                                    {race.link && (
                                                        <Link href={race.link} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-destructive mt-3 hover:text-white transition-colors">
                                                            View Feature Page <ChevronRight className="h-3 w-3" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom accent line */}
                                        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-destructive group-hover:w-full transition-all duration-500" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Published championship totals */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <StandingsTableBlock
                                eyebrow="Championship"
                                title={`${season.year} ${standingTable.divisionLabel}`}
                                rows={standingTable.standings}
                                standingStatus={standingTable.standingStatus}
                            />
                        </motion.div>

                        {/* Round-by-round (per event, Division 1) */}
                        {roundsWithData.length > 0 && (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="mb-24"
                            >
                                <div className="mb-12 text-center">
                                    <span className="font-heading mb-2 block text-sm uppercase tracking-[0.3em] text-primary">Results</span>
                                    <h2 className="font-heading text-4xl font-black uppercase italic text-white md:text-5xl">
                                        Round-by-round <span className="text-primary">scores</span>
                                    </h2>
                                    <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
                                        Weekend points from each championship round (editor-maintained). Championship totals above remain the published summary.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {roundsWithData.map((round) => {
                                        const expanded = openRoundEvent === round.event;

                                        return (
                                            <div key={round.event} className="overflow-hidden border border-white/10 bg-secondary/20">
                                                <button
                                                    type="button"
                                                    className="flex w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-white/5 md:px-6"
                                                    onClick={() => setOpenRoundEvent(expanded ? null : round.event)}
                                                >
                                                    <span className="font-heading text-xl font-black text-primary">{round.event}</span>
                                                    <span className="font-heading flex-1 text-lg font-bold uppercase italic text-white">
                                                        {round.title}
                                                    </span>
                                                    <span className="hidden text-sm text-muted-foreground md:inline">
                                                        {round.dateDisplay} · {round.venue}
                                                    </span>
                                                    <ChevronDown
                                                        className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', expanded && 'rotate-180')}
                                                    />
                                                </button>
                                                {expanded && (
                                                    <div className="border-t border-white/10 px-2 pb-4 pt-2 md:px-4">
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                                                                <thead className="bg-white/5 text-xs uppercase text-muted-foreground">
                                                                    <tr>
                                                                        <th className="p-3">Pos</th>
                                                                        <th className="p-3">Driver</th>
                                                                        <th className="hidden p-3 md:table-cell">Truck</th>
                                                                        <th className="p-3 text-right">Pts</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {round.results.map((row, idx) => (
                                                                        <tr
                                                                            key={`${round.event}-${row.driverName}-${idx}`}
                                                                            className={cn(
                                                                                'border-t border-white/10',
                                                                                row.isJenkins && 'bg-primary/15',
                                                                            )}
                                                                        >
                                                                            <td className="p-3 font-mono text-white/80">
                                                                                {row.position ?? '—'}
                                                                            </td>
                                                                            <td className="p-3 font-semibold text-white">
                                                                                <span className="flex items-center gap-2">
                                                                                    {row.profileImage ? (
                                                                                        <img
                                                                                            src={row.profileImage}
                                                                                            alt={row.driverName}
                                                                                            className="h-8 w-8 shrink-0 rounded-full border border-white/15 object-cover"
                                                                                        />
                                                                                    ) : null}
                                                                                    <span>
                                                                                        {row.driverName}
                                                                                        {row.isJenkins && (
                                                                                            <span className="ml-2 bg-primary/40 px-1.5 py-0.5 text-xs text-white">
                                                                                                #{row.racingNumber ?? '69'}
                                                                                            </span>
                                                                                        )}
                                                                                    </span>
                                                                                </span>
                                                                            </td>
                                                                            <td className="hidden p-3 text-muted-foreground md:table-cell">{row.truck}</td>
                                                                            <td className="p-3 text-right font-heading text-base font-black text-primary">
                                                                                {row.points}
                                                                                {row.status && row.status !== 'finished' && (
                                                                                    <span className="ml-2 text-xs font-normal uppercase text-amber-500">
                                                                                        {row.status}
                                                                                    </span>
                                                                                )}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}

                        {/* Key Battlegrounds */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="text-center mb-12">
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                    Key <span className="text-destructive">Battlegrounds</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Brands Hatch */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-primary font-heading text-sm uppercase tracking-widest">Round 01</span>
                                    <h3 className="font-heading text-2xl font-bold uppercase italic text-white mt-2 mb-4">
                                        Brands Hatch
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        The Easter Awakening. After finishing 2025 as the 3rd best driver in the country, David starts here with the momentum of a consistent podium finisher.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-white/50">
                                        <Flame className="h-4 w-4 text-primary" />
                                        <span>No pre-season testing — pure experience</span>
                                    </div>
                                </motion.div>

                                {/* Donington */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8 relative overflow-hidden group hover:border-amber-500/50 transition-colors"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-amber-500 font-heading text-sm uppercase tracking-widest">Round 05</span>
                                    <h3 className="font-heading text-2xl font-bold uppercase italic text-white mt-2 mb-4">
                                        Donington Park
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        The crown jewel of British trucking. 100,000+ spectators — the primary B2B hub where technical partners and sponsors witness the #69 MAN under maximum pressure.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-white/50">
                                        <Users className="h-4 w-4 text-amber-500" />
                                        <span>Elite networking in VIP paddock</span>
                                    </div>
                                </motion.div>

                                {/* Le Mans */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8 relative overflow-hidden group hover:border-destructive/50 transition-colors"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-destructive font-heading text-sm uppercase tracking-widest">Round 06</span>
                                    <h3 className="font-heading text-2xl font-bold uppercase italic text-white mt-2 mb-4">
                                        Le Mans, France
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Circuit Bugatti. An international round adding logistical complexity — proving the Jenkins pedigree translates across borders in front of a massive European crowd.
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-white/50">
                                            <Globe className="h-4 w-4 text-destructive" />
                                            <span>French tarmac, European glory</span>
                                        </div>
                                        <Link href="/le-mans" className="text-destructive text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
                                            Explore <ChevronRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Balance of Performance */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <div className="inline-flex items-center gap-2 mb-4">
                                        <Target className="h-5 w-5 text-amber-500" />
                                        <span className="font-heading text-sm uppercase tracking-widest text-amber-500">{season.year} Regulations</span>
                                    </div>
                                    <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
                                        Balance of <span className="text-amber-500">Performance</span>
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-6">
                                        In {season.year}, the stakes are heightened by BoP regulations. Because David finished 3rd in the 2025 standings with <span className="text-white font-semibold">413 points</span>, he enters the new season as a marked man.
                                    </p>
                                    <div className="space-y-4">
                                        <div className="bg-secondary/30 border-l-4 border-amber-500 p-4">
                                            <strong className="text-white block mb-1">The "Handicap" of Success</strong>
                                            <p className="text-sm text-muted-foreground">
                                                Top-tier finishers face strict air restrictor mandates to maintain parity across the 20-truck grid.
                                            </p>
                                        </div>
                                        <div className="bg-secondary/30 border-l-4 border-primary p-4">
                                            <strong className="text-white block mb-1">The Strategy</strong>
                                            <p className="text-sm text-muted-foreground">
                                                Maximizing low-end torque to overcome top-end air limitations, ensuring the MAN TGX remains the most explosive machine off the line.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/30 p-8 text-center">
                                        <div className="inline-block border-4 border-dashed border-white/30 rounded-full p-6 w-40 h-40 flex items-center justify-center mx-auto mb-6">
                                            <div className="w-full h-full rounded-full border-[12px] border-amber-500 flex items-center justify-center bg-black">
                                                <span className="text-white font-heading text-2xl">67mm</span>
                                            </div>
                                        </div>
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">Air Restrictor</h3>
                                        <p className="text-sm text-muted-foreground">
                                            The price of podium finishes — a physical restriction on the turbocharger inlet.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Season Objectives */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-24"
                        >
                            <div className="text-center mb-12">
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                    The <span className="text-primary">"Jenkins Way"</span>
                                </h2>
                                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                                    Three core objectives driving every decision in the {season.year} campaign.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {seasonObjectives.map((objective, index) => (
                                    <motion.div
                                        key={objective.title}
                                        initial={{ y: 30, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8 text-center hover:border-primary/50 transition-colors group"
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                                            <objective.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-3">{objective.title}</h3>
                                        <p className="text-sm text-muted-foreground">{objective.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA Section */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30 p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase italic text-white mb-4">
                                        Follow the Journey
                                    </h3>
                                    <p className="text-muted-foreground max-w-xl">
                                        Get behind-the-scenes access with the "Paddock Pass" Blog. Race reports, technical breakdowns, and exclusive team content.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        className="bg-primary text-black font-heading font-bold uppercase px-8 py-6 hover:bg-white transition-colors"
                                        asChild
                                    >
                                        <Link href="/blog">
                                            Read the Blog
                                            <ChevronRight className="h-5 w-5 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-white/30 text-white font-heading font-bold uppercase px-8 py-6 hover:bg-white hover:text-black transition-colors"
                                        asChild
                                    >
                                        <Link href="/sponsorship">
                                            Partner With Us
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
