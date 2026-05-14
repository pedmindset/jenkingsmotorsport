import LandingLayout from '@/layouts/LandingLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageProps } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import {
    Camera,
    Gauge,
    History,
    Play,
    Sparkles,
    Wrench,
    X,
    ChevronLeft,
    ChevronRight,
    Tag as TagIcon,
    CalendarRange,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GalleryImageRow, GalleryImageTag, GallerySeasonRef } from '@/types/motorsport';
import { cn } from '@/lib/utils';

type GalleryPageProps = PageProps & {
    appUrl: string;
    galleryImages: GalleryImageRow[];
    featuredVideoUrl: string | null;
};

const categories = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'track', label: 'On Track', icon: Camera },
    { id: 'workshop', label: 'The Workshop', icon: Wrench },
    { id: 'cockpit', label: 'The Cockpit', icon: Gauge },
    { id: 'legacy', label: 'The Legacy', icon: History },
] as const;

/**
 * Build an absolute URL for JSON-LD without duplicating scheme if `src` is already absolute.
 */
function absoluteImageUrlForSchema(appUrl: string, src: string): string {
    if (/^https?:\/\//i.test(src)) {
        return src;
    }
    const base = appUrl.replace(/\/$/, '');
    const path = src.startsWith('/') ? src : `/${src}`;
    return `${base}${path}`;
}

/**
 * Public gallery: masonry grid, curated filters, spotlight card, and accessible lightbox.
 */
