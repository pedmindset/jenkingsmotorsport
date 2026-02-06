 import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, History } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[800px] w-full overflow-hidden bg-black">
            {/* Background Image / Video Placeholder */}
            {/* Ideally this would be a high-quality video or image of the #69 MAN Truck */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{
                    backgroundImage: 'url("/storage/images/dave_truck_on_racing_tracks_2.jpg")',
                    filter: 'grayscale(30%) contrast(120%)'
                }}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />

            {/* Content */}
            <div className="container relative mx-auto flex h-full flex-col justify-center px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="mb-4 flex items-center gap-4">
                        <span className="inline-block h-1 w-20 bg-primary skew-x-[-12deg]" />
                        <span className="font-heading text-lg font-bold uppercase tracking-widest text-primary">
                            British Truck Racing Championship 2026
                        </span>
                    </div>

                    <h1 className="font-heading text-6xl font-black uppercase italic leading-[0.9] text-white md:text-8xl lg:text-9xl mb-8">
                        The <span className="text-translucent-text-stroke text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Titan</span> <br />
                        <span className="text-primary">Returns</span>
                    </h1>

                    <p className="max-w-xl text-lg text-muted-foreground md:text-xl font-medium mb-12">
                        Jenkins Motorsports. 40 years of asphalt-tearing legacy.
                        The #69 MAN TGX is ready to reclaim the crown.
                    </p>

                    {/* Split CTA Layout */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Button
                                size="lg"
                                className="h-14 w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-white font-heading font-bold uppercase italic text-xl tracking-wider skew-x-[-12deg] rounded-none border-l-4 border-white"
                                asChild
                            >
                                <Link href="/season">
                                    <span className="skew-x-[12deg] flex items-center gap-2">
                                        The 2026 Season <ArrowRight className="h-5 w-5" />
                                    </span>
                                </Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 w-full sm:w-auto min-w-[200px] border-white/20 hover:bg-white/10 text-white font-heading font-bold uppercase italic text-xl tracking-wider skew-x-[-12deg] rounded-none backdrop-blur-sm"
                                asChild
                            >
                                <Link href="/legacy">
                                    <span className="skew-x-[12deg] flex items-center gap-2">
                                        <History className="h-5 w-5" /> The Legacy
                                    </span>
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="font-heading text-xs uppercase tracking-widest text-muted-foreground">Scroll to Explore</span>
                <div className="h-12 w-[1px] bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
}
