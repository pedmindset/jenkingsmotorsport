import { Head, Link } from '@inertiajs/react';
import { Menu, Truck, X } from 'lucide-react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface LandingLayoutProps extends PropsWithChildren {
    title: string;
}

export default function LandingLayout({ title, children }: LandingLayoutProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'The Beast', href: '/the-machine' },
        { name: 'Legacy', href: '/legacy' },
        { name: 'Partners', href: '/partners' },
        { name: 'Season 2026', href: '/season' },
        { name: 'Paddock Pass', href: '/blog' },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white">
            <Head title={title} />

            {/* Sticky Glass Navbar */}
            <nav
                className={cn(
                    'fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-md border-border/40 py-2'
                        : 'bg-transparent py-4'
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/storage/images/Jenkins_logo_with_text_color_white.png"
                            alt="Jenkins Motorsports"
                            className="h-16 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-heading text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full -skew-x-12" />
                            </Link>
                        ))}
                        <Button
                            asChild
                            className="bg-destructive hover:bg-destructive/90 text-white font-heading font-bold uppercase italic tracking-wider -skew-x-12 rounded-none px-6"
                        >
                            <Link href="/contact">
                                <span className="skew-x-12">Join the Team</span>
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Nav */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-border bg-background/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-8 mt-10">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="font-heading text-2xl font-bold uppercase italic text-white hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <Button asChild className="w-full bg-primary font-heading font-bold uppercase italic rounded-none">
                                    <Link href="/contact">Join the Team</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative">
                {children}
            </main>

            {/* Industrial Footer */}
            <footer className="bg-secondary border-t border-border py-12 md:py-20 mt-0">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <Link href="/" className="flex items-center gap-2 mb-6 group">
                                <img
                                    src="/storage/images/Jenkins_logo_with_text_color_white.png"
                                    alt="Jenkins Motorsports"
                                    className="h-16 w-auto object-contain group-hover:opacity-80 transition-opacity"
                                />
                            </Link>
                            <p className="text-muted-foreground max-w-sm mb-6">
                                The gold standard of British Truck Racing.
                                From the 1984 pioneers to the 1,200 BHP titans of today.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-heading text-lg font-bold uppercase text-white mb-6">Team</h4>
                            <ul className="space-y-4">
                                <li><Link href="/legacy" className="text-muted-foreground hover:text-primary transition-colors">History</Link></li>
                                <li><Link href="/the-machine" className="text-muted-foreground hover:text-primary transition-colors">The Machine</Link></li>
                                <li><Link href="/season" className="text-muted-foreground hover:text-primary transition-colors">Season 2026</Link></li>
                                <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Paddock Pass</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-heading text-lg font-bold uppercase text-white mb-6">Connect</h4>
                            <ul className="space-y-4">
                                <li><Link href="/partners" className="text-muted-foreground hover:text-primary transition-colors">Sponsorship</Link></li>
                                <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>&copy; {new Date().getFullYear()} Jenkins Motorsports. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