export default function Gallery() {
    const { appUrl, galleryImages, featuredVideoUrl } = usePage<GalleryPageProps>().props;
    const defaultVideoUrl = 'https://www.youtube.com/embed/r0DeCHtDJAk';
    const videoSrc = featuredVideoUrl ?? defaultVideoUrl;

    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [activeTagSlug, setActiveTagSlug] = useState<string | null>(null);
    const [activeSeasonSlug, setActiveSeasonSlug] = useState<string | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const tagOptions = useMemo((): GalleryImageTag[] => {
        const map = new Map<string, GalleryImageTag>();
        for (const img of galleryImages) {
            for (const t of img.tags) {
                if (!map.has(t.slug)) {
                    map.set(t.slug, t);
                }
            }
        }
        return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
    }, [galleryImages]);

    const seasonOptions = useMemo((): GallerySeasonRef[] => {
        const map = new Map<string, GallerySeasonRef>();
        for (const img of galleryImages) {
            const s = img.season;
            if (s !== null && !map.has(s.slug)) {
                map.set(s.slug, s);
            }
        }
        return [...map.values()].sort((a, b) => b.year - a.year);
    }, [galleryImages]);

    const filteredImages = useMemo((): GalleryImageRow[] => {
        return galleryImages.filter((img) => {
            if (activeCategory !== 'all' && img.category !== activeCategory) {
                return false;
            }
            if (activeTagSlug !== null && !img.tags.some((t) => t.slug === activeTagSlug)) {
                return false;
            }
            if (activeSeasonSlug !== null && img.season?.slug !== activeSeasonSlug) {
                return false;
            }
            return true;
        });
    }, [galleryImages, activeCategory, activeTagSlug, activeSeasonSlug]);

    const spotlightImage = useMemo((): GalleryImageRow | undefined => {
        return filteredImages.find((i) => i.featured) ?? filteredImages[0];
    }, [filteredImages]);

    const gridImages = useMemo((): GalleryImageRow[] => {
        if (!spotlightImage) {
            return filteredImages;
        }
        return filteredImages.filter((i) => i.id !== spotlightImage.id);
    }, [filteredImages, spotlightImage]);

    const openLightbox = useCallback((index: number): void => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeLightbox = useCallback((): void => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    }, []);

    const nextImage = useCallback((): void => {
        setCurrentImageIndex((prev) => {
            const len = filteredImages.length;
            if (len <= 0) {
                return 0;
            }
            return (prev + 1) % len;
        });
    }, [filteredImages]);

    const prevImage = useCallback((): void => {
        setCurrentImageIndex((prev) => {
            const len = filteredImages.length;
            if (len <= 0) {
                return 0;
            }
            return (prev - 1 + len) % len;
        });
    }, [filteredImages]);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [activeCategory, activeTagSlug, activeSeasonSlug]);

    useEffect(() => {
        if (filteredImages.length === 0 && lightboxOpen) {
            closeLightbox();
        }
    }, [filteredImages.length, lightboxOpen, closeLightbox]);

    useEffect(() => {
        if (!lightboxOpen) {
            return undefined;
        }
        const handler = (e: KeyboardEvent): void => {
            if (e.key === 'Escape') {
                closeLightbox();
                return;
            }
            if (filteredImages.length === 0) {
                return;
            }
            if (e.key === 'ArrowRight') {
                nextImage();
            }
            if (e.key === 'ArrowLeft') {
                prevImage();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [lightboxOpen, closeLightbox, nextImage, prevImage, filteredImages.length]);

    const gallerySchema = {
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: 'Jenkins Motorsports Gallery',
        description: 'A visual chronicle of power, precision, and the paddock.',
        image: galleryImages.map((img) => absoluteImageUrlForSchema(appUrl, img.src)),
    };

    const hasRefinements = activeTagSlug !== null || activeSeasonSlug !== null;

    const openLightboxByImageId = (id: number): void => {
        const ix = filteredImages.findIndex((i) => i.id === id);
        if (ix >= 0) {
            openLightbox(ix);
        }
    };

    const activeLightboxImage: GalleryImageRow | null =
        lightboxOpen && filteredImages.length > 0
            ? filteredImages[Math.min(currentImageIndex, filteredImages.length - 1)]
            : null;

    return (
        <LandingLayout
            title="Gallery | Speed in Focus"
            description="The Theatre of Heavy Metal. A visual chronicle of power, precision, and the paddock. View the Jenkins Motorsports gallery."
            image="/images/dave_truck_on_racing_tracks_as_first_2.jpg"
            schema={gallerySchema}
        >
            <div className="min-h-screen bg-black">
                {/* Hero */}
                <div className="relative overflow-hidden pb-24 pt-32">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: 'url("/images/dave_truck_on_racing_tracks_as_first_2.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black via-black/70 to-black" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay" />

                    <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
                        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
                            <span className="mb-6 block font-heading text-xs uppercase tracking-[0.35em] text-primary md:text-sm">
                                Visual Chronicle
                            </span>
                            <h1 className="mb-6 font-heading text-5xl font-black uppercase italic leading-none text-white md:text-7xl lg:text-8xl">
                                The Theatre of
                                <br />
                                <span className="text-transparent bg-linear-to-r from-primary to-blue-400/80 bg-clip-text">
                                    Heavy Metal
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl font-heading text-xl font-bold uppercase tracking-wide text-muted-foreground md:text-2xl">
                                Date-stamped frames, liveries at full saturation, seasons in context — Jenkins in focus.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="relative z-10 bg-neutral-950 py-16">
                    <div className="mx-auto max-w-[1600px] px-4 md:px-6">
                        {/* Categories */}
                        <div className="mb-10 flex flex-wrap justify-center gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setActiveCategory(category.id)}
                                    className={cn(
                                        'flex items-center gap-2 border px-5 py-2.5 font-heading text-xs font-bold uppercase tracking-wide transition-colors md:text-sm',
                                        activeCategory === category.id
                                            ? 'border-primary bg-primary text-white'
                                            : 'border-white/15 bg-transparent text-muted-foreground hover:border-primary/50 hover:text-white',
                                    )}
                                >
                                    <category.icon className="h-4 w-4 shrink-0" />
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* Refinement chips */}
                        <div className="mb-8 space-y-4 border-y border-white/10 py-8">
                            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                                <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                                    Refine by story
                                </p>
                                <div className="flex gap-3">
                                    {hasRefinements && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="h-10 rounded-none border-white/15 bg-transparent text-xs font-heading font-bold uppercase text-white hover:bg-white/10"
                                            onClick={() => {
                                                setActiveTagSlug(null);
                                                setActiveSeasonSlug(null);
                                            }}
                                        >
                                            Clear filters
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 md:flex-row">
                                <div className="min-w-0 flex-1">
                                    <span className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                                        <TagIcon className="h-4 w-4" />
                                        Tags
                                    </span>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {tagOptions.length === 0 ? (
                                            <span className="text-sm text-muted-foreground">Tags appear as you attach them to images.</span>
                                        ) : (
                                            tagOptions.map((t) => (
                                                <button
                                                    key={t.slug}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveTagSlug((curr) => (curr === t.slug ? null : t.slug))
                                                    }
                                                    className={cn(
                                                        'rounded-none border px-3 py-1.5 font-heading text-[11px] font-bold uppercase transition-colors md:text-xs',
                                                        activeTagSlug === t.slug
                                                            ? 'border-primary bg-primary/20 text-white'
                                                            : 'border-white/15 bg-black/40 text-muted-foreground hover:border-primary/40 hover:text-white',
                                                    )}
                                                >
                                                    {t.name}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary">
                                        <CalendarRange className="h-4 w-4" />
                                        Season
                                    </span>
                                    <div className="flex flex-wrap gap-2 md:gap-3">
                                        {seasonOptions.length === 0 ? (
                                            <span className="text-sm text-muted-foreground">Link a season to surface it here.</span>
                                        ) : (
                                            seasonOptions.map((s) => (
                                                <button
                                                    key={s.slug}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveSeasonSlug((curr) => (curr === s.slug ? null : s.slug))
                                                    }
                                                    className={cn(
                                                        'rounded-none border px-3 py-1.5 font-heading text-[11px] font-bold uppercase transition-colors md:text-xs',
                                                        activeSeasonSlug === s.slug
                                                            ? 'border-primary bg-primary/20 text-white'
                                                            : 'border-white/15 bg-black/40 text-muted-foreground hover:border-primary/40 hover:text-white',
                                                    )}
                                                >
                                                    {s.year} — {s.title}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-12 text-center"
                        >
                            {activeCategory === 'track' && (
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    High-octane action from Brands Hatch, Donington Park, and beyond. Where the #69 MAN earns its stripes.
                                </p>
                            )}
                            {activeCategory === 'workshop' && (
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    A molecular look at the build process in Stone, Staffordshire. The birthplace of champions.
                                </p>
                            )}
                            {activeCategory === 'cockpit' && (
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    The fighter-jet environment where David Jenkins pilots the #69 through the chaos.
                                </p>
                            )}
                            {activeCategory === 'legacy' && (
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    Archival shots of Tony Jenkins, David&apos;s victories, and the forty-year dynasty.
                                </p>
                            )}
                        </motion.div>

                        {filteredImages.length === 0 ? (
                            <div className="border border-dashed border-white/15 bg-black/30 py-24 text-center">
                                <p className="font-heading text-lg font-bold uppercase text-white">No frames match this story yet</p>
                                <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                                    Try another tab or clear tag and season filters to see the full archive.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Spotlight */}
                                {spotlightImage !== undefined && (
                                    <motion.div
                                        role="button"
                                        tabIndex={0}
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group relative mb-12 w-full overflow-hidden border border-white/10 text-left transition-colors hover:border-primary/50"
                                        onClick={() => openLightboxByImageId(spotlightImage.id)}
                                        onKeyDown={(e): void => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                openLightboxByImageId(spotlightImage.id);
                                            }
                                        }}
                                    >
                                        <div className="grid gap-0 lg:grid-cols-12">
                                            <div className="relative h-72 overflow-hidden lg:col-span-8 lg:h-[420px]">
                                                <img
                                                    src={spotlightImage.src}
                                                    alt={spotlightImage.alt}
                                                    className="h-full w-full object-cover saturate-[1.03] contrast-[1.02] grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.02] group-hover:grayscale-0"
                                                    loading="eager"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-tr from-black/90 via-transparent to-transparent" />
                                            </div>
                                            <div className="relative flex flex-col justify-between bg-linear-to-br from-neutral-950 to-black p-8 lg:col-span-4">
                                                <div>
                                                    <span className="mb-6 inline-flex items-center gap-2 font-heading text-[10px] uppercase tracking-[0.35em] text-primary">
                                                        <Sparkles className="h-4 w-4" /> Spotlight moment
                                                    </span>
                                                    {spotlightImage.dateParts !== null ? (
                                                        <div className="mb-6 flex items-end gap-2 font-mono text-white">
                                                            <span className="border border-primary px-3 py-1 text-5xl font-black leading-none md:text-6xl">
                                                                {spotlightImage.dateParts.day}
                                                            </span>
                                                            <div className="-mb-0.5 font-heading leading-none uppercase">
                                                                <span className="block text-lg font-black text-white">
                                                                    {spotlightImage.dateParts.month}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground">
                                                                    {spotlightImage.dateParts.year}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                                            Date unspecified — curator pick
                                                        </p>
                                                    )}
                                                    <h2 className="font-heading text-3xl font-black uppercase italic text-white lg:text-4xl">
                                                        {spotlightImage.title}
                                                    </h2>
                                                    {spotlightImage.season !== null && (
                                                        <p className="mt-4 font-heading text-[11px] font-bold uppercase tracking-widest text-primary/90">
                                                            {spotlightImage.season.year}&nbsp;&nbsp;/&nbsp;&nbsp;
                                                            {spotlightImage.season.title}
                                                        </p>
                                                    )}
                                                    {spotlightImage.caption !== null && spotlightImage.caption !== '' && (
                                                        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                                                            {spotlightImage.caption}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="mt-8 flex flex-wrap gap-2">
                                                    {spotlightImage.tags.slice(0, 5).map((t) => (
                                                        <Badge
                                                            key={`${spotlightImage.id}-${t.slug}`}
                                                            variant="outline"
                                                            className="rounded-none border-white/20 bg-white/5 text-[10px] font-heading font-bold uppercase text-white hover:bg-primary hover:text-white"
                                                        >
                                                            {t.name}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Grid */}
                                <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    <AnimatePresence mode="popLayout">
                                        {gridImages.map((image, index) => (
                                            <motion.div
                                                key={image.id}
                                                layout
                                                initial={{ opacity: 0, scale: 0.92 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.92 }}
                                                transition={{ duration: 0.35, delay: index * 0.035 }}
                                                className={cn(
                                                    'group relative cursor-pointer overflow-hidden border border-white/10 transition-colors hover:border-primary/50',
                                                    image.featured && 'sm:col-span-2 sm:row-span-2',
                                                )}
                                                role="button"
                                                tabIndex={0}
                                                onClick={() => openLightbox(filteredImages.findIndex((i) => i.id === image.id))}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' || e.key === ' ') {
                                                        e.preventDefault();
                                                        openLightbox(filteredImages.findIndex((i) => i.id === image.id));
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={cn(
                                                        'relative overflow-hidden',
                                                        image.featured ? 'min-h-80 h-80 sm:h-full' : 'h-64',
                                                    )}
                                                >
                                                    <img
                                                        src={image.src}
                                                        alt={image.alt}
                                                        className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                                                        loading="lazy"
                                                    />

                                                    {/* Date foil */}
                                                    {image.dateParts !== null && (
                                                        <div className="pointer-events-none absolute right-4 top-4 rounded-none bg-black/60 px-3 py-1.5 text-right font-heading text-[10px] font-black uppercase italic leading-none text-white opacity-95 backdrop-blur-sm">
                                                            <span className="text-primary">{image.dateParts.month}</span>{' '}
                                                            {image.dateParts.day}
                                                            <span className="mx-2 text-muted-foreground">&nbsp;</span>
                                                            <span className="tracking-wider">{image.dateParts.year}</span>
                                                        </div>
                                                    )}

                                                    <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                                                    <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
                                                        <p className="font-heading text-sm font-semibold uppercase text-white">{image.title}</p>
                                                        {(image.caption ?? '') !== '' && (
                                                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                                                                {image.caption}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="absolute left-3 top-3 flex flex-wrap gap-1">
                                                        <Badge className="rounded-none border-transparent bg-black/65 font-heading text-[10px] font-bold uppercase text-white backdrop-blur-sm">
                                                            {image.category}
                                                        </Badge>
                                                        {image.season !== null && (
                                                            <Badge className="rounded-none border-transparent bg-primary/90 font-heading text-[10px] font-bold uppercase text-black">
                                                                {image.season.year}
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:pointer-events-none group-hover:opacity-100">
                                                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/85 backdrop-blur-sm">
                                                            <Camera className="h-5 w-5 text-white" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>
                            </>
                        )}

                        {/* Featured video */}
                        <div className="mt-28">
                            <div className="mb-12 text-center">
                                <div className="mb-5 inline-flex items-center gap-3">
                                    <div className="h-px w-16 bg-linear-to-r from-transparent to-primary" />
                                    <span className="font-heading text-xs uppercase tracking-[0.3em] text-primary">Featured Reel</span>
                                    <div className="h-px w-16 bg-linear-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="mb-5 font-heading text-4xl font-black uppercase italic text-white md:text-5xl">
                                    The visceral&nbsp;
                                    <span className="text-primary">experience</span>
                                </h2>
                                <p className="mx-auto max-w-2xl text-muted-foreground">
                                    Photos capture the moment — video unleashes the 1,160 BHP symphony across the apex.
                                </p>
                            </div>

                            <div className="relative mx-auto max-w-5xl">
                                <div className="group relative overflow-hidden border border-white/15">
                                    <div className="aspect-video bg-black">
                                        <iframe
                                            src={videoSrc}
                                            title="Experience the Jenkins Motorsports #69 MAN in action"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            className="h-full w-full"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center gap-3 text-muted-foreground md:items-center">
                                    <Play className="mt-1 h-4 w-4 shrink-0 text-primary md:mt-0" />
                                    <span className="text-center font-heading text-sm font-bold uppercase">
                                        Hear the sixteen-speed cadence · #69 MAN TGX · Dave Jenkins
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence>
                    {activeLightboxImage !== null ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md"
                            role="presentation"
                            onClick={closeLightbox}
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeLightbox();
                                }}
                                className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center bg-white/10 transition-colors hover:bg-white/20"
                                aria-label="Close dialog"
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>

                            <button
                                type="button"
                                aria-label="Previous image"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 transition-colors hover:bg-primary md:left-8"
                            >
                                <ChevronLeft className="h-6 w-6 text-white" />
                            </button>
                            <button
                                type="button"
                                aria-label="Next image"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-white/10 transition-colors hover:bg-primary md:right-8"
                            >
                                <ChevronRight className="h-6 w-6 text-white" />
                            </button>

                            <motion.div
                                key={activeLightboxImage.id}
                                initial={{ opacity: 0, scale: 0.92 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.92 }}
                                transition={{ duration: 0.28 }}
                                className="relative max-h-[85vh] max-w-[94vw]"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={activeLightboxImage.src}
                                    alt={activeLightboxImage.alt}
                                    className="max-h-[78vh] max-w-[92vw] object-contain shadow-2xl shadow-black"
                                />

                                <div className="mt-8 max-w-[92vw] space-y-5 border-x border-white/10 bg-neutral-950/90 p-8 md:max-w-3xl lg:mx-auto">
                                    <div className="flex flex-wrap gap-3 md:justify-between md:gap-10">
                                        {activeLightboxImage.dateParts !== null ? (
                                            <div className="flex items-end gap-2 font-mono text-white">
                                                <span className="border border-primary px-2 py-1 text-4xl font-black leading-none md:text-5xl">
                                                    {activeLightboxImage.dateParts.day}
                                                </span>
                                                <div className="font-heading uppercase leading-none">
                                                    <span className="block text-sm font-black">{activeLightboxImage.dateParts.month}</span>
                                                    <span className="text-xs text-muted-foreground">{activeLightboxImage.dateParts.year}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                                Stamp pending — curator has not pinned a calendar date yet.
                                            </p>
                                        )}
                                        {activeLightboxImage.season !== null && (
                                            <div className="text-right">
                                                <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-primary">
                                                    Season&nbsp;link
                                                </p>
                                                <p className="font-heading text-lg font-black uppercase italic text-white">
                                                    {activeLightboxImage.season.year}&nbsp;/&nbsp;{activeLightboxImage.season.title}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-heading text-2xl font-black uppercase italic text-white">{activeLightboxImage.title}</h3>
                                        {(activeLightboxImage.caption ?? '') !== '' ? (
                                            <p className="mt-4 text-muted-foreground">{activeLightboxImage.caption}</p>
                                        ) : (
                                            <p className="mt-4 text-muted-foreground/80 italic">Caption coming soon.</p>
                                        )}
                                    </div>

                                    {activeLightboxImage.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {activeLightboxImage.tags.map((t) => (
                                                <Badge
                                                    key={t.slug}
                                                    className="rounded-none bg-primary px-3 py-1 font-heading text-[10px] font-bold uppercase text-black"
                                                >
                                                    {t.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            <div className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/55">
                                <Camera className="h-4 w-4 shrink-0 text-primary" />
                                {filteredImages.findIndex((i) => i.id === activeLightboxImage.id) + 1} /{' '}
                                {filteredImages.length}
                                <span className="hidden md:inline">&nbsp;/&nbsp;escape to close · arrows navigate</span>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </LandingLayout>
    );
}
