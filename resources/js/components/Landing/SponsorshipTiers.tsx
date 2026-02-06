import { Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, Wrench, GlassWater, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SponsorshipTiers() {
    return (
        <section id="sponsors" className="py-24 bg-black relative">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: 'url("/storage/images/multiple_trucks_on_racing_tracks.jpg")' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="mb-16 text-center">
                    <span className="font-heading text-destructive font-bold uppercase tracking-widest mb-2 block">Commercial Partners</span>
                    <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white">
                        Drive <span className="text-primary">ROI</span>
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Connect with 100,000+ spectators and decision-makers in the logistics industry.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Technical Partner */}
                    <Card className="bg-secondary/40 border-t-4 border-t-destructive border-x border-b border-border/20 backdrop-blur group hover:-translate-y-2 transition-transform duration-300">
                        <CardHeader>
                            <Wrench className="h-10 w-10 text-destructive mb-4" />
                            <CardTitle className="font-heading text-2xl font-bold uppercase italic text-white">Technical Partner</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm h-12">Prove product superiority in a real-world R&D lab.</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-destructive" /> Data-sharing rights</li>
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-destructive" /> "Tested by Jenkins" Case Studies</li>
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-destructive" /> Specific parts branding</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full border-white/10 hover:bg-destructive hover:text-white uppercase font-heading font-bold italic transition-colors" asChild>
                                <Link href="/contact?tier=technical">Inquire</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Title Partner (Premium) */}
                    <Card className="bg-secondary/60 border-t-4 border-t-primary border-x border-b border-white/10 backdrop-blur relative scale-105 shadow-2xl shadow-primary/20 z-10 group">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 uppercase italic skew-x-[-12deg] -mt-3 mr-3 shadow-lg">
                            Most Exclusive
                        </div>
                        <CardHeader>
                            <Star className="h-12 w-12 text-primary mb-4" />
                            <CardTitle className="font-heading text-3xl font-bold uppercase italic text-white">Title Partner</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm h-12">Dominant placement and full naming rights.</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-sm text-white"><Check className="h-4 w-4 text-primary" /> Full "Naming Rights"</li>
                                <li className="flex gap-2 text-sm text-white"><Check className="h-4 w-4 text-primary" /> Primary Livery Branding</li>
                                <li className="flex gap-2 text-sm text-white"><Check className="h-4 w-4 text-primary" /> Digital Content Strategy</li>
                                <li className="flex gap-2 text-sm text-white"><Check className="h-4 w-4 text-primary" /> Driver Appearances</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white uppercase font-heading font-bold italic text-lg py-6 shadow-lg shadow-primary/20" asChild>
                                <Link href="/contact?tier=title">
                                    Become a Partner <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Hospitality Partner */}
                    <Card className="bg-secondary/40 border-t-4 border-t-white border-x border-b border-border/20 backdrop-blur group hover:-translate-y-2 transition-transform duration-300">
                        <CardHeader>
                            <GlassWater className="h-10 w-10 text-white mb-4" />
                            <CardTitle className="font-heading text-2xl font-bold uppercase italic text-white">Hospitality</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground text-sm h-12">High-impact B2B networking in the paddock.</p>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-white" /> Private Paddock Area</li>
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-white" /> VIP Race Day Passes</li>
                                <li className="flex gap-2 text-sm text-gray-300"><Check className="h-4 w-4 text-white" /> Client Networking</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full border-white/10 hover:bg-white hover:text-black uppercase font-heading font-bold italic transition-colors" asChild>
                                <Link href="/contact?tier=hospitality">Inquire</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
}
