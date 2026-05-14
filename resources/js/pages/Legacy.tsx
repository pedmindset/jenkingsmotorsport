import LandingLayout from '@/layouts/LandingLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BadgeCheck, Hammer, Trophy } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/core';
import { motorsportLucideIcon } from '@/lib/motorsport-icons';
import type { LegacyContent, LegacyTimelineSection } from '@/types/motorsport';

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

function LegacySectionBody({ section }: { section: LegacyTimelineSection }) {
    const paragraphs = section.paragraphs ?? [];
    const listItems = section.listItems ?? [];

    return (
        <>
            {paragraphs.map((p) => (
                <p key={p}>
                    {p}
                </p>
            ))}
            {listItems.length > 0 && (
                <ul className="space-y-4 mt-4 text-white/80 text-base">
                    {listItems.map((item) => {
                        const Icon = motorsportLucideIcon(item.icon);

                        return (
                            <li key={item.content} className="flex gap-4">
                                <Icon className="h-6 w-6 shrink-0" />
                                <span>{item.content}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
            {section.callout && (
                <div className="mt-6 bg-white/5 border border-white/10 p-6">
                    <h4 className="flex items-center gap-2 font-bold uppercase text-white mb-2">
                        <Hammer className="h-5 w-5" /> {section.callout.title}
                    </h4>
                    <p className="text-sm">
                        {section.callout.body}
                    </p>
                </div>
            )}
            {section.badge && (
                <div className="mt-6 inline-flex items-center gap-4 text-yellow-500 border border-yellow-500/50 bg-yellow-500/10 px-6 py-3 rounded-none uppercase font-bold tracking-widest">
                    <Trophy className="h-6 w-6" />
                    {section.badge}
                </div>
            )}
            {section.stats && section.stats.length > 0 && (
                <div className="mt-8 grid grid-cols-2 gap-4">
                    {section.stats.map((s) => (
                        <div key={s.label} className="bg-primary/20 border border-primary p-4 text-center">
                            <span className="block text-4xl font-black text-white mb-1">{s.value}</span>
                            <span className="text-xs uppercase text-primary tracking-widest">{s.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

type LegacyPageProps = PageProps & {
    content: LegacyContent;
};

export default function Legacy() {
    const { content } = usePage<LegacyPageProps>().props;
    const timelineSections = content?.timeline?.sections ?? [];
    const factRows = content?.fact_check_rows?.rows ?? [];
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

                {timelineSections.map((section) => (
                    <TimelineSection
                        key={`${section.year}-${section.title}`}
                        year={section.year}
                        title={section.title}
                        subTitle={section.subTitle}
                        image={section.image}
                        filterClass={section.filterClass}
                        themeColor={section.themeColor}
                        align={section.align === 'right' ? 'right' : 'left'}
                        content={<LegacySectionBody section={section} />}
                    />
                ))}

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
                                        {factRows.map((row, i) => (
                                            <tr key={row.info} className="hover:bg-white/5 transition-colors">
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
