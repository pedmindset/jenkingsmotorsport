import LandingLayout from '@/layouts/LandingLayout';
import { Link } from '@inertiajs/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    MapPin, Ship, Wrench, Flag, Globe, Thermometer, Timer, Users,
    ChevronRight, Droplets, Gauge, Settings, FileText, Package,
    Moon, Sun, Truck, ArrowRight, X, Calendar, Award, Camera
} from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

// Journey Map Location Data
interface JourneyLocation {
    id: string;
    name: string;
    city: string;
    icon: typeof MapPin;
    color: string;
    position: number; // percentage along the route
    tasks: string[];
    description: string;
}

const journeyLocations: JourneyLocation[] = [
    {
        id: 'workshop',
        name: 'The Workshop',
        city: 'STONE',
        icon: Wrench,
        color: 'text-primary',
        position: 0,
        tasks: [
            'Complete engine diagnostics & tear-down',
            'Pack specialized ZF gearbox components',
            'Prepare pressurized water-cooling tanks',
            'Load mobile workshop equipment',
            'Final chassis inspection & sign-off'
        ],
        description: 'The Stone, Staffordshire workshop transforms into a command center. Every component is checked, documented, and prepared for the 24-hour journey.'
    },
    {
        id: 'ferry',
        name: 'The Channel',
        city: 'DOVER → CALAIS',
        icon: Ship,
        color: 'text-blue-400',
        position: 40,
        tasks: [
            'Customs documentation clearance',
            'Technical equipment manifests',
            'International racing permits',
            'Vehicle weight certification',
            '24-hour transit coordination'
        ],
        description: 'The #69 MAN, mobile workshop, and hospitality suite are loaded onto specialized haulers for the crossing. Precision documentation ensures smooth border transitions.'
    },
    {
        id: 'track',
        name: 'The Track',
        city: 'LE MANS',
        icon: Flag,
        color: 'text-destructive',
        position: 100,
        tasks: [
            'Erect Jenkins "Village" compound',
            'Set up engine tear-down environment',
            'Calibrate water-spray cooling system',
            'Coordinate with Giti Tire technicians',
            'Prepare B2B hospitality suite'
        ],
        description: 'At Circuit Bugatti, the Jenkins footprint rises — a high-tech compound designed to host international partners and provide race-ready infrastructure.'
    }
];

// Interactive Hotspot Component
function JourneyHotspot({
    location,
    isActive,
    onClick
}: {
    location: JourneyLocation;
    isActive: boolean;
    onClick: () => void;
}) {
    const Icon = location.icon;

    return (
        <motion.button
            onClick={onClick}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group`}
            style={{ left: `${location.position}%`, top: '50%' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className={`relative flex flex-col items-center`}>
                {/* Pulse Animation */}
                <motion.div
                    className={`absolute w-16 h-16 rounded-full ${location.color} opacity-20`}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Icon Container */}
                <div className={`relative w-14 h-14 rounded-full border-2 ${isActive ? 'bg-white border-white' : 'bg-black/80 border-white/50 group-hover:border-white'} flex items-center justify-center transition-all duration-300 shadow-lg`}>
                    <Icon className={`h-7 w-7 transition-colors ${isActive ? 'text-black' : location.color}`} />
                </div>

                {/* City Label */}
                <span className="mt-3 font-heading text-xs md:text-sm font-black uppercase tracking-widest text-white whitespace-nowrap">
                    {location.city}
                </span>
            </div>
        </motion.button>
    );
}

// Journey Map Component
function JourneyMap() {
    const [activeLocation, setActiveLocation] = useState<string | null>(null);
    const activeData = journeyLocations.find(loc => loc.id === activeLocation);

    return (
        <div className="relative py-16">
            {/* Map Route Container */}
            <div className="relative h-32 md:h-40 flex items-center">
                {/* Animated Route Line */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--color-primary)" />
                            <stop offset="50%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="var(--color-destructive)" />
                        </linearGradient>
                    </defs>

                    {/* Background Track */}
                    <motion.path
                        d="M 0,80 Q 100,60 200,80 T 400,80 T 600,80 T 800,80 T 1000,80"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="w-full"
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                    />

                    {/* Animated Route */}
                    <motion.path
                        d="M 0,80 Q 100,60 200,80 T 400,80 T 600,80 T 800,80 T 1000,80"
                        fill="none"
                        stroke="url(#routeGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray="1000"
                        initial={{ strokeDashoffset: 1000 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                    />
                </svg>

                {/* Gradient Line beneath */}
                <div className="absolute left-0 right-0 top-1/2 h-1">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-blue-400 to-destructive rounded-full"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </div>

                {/* Hotspots */}
                {journeyLocations.map((location) => (
                    <JourneyHotspot
                        key={location.id}
                        location={location}
                        isActive={activeLocation === location.id}
                        onClick={() => setActiveLocation(activeLocation === location.id ? null : location.id)}
                    />
                ))}
            </div>

            {/* Popup Panel */}
            <AnimatePresence>
                {activeData && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 relative"
                    >
                        <div className="bg-gradient-to-br from-secondary/60 to-secondary/30 border border-white/10 p-6 md:p-8 relative overflow-hidden">
                            {/* Close button */}
                            <button
                                onClick={() => setActiveLocation(null)}
                                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            {/* Accent Line */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${activeData.id === 'workshop' ? 'from-primary to-transparent' : activeData.id === 'ferry' ? 'from-blue-400 to-transparent' : 'from-destructive to-transparent'}`} />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Left: Description */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`p-3 rounded-full bg-black/50 border border-white/10`}>
                                            <activeData.icon className={`h-6 w-6 ${activeData.color}`} />
                                        </div>
                                        <div>
                                            <span className={`text-xs uppercase tracking-widest ${activeData.color}`}>{activeData.city}</span>
                                            <h4 className="font-heading text-2xl font-bold uppercase italic text-white">{activeData.name}</h4>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {activeData.description}
                                    </p>
                                </div>

                                {/* Right: Tasks */}
                                <div>
                                    <span className="text-xs uppercase tracking-widest text-white/50 mb-4 block">Prep Tasks</span>
                                    <ul className="space-y-3">
                                        {activeData.tasks.map((task, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <ArrowRight className={`h-4 w-4 mt-1 shrink-0 ${activeData.color}`} />
                                                <span className="text-white/80 text-sm">{task}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Instruction Text */}
            {!activeLocation && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground text-sm mt-8"
                >
                    <span className="text-primary">Click a location</span> to explore the journey logistics
                </motion.p>
            )}
        </div>
    );
}

