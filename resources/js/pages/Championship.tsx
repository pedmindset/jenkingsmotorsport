import LandingLayout from '@/layouts/LandingLayout';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Zap, Volume2, Eye, Target, ChevronRight, Crown, Medal, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Driver {
    rank: number;
    name: string;
    truck: string;
    points: number;
    isJenkins?: boolean;
}

const standings2025: Driver[] = [
    { rank: 1, name: 'Ryan Smith', truck: 'Daimler Freightliner', points: 463 },
    { rank: 2, name: 'Stuart Oliver', truck: 'Volvo VNL', points: 428 },
    { rank: 3, name: 'David Jenkins', truck: 'MAN TGX', points: 413, isJenkins: true },
    { rank: 4, name: 'John Bowler', truck: 'MAN TGX', points: 373 },
    { rank: 5, name: 'Michael Oliver', truck: 'MAN TGS', points: 360 },
    { rank: 6, name: 'Martin Gibson', truck: 'MAN TGS', points: 337 },
];

// 2026 is pre-season, so we show projected/entry list
const standings2026: Driver[] = [
    { rank: 1, name: 'Ryan Smith', truck: 'Daimler Freightliner', points: 0 },
    { rank: 2, name: 'Stuart Oliver', truck: 'Volvo VNL', points: 0 },
    { rank: 3, name: 'David Jenkins', truck: 'MAN TGX', points: 0, isJenkins: true },
    { rank: 4, name: 'Michael Oliver', truck: 'MAN TGS', points: 0 },
    { rank: 5, name: 'John Bowler', truck: 'MAN TGX', points: 0 },
    { rank: 6, name: 'Shane Reid', truck: 'MAN TGS', points: 0 },
];

const yearByYear = [
    { year: '2025', result: '3rd Overall', division: 'BTRC Division 1', highlight: false },
    { year: '2024', result: '3rd Overall', division: 'BTRC Division 1', highlight: false },
    { year: '2023', result: '3rd Overall', division: 'BTRC Division 1', highlight: false },
    { year: '2022', result: 'Runner-Up', division: 'BTRC Division 1', highlight: false },
    { year: '2021', result: 'Runner-Up', division: 'BTRC Division 1', highlight: false },
    { year: '2011', result: 'BRITISH CHAMPION', division: 'Division 1', highlight: true },
];

const contenders2026 = [
    { name: 'Ryan Smith', title: 'Chasing a record 11th title', threat: 'extreme' },
    { name: 'Stuart Oliver', title: 'The 10-time veteran rival', threat: 'high' },
    { name: 'David Jenkins', title: 'The tactical "Apex Predator"', threat: 'jenkins' },
    { name: 'Michael Oliver', title: 'The rising force in the Oliver dynasty', threat: 'high' },
];

export default function Championship() {
    const [activeYear, setActiveYear] = useState<'2025' | '2026'>('2025');
    const standings = activeYear === '2025' ? standings2025 : standings2026;

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
                                        {activeYear} {activeYear === '2025' ? 'Final' : 'Entry List'}: Division 1
                                    </h2>
                                </div>

                                {/* Rankings Switcher */}
                                <div className="flex bg-secondary/30 border border-white/10 p-1">
                                    <button
                                        onClick={() => setActiveYear('2025')}
                                        className={`px-6 py-3 font-heading font-bold uppercase text-sm transition-all ${activeYear === '2025'
                                            ? 'bg-primary text-white'
                                            : 'text-muted-foreground hover:text-white'
                                            }`}
                                    >
                                        2025 Final
                                    </button>
                                    <button
                                        onClick={() => setActiveYear('2026')}
                                        className={`px-6 py-3 font-heading font-bold uppercase text-sm transition-all ${activeYear === '2026'
                                            ? 'bg-primary text-white'
                                            : 'text-muted-foreground hover:text-white'
                                            }`}
                                    >
                                        2026 Season
                                    </button>
                                </div>
                            </div>

                            {/* Standings Table */}
                            <div className="overflow-hidden border border-white/10">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 w-16">Rank</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10">Driver</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 hidden md:table-cell">Truck</th>
                                            <th className="p-4 font-heading uppercase text-xs text-muted-foreground border-b border-white/10 text-right">
                                                {activeYear === '2025' ? 'Points' : 'Status'}
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
                                                    className={`relative transition-colors ${driver.isJenkins
                                                        ? 'bg-primary/20 hover:bg-primary/30'
                                                        : 'hover:bg-white/5'
                                                        }`}
                                                >
                                                    {/* Jenkins Glow Effect */}
                                                    {driver.isJenkins && (
                                                        <td className="absolute inset-0 pointer-events-none">
                                                            <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                                                        </td>
                                                    )}

                                                    <td className="p-4 border-b border-white/10">
                                                        <div className="flex items-center justify-center">
                                                            {driver.rank === 1 && <Crown className="h-5 w-5 text-yellow-500" />}
                                                            {driver.rank === 2 && <Medal className="h-5 w-5 text-neutral-400" />}
                                                            {driver.rank === 3 && <Award className="h-5 w-5 text-amber-700" />}
                                                            {driver.rank > 3 && (
                                                                <span className={`font-heading font-black text-lg ${driver.isJenkins ? 'text-primary' : 'text-white/50'}`}>
                                                                    {driver.rank}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className={`p-4 border-b border-white/10 font-bold ${driver.isJenkins ? 'text-white' : 'text-white/90'}`}>
                                                        {driver.name}
                                                        {driver.isJenkins && (
                                                            <span className="ml-2 text-xs bg-primary/50 text-white px-2 py-0.5 uppercase tracking-wider">#69</span>
                                                        )}
                                                    </td>
                                                    <td className={`p-4 border-b border-white/10 hidden md:table-cell ${driver.isJenkins ? 'text-white/80' : 'text-muted-foreground'}`}>
                                                        {driver.truck}
                                                    </td>
                                                    <td className="p-4 border-b border-white/10 text-right">
                                                        {activeYear === '2025' ? (
                                                            <span className={`font-heading font-black text-xl ${driver.isJenkins ? 'text-primary' : 'text-white'}`}>
                                                                {driver.points}
                                                            </span>
                                                        ) : (
                                                            <span className="text-xs uppercase tracking-wider text-amber-500 font-bold">
                                                                Entered
                                                            </span>
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </AnimatePresence>
                                    </tbody>
                                </table>
                            </div>

                            {/* 2025 Takeaway */}
                            {activeYear === '2025' && (
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
                                {yearByYear.map((item, index) => (
                                    <motion.div
                                        key={item.year}
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
