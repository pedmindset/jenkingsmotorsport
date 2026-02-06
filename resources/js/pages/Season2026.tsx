import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, MapPin, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Season2026() {
    const races = [
        { date: 'APR 4–5', track: 'Brands Hatch (Indy)', desc: 'The high-contact season opener. Technical & tight.' },
        { date: 'JUL 11–12', track: 'Snetterton 300', desc: 'A test of pure horsepower on the Bentley Straight.' },
        { date: 'AUG 8–9', track: 'Donington Park', desc: 'Convoy in the Park. 100,000 fans. Maximum pressure.' },
        { date: 'OCT 31 – NOV 1', track: 'Brands Hatch (Finale)', desc: 'Trucks & Fireworks. Where legends are made.' },
    ];

    return (
        <LandingLayout title="2026 Season | The Road to Glory">
            <div className="relative pt-32 pb-20 bg-background min-h-screen">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/10 skew-x-[-12deg] transform translate-x-1/4 pointer-events-none" />

                <div className="container px-4 md:px-6 mx-auto relative z-10">
                    <div className="mb-20">
                        <span className="font-heading text-primary font-bold uppercase tracking-widest mb-4 block">The Campaign</span>
                        <h1 className="font-heading text-6xl md:text-8xl font-black uppercase italic text-white mb-6">
                            Seven Rounds. <br /> <span className="text-white">One Goal.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">
                            Following back-to-back podiums, the team has stripped the MAN TGX to the chassis.
                            For 2026, the focus is on Aerodynamic Efficiency and Engine Mapping to find the final tenths of a second.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Calendar */}
                        <div className="space-y-8">
                            <h2 className="font-heading text-3xl font-bold uppercase italic text-white border-b border-primary/50 pb-4 inline-block">2026 Race Calendar</h2>

                            <div className="space-y-6">
                                {races.map((race, i) => (
                                    <div key={i} className="group bg-secondary/30 border border-white/5 p-6 hover:border-primary/50 transition-all cursor-default">
                                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                                            <div className="flex items-center gap-2 text-primary font-heading font-bold text-xl uppercase">
                                                <Calendar className="h-5 w-5" /> {race.date}
                                            </div>
                                            <div className="hidden md:block w-px h-4 bg-white/20" />
                                            <div className="flex items-center gap-2 text-white font-heading font-bold text-xl uppercase italic">
                                                <MapPin className="h-5 w-5" /> {race.track}
                                            </div>
                                        </div>
                                        <p className="text-muted-foreground text-sm pl-0 md:pl-1">{race.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Image / CTA */}
                        <div className="relative">
                            <img
                                src="/images/dave_truck_on_racing_tracks_as_first.jpg"
                                alt="David Jenkins Leading"
                                className="w-full h-auto shadow-2xl border-4 border-white/10 transform rotate-1 hover:rotate-0 transition-transform duration-500"
                            />

                            <div className="mt-12 bg-primary p-8 text-center">
                                <h3 className="font-heading text-3xl font-bold uppercase italic text-white mb-4">Join the Crew</h3>
                                <p className="text-white/80 mb-6">Follow the "Paddock Pass" Blog for behind-the-scenes access.</p>
                                <Button className="bg-black text-white font-heading font-bold uppercase italic px-8 py-4 hover:bg-white hover:text-black transition-colors" asChild>
                                    <Link href="/blog">Read the Blog</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
