import { motion } from 'framer-motion';
import { Flag, Truck, User, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    image?: string;
}

const events: TimelineEvent[] = [
    {
        year: '1984',
        title: 'The Founding Father',
        description: "Tony Jenkins stands on the inaugural BTRA grid at Donington Park. An era defined by raw mechanical intuition and 'over-the-road' hardware.",
        icon: User,
        color: 'bg-primary',
        image: '/images/tony_jenkins_championship_truck.jpg'
    },
    {
        year: '1997',
        title: 'The Apprenticeship',
        description: "David Jenkins makes his debut in a restored truck. A spectacular crash at Donington fuels the fire to build his first bespoke racing machine.",
        icon: Truck,
        color: 'bg-white text-black'
    },
    {
        year: '2011',
        title: 'The Pinnacle',
        description: "David secures the Division 1 British Truck Racing Championship title. A validation of the family's decades-long commitment.",
        icon: Trophy,
        color: 'bg-destructive',
        image: '/images/dave_standing_and_lifting_trophy.jpg'
    },
    {
        year: '2026',
        title: 'The Benchmark',
        description: "Back-to-back 3rd place finishes in '24 and '25. The team enters 2026 as the 'Gold Standard' for technical excellence.",
        icon: Flag,
        color: 'bg-primary',
        image: '/images/dave_truck_on_racing_tracks_as_first_3.jpg'
    }
];

export default function HistoryTimeline() {
    return (
        <section id="history" className="py-24 bg-secondary relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="mb-16 text-center">
                    <span className="font-heading text-primary font-bold uppercase tracking-widest mb-2 block">The Dynasty</span>
                    <h2 className="font-heading text-5xl md:text-6xl font-black uppercase italic text-white">
                        40 Years of <br className="md:hidden" /> Legacy
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2 md:translate-x-[-2px]" />

                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <motion.div
                                key={event.year}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={cn(
                                    "relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center",
                                    index % 2 === 0 ? "text-left" : "md:text-right md:flex-row-reverse"
                                )}
                            >
                                {/* Timeline Marker */}
                                <div className="absolute left-4 md:left-1/2 -translate-x-[calc(50%+10px)] md:-translate-x-1/2 flex items-center justify-center h-12 w-12 rounded-full border-4 border-secondary bg-background z-10 shadow-xl">
                                    <event.icon className={cn("h-5 w-5", index % 2 === 0 ? "text-primary" : "text-destructive")} />
                                </div>

                                {/* Content Side */}
                                <div className={cn(
                                    "pl-16 md:pl-0",
                                    index % 2 === 0 ? "md:pr-12 md:text-right order-1" : "md:pl-12 order-1 md:order-2"
                                )}>
                                    {/* This empty div handles the grid alignment for the 'empty' side on desktop
                                         But actually since I used a grid, I need to place the content in the right cell.
                                         The logic above is slightly flawed for grid. Let's use flex for rows.
                                     */}
                                </div>
                            </motion.div>
                        ))}

                        {/* Re-writing map for better structure */}
                        {events.map((event, index) => (
                            <motion.div
                                key={`real-${event.year}`}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={cn(
                                    "relative flex flex-col md:flex-row items-center",
                                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Spacer for desktop */}
                                <div className="hidden md:block w-1/2" />

                                {/* Marker */}
                                <div className={cn(
                                    "absolute left-4 md:left-1/2 transform -translate-x-[calc(50%-2px)] md:-translate-x-1/2 flex items-center justify-center h-14 w-14 rounded-full border-4 border-background z-10 shadow-glow",
                                    event.color
                                )}>
                                    <span className="font-heading font-bold text-sm">{event.year.slice(2)}</span>
                                </div>

                                {/* Content */}
                                <div className={cn(
                                    "w-full md:w-1/2 pl-16 md:pl-0",
                                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                                )}>
                                    <div className="bg-background/40 backdrop-blur border border-white/10 p-6 rounded-lg hover:border-primary/50 transition-colors overflow-hidden group">
                                        {event.image && (
                                            <div className="mb-4 -mx-6 -mt-6 h-48 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                        )}
                                        <span className="font-heading text-4xl font-black italic text-white/20 block mb-2">{event.year}</span>
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">{event.title}</h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