export default function LeMans() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 300]);

    const circuitFeatures = [
        { name: 'Dunlop Curve', description: 'The legendary high-speed sweeper requiring precise throttle control through the apex.' },
        { name: 'Chicane de la Chapelle', description: 'Heavy braking zone demanding maximum water-spray cooling to prevent brake fade.' },
        { name: 'Continental Tarmac', description: 'Wide, high-grip surface allowing for 5-wide racing into corners — unlike anything in the UK.' },
    ];

    const technicalFocus = [
        {
            icon: Droplets,
            title: 'Max-Flow Radiator',
            description: 'Increased water-spray capacity for Juratek discs to combat extreme thermal energy in Bugatti\'s heavy braking zones.',
            color: 'text-blue-400'
        },
        {
            icon: Thermometer,
            title: 'Heat Management',
            description: 'September heat requires aggressive cooling strategies. Ambient temperature is the difference between podium and DNF.',
            color: 'text-orange-400'
        },
        {
            icon: Settings,
            title: 'Tire Pressure Calibration',
            description: 'Giti Tire technicians work alongside David to adjust pressures for higher track temperatures — preventing "cooked" rubber.',
            color: 'text-primary'
        },
    ];

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        "name": "24 Heures Camions 2026",
        "startDate": "2026-09-26",
        "endDate": "2026-09-27",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Circuit Bugatti",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Le Mans",
                "addressCountry": "FR"
            }
        },
        "performer": {
            "@type": "SportsTeam",
            "name": "Jenkins Motorsports"
        },
        "description": "The French round of the British Truck Racing Championship and 24 Heures Camions at Le Mans."
    };

    return (
        <LandingLayout
            title="Le Mans International | 24 Heures Camions"
            description="Jenkins Motorsports takes on the world at the iconic Circuit Bugatti, Le Mans. Experience the journey from Stone to France for the 24 Heures Camions."
            image="/images/multiple_trucks_on_racing_tracks_2.jpg"
            schema={eventSchema}
        >
            <div ref={containerRef} className="bg-black min-h-screen">

                {/* Hero Section */}
                <div className="relative h-screen overflow-hidden flex items-center justify-center">
                    {/* Parallax Background */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        style={{ y }}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center scale-110"
                            style={{ backgroundImage: 'url("/images/multiple_trucks_on_racing_tracks_2.jpg")' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
                        </div>
                    </motion.div>

                    {/* French Flag Accent */}
                    <div className="absolute top-0 left-0 right-0 h-2 flex z-20">
                        <div className="flex-1 bg-blue-600" />
                        <div className="flex-1 bg-white" />
                        <div className="flex-1 bg-red-600" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-3 mb-6">
                                <Globe className="h-5 w-5 text-destructive" />
                                <span className="font-heading text-sm uppercase tracking-[0.3em] text-destructive">
                                    International Round • September 2026
                                </span>
                            </div>

                            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase italic text-white mb-4 leading-none">
                                Beyond the Channel.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-destructive">
                                    Beyond the Limit.
                                </span>
                            </h1>

                            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-sans mt-6">
                                Jenkins Motorsports takes on the world at the iconic
                                <span className="text-white font-semibold"> Circuit Bugatti, Le Mans</span>.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 flex flex-wrap justify-center gap-6"
                        >
                            <div className="flex items-center gap-2 bg-black/50 border border-white/20 px-4 py-2">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span className="text-white/80 text-sm">Sept 26-27, 2026</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/50 border border-white/20 px-4 py-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span className="text-white/80 text-sm">80,000+ Spectators</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/50 border border-white/20 px-4 py-2">
                                <Flag className="h-4 w-4 text-destructive" />
                                <span className="text-white/80 text-sm">Rounds 26-29</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <motion.div
                                className="w-1.5 h-3 bg-primary rounded-full mt-2"
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Main Content */}
                <div className="bg-background relative z-10">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

                    <div className="container px-4 md:px-6 mx-auto py-24">

                        {/* The Stage: Circuit Bugatti */}
                        <motion.section
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-32"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-destructive" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-destructive">The Stage</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-destructive" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-6xl font-black uppercase italic text-white">
                                    Circuit <span className="text-destructive">Bugatti</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        While the BTRC is primarily a UK-based battle, the late-September pilgrimage to France is the
                                        <strong className="text-white"> ultimate test of a team's professional infrastructure</strong>.
                                        The Bugatti Circuit is a high-speed, technical masterpiece.
                                    </p>

                                    <div className="space-y-4">
                                        {circuitFeatures.map((feature, index) => (
                                            <motion.div
                                                key={feature.name}
                                                initial={{ x: -30, opacity: 0 }}
                                                whileInView={{ x: 0, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 }}
                                                className="bg-secondary/30 border-l-4 border-destructive p-4"
                                            >
                                                <strong className="text-white block mb-1 font-heading uppercase">{feature.name}</strong>
                                                <span className="text-muted-foreground text-sm">{feature.description}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-white to-destructive opacity-20 blur-xl" />
                                    <div className="relative bg-gradient-to-br from-secondary/40 to-secondary/20 border border-white/10 p-8">
                                        <div className="text-center space-y-6">
                                            <div className="inline-flex items-center gap-2 text-amber-500">
                                                <Award className="h-5 w-5" />
                                                <span className="font-heading text-sm uppercase tracking-widest">The Stakes</span>
                                            </div>
                                            <h3 className="font-heading text-3xl font-bold uppercase italic text-white">
                                                International Visibility
                                            </h3>
                                            <p className="text-muted-foreground">
                                                This round is broadcast across European networks, positioning
                                                <span className="text-white font-semibold"> Morris Lubricants</span> and
                                                <span className="text-white font-semibold"> Giti Tire</span> on a global stage.
                                            </p>
                                            <div className="pt-4 border-t border-white/10">
                                                <span className="text-xs uppercase tracking-widest text-white/50">
                                                    24 Heures Camions • Le Mans
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Journey Map Section */}
                        <motion.section
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-32"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">The Journey</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-6xl font-black uppercase italic text-white mb-4">
                                    Moving a <span className="text-primary">Titan</span>
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Taking a 1,160 BHP racing truck across the English Channel is a feat of precision logistics.
                                    The Stone workshop becomes a command center weeks before the green light.
                                </p>
                            </div>

                            <JourneyMap />

                            {/* Logistics Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-6 text-center"
                                >
                                    <Package className="h-10 w-10 text-primary mx-auto mb-4" />
                                    <h4 className="font-heading text-lg font-bold uppercase text-white mb-2">The Cargo</h4>
                                    <p className="text-sm text-muted-foreground">
                                        The #69 MAN, mobile workshop, and hospitality suite loaded onto specialized haulers.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-6 text-center"
                                >
                                    <FileText className="h-10 w-10 text-blue-400 mx-auto mb-4" />
                                    <h4 className="font-heading text-lg font-bold uppercase text-white mb-2">Customs & Compliance</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Precision documentation for pressurized water-cooling tanks and specialized ZF gearboxes.
                                    </p>
                                </motion.div>

                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-6 text-center"
                                >
                                    <Truck className="h-10 w-10 text-destructive mx-auto mb-4" />
                                    <h4 className="font-heading text-lg font-bold uppercase text-white mb-2">The Village</h4>
                                    <p className="text-sm text-muted-foreground">
                                        A high-tech footprint designed to host international partners and provide sterile engine tear-down environment.
                                    </p>
                                </motion.div>
                            </div>
                        </motion.section>

                        {/* Technical Focus: The Heat */}
                        <motion.section
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-32"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-orange-400" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-orange-400">Technical Focus</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-orange-400" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-6xl font-black uppercase italic text-white">
                                    The Heat of <span className="text-orange-400">France</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {technicalFocus.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ y: 30, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8 group hover:border-white/30 transition-colors"
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                            <item.icon className={`h-8 w-8 ${item.color}`} />
                                        </div>
                                        <h3 className="font-heading text-xl font-bold uppercase italic text-white mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Call-out Box */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-12 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border-l-4 border-orange-400 p-6 md:p-8"
                            >
                                <p className="text-lg text-white italic">
                                    "For a 5.5-tonne truck, ambient temperature is the difference between a podium and a DNF. September in Le Mans can bring intense heat — and we prepare for the worst."
                                </p>
                                <span className="text-muted-foreground text-sm mt-2 block">— 2026 Le Mans Technical Brief</span>
                            </motion.div>
                        </motion.section>

                        {/* The Fan Experience */}
                        <motion.section
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-32"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-amber-500">The Experience</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-6xl font-black uppercase italic text-white">
                                    24 Heures <span className="text-amber-500">Camions</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                {/* Night Race Visual */}
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-transparent to-amber-500/30 blur-2xl" />
                                    <div className="relative bg-gradient-to-br from-secondary/60 to-black border border-white/10 p-8 overflow-hidden">
                                        {/* Night sky effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />

                                        <div className="relative text-center space-y-6">
                                            <motion.div
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Moon className="h-16 w-16 text-amber-400 mx-auto" />
                                            </motion.div>

                                            <h3 className="font-heading text-3xl font-bold uppercase italic text-white">
                                                The Night Race
                                            </h3>

                                            <p className="text-muted-foreground leading-relaxed">
                                                Nothing compares to the sight of the <span className="text-primary font-semibold">#69 MAN</span>,
                                                lit in Jenkins Blue, glowing under the floodlights of the
                                                <span className="text-white"> Dunlop Bridge</span> as the turbocharger screams through the French night.
                                            </p>

                                            {/* Simulated lights */}
                                            <div className="flex justify-center gap-2 pt-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-2 h-2 rounded-full bg-primary"
                                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* B2B Hospitality */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-amber-500/20 rounded-full">
                                            <Users className="h-8 w-8 text-amber-500" />
                                        </div>
                                        <span className="font-heading text-2xl font-bold uppercase text-amber-500 tracking-widest">
                                            B2B Hospitality
                                        </span>
                                    </div>

                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        Le Mans is famous for its atmosphere. From the "Truck Show" parades to the nighttime festivities,
                                        it is the most <strong className="text-white">visceral fan experience</strong> in the world of heavy motorsport.
                                    </p>

                                    <div className="bg-secondary/30 border border-white/10 p-6">
                                        <h4 className="font-heading text-lg font-bold uppercase text-white mb-3">
                                            European Summit
                                        </h4>
                                        <p className="text-muted-foreground text-sm">
                                            We host a dedicated summit for our sponsors, allowing UK-based partners to network with
                                            <strong className="text-white"> continental distributors</strong> in our private trackside suite.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 bg-black/50 border border-white/10 p-4 text-center">
                                            <Camera className="h-6 w-6 text-primary mx-auto mb-2" />
                                            <span className="text-xs uppercase tracking-widest text-white/60">Truck Show Parades</span>
                                        </div>
                                        <div className="flex-1 bg-black/50 border border-white/10 p-4 text-center">
                                            <Sun className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                                            <span className="text-xs uppercase tracking-widest text-white/60">Nighttime Festivities</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* CTA Section */}
                        <motion.section
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-destructive/20 via-destructive/10 to-transparent border border-destructive/30 p-8 md:p-12"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Globe className="h-5 w-5 text-destructive" />
                                        <span className="font-heading text-sm uppercase tracking-widest text-destructive">
                                            September 26-27, 2026
                                        </span>
                                    </div>
                                    <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase italic text-white mb-4">
                                        Join Us in Le Mans
                                    </h3>
                                    <p className="text-muted-foreground max-w-xl">
                                        Experience the 24 Heures Camions firsthand. Partner with Jenkins Motorsports for exclusive
                                        trackside access and B2B networking opportunities.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <Button
                                        className="bg-destructive text-white font-heading font-bold uppercase px-8 py-6 hover:bg-white hover:text-destructive transition-colors"
                                        asChild
                                    >
                                        <Link href="/partners">
                                            Partner With Us
                                            <ChevronRight className="h-5 w-5 ml-2" />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-white/30 text-white font-heading font-bold uppercase px-8 py-6 hover:bg-white hover:text-black transition-colors"
                                        asChild
                                    >
                                        <Link href="/season">
                                            Full 2026 Calendar
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.section>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
