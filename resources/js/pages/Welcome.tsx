import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight, Activity, Cpu, Wind, gauge, Gauge } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    const targetDate = new Date('2026-04-04T09:00:00');
    const displayDate = targetDate > new Date() ? targetDate : new Date('2027-04-01T09:00:00'); // Fallback to next year if passed
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +displayDate - +new Date();
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const timelineRef = useRef(null);
    const isInView = useInView(timelineRef, { once: true, margin: "-100px" });

    return (
        <LandingLayout
            title="Jenkins Motorsports | The Architecture of Power"
            description="1,160 BHP. 5,500 Nm Torque. 40 Years of DNA. Hunt the 2026 Title with Jenkins Motorsports."
        >
            {/* 1. HERO COCKPIT: THE ARCHITECTURE OF POWER */}
            <section className="relative h-screen w-full overflow-hidden bg-black">
                {/* Video Background */}
                <div className="absolute inset-0 z-0 select-none pointer-events-none">
                    <iframe
                        className="w-[300%] h-[300%] -ml-[100%] -mt-[100%] opacity-60 md:w-[150%] md:h-[150%] md:-ml-[25%] md:-mt-[25%] object-cover"
                        src="https://www.youtube.com/embed/-jiZDvSDv8Y?autoplay=1&mute=1&loop=1&playlist=-jiZDvSDv8Y&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        title="Background Video"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-blue-950/20 to-black z-10" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-10 mix-blend-overlay" />
                </div>

                {/* Content Layer */}
                <div className="relative z-20 h-full container mx-auto px-4 md:px-6 flex flex-col justify-center">

                    {/* Live Pulse Badge */}
                    <div className="absolute top-32 right-4 md:right-6 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-destructive font-bold text-xs uppercase tracking-widest leading-none">Live Countdown</span>
                            <span className="text-white font-mono text-xs leading-none mt-1">
                                BRANDS HATCH: {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M
                            </span>
                        </div>
                    </div>

                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black italic uppercase text-white leading-[0.9] mb-6 tracking-tighter">
                                The <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/50">Architecture</span> <br />
                                Of <span className="text-primary">Power</span>
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 border-l-4 border-primary pl-6"
                        >
                            <div className="space-y-1">
                                <span className="block text-4xl font-heading font-black text-white italic">1,160 <span className="text-primary text-xl not-italic">BHP</span></span>
                                <span className="block text-xs uppercase tracking-widest text-muted-foreground">Engine Output</span>
                            </div>
                            <div className="space-y-1">
                                <span className="block text-4xl font-heading font-black text-white italic">5,500 <span className="text-primary text-xl not-italic">Nm</span></span>
                                <span className="block text-xs uppercase tracking-widest text-muted-foreground">Torque Peak</span>
                            </div>
                            <p className="text-lg md:text-xl text-white/80 max-w-lg font-medium">
                                40 Years of DNA. Experience the visceral intensity of the #69 MAN TGX as we hunt the 2026 Title.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12"
                        >
                            <Link href="/season" className="inline-flex group relative items-center justify-center -skew-x-12 bg-primary px-8 py-4 font-heading font-black uppercase italic tracking-widest text-white transition-all hover:bg-primary/90 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                                <span className="skew-x-12 flex items-center gap-2">
                                    Initiate 2026 Campaign <ArrowRight className="h-5 w-5" />
                                </span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white">System Scroll</span>
                    <div className="h-12 w-[1px] bg-linear-to-b from-white to-transparent" />
                </div>
            </section>

            {/* 2. THE DYNASTY: PARALLEL EXCELLENCE */}
            <section className="relative py-24 bg-zinc-950 overflow-hidden">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
                        {/* Connecting Line Graphic */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary rounded-full blur-[100px] z-10 hidden lg:block" />

                        {/* LEFT: LEGACY */}
                        <div className="relative h-[600px] group overflow-hidden border-r-0 lg:border-r border-white/10">
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10" />
                            <img
                                src="/images/tony_jenkins_championship_truck.jpg"
                                alt="Tony Jenkins 1984"
                                className="w-full h-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute bottom-12 left-8 md:left-12 z-20">
                                <span className="block text-6xl font-heading font-black italic text-white/20 mb-2">1984</span>
                                <h3 className="text-3xl font-heading font-bold uppercase text-white italic">The Origin</h3>
                                <p className="text-muted-foreground mt-2 max-w-xs">Forged in raw iron. Tony Jenkins lays the foundation of a British motorsport legacy.</p>
                            </div>
                        </div>

                        {/* RIGHT: MODERN */}
                        <div className="relative h-[600px] group overflow-hidden">
                            <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-colors z-10 mixed-blend-multiply" />
                            <img
                                src="/images/dave_truck_on_racing_tracks_as_first_2.jpg"
                                alt="David Jenkins 2026"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-12 right-8 md:right-12 z-20 text-right">
                                <span className="block text-6xl font-heading font-black italic text-primary/40 mb-2">2026</span>
                                <h3 className="text-3xl font-heading font-bold uppercase text-white italic">The Evolution</h3>
                                <p className="text-white/80 mt-2 max-w-xs ml-auto">Refined by telemetry. David Jenkins pushes the #69 MAN TGX into the digital age.</p>
                            </div>
                        </div>

                        {/* Center Badge */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black border-2 border-primary rotate-45 p-3 shadow-xl">
                            <div className="-rotate-45">
                                <Activity className="h-8 w-8 text-white" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-heading font-black uppercase italic text-white mb-6">The Engineering Handshake</h2>
                        <p className="text-xl text-muted-foreground">
                            In 1984, Tony Jenkins helped forge the sport with raw iron and grit. Today, David Jenkins refines it with molecular engineering. We don't just race trucks; we evolve them.
                        </p>
                        <div className="mt-8">
                            <Link href="/legacy" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-white transition-colors">
                                Explore the Timeline <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TECH DEEP DIVE: BEYOND THE BRICK */}
            <section className="relative py-32 bg-slate-950 overflow-hidden" ref={timelineRef}>
                {/* Background Blueprint Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="/images/dave_truck_overhead_shot_on_tracks.jpg" className="w-full h-full object-cover grayscale invert" alt="Tech" />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-transparent to-zinc-950" />

                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <span className="text-primary font-mono text-sm uppercase tracking-widest mb-4 block">Spec Sheet: Classified</span>
                            <h2 className="text-5xl md:text-7xl font-heading font-black uppercase italic text-white mb-8 leading-[0.9]">
                                Beyond The <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-zinc-400 to-white">Brick</span>
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                To the untrained eye, it’s a 5.5-tonne behemoth. To us, it’s a balanced aerodynamic platform. For 2026, we’ve optimized the <strong className="text-white">MAN D26 Six-Cylinder</strong> powerplant to maximize mid-range torque, compensating for the regulation-mandated air restrictors.
                            </p>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Every sensor—from the water-cooled <strong className="text-white">Juratek brakes</strong> to the <strong className="text-white">ZF 16-Speed gearbox</strong>—is a data point in our pursuit of the top step.
                            </p>

                            <Button className="bg-white text-black hover:bg-zinc-200 -skew-x-12 px-8 py-6 font-heading font-black uppercase italic" asChild>
                                <Link href="/the-machine"><span className="skew-x-12">Full Technical Analysis</span></Link>
                            </Button>
                        </div>

                        <div className="lg:w-1/2 w-full grid gap-4">
                            {[
                                { val: "1,160", unit: "BHP", label: "Engine Output", icon: Cpu },
                                { val: "5,500", unit: "NM", label: "Torque Peak", icon: Gauge },
                                { val: "100", unit: "MPH", label: "Electronically Limited", icon: Wind },
                                { val: "67mm", unit: "RESTRICTOR", label: "Turbo Intake", icon: Activity },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group relative bg-black/50 border border-white/10 hover:border-primary/50 p-4 flex items-center justify-between overflow-hidden transition-all hover:bg-white/5"
                                >
                                    <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />

                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className="bg-white/5 p-3 rounded-md">
                                            <stat.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <span className="block text-4xl font-heading font-black italic text-white group-hover:text-primary transition-colors">{stat.val}</span>
                                        </div>
                                    </div>
                                    <div className="text-right relative z-10">
                                        <span className="block text-xl font-bold text-white/50">{stat.unit}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. R&D HUB: INDUSTRIAL ROI */}
            <section className="relative py-24 bg-white text-black overflow-hidden">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 order-2 lg:order-1">
                            <div className="relative rounded-lg overflow-hidden shadow-2xl skew-x-[-2deg] border-4 border-black">
                                <img src="/images/team_working_on_truck.jpg" alt="R&D Lab" className="w-full h-full object-cover scale-105" />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <span className="font-heading font-bold uppercase text-xl">Test Subject: 001</span>
                                    <p className="text-sm opacity-80">Morris Lubricants Thermal Stress Test // Pass</p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5 order-1 lg:order-2">
                            <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest mb-4 -skew-x-12">
                                <span className="skew-x-12">Jenkins Lab</span>
                            </span>
                            <h2 className="text-5xl md:text-6xl font-heading font-black uppercase italic mb-6 leading-none">
                                Industrial <br /><span className="text-primary">ROI</span>
                            </h2>
                            <p className="text-lg font-medium text-zinc-600 mb-6">
                                We are a rolling R&D lab for the world’s most demanding brands. From testing <span className="text-black font-bold">Morris Lubricants' Versimax</span> oil at extreme thermal peaks to pushing <span className="text-black font-bold">Giti GTR92</span> rubber to its lateral breaking point.
                            </p>
                            <p className="text-lg text-zinc-600 mb-8 border-l-4 border-primary pl-4">
                                We provide the data that keeps global logistics moving.
                            </p>

                            <Button className="bg-primary hover:bg-primary/90 text-white -skew-x-12 px-8 py-6 font-heading font-black uppercase italic shadow-2xl" asChild>
                                <Link href="/partners"><span className="skew-x-12">Partner With The Dynasty</span></Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
