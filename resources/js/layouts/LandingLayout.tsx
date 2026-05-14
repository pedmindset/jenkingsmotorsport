import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu } from 'lucide-react';
import { type ReactElement, PropsWithChildren, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Footer from '@/components/Landing/Footer';
import SEO from '@/components/seo';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { isNavLinkGroup, normalizeNavEntries } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import type { NavLinkEntry, NavLinkGroup, NavLinkLeaf, SharedData } from '@/types';

interface LandingLayoutProps extends PropsWithChildren {
    title: string;
    description?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    schema?: string | object;
}

const shopHrefFallback = (import.meta.env.VITE_SHOP_URL as string) || '/';

/**
 * Default header navigation: top-level links plus compact mega-style dropdowns.
 */
const defaultNavEntries: NavLinkEntry[] = [
    { name: 'The Beast', href: '/the-machine', external: false },
    { name: 'Legacy', href: '/legacy', external: false },
    { name: 'Partners', href: '/partners', external: false },
    {
        label: 'Season',
        items: [
            { name: 'Season 2026', href: '/season', external: false },
            { name: 'Championship', href: '/championship', external: false },
        ],
    },
    { name: 'Le Mans', href: '/le-mans', external: false },
    {
        label: 'Media',
        items: [
            { name: 'Gallery', href: '/gallery', external: false },
            { name: 'Paddock Pass', href: '/blog', external: false },
        ],
    },
    { name: 'Shop', href: shopHrefFallback, external: true },
];

/**
 * Whether the current pathname belongs under a nav href (internal paths and absolute shop URLs).
 */
function linkMatchesPath(pathname: string, href: string): boolean {
    if (!href.startsWith('http')) {
        return pathname === href || pathname.startsWith(`${href}/`);
    }

    try {
        const path = new URL(href).pathname;

        return pathname === path || pathname.startsWith(`${path}/`);
    } catch {
        return false;
    }
}

/**
 * Single top-level or dropdown leaf link for the landing header.
 *
 * @property link Destination label, url, and external flag
 * @property variant Desktop navbar vs mobile sheet typography
 */
function HeaderLeafLink({
    link,
    variant,
}: {
    link: NavLinkLeaf;
    variant: 'desktop' | 'mobile';
}): ReactElement {
    const desktopCls =
        'font-heading text-xs lg:text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors relative group inline-flex items-center gap-1';
    const mobileCls =
        'font-heading text-2xl font-bold uppercase italic text-white hover:text-primary transition-colors';

    if (link.external) {
        return (
            <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={variant === 'desktop' ? desktopCls : mobileCls}
            >
                {link.name}
                {variant === 'desktop' && (
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full -skew-x-12" />
                )}
            </a>
        );
    }

    return (
        <Link href={link.href} className={variant === 'desktop' ? desktopCls : mobileCls}>
            {link.name}
            {variant === 'desktop' && (
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full -skew-x-12" />
            )}
        </Link>
    );
}

/**
 * Compact mega-style panel: title strip + skew-accent link tiles (desktop only).
 *
 * @property group Label and child links
 * @property pathname Current path for subtle active styling on tiles
 */
function DesktopNavMegaGroup({
    group,
    pathname,
}: {
    group: NavLinkGroup;
    pathname: string;
}): ReactElement {
    const triggerCls =
        'font-heading text-xs lg:text-sm font-bold uppercase tracking-widest text-white hover:text-primary transition-colors relative group/trigger inline-flex items-center gap-1 rounded-none border-0 bg-transparent p-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

    const colsClass =
        group.items.length <= 2 ? 'grid-cols-2' : group.items.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className={triggerCls}>
                {group.label}
                <ChevronDown className="h-3 w-3 opacity-80" aria-hidden />
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300 group-hover/trigger:w-full -skew-x-12 group-data-[state=open]/trigger:w-full" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                sideOffset={10}
                className={cn(
                    'w-auto min-w-[240px] max-w-[min(100vw-2rem,320px)] overflow-hidden rounded-none border border-white/15 bg-neutral-950/96 p-0 shadow-xl backdrop-blur-xl',
                )}
            >
                <div className="flex items-center gap-2 border-b border-primary/35 bg-linear-to-r from-primary/12 via-primary/5 to-transparent px-3 py-2">
                    <span className="h-3 w-0.5 -skew-x-12 bg-primary" aria-hidden />
                    <span className="font-heading text-[10px] font-black uppercase tracking-[0.22em] text-primary">
                        {group.label}
                    </span>
                </div>
                <div className={cn('grid gap-2 p-2.5', colsClass)}>
                    {group.items.map((item) => {
                        const active = linkMatchesPath(pathname, item.href);
                        const tileCls = cn(
                            'group/cell relative flex min-h-[3rem] flex-col justify-center overflow-hidden border px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                            'border-white/12 bg-black/35 hover:border-primary/45 hover:bg-primary/8',
                            active && 'border-primary/55 bg-primary/10 text-white',
                        );

                        return item.external ? (
                            <DropdownMenuItem key={item.name} asChild className="cursor-pointer p-0 focus:bg-transparent">
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={tileCls}
                                >
                                    <span
                                        className="pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top bg-primary transition-transform duration-200 scale-y-0 group-hover/cell:scale-y-100"
                                        aria-hidden
                                    />
                                    <span className="font-heading text-[11px] leading-tight font-bold uppercase tracking-widest text-white group-hover/cell:text-primary">
                                        {item.name}
                                    </span>
                                </a>
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem key={item.name} asChild className="cursor-pointer p-0 focus:bg-transparent">
                                <Link href={item.href} className={tileCls}>
                                    <span
                                        className={cn(
                                            'pointer-events-none absolute inset-y-0 left-0 w-[3px] origin-top bg-primary transition-transform duration-200 scale-y-0 group-hover/cell:scale-y-100',
                                            active && 'scale-y-100',
                                        )}
                                        aria-hidden
                                    />
                                    <span className="font-heading text-[11px] leading-tight font-bold uppercase tracking-widest text-white group-hover/cell:text-primary">
                                        {item.name}
                                    </span>
                                </Link>
                            </DropdownMenuItem>
                        );
                    })}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * Mobile sheet section: collapsible group of links.
 *
 * @property group Label and items
 * @property open Whether the section is expanded
 * @property onOpenChange Collapsible state handler
 */
function MobileNavGroup({
    group,
    open,
    onOpenChange,
}: {
    group: NavLinkGroup;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}): ReactElement {
    return (
        <Collapsible open={open} onOpenChange={onOpenChange}>
            <CollapsibleTrigger
                type="button"
                className="flex w-full items-center justify-between py-1 font-heading text-2xl font-bold uppercase italic text-white hover:text-primary transition-colors"
            >
                {group.label}
                <ChevronDown className={cn('h-6 w-6 shrink-0 transition-transform', open && 'rotate-180')} />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-4 border-l border-white/10 pl-4 mt-4 mb-2">
                {group.items.map((item) => (
                    <div key={item.name} className="text-lg">
                        <HeaderLeafLink link={item} variant="mobile" />
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    );
}

export default function LandingLayout({
    title,
    description,
    image,
    url,
    type,
    schema,
    children,
}: LandingLayoutProps): ReactElement {
    const [isScrolled, setIsScrolled] = useState(false);
    const page = usePage<SharedData>();
    const { site } = page.props;

    const navEntries = useMemo(
        () => normalizeNavEntries(site.nav_links, defaultNavEntries),
        [site.nav_links],
    );

    const pathname = useMemo(() => page.url.split('?')[0] ?? '/', [page.url]);

    const [mobileOpenGroups, setMobileOpenGroups] = useState<Record<string, boolean>>({});

    useLayoutEffect(() => {
        setMobileOpenGroups((prev) => {
            const next = { ...prev };
            for (const entry of navEntries) {
                if (isNavLinkGroup(entry)) {
                    const shouldOpen = entry.items.some((leaf) => linkMatchesPath(pathname, leaf.href));
                    if (shouldOpen) {
                        next[entry.label] = true;
                    }
                }
            }

            return next;
        });
    }, [pathname, navEntries]);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white">
            <SEO title={title} description={description} image={image} url={url} type={type} schema={schema} />

            <nav
                className={cn(
                    'fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
                    isScrolled
                        ? 'bg-background/80 backdrop-blur-md border-border/40 py-2'
                        : 'bg-transparent py-2 md:py-4',
                )}
            >
                <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <img
                            src="/images/Jenkins_logo_with_text_color_white.png"
                            alt="Jenkins Motorsports"
                            className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
                        />
                    </Link>

                    <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
                        {navEntries.map((entry) =>
                            isNavLinkGroup(entry) ? (
                                <DesktopNavMegaGroup key={entry.label} group={entry} pathname={pathname} />
                            ) : (
                                <HeaderLeafLink key={entry.name} link={entry} variant="desktop" />
                            ),
                        )}
                        <Button
                            asChild
                            className="bg-destructive hover:bg-destructive/90 text-white font-heading font-bold uppercase italic tracking-wider -skew-x-12 rounded-none px-6"
                        >
                            <Link href="/contact">
                                <span className="skew-x-12">Join the Team</span>
                            </Link>
                        </Button>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-white">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-border bg-background/95 backdrop-blur-xl">
                            <div className="flex flex-col gap-6 mt-10 pl-6">
                                {navEntries.map((entry) =>
                                    isNavLinkGroup(entry) ? (
                                        <MobileNavGroup
                                            key={entry.label}
                                            group={entry}
                                            open={mobileOpenGroups[entry.label] ?? false}
                                            onOpenChange={(next) =>
                                                setMobileOpenGroups((prev) => ({ ...prev, [entry.label]: next }))
                                            }
                                        />
                                    ) : (
                                        <HeaderLeafLink key={entry.name} link={entry} variant="mobile" />
                                    ),
                                )}
                                <Button asChild className="w-full bg-primary font-heading font-bold uppercase italic rounded-none">
                                    <Link href="/contact">Join the Team</Link>
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            <main className="relative">{children}</main>

            <Footer />
        </div>
    );
}
