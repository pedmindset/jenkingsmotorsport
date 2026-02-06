import LandingLayout from '@/layouts/LandingLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, Wrench, Gauge, History, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryImage {
    src: string;
    alt: string;
    category: 'track' | 'workshop' | 'cockpit' | 'legacy';
    description: string;
    featured?: boolean;
}

const galleryImages: GalleryImage[] = [
    // On Track
    {
        src: '/images/dave_truck_on_racing_tracks_as_first.jpg',
        alt: 'David Jenkins taking the chequered flag',
        category: 'track',
        description: 'Victory at Brands Hatch – The #69 MAN crosses the line first.',
        featured: true
    },
    {
        src: '/images/dave_truck_on_racing_tracks_2.jpg',
        alt: 'The #69 MAN on track',
        category: 'track',
        description: 'Full throttle through the Brands Hatch complex.'
    },
    {
        src: '/images/dave_truck_on_racing_tracks_as_first_2.jpg',
        alt: 'Leading the pack',
        category: 'track',
        description: 'Dominating the field at Donington Park.'
    },
    {
        src: '/images/multiple_trucks_on_racing_tracks_2.jpg',
        alt: 'Pack racing action',
        category: 'track',
        description: 'Wheel-to-wheel combat in Division 1.'
    },
    {
        src: '/images/dave_truck_passing_another_truck.jpg',
        alt: 'Overtaking maneuver',
        category: 'track',
        description: 'Precision overtake under braking.'
    },
    {
        src: '/images/three_trucks_on_racing_tracks.jpg',
        alt: 'Three trucks battling',
        category: 'track',
        description: 'The heat of battle – three abreast into the corner.'
    },
    {
        src: '/images/dave_truck_overhead_shot_on_tracks.jpg',
        alt: 'Aerial view of the #69',
        category: 'track',
        description: 'The Blue and Black livery from above.'
    },
    {
        src: '/images/two_trucks_racing_1.jpg',
        alt: 'Side by side racing',
        category: 'track',
        description: 'No quarter given – side by side at 100mph.'
    },
    // Workshop
    {
        src: '/images/team_working_on_truck.jpg',
        alt: 'Team working on the MAN TGX',
        category: 'workshop',
        description: 'The Stone workshop – where championships are built.',
        featured: true
    },
    // Cockpit (using truck close-ups)
    {
        src: '/images/dave_taking_picture_with_truck.jpg',
        alt: 'David with the #69 MAN',
        category: 'cockpit',
        description: 'The pilot and his machine – a 25-year partnership.',
        featured: true
    },
    // Legacy
    {
        src: '/images/tony_jenkins_championship_truck.jpg',
        alt: 'Tony Jenkins championship truck',
        category: 'legacy',
        description: '1984 – Where the legacy began. Tony Jenkins\' pioneering rig.',
        featured: true
    },
    {
        src: '/images/dave_standing_and_lifting_trophy.jpg',
        alt: 'David lifting the championship trophy',
        category: 'legacy',
        description: '2011 – The moment of glory. Division 1 Champion.'
    },
    {
        src: '/images/dave_standing_and_lifting_trophy_as_first_with_the_other_winners.jpg',
        alt: 'Podium celebration',
        category: 'legacy',
        description: 'Standing tall among champions.'
    },
    {
        src: '/images/dave_popping_a_shampaign_for_winnign_a_race.jpg',
        alt: 'Champagne celebration',
        category: 'legacy',
        description: 'The taste of victory – champagne on the podium.'
    },
    {
        src: '/images/dave_standing_on_podium_popping_shampaign_as_first.jpg',
        alt: 'Podium champagne spray',
        category: 'legacy',
        description: 'First place celebrations.'
    },
    {
        src: '/images/dave_signing_autograph.jpg',
        alt: 'David signing autographs',
        category: 'legacy',
        description: 'Connecting with the fans – the human side of racing.'
    },
];

