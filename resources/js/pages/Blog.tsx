import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Construction, Calendar, Tag as TagIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    image_path: string | null;
    published_at: string;
    category: { name: string; slug: string } | null;
    tags: { name: string; slug: string }[];
}

interface Filter {
    type: 'Category' | 'Tag';
    name: string;
}

export default function Blog({ posts, filter }: { posts: Post[], filter?: Filter }) {
    return (
        <LandingLayout title={filter ? `${filter.type}: ${filter.name} | Paddock Pass` : "Paddock Pass Blog"}>
            <Head title={filter ? `${filter.type}: ${filter.name} | Paddock Pass` : "Paddock Pass Blog"} />

            <div className="pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

                <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                    <span className="font-heading text-primary font-bold uppercase tracking-widest mb-4 block">Behind the Scenes</span>
                    <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white mb-6">
                        Paddock <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-destructive">Pass</span>
                    </h1>
                    {filter && (
                        <div className="flex items-center justify-center gap-4 mt-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-primary/50 text-white font-bold uppercase italic rounded-full">
                                <span>{filter.type}: {filter.name}</span>
                                <Link href="/blog" className="hover:text-primary transition-colors"><X className="h-4 w-4" /></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="container px-4 md:px-6 mx-auto py-12 min-h-[50vh]">
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-secondary/20 border border-white/10 hover:border-primary/50 transition-all overflow-hidden flex flex-col h-full">
                                <div className="aspect-video bg-black/50 relative overflow-hidden shrink-0">
                                    {post.image_path ? (
                                        <img src={`/storage/${post.image_path}`} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            <Construction className="h-12 w-12 opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-primary font-bold uppercase text-sm tracking-wider">Read Article</span>
                                    </div>
                                    {post.category && (
                                        <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-bold uppercase px-2 py-1 border-l-2 border-primary">
                                            {post.category.name}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col grow">
                                    <div className="flex items-center gap-2 text-primary font-heading font-bold text-xs uppercase mb-3">
                                        <Calendar className="h-4 w-4" /> {post.published_at}
                                    </div>
                                    <h2 className="font-heading text-2xl font-bold uppercase italic text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-4 grow">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {post.tags.map(tag => (
                                            <span key={tag.slug} className="text-[10px] uppercase font-bold text-muted-foreground bg-white/5 px-2 py-1 rounded-sm">#{tag.name}</span>
                                        ))}
                                    </div>
                                    <div className="w-full h-px bg-white/10 group-hover:bg-primary/30 transition-colors mt-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-24">
                        <Construction className="h-24 w-24 text-primary mb-6 animate-pulse" />
                        <h2 className="text-3xl font-heading font-bold uppercase text-white mb-4">No Posts Yet</h2>
                        <p className="text-muted-foreground max-w-md">
                            The team is busy in the workshop. Check back soon for the latest updates from the track.
                        </p>
                    </div>
                )}
            </div>
        </LandingLayout>
    );
}
