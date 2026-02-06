import LandingLayout from '@/layouts/LandingLayout';
import { Head, usePage } from '@inertiajs/react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Gauge, Droplets, Settings, Zap, Activity, Scale, Compass, Truck,
    Wrench, History, Medal, ChevronDown, Target, Shield, Eye, Cog
} from 'lucide-react';
import { useRef, useState } from 'react';

export default function TheMachine() {
    const { appUrl } = usePage<any>().props;
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const y = useTransform(scrollYProgress, [0, 1], [0, 500]);

    // "Rumble" effect state
    const [isIdling, setIsIdling] = useState(true);
    // Water spray animation state
    const [showWaterSpray, setShowWaterSpray] = useState(false);

    const techSpecs = [
        { label: 'Engine', value: 'MAN D26 Six-Cylinder Diesel Turbocharged', icon: Zap },
        { label: 'Displacement', value: '12.4 Litres', icon: Gauge },
        { label: 'Power Output', value: '1,160 BHP (Tested)', icon: Activity },
        { label: 'Transmission', value: 'ZF Manual 16-Speed Synchromesh', icon: Cog },
        { label: 'Weight', value: '5,500 kg (Regulation Minimum)', icon: Scale },
        { label: 'Axle Setup', value: 'MD106 / MD107 with SYN2001K / SYN2002K', icon: Settings },
    ];

    const truckSchema = {
        "@context": "https://schema.org/",
        "@type": "Vehicle",
        "name": "#69 MAN TGX Racing Truck",
        "description": "The 1,160 BHP MAN TGX racing truck driven by Dave Jenkins. Features a MAN D26 engine, ZF 16-speed manual transmission, and custom Jenkins Motorsport engineering.",
        "image": `${appUrl}/images/dave_truck_on_racing_tracks_2.jpg`,
        "brand": {
            "@type": "Brand",
            "name": "MAN"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "Jenkins Motorsports"
        },
        "model": "TGX",
        "vehicleConfiguration": "Racing Truck",
        "vehicleEngine": {
            "@type": "EngineSpecification",
            "engineType": "MAN D26 Six-Cylinder Diesel Turbocharged",
            "enginePower": "1160 BHP",
            "engineDisplacement": "12.4 Litres"
        }
    };

    return (
        <LandingLayout
            title="The Machine | #69 MAN TGX"
            description="Discover the 1,160 BHP MAN TGX #69. A 5.5-tonne racing beast engineered by Jenkins Motorsports. See the specs, the engine, and the technology behind British Truck Racing's finest."
            image="/images/dave_truck_on_racing_tracks_2.jpg"
            schema={truckSchema}
        >
            <div ref={containerRef} className="bg-black min-h-screen">

                {/* Hero Banner with "Rumble" Animation */}
                <div className="relative h-screen overflow-hidden flex items-center justify-center">
                    {/* Parallax Wrapper */}
                    <motion.div
                        className="absolute inset-0 z-0"
                        style={{ y }}
                    >
                        {/* Rumble Animation */}
                        <motion.div
                            className="w-full h-full bg-cover bg-center scale-120"
                            style={{ backgroundImage: 'url("/images/dave_truck_on_racing_tracks_2.jpg")' }}
                            animate={isIdling ? {
                                x: [-1, 1, -1],
                                y: [-1, 1, -1],
                            } : {}}
                            transition={{
                                duration: 0.2,
                                repeat: Infinity,
                                repeatType: "mirror",
                                ease: "linear"
                            }}
                        >
                            <div className="absolute inset-0 bg-black/50" />
                        </motion.div>
                    </motion.div>

                    {/* Speed Lines Overlay */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                    <div className="relative z-10 text-center px-4">
                        <motion.div
                            initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                        >
                            <div className="mb-4">
                                <span className="inline-block bg-primary/20 border border-primary/50 px-6 py-2 text-primary font-heading text-lg tracking-widest uppercase">
                                    #69 MAN TGX
                                </span>
                            </div>
                            <h1 className="font-heading text-8xl md:text-[10rem] font-black uppercase italic text-white mb-2 leading-none hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-primary hover:to-white transition-all cursor-default select-none">
                                <motion.span
                                    animate={{ skewX: [0, -5, 0] }}
                                    transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 2 }}
                                    className="inline-block"
                                >
                                    1,160
                                </motion.span>
                                <span className="text-primary text-6xl md:text-8xl ml-4">BHP</span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="font-heading text-2xl md:text-4xl font-bold uppercase tracking-widest text-white/80"
                        >
                            <span className="text-destructive inline-block animate-pulse mr-2">●</span>
                            Built & Driven by Dave Jenkins
                        </motion.p>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.6 }}
                            transition={{ delay: 0.7 }}
                            className="text-white/50 text-lg mt-4 max-w-2xl mx-auto"
                        >
                            Not just the driver — the lead engineer. Handcrafted in Stone, Staffordshire.
                        </motion.p>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ChevronDown className="h-8 w-8 text-primary opacity-50" />
                    </motion.div>
                </div>

                {/* Main Content Area */}
                <div className="bg-background relative z-10">
                    <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

                    <div className="container px-4 md:px-6 mx-auto py-32">

                        {/* Technical Specifications - Full Tech Sheet */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-48"
                        >
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">BTRC Division 1 Specification</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white">
                                    Official <span className="text-primary">Tech Sheet</span>
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {techSpecs.map((spec, index) => (
                                    <motion.div
                                        key={spec.label}
                                        initial={{ y: 30, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative bg-gradient-to-br from-secondary/30 to-secondary/10 border border-white/10 p-6 hover:border-primary/50 transition-all duration-300"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <spec.icon className="h-6 w-6 text-primary/50 mb-4" />
                                        <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">{spec.label}</span>
                                        <span className="block text-lg font-heading font-bold text-white">{spec.value}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Highlight: The transmission */}
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-8 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-l-4 border-primary p-6"
                            >
                                <p className="text-muted-foreground leading-relaxed">
                                    <strong className="text-white">The Manual Advantage:</strong> In a world of semi-automatics, Dave's ZF 16-Speed Manual Synchromesh gearbox requires immense physical effort and precision. Every gear change during a 15-minute sprint is pure mechanical engagement — no paddle shifters, no assists.
                                </p>
                            </motion.div>
                        </motion.div>

                        {/* Featured Video Section */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-48"
                        >
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-destructive" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-destructive">See It In Action</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-destructive" />
                                </div>
                                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white">
                                    The <span className="text-destructive">Beast</span> Unleashed
                                </h2>
                            </div>

                            <div className="relative max-w-5xl mx-auto">
                                {/* Decorative frame */}
                                <div className="absolute -inset-2 bg-gradient-to-r from-primary via-destructive to-primary opacity-20 blur-xl" />
                                <div className="absolute -inset-px bg-gradient-to-r from-primary/50 via-transparent to-destructive/50" />

                                {/* Video container */}
                                <div className="relative bg-black p-1">
                                    <div className="aspect-video w-full">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/r0DeCHtDJAk?rel=0&modestbranding=1"
                                            title="Jenkins Motorsport #69 MAN TGX in Action"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    </div>
                                </div>

                                {/* Corner accents */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary -translate-x-2 -translate-y-2" />
                                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-destructive translate-x-2 -translate-y-2" />
                                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-destructive -translate-x-2 translate-y-2" />
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary translate-x-2 translate-y-2" />
                            </div>

                            <p className="text-center text-muted-foreground text-sm mt-8 max-w-2xl mx-auto">
                                Watch the #69 MAN TGX tear up the track. 1,160 BHP of raw power, 5.5 tonnes of precision engineering.
                            </p>
                        </motion.div>

                        {/* The Powerplant - Enhanced Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-48 items-center">
                            <motion.div
                                initial={{ x: -100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-primary/20 rounded-full">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                    <span className="font-heading text-2xl font-bold uppercase text-primary tracking-widest">The Heart</span>
                                </div>
                                <h2 className="font-heading text-6xl font-black uppercase italic text-white leading-tight">
                                    MAN D26 <br />
                                    <span className="text-stroke-white text-transparent">Power Unit</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed border-l-2 border-primary/50 pl-6">
                                    At the core lies a highly evolved <strong className="text-white">12.4-litre MAN D26 six-cylinder diesel turbocharged</strong> unit. While many racing engines are pure custom builds, this is a modified version of the heavy-haulage powerplant — tuned to produce exactly <strong className="text-primary">1,160 BHP</strong> (tested output).
                                </p>
                                <p className="text-white text-lg font-bold italic">
                                    Mated to a <span className="text-primary">ZF Manual 16-Speed</span> Synchromesh gearbox. No paddle shifters. Pure mechanical engagement.
                                </p>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="bg-secondary/30 p-6 border border-white/10 -skew-x-6">
                                        <span className="block text-4xl font-heading font-bold text-white skew-x-6">1,160<span className="text-primary text-sm ml-1">BHP</span></span>
                                        <span className="text-xs uppercase text-muted-foreground tracking-widest skew-x-6">Tested Power</span>
                                    </div>
                                    <div className="bg-secondary/30 p-6 border border-white/10 -skew-x-6">
                                        <span className="block text-4xl font-heading font-bold text-white skew-x-6">5,500<span className="text-primary text-sm ml-1">kg</span></span>
                                        <span className="text-xs uppercase text-muted-foreground tracking-widest skew-x-6">Min Weight</span>
                                    </div>
                                    <div className="col-span-2 bg-secondary/30 p-4 border border-white/10 -skew-x-6">
                                        <span className="block text-xl font-heading font-bold text-white skew-x-6">MD106 / MD107 — SYN2001K / SYN2002K</span>
                                        <span className="text-xs uppercase text-muted-foreground tracking-widest skew-x-6">Specialized Racing Axle Configuration</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative h-full min-h-[500px]"
                            >
                                <div className="absolute inset-0 bg-primary z-0 transform translate-x-4 translate-y-4" />
                                <img
                                    src="/images/team_working_on_truck.jpg"
                                    alt="Dave Jenkins Engineering the #69 MAN TGX"
                                    className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 shadow-2xl"
                                />
                                <motion.div
                                    className="absolute -bottom-10 -left-10 z-20 bg-black border border-primary p-6"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Wrench className="h-12 w-12 text-primary" />
                                    <p className="text-xs text-white/50 mt-2 uppercase tracking-wider">Stone Workshop</p>
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* Water-Cooled Braking with Interactive Element */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-48 items-center">
                            <motion.div
                                className="order-2 lg:order-1 relative h-full min-h-[400px] bg-secondary/10 border border-white/10 flex items-center justify-center p-8 overflow-hidden group"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />

                                {/* Water Spray Animation */}
                                <AnimatePresence>
                                    {showWaterSpray && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-1 h-1 rounded-full bg-blue-400"
                                                    initial={{
                                                        left: '50%',
                                                        top: '50%',
                                                        opacity: 1,
                                                    }}
                                                    animate={{
                                                        left: `${Math.random() * 100}%`,
                                                        top: `${Math.random() * 100}%`,
                                                        opacity: 0,
                                                        scale: [1, 3, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1.5,
                                                        delay: i * 0.05,
                                                        ease: "easeOut"
                                                    }}
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <motion.div
                                    animate={{
                                        y: showWaterSpray ? 0 : [0, 20, 0],
                                        opacity: showWaterSpray ? 1 : [0.5, 1, 0.5],
                                        scale: showWaterSpray ? 1.2 : [1, 1.1, 1]
                                    }}
                                    transition={{ duration: showWaterSpray ? 0.3 : 3, repeat: showWaterSpray ? 0 : Infinity, ease: "easeInOut" }}
                                >
                                    <Droplets className={`h-64 w-64 transition-colors duration-300 ${showWaterSpray ? 'text-blue-400' : 'text-blue-500/20'}`} />
                                </motion.div>

                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="font-heading text-4xl font-bold uppercase text-white mix-blend-overlay block mb-4">Juratek Discs<br />Water-Cooled</span>
                                        <button
                                            onClick={() => {
                                                setShowWaterSpray(true);
                                                setTimeout(() => setShowWaterSpray(false), 2000);
                                            }}
                                            className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 text-blue-400 font-heading uppercase text-sm tracking-widest hover:bg-blue-500/30 transition-all hover:scale-105 active:scale-95"
                                        >
                                            <Droplets className="h-4 w-4 inline mr-2" />
                                            Activate Spray
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="order-1 lg:order-2 space-y-6"
                                initial={{ x: 100, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-destructive/20 rounded-full">
                                        <Gauge className="h-8 w-8 text-destructive" />
                                    </div>
                                    <span className="font-heading text-2xl font-bold uppercase text-destructive tracking-widest">Thermal Management</span>
                                </div>
                                <h2 className="font-heading text-5xl font-black uppercase italic text-white leading-tight">
                                    Water-Cooled <br /> Stopping Power
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    Stopping a 5.5-tonne machine from 100 mph into a hairpin corner generates enough thermal energy to melt standard rotors. Dave manually triggers water onto the <strong className="text-white">Juratek discs</strong> to keep them from overheating.
                                </p>
                                <ul className="space-y-4 mt-8">
                                    {[
                                        { title: 'The System', text: 'High-pressure water jets cooling the brake discs in real-time.' },
                                        { title: 'The Control', text: 'Manual activation by the driver — precision timing critical.' },
                                        { title: 'The Result', text: 'Zero brake fade. Late braking domination into every corner.' }
                                    ].map((item, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ x: 50, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.2 }}
                                            className="bg-secondary/40 p-4 border-l-4 border-destructive flex flex-col"
                                        >
                                            <strong className="text-white uppercase text-sm mb-1 tracking-wider">{item.title}</strong>
                                            <span className="text-muted-foreground">{item.text}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>

                        {/* Balance of Performance - Air Restrictors */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-48 items-center">
                            <motion.div
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="p-3 bg-amber-500/20 rounded-full">
                                        <Target className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <span className="font-heading text-2xl font-bold uppercase text-amber-500 tracking-widest">2026 BTRC Regulation</span>
                                </div>
                                <h2 className="font-heading text-5xl font-black uppercase italic text-white leading-tight">
                                    The Weight of <br /> <span className="text-amber-500">Success</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    For the 2026 season, the BTRC has introduced a "Balance of Performance" rule using turbo air restrictors. Because Dave finished <strong className="text-white">3rd in the 2025 Championship</strong>, his truck must start the season with a mandatory restriction.
                                </p>
                                <p className="text-white text-lg font-bold italic border-l-4 border-amber-500 pl-4">
                                    "It's like trying to run a marathon breathing through a straw. The faster you are, the more the regulations try to choke your engine. So we engineer our way out."
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    Success has a cost — but it also proves Dave's engineering prowess. Breaking through the handicap is the ultimate testament to the team's skill.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                className="relative bg-gradient-to-br from-secondary/30 to-secondary/10 border border-white/10 p-8"
                            >
                                <div className="absolute top-0 right-0 p-4 bg-amber-500 text-black font-heading font-bold uppercase -mt-4 -mr-4 skew-x-[-12deg]">
                                    <span className="skew-x-[12deg]">Regulation 2026</span>
                                </div>
                                <div className="text-center space-y-6">
                                    <div className="inline-block border-4 border-dashed border-white/30 rounded-full p-8 w-48 h-48 flex items-center justify-center mx-auto mb-4 relative">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border-2 border-amber-500/30 rounded-full border-dashed"
                                        />
                                        <div className="w-full h-full rounded-full border-[16px] border-amber-500 flex items-center justify-center bg-black">
                                            <span className="text-white font-heading text-3xl">67mm</span>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-heading text-2xl uppercase italic">Air Restrictor</h3>
                                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                        Physical restriction on the turbocharger inlet mandated by BTRC based on Championship standing. The price of podium finishes.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* The Cockpit Paradox & Geometry */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-48">
                            {/* Stock Paradox */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="bg-gradient-to-br from-secondary/30 to-secondary/10 border border-white/10 p-8 relative overflow-hidden group hover:border-primary/50 transition-colors"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Eye className="h-12 w-12 text-white/20 absolute top-4 right-4 group-hover:text-primary/30 transition-colors" />
                                <h3 className="font-heading text-3xl font-bold uppercase italic text-white mb-4">The "Stock" Paradox</h3>
                                <p className="text-muted-foreground mb-6">
                                    A surprising fact: Under BTRC regulations, the main body of the dashboard and the <strong className="text-white">standard instrument binnacle must remain in their original positions</strong>.
                                </p>
                                <p className="text-muted-foreground text-sm mb-4">
                                    Inside the carbon-fiber roll cage, you'll find the standard MAN speedometer and rev counter clocks. A 1,160 BHP monster that, from the driver's seat, still looks like a road hauler.
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                    <Truck className="h-5 w-5 text-primary" />
                                    <span className="text-xs text-white/60 uppercase tracking-widest">OEM Interior Mandate</span>
                                </div>
                            </motion.div>

                            {/* Steering Geometry */}
                            <motion.div
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-secondary/30 to-secondary/10 border border-white/10 p-8 relative overflow-hidden group hover:border-destructive/50 transition-colors"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Compass className="h-12 w-12 text-white/20 absolute top-4 right-4 group-hover:text-destructive/30 transition-colors" />
                                <h3 className="font-heading text-3xl font-bold uppercase italic text-white mb-4">2026 Steering Geometry</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="text-muted-foreground uppercase text-xs tracking-widest">Max Castor Angle</span>
                                        <span className="text-white font-heading font-bold text-xl">30&deg;</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                        <span className="text-muted-foreground uppercase text-xs tracking-widest">Max Positive Camber</span>
                                        <span className="text-white font-heading font-bold text-xl">+3&deg;</span>
                                    </li>
                                </ul>
                                <p className="text-muted-foreground text-sm mt-4">
                                    <strong className="text-white">Why it matters:</strong> These limits restrict how "pointy" the truck can feel, forcing Dave to rely on his suspension setup and tire management to rotate a 5.5-tonne machine through tight chicanes.
                                </p>
                            </motion.div>
                        </div>

                        {/* Safety & Professional Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-48">
                            {/* Safety Cell */}
                            <motion.div
                                className="lg:col-span-2 bg-gradient-to-b from-secondary/20 to-black border border-white/5 p-12 relative overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                                <Shield className="h-16 w-16 text-white/20 float-right ml-6 mb-4" />
                                <h2 className="font-heading text-4xl font-black uppercase italic text-white mb-6">The Safety Cell</h2>
                                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                    The interior is a minimalist, <span className="text-white">FIA-homologated fortress</span>. Surrounded by a complex T45 steel roll cage, Dave sits in a custom-molded carbon-fiber seat. Every switch is positioned for millisecond access.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {['T45 Roll Cage', 'Carbon Seat', 'FIA Approved', '5-Point Harness'].map((item) => (
                                        <span key={item} className="px-4 py-2 bg-white/5 border border-white/10 text-sm text-white/70 uppercase tracking-wider">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Towing Eye Detail */}
                            <motion.div
                                className="bg-secondary/20 border border-white/10 p-8 relative overflow-hidden flex flex-col justify-center"
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center mx-auto mb-6">
                                    <div className="w-8 h-8 rounded-full border-2 border-primary bg-black" />
                                </div>
                                <h3 className="font-heading text-xl font-bold uppercase text-white text-center mb-3">Safety Wire Towing Eyes</h3>
                                <p className="text-center text-muted-foreground text-sm">
                                    <strong className="text-white">6mm diameter steel wire rope</strong> towing eyes — a mandatory safety requirement. Professional down to the last cable.
                                </p>
                                <span className="text-xs text-white/30 uppercase tracking-widest text-center mt-4">BTRC Regulation Compliant</span>
                            </motion.div>
                        </div>

                        {/* Father & Son Heritage Section */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="mb-32"
                        >
                            <div className="text-center mb-16">
                                <div className="inline-flex items-center gap-3 mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">Mechanical Heritage</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white mb-4">
                                    The <span className="text-primary">Jenkins Legacy</span>
                                </h2>
                                <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                                    This isn't a team that hired engineers — this is a family that <em>became</em> the engineers.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Tony Jenkins - 1984 */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    className="relative bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8"
                                >
                                    <div className="absolute -top-4 left-8 bg-primary px-4 py-1 text-black font-heading font-bold text-sm">
                                        1984
                                    </div>
                                    <History className="h-10 w-10 text-primary/50 mb-6" />
                                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-3">The Founding Father</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong className="text-white">Tony Jenkins</strong> was on the grid for the very first British Truck Racing meeting at Donington Park in 1984. One of the founding fathers of the sport.
                                    </p>
                                </motion.div>

                                {/* Dave's First Win - 1997 */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="relative bg-gradient-to-b from-secondary/30 to-transparent border border-white/10 p-8"
                                >
                                    <div className="absolute -top-4 left-8 bg-primary px-4 py-1 text-black font-heading font-bold text-sm">
                                        1997
                                    </div>
                                    <Wrench className="h-10 w-10 text-primary/50 mb-6" />
                                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-3">The Apprentice Rises</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Dave truly started at the bottom. His first "win" wasn't a race — it was the successful <strong className="text-white">restoration of one of Tony's old trucks</strong>. Learning by doing.
                                    </p>
                                </motion.div>

                                {/* Today */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="relative bg-gradient-to-b from-primary/20 to-transparent border border-primary/30 p-8"
                                >
                                    <div className="absolute -top-4 left-8 bg-primary px-4 py-1 text-black font-heading font-bold text-sm">
                                        Today
                                    </div>
                                    <Medal className="h-10 w-10 text-primary mb-6" />
                                    <h3 className="font-heading text-2xl font-bold uppercase text-white mb-3">Driver & Engineer</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        The "Jenkins way" is building the truck yourself. Dave is both driver and lead engineer — maintaining the #69 MAN TGX in his <strong className="text-white">Stone-based workshop</strong>.
                                    </p>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-12 text-center"
                            >
                                <p className="text-white/60 text-sm italic max-w-2xl mx-auto border-t border-white/10 pt-8">
                                    "We understand the hardware better than anyone else on the grid, because we build it with our own hands."
                                </p>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
