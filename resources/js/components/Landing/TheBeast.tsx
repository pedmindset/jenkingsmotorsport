import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Gauge, Settings, Anchor } from 'lucide-react';

export default function TheBeast() {
    return (
        <section id="the-beast" className="py-24 bg-background relative overflow-hidden">
            {/* Tech Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <span className="font-heading text-primary font-bold uppercase tracking-widest mb-2 block">Technical Masterclass</span>
                    <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white mb-6">
                        The #69 <span className="text-stroke-primary text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">MAN TGX</span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Where 5.5 tonnes meets 100 MPH. A mechanical symphony tuned for explosive torque and precision handling.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Visual / Blueprint Area */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative min-h-[400px] rounded-sm overflow-hidden group shadow-2xl border-4 border-white/10"
                    >
                        <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                        <img
                            src="/images/dave_truck_on_racing_tracks_as_first_2.jpg"
                            alt="The MAN TGX 12000"
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                            <span className="font-heading font-bold uppercase text-xl text-white block mb-1">Chassis #69</span>
                            <span className="font-heading text-primary font-bold uppercase tracking-widest text-sm">Race Spec MAN TGX</span>
                        </div>
                    </motion.div>

                    {/* Technical Specs Tabs */}
                    <div className="w-full">
                        <Tabs defaultValue="engine" className="w-full">
                            <TabsList className="w-full bg-secondary/50 border border-border p-1 h-auto grid grid-cols-3 mb-8">
                                <TabsTrigger value="engine" className="data-[state=active]:bg-primary data-[state=active]:text-white font-heading font-bold uppercase italic py-3 rounded-sm transition-all skew-x-[-6deg]">
                                    <span className="skew-x-[6deg]">Power</span>
                                </TabsTrigger>
                                <TabsTrigger value="brakes" className="data-[state=active]:bg-destructive data-[state=active]:text-white font-heading font-bold uppercase italic py-3 rounded-sm transition-all skew-x-[-6deg]">
                                    <span className="skew-x-[6deg]">Stopping</span>
                                </TabsTrigger>
                                <TabsTrigger value="chassis" className="data-[state=active]:bg-white data-[state=active]:text-black font-heading font-bold uppercase italic py-3 rounded-sm transition-all skew-x-[-6deg]">
                                    <span className="skew-x-[6deg]">Structure</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="engine">
                                <Card className="bg-secondary/40 border-primary/20 backdrop-blur">
                                    <CardHeader>
                                        <CardTitle className="font-heading text-3xl font-bold uppercase italic text-primary flex items-center gap-3">
                                            <Gauge className="h-8 w-8" />
                                            12-Litre MAN Turbo
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground">
                                            At the heart lies a beast. Tuned not for efficiency, but for explosive torque.
                                        </p>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                            <li className="bg-background/50 p-4 border-l-2 border-primary">
                                                <span className="block text-xs uppercase text-muted-foreground">Output</span>
                                                <span className="font-heading text-2xl font-bold text-white">1,200 BHP</span>
                                            </li>
                                            <li className="bg-background/50 p-4 border-l-2 border-primary">
                                                <span className="block text-xs uppercase text-muted-foreground">Torque</span>
                                                <span className="font-heading text-2xl font-bold text-white">5,500 Nm</span>
                                            </li>
                                            <li className="bg-background/50 p-4 border-l-2 border-primary">
                                                <span className="block text-xs uppercase text-muted-foreground">Acceleration</span>
                                                <span className="font-heading text-xl font-bold text-white">0-100 &gt; 911</span>
                                            </li>
                                            <li className="bg-background/50 p-4 border-l-2 border-primary">
                                                <span className="block text-xs uppercase text-muted-foreground">Weight</span>
                                                <span className="font-heading text-2xl font-bold text-white">5.5 Tonnes</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="brakes">
                                <Card className="bg-secondary/40 border-destructive/20 backdrop-blur">
                                    <CardHeader>
                                        <CardTitle className="font-heading text-3xl font-bold uppercase italic text-destructive flex items-center gap-3">
                                            <Anchor className="h-8 w-8" />
                                            Water-Cooled Systems
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground">
                                            Stopping 5,500kg at 100mph generates immense heat. We use active water injection.
                                        </p>
                                        <ul className="space-y-3 mt-4">
                                            <li className="flex items-start gap-3">
                                                <span className="h-2 w-2 mt-2 rounded-full bg-destructive" />
                                                <span className="text-foreground">Massive reservoirs pump water directly onto discs.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="h-2 w-2 mt-2 rounded-full bg-destructive" />
                                                <span className="text-foreground">Prevents 'brake fade' during high-load corners.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="h-2 w-2 mt-2 rounded-full bg-destructive" />
                                                <span className="text-foreground">Critical for circuits like Snetterton.</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="chassis">
                                <Card className="bg-secondary/40 border-white/20 backdrop-blur">
                                    <CardHeader>
                                        <CardTitle className="font-heading text-3xl font-bold uppercase italic text-white flex items-center gap-3">
                                            <Settings className="h-8 w-8" />
                                            FIA Safety Cell
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <p className="text-muted-foreground">
                                            A stripped-back, FIA-spec cockpit designed for driver survival and control.
                                        </p>
                                        <ul className="grid grid-cols-1 gap-4 mt-4">
                                            <li className="bg-background/50 p-4 rounded border border-border">
                                                <strong className="text-white block mb-1">Complex Roll Cage</strong>
                                                <span className="text-sm text-muted-foreground">Full structural rigidity and driver protection.</span>
                                            </li>
                                            <li className="bg-background/50 p-4 rounded border border-border">
                                                <strong className="text-white block mb-1">ZF Racing Gearbox</strong>
                                                <span className="text-sm text-muted-foreground">Handling violent shifts to keep turbo in power band.</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </section>
    );
}
