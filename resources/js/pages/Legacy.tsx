import LandingLayout from '@/layouts/LandingLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BadgeCheck, Clock, Hammer, Trophy, TrendingUp, Flag } from 'lucide-react';

const TimelineSection = ({
    year,
    title,
    subTitle,
    content,
    image,
    filterClass,
    themeColor,
    align = 'left'
}: {
    year: string,
    title: string,
    subTitle: string,
    content: React.ReactNode,
    image: string,
    filterClass: string,
    themeColor: string,
    align?: 'left' | 'right'
}) => {
    return (
        <div className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image with Filter */}
            <div className="absolute inset-0 z-0">
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out scale-105 ${filterClass}`}
                    style={{ backgroundImage: `url('${image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-10" />
            </div>

            <div className={`container relative z-20 px-4 md:px-6 mx-auto flex ${align === 'right' ? 'justify-end' : 'justify-start'}`}>
                <motion.div
                    initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <div className={`flex items-center gap-4 mb-6 ${themeColor === 'jenkins-gold' ? 'text-yellow-500' : themeColor === 'primary' ? 'text-primary' : 'text-white'}`}>
                        <span className="font-heading font-black text-8xl opacity-20 absolute -top-12 -left-8 md:-left-16 pointer-events-none select-none">
                            {year}
                        </span>
                        <div className={`h-1 w-12 bg-current`} />
                        <span className="font-heading font-bold uppercase tracking-[0.3em]">{year} Era</span>
                    </div>

                    <h2 className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white mb-6 leading-none">
                        {title}
                    </h2>

                    <h3 className="font-heading text-xl md:text-2xl font-bold uppercase text-white/80 mb-8 border-l-4 pl-6 py-2" style={{ borderColor: themeColor === 'jenkins-gold' ? '#eab308' : themeColor === 'primary' ? 'var(--primary)' : 'white' }}>
                        {subTitle}
                    </h3>

                    <div className="text-lg md:text-xl text-muted-foreground font-sans leading-relaxed space-y-6">
                        {content}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function Legacy() {
    const legacySchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Jenkins Motorsports",
        "foundingDate": "1984",
        "founder": {
            "@type": "Person",
            "name": "Tony Jenkins"
        },
        "description": "The gold standard of British Truck Racing since 1984."
    };

    return (
        <LandingLayout
            title="Legacy | The Dynasty"
            description="Forty Years. Two Generations. The story of Jenkins Motorsports is the story of British Truck Racing itself. Explore the timeline from 1984 to 2026."
            image="/images/tony_jenkins_championship_truck.jpg"
            schema={legacySchema}
        >
            <div className="bg-black text-white">

                {/* Hero Section */}
                <div className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale"
                        style={{ backgroundImage: 'url("/images/tony_jenkins_championship_truck.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />

                    <div className="container relative z-10 text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <span className="font-heading text-primary font-bold uppercase tracking-[0.5em] mb-4 block">
                                The Chronicle
                            </span>
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black uppercase italic text-white mb-6 leading-none">
                                Forty Years.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Two Generations.</span>
                            </h1>
                            <p className="font-heading text-xl md:text-2xl font-bold uppercase tracking-widest text-muted-foreground max-w-3xl mx-auto">
                                The story of Jenkins Motorsports is the story of British Truck Racing itself.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs uppercase tracking-widest text-muted-foreground">Begin the Journey</span>
                            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
                        </div>
                    </motion.div>
                </div>

                {/* 1984: The Big Bang */}
                <TimelineSection
                    year="1984"
                    title="The Big Bang"
                    subTitle="Tony Jenkins & The Dawn of Heavy Metal"
                    image="/images/tony_jenkins_championship_truck.jpg"
                    filterClass="grayscale contrast-125"
                    themeColor="white"
                    content={
                        <>
                            <p>
                                In September 1984, the British Truck Racing Association (BTRA) was born out of a dare at Donington Park.
                                <strong className="text-white"> Tony Jenkins</strong> was one of the few who saw the future.
                                Standing on that inaugural grid among 80,000 stunned fans, Tony helped turn a spectacle into a sport.
                            </p>
                            <ul className="space-y-4 mt-4 text-white/80 text-base">
                                <li className="flex gap-4">
                                    <Clock className="h-6 w-6 shrink-0" />
                                    <span>
                                        <strong>The Pioneer’s Rig:</strong> No racing gearboxes. No water-cooled brakes.
                                        Just double-declutching and mechanical intuition to prevent 5-tonne machines from overshooting corners at 100mph.
                                    </span>
                                </li>
                                <li className="flex gap-4">
                                    <Flag className="h-6 w-6 shrink-0" />
                                    <span>
                                        <strong>The Apprentice:</strong> An eight-year-old David Jenkins watched from the pits, absorbing the smell of hot diesel.
                                        This was the foundation of the mechanical molecularity that defines his engineering today.
                                    </span>
                                </li>
                            </ul>
                        </>
                    }
                />

                {/* 1997-2010: The Forge */}
                <TimelineSection
                    year="1997"
                    title="The Forge"
                    subTitle="From Repairing to Engineering"
                    image="/images/team_working_on_truck.jpg"
                    filterClass="sepia-[.3] contrast-125 brightness-75"
                    themeColor="white"
                    align="right"
                    content={
                        <>
                            <p>
                                David Jenkins didn't just inherit a seat; he earned it by restoring his father’s old fleet.
                                His 1997 debut at Donington ended in a frame-twisting wreck, but instead of quitting, he went back to the workshop in Stone.
                            </p>
                            <div className="mt-6 bg-white/5 border border-white/10 p-6">
                                <h4 className="flex items-center gap-2 font-bold uppercase text-white mb-2">
                                    <Hammer className="h-5 w-5" /> The Builder Era
                                </h4>
                                <p className="text-sm">
                                    Over the next decade, the team transitioned from "repairing" to "developing."
                                    Using his background as a professional technician, David built the team's first bespoke racing chassis,
                                    moving away from modified road units to specialized Division 1 titans.
                                </p>
                            </div>
                        </>
                    }
                />

                {/* 2011: The Zenith */}
                <TimelineSection
                    year="2011"
                    title="The Zenith"
                    subTitle="Division 1 Champions"
                    image="/images/dave_standing_and_lifting_trophy.jpg"
                    filterClass=""
                    themeColor="jenkins-gold"
                    content={
                        <>
                            <p>
                                The 2011 season remains etched in history. After 14 years of refining his craft, David Jenkins secured the
                                <span className="text-yellow-500 font-bold"> Division 1 British Truck Racing Championship Title</span>.
                            </p>
                            <p>
                                This victory validated forty years of the Jenkins name. It proved that a family-run, technician-led team
                                could out-engineer factory-backed efforts through superior tactical driving and mechanical precision.
                            </p>
                            <div className="mt-6 inline-flex items-center gap-4 text-yellow-500 border border-yellow-500/50 bg-yellow-500/10 px-6 py-3 rounded-none uppercase font-bold tracking-widest">
                                <Trophy className="h-6 w-6" />
                                Champion Status Verified
                            </div>
                        </>
                    }
                />

                {/* 2026: The Modern Pinnacle */}
                <TimelineSection
                    year="2026"
                    title="The Pinnacle"
                    subTitle="Chasing the Final Tenths"
                    image="/images/dave_truck_on_racing_tracks_as_first.jpg"
                    filterClass="saturate-150 contrast-110"
                    themeColor="primary"
                    align="right"
                    content={
                        <>
                            <p>
                                Today, the #69 MAN TGX is a digital ghost of Tony’s 1984 rig.
                                With a <strong className="text-white">3rd Place overall finish in 2025</strong> and over 25 years of continuous competition data,
                                we aren't just racing against the grid; we are racing against our own history.
                            </p>
                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <div className="bg-primary/20 border border-primary p-4 text-center">
                                    <span className="block text-4xl font-black text-white mb-1">25+</span>
                                    <span className="text-xs uppercase text-primary tracking-widest">Years on Grid</span>
                                </div>
                                <div className="bg-primary/20 border border-primary p-4 text-center">
                                    <span className="block text-4xl font-black text-white mb-1">#3</span>
                                    <span className="text-xs uppercase text-primary tracking-widest">2025 Rank</span>
                                </div>
                            </div>
                        </>
                    }
                />

                {/* Verified Fact Check Table */}
                <div className="bg-neutral-950 py-24 border-t border-white/10">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="font-heading text-3xl font-black uppercase italic text-white mb-12 text-center">
                                Verified <span className="text-primary">Fact Check</span>
                            </h2>

                            <div className="overflow-hidden border border-white/10">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-white/5">
                                        <tr>
                                            <th className="p-4 font-heading uppercase text-sm text-muted-foreground border-b border-white/10">Information</th>
                                            <th className="p-4 font-heading uppercase text-sm text-muted-foreground border-b border-white/10">Status</th>
                                            <th className="p-4 font-heading uppercase text-sm text-muted-foreground border-b border-white/10">Verification Detail</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {[
                                            { info: 'BTRA Founding', status: 'Verified', detail: 'Founded in 1984; inaugural race at Donington Park.' },
                                            { info: 'Tony Jenkins', status: 'Verified', detail: 'Pioneer driver on the 1984 grid; sparked David\'s career.' },
                                            { info: 'David\'s Tenure', status: 'Verified', detail: 'Officially celebrated 25 consecutive years in BTRC.' },
                                            { info: '2011 Title', status: 'Verified', detail: 'David Jenkins won the Division 1 Championship in 2011.' },
                                            { info: '2025 Result', status: 'Verified', detail: '3rd Place Overall finish in the 2025 season.' },
                                        ].map((row, i) => (
                                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 font-bold text-white">{row.info}</td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center gap-1 text-green-500 text-xs font-bold uppercase tracking-wider">
                                                        <BadgeCheck className="h-4 w-4" /> {row.status}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-muted-foreground text-sm">{row.detail}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </LandingLayout>
    );
}
