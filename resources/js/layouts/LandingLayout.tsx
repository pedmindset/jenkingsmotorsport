import { Link } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import { PropsWithChildren, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import SEO from '@/components/seo';
import Footer from '@/components/Landing/Footer';

interface LandingLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    schema?: string | object;
}

export default function LandingLayout({ title, description, image, url, type, schema, children }: LandingLayoutProps) {
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
        { name: 'Le Mans', href: '/le-mans' },
        { name: 'Paddock Pass', href: '/blog' },
    ];

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white">
            <SEO
                title={title}
                description={description}
                image={image}
                url={url}
                type={type}
                schema={schema}
            />

            {/* Sticky Glass Navbar */}
            <nav
                className={cn(
                    'fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-md border-border/40 py-2'
                        : 'bg-transparent py-2 md:py-4'
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/images/Jenkins_logo_with_text_color_white.png"
                            alt="Jenkins Motorsports"
                            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="font-heading text-xs lg:text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors relative group"
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
                            <div className="flex flex-col gap-8 mt-10 pl-6">
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
            {/* Industrial Footer */}
            <Footer />

        </div>
    );
}
