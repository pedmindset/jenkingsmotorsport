import { Link, useForm } from '@inertiajs/react';
import { Facebook, Instagram, ArrowRight, Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormEventHandler } from 'react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            onSuccess: () => reset(),
        });
    };

    return (
        <footer className="relative bg-[#0a0a0a] border-t border-white/5 overflow-hidden">
            {/* Decorative Top Gradient Line - Racing Stripes */}
            <div className="absolute top-0 left-0 w-full h-1.5 flex">
                <div className="w-1/3 bg-primary -skew-x-12 -ml-2" />
                <div className="w-1/6 bg-destructive -skew-x-12" />
                <div className="w-1/2 bg-black -skew-x-12" />
            </div>

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Large Watermark */}
                <div className="absolute -bottom-24 -right-12 font-heading font-black text-[15rem] leading-none text-white/5 select-none italic tracking-tighter z-0">
                    JENKINS
                </div>
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
            </div>

            {/* Newsletter / CTA Section - Floating Card Style */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 -mt-8 mb-16">
                <div className="bg-neutral-900/80 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent opacity-50" />
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h3 className="font-heading text-3xl md:text-4xl font-black uppercase italic text-white mb-3 tracking-wide">
                                Join the <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-foreground">Inner Circle</span>
                            </h3>
                            <p className="text-muted-foreground text-lg font-medium leading-relaxed">
                                Exclusive telemetry data, pit lane access, and race weekend intel delivered straight to your inbox.
                            </p>
                        </div>

                        <form onSubmit={submit} className="w-full lg:w-auto min-w-[350px]">
                            <div className="flex flex-col gap-4">
                                <div className="relative group/input">
                                    <Input
                                        type="email"
                                        placeholder="ENTER YOUR EMAIL ADDRESS"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        className="bg-black/40 border-white/10 text-white placeholder:text-white/30 h-14 pl-6 pr-14 uppercase italic font-bold tracking-widest rounded-none focus-visible:ring-primary focus-visible:border-primary transition-all duration-300 group-hover/input:border-white/20"
                                    />
                                    <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within/input:text-primary transition-colors" />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-14 w-full bg-white text-black hover:bg-primary hover:text-white font-heading font-black uppercase italic text-lg tracking-wider rounded-none transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)] -skew-x-6"
                                >
                                    <span className="skew-x-6 flex items-center justify-center gap-2">
                                        {processing ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Subscribe Now'}
                                        {!processing && <ArrowRight className="h-5 w-5" />}
                                    </span>
                                </Button>
                            </div>

                            {errors.email && (
                                <p className="text-destructive text-sm mt-3 font-bold uppercase italic flex items-center gap-2 animate-in slide-in-from-top-2 fade-in">
                                    <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> {errors.email}
                                </p>
                            )}

                            {recentlySuccessful && (
                                <p className="text-green-500 text-sm mt-3 font-bold uppercase italic flex items-center gap-2 animate-in slide-in-from-top-2 fade-in">
                                    <CheckCircle2 className="h-4 w-4" /> Welcome to the team!
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="inline-block group focus:outline-none focus:ring-2 focus:ring-primary rounded-sm">
                            <img
                                src="/images/Jenkins_logo_with_text_color_white.png"
                                alt="Jenkins Motorsports"
                                className="h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            />
                        </Link>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md border-l-2 border-primary/30 pl-6 py-1">
                            The gold standard of British Truck Racing. <br />
                            <span className="text-white font-bold">Since 1984.</span>
                        </p>

                        <div className="flex items-center gap-3 pt-4">
                            <SocialLink href="https://www.facebook.com/jenkins.trucksport/" icon={Facebook} label="Facebook" />
                            <SocialLink href="https://www.instagram.com/jenkinsmotorsportdevelopment/" icon={Instagram} label="Instagram" />
                        </div>
                    </div>

                    {/* Navigation Columns - Staggered Layout */}
                    <div className="lg:col-span-2 md:col-span-1 pt-4">
                        <h4 className="font-heading text-xl font-bold uppercase text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-primary -skew-x-12" /> Team
                        </h4>
                        <ul className="space-y-5">
                            <FooterLink href="/the-machine">The Machine</FooterLink>
                            <FooterLink href="/legacy">Legacy</FooterLink>
                            <FooterLink href="/gallery">Gallery</FooterLink>
                        </ul>
                    </div>

                    <div className="lg:col-span-2 md:col-span-1 pt-4">
                        <h4 className="font-heading text-xl font-bold uppercase text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-1 bg-destructive -skew-x-12" /> Racing
                        </h4>
                        <ul className="space-y-5">
                            <FooterLink href="/season">Calendar 2026</FooterLink>
                            <FooterLink href="/le-mans">Le Mans 24h</FooterLink>
                            <FooterLink href="/championship">Championship</FooterLink>
                            <FooterLink href="/blog">Paddock Pass</FooterLink>
                        </ul>
                    </div>

                    {/* Compact Partner Card */}
                    <div className="lg:col-span-3 md:col-span-2 pt-2">
                        <div className="bg-white/5 border border-white/10 p-8 h-full relative overflow-hidden group hover:bg-white/10 transition-colors duration-500 rounded-sm">
                            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-125 group-hover:-rotate-12">
                                <ArrowRight className="w-32 h-32 -rotate-45" />
                            </div>

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div>
                                    <h4 className="font-heading text-2xl font-black uppercase italic text-white mb-3">
                                        Partner <br /> With Us
                                    </h4>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                        Align your brand with maximum torque and visibility.
                                    </p>
                                </div>
                                <Link
                                    href="/partners"
                                    className="inline-flex items-center gap-3 text-primary group-hover:text-white font-bold uppercase tracking-wider text-sm transition-colors border-2 border-primary/20 group-hover:border-primary bg-transparent group-hover:bg-primary px-6 py-3 -skew-x-6"
                                >
                                    <span className="skew-x-6">Partnership Deck</span> <ArrowRight className="h-4 w-4 skew-x-6 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-xs font-mono tracking-wide">
                        &copy; {currentYear} JENKINS MOTORSPORTS. EST 1984.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(/ /g, '-')}`}
                                className="text-white/40 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors relative group py-1"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-primary hover:text-white text-white/60 transition-all duration-300 rounded-sm"
            aria-label={label}
        >
            <Icon className="h-5 w-5" />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link
                href={href}
                className="text-muted-foreground hover:text-white hover:pl-2 transition-all duration-300 block relative group"
            >
                <span className="relative z-10">{children}</span>
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2" />
            </Link>
        </li>
    );
}
