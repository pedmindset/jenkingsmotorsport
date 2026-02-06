import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Gauge, Anchor, Settings, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TheMachine() {
    return (
        <LandingLayout title="The Machine | MAN TGX 12000">
            {/* Hero Banner */}
            <div className="relative h-[60vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/storage/images/dave_truck_overhead_shot_on_tracks.jpg")' }}
                >
                    <div className="absolute inset-0 bg-black/70" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic text-white mb-2">
                            1,200 BHP. <br /> <span className="text-primary">No Compromise.</span>
                        </h1>
                        <p className="font-heading text-xl md:text-2xl font-bold uppercase tracking-widest text-muted-foreground">
                            Step inside the "Man in Black"
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-background py-20">
                <div className="container px-4 md:px-6 mx-auto">
                    {/* The Powerplant */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <Zap className="h-8 w-8 text-primary" />
                                <span className="font-heading text-2xl font-bold uppercase text-primary">The Heart</span>
                            </div>
                            <h2 className="font-heading text-4xl font-black uppercase italic text-white">12-Litre Turbocharged Fury</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                The #69 MAN TGX is not a modified road truck; it is a purpose-built racing titan. At its core lies a <strong>12,000cc MAN powerplant</strong> tuned to produce a staggering <strong>1,200 bhp</strong>.
                            </p>
                            <p className="text-white text-xl font-bold border-l-4 border-destructive pl-4 italic">
                                "The truly violent statistic is the 5,500 Nm of torque. This enables the truck to out-accelerate performance sports cars from a standstill."
                            </p>
                        </div>
                        <div className="relative h-full min-h-[400px]">
                            <img
                                src="/storage/images/team_working_on_truck.jpg"
                                alt="Engine Engineering"
                                className="w-full h-full object-cover rounded-sm border border-white/20"
                            />
                            <div className="absolute bottom-[-20px] left-[-20px] bg-secondary p-6 border border-border max-w-xs">
                                <span className="block font-heading text-4xl font-black text-white">5,500 Nm</span>
                                <span className="text-sm text-muted-foreground uppercase tracking-widest">Torque Output</span>
                            </div>
                        </div>
                    </div>

                    {/* Braking & Cooling */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
                        <div className="order-2 lg:order-1 relative h-full min-h-[400px] bg-secondary/20 border border-white/10 flex items-center justify-center p-8">
                            {/* Abstract representation since we might not have a dedicated brake detail shot yet */}
                            <div className="text-center">
                                <Anchor className="h-32 w-32 text-destructive mx-auto mb-6 opacity-80" />
                                <span className="font-heading text-2xl font-bold uppercase text-white">Active Water Injection</span>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <Gauge className="h-8 w-8 text-destructive" />
                                <span className="font-heading text-2xl font-bold uppercase text-destructive">Thermal Management</span>
                            </div>
                            <h2 className="font-heading text-4xl font-black uppercase italic text-white">Water-Cooled Stopping Power</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Stopping a 5.5-tonne machine from 100 mph into a hairpin corner generates enough thermal energy to melt standard rotors.
                            </p>
                            <ul className="space-y-4 mt-4">
                                <li className="bg-secondary/40 p-4 border-l-2 border-destructive">
                                    <strong className="text-white block uppercase text-sm mb-1">The Solution</strong>
                                    <span className="text-muted-foreground">A specialized, closed-loop water-cooled braking system. High-pressure reservoirs pump water directly onto the discs.</span>
                                </li>
                                <li className="bg-secondary/40 p-4 border-l-2 border-destructive">
                                    <strong className="text-white block uppercase text-sm mb-1">The Result</strong>
                                    <span className="text-muted-foreground">Instantly dissipates heat to prevent "brake fade" allowing David to attack corners late and hard.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Safety Cell */}
                    <div className="max-w-4xl mx-auto text-center bg-secondary/20 border border-white/5 p-12">
                        <Settings className="h-12 w-12 text-white mx-auto mb-6" />
                        <h2 className="font-heading text-4xl font-black uppercase italic text-white mb-6">The Safety Cell</h2>
                        <p className="text-muted-foreground text-lg mb-8">
                            The interior is a minimalist, FIA-homologated fortress. Surrounded by a complex **T45 steel roll cage**, David sits in a custom-molded carbon-fiber seat. Every switch is positioned for millisecond access, and gears are smashed through a specialized **ZF racing transmission**.
                        </p>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
