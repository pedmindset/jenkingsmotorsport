import LandingLayout from '@/layouts/LandingLayout';
import Hero from '@/components/Landing/Hero';
import TheBeast from '@/components/Landing/TheBeast';
import HistoryTimeline from '@/components/Landing/HistoryTimeline';
import SponsorshipTiers from '@/components/Landing/SponsorshipTiers';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <LandingLayout
            title="Jenkins Motorsports | The Gold Standard"
            description="Jenkins Motorsports - The #69 MAN TGX Racing Team. 40 years of British Truck Racing legacy. Experience the 1,200 BHP titans of the track."
        >

            <Hero />

            <TheBeast />

            <HistoryTimeline />

            <SponsorshipTiers />

            {/* Season Calendar / Call to Action Section */}
            <section id="season" className="py-24 bg-primary relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 skew-x-12 transform origin-top-left scale-150" />

                <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                    <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-6">
                        See the beast in <span className="text-black">Action</span>
                    </h2>
                    <p className="text-white/90 text-xl max-w-2xl mx-auto mb-10 font-bold">
                        Don't miss the 2026 Season Opener at Brands Hatch. April 4–5.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <a
                            href="https://www.btrc.co.uk/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-14 items-center justify-center bg-white text-primary font-heading font-bold uppercase italic text-xl px-8 hover:bg-white/90 transition-colors skew-x-[-12deg]"
                        >
                            <span className="skew-x-[12deg]">Get Tickets</span>
                        </a>
                    </div>
                </div>
            </section>

        </LandingLayout>
    );
}
