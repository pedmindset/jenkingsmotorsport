import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Partnerships() {
    return (
        <LandingLayout title="Partnerships | Drive ROI">
            {/* Header */}
            <div className="relative py-24 bg-black">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: 'url("/storage/images/multiple_trucks_on_racing_tracks_2.jpg")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                    <span className="font-heading text-primary font-bold uppercase tracking-widest mb-4 block">B2B Ecosystem</span>
                    <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white mb-6">
                        More Than a Sponsor. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">A Technical Ally.</span>
                    </h1>
                </div>
            </div>

            <div className="bg-background py-20">
                <div className="container px-4 md:px-6 mx-auto">

                    {/* Why Partner? */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                        <div className="bg-secondary/30 p-8 border border-white/10">
                            <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4">The "Tested By Jenkins" Advantage</h2>
                            <p className="text-muted-foreground mb-6">
                                Our partnerships are built on R&D. We don't just carry a logo; we carry the product.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-1 bg-primary h-full min-h-[3rem]" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase">Morris Lubricants</h4>
                                        <p className="text-sm text-muted-foreground">Pushing oils to temperatures far exceeding road-going limits.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-1 bg-destructive h-full min-h-[3rem]" />
                                    <div>
                                        <h4 className="text-white font-bold uppercase">Giti Tire</h4>
                                        <p className="text-sm text-muted-foreground">Providing real-world data on lateral load and thermal degradation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                            <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4">Why the BTRC?</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Truck racing offers an ROI that traditional motorsport cannot match. It is a high-octane "Trade Show in Motion."
                            </p>
                            <ul className="grid grid-cols-2 gap-4">
                                <li className="bg-secondary/50 p-4 text-center">
                                    <span className="block text-3xl font-black text-white">300k+</span>
                                    <span className="text-xs uppercase text-muted-foreground">Live Spectators</span>
                                </li>
                                <li className="bg-secondary/50 p-4 text-center">
                                    <span className="block text-3xl font-black text-white">TV</span>
                                    <span className="text-xs uppercase text-muted-foreground">Global Coverage</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Tiers Table */}
                    <div className="mb-20">
                        <h2 className="font-heading text-4xl font-black uppercase italic text-white text-center mb-12">Partnership Tiers</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-white/20">
                                        <th className="p-4 text-left font-heading uppercase text-muted-foreground">Tier</th>
                                        <th className="p-4 text-left font-heading uppercase text-muted-foreground">Commercial Impact</th>
                                        <th className="p-4 text-left font-heading uppercase text-muted-foreground">Key Benefits</th>
                                        <th className="p-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-heading font-bold text-xl uppercase italic text-white">Title Partner</td>
                                        <td className="p-6 text-white">Global Brand Alignment</td>
                                        <td className="p-6 text-muted-foreground text-sm">Full truck livery (Blue/Black/Red), Title naming rights, Bespoke digital content.</td>
                                        <td className="p-6 text-right">
                                            <Button size="sm" className="rounded-none uppercase font-bold italic" asChild>
                                                <Link href="/contact?tier=title">Inquire</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-heading font-bold text-xl uppercase italic text-white">Technical Partner</td>
                                        <td className="p-6 text-white">R&D & Product Authority</td>
                                        <td className="p-6 text-muted-foreground text-sm">"Real-World Test" case studies, technical data access, paddock product displays.</td>
                                        <td className="p-6 text-right">
                                            <Button variant="outline" size="sm" className="rounded-none uppercase font-bold italic border-white/20 text-white hover:text-black" asChild>
                                                <Link href="/contact?tier=technical">Inquire</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-heading font-bold text-xl uppercase italic text-white">Hospitality Partner</td>
                                        <td className="p-6 text-white">B2B Networking</td>
                                        <td className="p-6 text-muted-foreground text-sm">Private VIP paddock area, client meet-and-greets, "Hot Lap" experiences.</td>
                                        <td className="p-6 text-right">
                                            <Button variant="outline" size="sm" className="rounded-none uppercase font-bold italic border-white/20 text-white hover:text-black" asChild>
                                                <Link href="/contact?tier=hospitality">Inquire</Link>
                                            </Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-muted-foreground mb-6">Want to create a custom package?</p>
                        <Button size="lg" className="bg-primary text-white font-heading uppercase italic font-bold rounded-none px-8 py-6 skew-x-[-12deg]" asChild>
                            <Link href="/contact">
                                <span className="skew-x-[12deg]">Contact Marketing Team</span>
                            </Link>
                        </Button>
                    </div>

                </div>
            </div>
        </LandingLayout>
    );
}