const categories = [
    { id: 'all', label: 'All', icon: Camera },
    { id: 'track', label: 'On Track', icon: Camera },
    { id: 'workshop', label: 'The Workshop', icon: Wrench },
    { id: 'cockpit', label: 'The Cockpit', icon: Gauge },
    { id: 'legacy', label: 'The Legacy', icon: History },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openLightbox = (index: number) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
    };

    return (
        <LandingLayout title="Gallery | Speed in Focus">
            <div className="bg-black min-h-screen">

                {/* Hero Section */}
                <div className="relative pt-32 pb-24 overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: 'url("/images/dave_truck_on_racing_tracks_as_first_2.jpg")' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />

                    <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto"
                        >
                            <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary mb-6 block">
                                Visual Chronicle
                            </span>
                            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-black uppercase italic text-white mb-6 leading-none">
                                The Theatre of<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Heavy Metal</span>
                            </h1>
                            <p className="font-heading font-bold text-xl md:text-2xl text-muted-foreground uppercase tracking-wide max-w-3xl mx-auto">
                                A visual chronicle of power, precision, and the paddock.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-background relative z-10 py-16">
                    <div className="container px-4 md:px-6 mx-auto">

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-2 mb-16">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center gap-2 px-6 py-3 font-heading font-bold uppercase text-sm transition-all border ${activeCategory === category.id
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-transparent text-muted-foreground border-white/10 hover:border-primary/50 hover:text-white'
                                        }`}
                                >
                                    <category.icon className="h-4 w-4" />
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* Category Description */}
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            {activeCategory === 'track' && (
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    High-octane action from Brands Hatch, Donington Park, and beyond. Where the #69 MAN earns its stripes.
                                </p>
                            )}
                            {activeCategory === 'workshop' && (
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    A molecular look at the build process in Stone, Staffordshire. The birthplace of champions.
                                </p>
                            )}
                            {activeCategory === 'cockpit' && (
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    The fighter-jet environment where David Jenkins pilots the #69 through the chaos.
                                </p>
                            )}
                            {activeCategory === 'legacy' && (
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Archival shots of Tony Jenkins, David's victories, and the forty-year dynasty.
                                </p>
                            )}
                        </motion.div>

                        {/* Gallery Grid - Masonry Style */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredImages.map((image, index) => (
                                    <motion.div
                                        key={image.src}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                        className={`group relative overflow-hidden cursor-pointer border border-white/10 hover:border-primary/50 transition-colors ${image.featured ? 'sm:col-span-2 sm:row-span-2' : ''
                                            }`}
                                        onClick={() => openLightbox(index)}
                                    >
                                        {/* Image with Grayscale Effect */}
                                        <div className={`relative overflow-hidden ${image.featured ? 'h-80 sm:h-full min-h-80' : 'h-64'}`}>
                                            <img
                                                src={image.src}
                                                alt={image.alt}
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                                loading="lazy"
                                            />

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-white text-sm font-medium line-clamp-2">
                                                    {image.description}
                                                </p>
                                            </div>

                                            {/* Category Badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="text-xs uppercase tracking-widest text-white/70 bg-black/50 px-2 py-1 backdrop-blur-sm">
                                                    {image.category}
                                                </span>
                                            </div>

                                            {/* View Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm">
                                                    <Camera className="h-5 w-5 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Featured Video Section */}
                        <div className="mt-32">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
                                    <span className="font-heading text-sm uppercase tracking-[0.3em] text-primary">Featured Reel</span>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
                                </div>
                                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-4">
                                    The Visceral <span className="text-primary">Experience</span>
                                </h2>
                                <p className="text-muted-foreground max-w-2xl mx-auto">
                                    Photos capture the moment, but only video can deliver the 1,150 BHP symphony.
                                    Experience the deafening roar of the #69 MAN in action.
                                </p>
                            </div>

                            {/* YouTube Embed */}
                            <div className="relative max-w-5xl mx-auto">
                                <div className="relative aspect-video border border-white/10 overflow-hidden group">
                                    <iframe
                                        src="https://www.youtube.com/embed/r0DeCHtDJAk"
                                        title="Experience the 1150HP MAN TGX with Dave Jenkins"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-center gap-4 text-muted-foreground text-sm">
                                    <Play className="h-4 w-4 text-primary" />
                                    <span>Experience the 1150HP MAN TGX with Dave Jenkins</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Lightbox */}
                <AnimatePresence>
                    {lightboxOpen && filteredImages[currentImageIndex] && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
                            onClick={closeLightbox}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeLightbox}
                                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="h-6 w-6 text-white" />
                            </button>

                            {/* Navigation */}
                            <button
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6 text-white" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-primary transition-colors"
                            >
                                <ChevronRight className="h-6 w-6 text-white" />
                            </button>

                            {/* Image */}
                            <motion.div
                                key={currentImageIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-[90vw] max-h-[85vh] relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <img
                                    src={filteredImages[currentImageIndex].src}
                                    alt={filteredImages[currentImageIndex].alt}
                                    className="max-w-full max-h-[80vh] object-contain"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                                    <p className="text-white font-medium mb-1">
                                        {filteredImages[currentImageIndex].alt}
                                    </p>
                                    <p className="text-white/70 text-sm">
                                        {filteredImages[currentImageIndex].description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Image Counter */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 font-mono text-sm">
                                {currentImageIndex + 1} / {filteredImages.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </LandingLayout>
    );
}
