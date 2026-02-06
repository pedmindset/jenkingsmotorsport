import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Legacy() {
    return (
        <LandingLayout title="The Legacy | Jenkins Motorsports">
            <div className="pt-24 pb-12 md:pt-32 md:pb-20 bg-background min-h-screen">
                <div className="container px-4 md:px-6 mx-auto">
                    {/* Header */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white mb-6 leading-tight"
                        >
                            Blood, Diesel, and the <span className="text-primary">Drive to Win</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="font-heading text-xl md:text-2xl font-bold uppercase tracking-widest text-muted-foreground"
                        >
                            From the 1984 Inaugural Grid to the Modern Pinnacle.
                        </motion.p>
                    </div>

                    {/* Tony Jenkins Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 transform skew-x-[-6deg] translate-x-4 translate-y-4" />
                            <img
                                src="/images/tony_jenkins_championship_truck.jpg"
                                alt="Tony Jenkins 1984"
                                className="relative z-10 w-full h-auto rounded-none border-2 border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                        <div className="space-y-6">
                            <h2 className="font-heading text-4xl font-bold uppercase italic text-white">The Founding Era: <span className="text-primary">Tony Jenkins</span></h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                In 1984, the British Truck Racing Association (BTRA) was born out of a dare at Donington Park. Standing on that inaugural grid was <strong>Tony Jenkins</strong>.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                This was the "Iron Age" of truck racing—where road-going cabs were stripped of their creature comforts and sent into battle. Tony wasn't just a driver; he was a pioneer who helped architect the very safety and technical regulations that govern the sport today.
                            </p>
                        </div>
                    </div>

                    {/* David Jenkins Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32 md:flex-row-reverse">
                        <div className="order-2 md:order-1 space-y-6">
                            <h2 className="font-heading text-4xl font-bold uppercase italic text-white">The Protégé: <span className="text-white">David Jenkins</span></h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                For David, the paddock wasn't a playground; it was a classroom. By age eight, he was observing the tactical chess match from the pit wall.
                            </p>
                            <ul className="space-y-4 border-l-2 border-primary pl-6">
                                <li>
                                    <strong className="text-white block font-heading uppercase">1997 Debut</strong>
                                    <span className="text-muted-foreground">Entered the sport in a self-restored truck, proving his mettle with mechanics first.</span>
                                </li>
                                <li>
                                    <strong className="text-white block font-heading uppercase">The Turning Point</strong>
                                    <span className="text-muted-foreground">A frame-twisting crash at Donington didn't break his spirit—it fueled the build of his first bespoke racing machine.</span>
                                </li>
                                <li>
                                    <strong className="text-destructive block font-heading uppercase">2011 Championship</strong>
                                    <span className="text-muted-foreground">Secured the Division 1 British Truck Racing Championship, fulfilling the family destiny.</span>
                                </li>
                            </ul>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative order-1 md:order-2"
                        >
                            <div className="absolute inset-0 bg-destructive/20 transform skew-x-[6deg] -translate-x-4 translate-y-4" />
                            <img
                                src="/images/dave_standing_and_lifting_trophy.jpg"
                                alt="David Jenkins Champion"
                                className="relative z-10 w-full h-auto rounded-none border-2 border-white/10"
                            />
                        </motion.div>
                    </div>

                    {/* Gold Standard */}
                    <div className="bg-secondary/30 border border-white/10 p-12 text-center backdrop-blur-sm">
                        <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-6">The "Gold Standard" of Consistency</h2>
                        <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-8">
                            With back-to-back 3rd place overall finishes in 2024 and 2025, the Jenkins name remains the benchmark for performance and technical integrity in the paddock.
                        </p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
