import LandingLayout from '@/layouts/LandingLayout';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Download, Check, Zap, Gauge, Disc, ArrowRight, Settings, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define partner data structure
interface Partner {
    name: string;
    role: string;
    description: string;
    technicalFact: string;
    icon: string; // Image path for logo
    theme: {
        glow: string;
        iconBg: string;
        iconText: string;
        bar: string;
    };
    image: string;
    link: string;
}

export default function Partnerships() {
    const technicalPartners: Partner[] = [
        {
            name: 'LKQ UK and Ireland',
            role: 'A group of four market-leading businesses',
            description: 'Driving excellence in parts, equipment and training across automotive, leisure and marine sectors. LKQ UK and Ireland provides Jenkins Motorsports with a seamless, high-velocity supply chain, testing high-performance components under the extreme thermal and mechanical loads of Division 1 racing.',
            technicalFact: 'Supply chain velocity tested: <12h turnaround for critical race-spec components.',
            icon: '/images/LKQ_white.webp',
            theme: {
                glow: 'from-blue-600 to-blue-400/50',
                iconBg: 'bg-transparent',
                iconText: '',
                bar: 'bg-blue-600'
            },
            image: '/images/team_working_on_truck.jpg',
            link: 'https://ukandireland.lkqeurope.com/'
        },
        {
            name: 'Morris Lubricants',
            role: 'The Chemical Edge',
            description: 'For over a decade, Jenkins Motorsports has been a primary development partner, testing high-performance oils like the Versimax range.',
            technicalFact: 'Tested to 140°C engine temperatures to ensure thermal stability under maximum load.',
            icon: '/images/morris_lubricant_logo.jpg',
            theme: {
                glow: 'from-primary to-primary/50',
                iconBg: 'bg-transparent',
                iconText: '',
                bar: 'bg-primary'
            },
            image: '/images/morris_lubricant.jpg',
            link: 'https://www.morrislubricants.co.uk/'
        },
        {
            name: 'Equipment Hub Ltd',
            role: 'Precision Procurement for Global Projects',
            description: 'Equipment Hub Ltd specializes in the procurement and supply of heavy equipment for international engineering and construction projects. This alliance bridges the gap between elite heavy-duty motorsport and the global machinery sector, utilizing the #69 MAN TGX as a flagship for industrial reliability and power.',
            technicalFact: 'Heavy equipment sourcing network spans 3 continents for project-critical machinery.',
            icon: '/images/Equipment Hub Logo With Text Color White.png',
            theme: {
                glow: 'from-blue-600 to-blue-400/50',
                iconBg: 'bg-transparent',
                iconText: '',
                bar: 'bg-blue-600'
            },
            image: '/images/exploring-the-abandoned-machinery-and-vehicles-at-2025-10-06-13-42-12-utc.jpg',
            link: 'https://equipmenthub.ltd/'
        }
    ];

    const tiers = [
        {
            name: 'Title Legacy Partner',
            impact: 'Global Brand Alignment',
            benefits: [
                'Primary real estate on Blue/Black/Red livery',
                'Featured in "Road to Le Mans" docu-series',
                '20 VIP hospitality passes for "Convoy in the Park"',
                'Title naming rights'
            ],
            cta: 'Inquire',
            link: '/contact?tier=title',
            highlight: true
        },
        {
            name: 'Technical Innovation Partner',
            impact: 'R&D & Product Authority',
            benefits: [
                'Collaborative case studies & "Tested by Jenkins" branding',
                'Product display space in mobile workshop',
                'Direct access to haulage network',
                'Social media technical breakdowns'
            ],
            cta: 'Inquire',
            link: '/contact?tier=technical',
            highlight: false
        },
        {
            name: 'Associate Partner',
            impact: 'Strategic Placement',
            benefits: [
                'Logo integration on rear aero-fins & driver suit',
                '5 VIP passes per season',
                'Invitation to annual "Season Review" gala',
                'Digital race report mentions'
            ],
            cta: 'Inquire',
            link: '/contact?tier=associate',
            highlight: false
        }
    ];

    return (
        <LandingLayout
            title="Partnerships | Technical Alliances"
            description="Technical Alliances & ROI. Partner with Jenkins Motorsports to test your products in the most extreme conditions. Join Morris Lubricants, LKQ, Equipment Hub, and more."
            image="/images/team_working_on_truck.jpg"
        >
            <div className="bg-black min-h-screen">

                {/* Hero Section */}
                <div className="relative pt-32 pb-24 overflow-hidden">
                    {/* Background image with overlay */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40 fixed fixed-bg"
                        style={{ backgroundImage: 'url("/images/multiple_trucks_on_racing_tracks_2.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/75 to-black" />

                    <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 block">
                                Technical Alliances & ROI
                            </span>
                            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase italic text-white mb-6 leading-none">
                                The Pursuit of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">Marginal Gains</span>
                            </h1>
                            <p className="font-heading font-bold text-xl md:text-2xl text-muted-foreground uppercase tracking-wide max-w-3xl mx-auto">
                                We don’t just represent brands; we vet their engineering under the most extreme conditions on the planet.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Philosophy Section */}
                <div className="bg-background relative z-10 py-24">
                    <div className="container px-4 md:px-6 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-secondary/20 border-l-4 border-primary p-8 md:p-12 mb-24 max-w-5xl mx-auto relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 text-primary/10">
                                <span className="text-[10rem] font-heading font-black italic leading-none">"</span>
                            </div>

                            <blockquote className="relative z-10">
                                <p className="font-heading text-2xl md:text-3xl font-bold italic text-white leading-relaxed mb-6">
                                    "When a partner’s logo is on our truck, it means their product has survived the Stone workshop tear-down and the heat of the track. If it works for us at 100mph, it will work for your customers on the M1."
                                </p>
                                <footer className="flex items-center gap-4">
                                    <div className="h-px w-12 bg-primary" />
                                    <cite className="font-heading uppercase not-italic text-muted-foreground tracking-widest text-sm">
                                        David Jenkins, <span className="text-primary">Driver & Lead Engineer</span>
                                    </cite>
                                </footer>
                            </blockquote>
                        </motion.div>

                        {/* Technical Partners Grid */}
                        <div className="mb-32">
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">Rolling Laboratory</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white">
                                    Primary <span className="text-white">Technical Partners</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {technicalPartners.map((partner, index) => (
                                    <motion.a
                                        key={partner.name}
                                        href={partner.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ y: 30, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative h-[500px] block cursor-pointer"
                                    >
                                        {/* Glowing Border effect */}
                                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${partner.theme.glow} opacity-0 group-hover:opacity-100 blur transition duration-500`} />

                                        {/* Card Container */}
                                        <div className="relative h-full bg-black border border-white/10 overflow-hidden flex flex-col hover:border-transparent transition-colors duration-500">

                                            {/* Background Image with Reveal Effect */}
                                            <div
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                                                style={{ backgroundImage: `url('${partner.image}')` }}
                                            />
                                            {/* Heavy Gradient Overlay for Text Readability */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/70 group-hover:via-black/80 transition-all duration-500" />

                                            <div className="relative z-10 p-8 flex flex-col h-full">
                                                {/* Header */}
                                                <div className="mb-6 flex items-start justify-between">
                                                    <div className={`p-3 ${partner.theme.iconBg} rounded-sm backdrop-blur-sm`}>
                                                        <img src={partner.icon} alt={partner.name} className="h-8 w-auto object-contain" />
                                                    </div>
                                                    {/* Number Removed */}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-grow">
                                                    <h3 className="font-condensed text-3xl font-bold uppercase text-white mb-2 tracking-wide drop-shadow-md">
                                                        {partner.name}
                                                    </h3>
                                                    <span className="text-xs font-heading uppercase tracking-widest text-muted-foreground block mb-4">
                                                        {partner.role}
                                                    </span>
                                                    <p className="text-sm text-neutral-300 leading-relaxed mb-6 font-sans group-hover:text-white transition-colors">
                                                        {partner.description}
                                                    </p>
                                                </div>

                                                {/* Technical Fact Reveal */}
                                                <div className="mt-auto border-t border-white/20 pt-4 overflow-hidden relative min-h-[5rem] flex items-end">
                                                    <div className="w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out absolute bottom-0">
                                                        <div className="flex items-start gap-3">
                                                            <div className={`mt-1 h-1.5 w-1.5 rounded-full ${partner.theme.bar} shrink-0 animate-pulse`} />
                                                            <div>
                                                                <span className={`text-xs font-bold uppercase tracking-widest ${partner.theme.iconText} block mb-1`}>
                                                                    Technical Verification
                                                                </span>
                                                                <p className="text-xs text-white font-mono">
                                                                    {partner.technicalFact}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-full flex items-center group-hover:translate-y-full group-hover:opacity-0 transition-all duration-300 absolute bottom-0 pb-2">
                                                        <span className="text-xs uppercase tracking-widest text-white/50 flex items-center gap-2">
                                                            <div className={`h-px w-8 ${partner.theme.bar}`} />
                                                            Hover for Data
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </div>

                        {/* Partnership Tiers Table/Grid */}
                        <div className="mb-24">
                            <div className="text-center mb-16">
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
                                    Partner with the <span className="text-primary">Dynasty</span>
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Three distinct tiers of integration, each designed to provide specific commercial ROI in the 2026 season.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-white/10 bg-secondary/20">
                                {tiers.map((tier, index) => (
                                    <div
                                        key={tier.name}
                                        className={`relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 last:border-0 hover:bg-white/5 transition-colors ${tier.highlight ? 'bg-primary/5' : ''}`}
                                    >
                                        {tier.highlight && (
                                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
                                        )}

                                        <h3 className="font-heading text-2xl md:text-3xl font-black uppercase italic text-white mb-2">
                                            {tier.name}
                                        </h3>
                                        <p className="font-sans text-sm text-primary font-bold uppercase tracking-widest mb-8">
                                            {tier.impact}
                                        </p>

                                        <ul className="space-y-4 mb-10">
                                            {tier.benefits.map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                    <span className="text-sm text-neutral-300">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Button
                                            variant={tier.highlight ? 'default' : 'outline'}
                                            className={`w-full font-heading font-bold uppercase italic rounded-none h-12 ${tier.highlight ? 'bg-primary text-white hover:bg-white hover:text-black' : 'border-white/20 text-white hover:bg-white hover:text-black'}`}
                                            asChild
                                        >
                                            <Link href={tier.link}>
                                                {tier.cta} <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="text-center pb-12">
                            <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-white/10 p-12 max-w-4xl mx-auto relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/20 transition-all duration-700" />

                                <h2 className="relative z-10 font-heading text-3xl md:text-4xl font-black uppercase italic text-white mb-6">
                                    Ready to Deploy Your Brand?
                                </h2>
                                <p className="relative z-10 text-muted-foreground mb-8 max-w-xl mx-auto">
                                    Download our comprehensive 2026 Commercial Deck to view detailed demographics, media reach, and available inventory.
                                </p>

                                <Button
                                    size="lg"
                                    className="relative z-10 bg-white text-black font-heading font-black uppercase italic text-lg px-10 py-8 hover:bg-primary hover:text-white transition-all transform skew-x-[-12deg] group-hover:skew-x-[-6deg]"
                                >
                                    <div className="skew-x-[12deg] group-hover:skew-x-[6deg] flex items-center gap-3">
                                        <Download className="h-6 w-6" />
                                        Download Partnership Deck
                                    </div>
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
