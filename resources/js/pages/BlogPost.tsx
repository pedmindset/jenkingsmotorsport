import LandingLayout from '@/layouts/LandingLayout';
import { Head, Link } from '@inertiajs/react';
import { Calendar, ArrowLeft, Share2, Tag, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostProps {
    post: {
        id: number;
        title: string;
        slug: string;
        content: string;
        image_path: string | null;
        video_url: string | null;
        published_at: string;
        category: { name: string; slug: string } | null;
        tags: { name: string; slug: string }[];
    };
}

export default function BlogPost({ post }: BlogPostProps) {
    const seoDescription = post.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

    const ImageRenderer = ({ src, alt }: { src?: string; alt?: string }) => {
        if (!src) return null;

        let className = "rounded-lg shadow-xl my-8";

        // Logic to apply specific styles based on the image source or context
        // This matches the "AI CODER INSTRUCTIONS" mapping
        if (src.includes('team_working_on_truck')) {
            className = "w-full md:w-2/5 md:float-right md:ml-8 mb-6 rounded-lg shadow-xl border border-white/10";
        } else if (src.includes('multiple_trucks_on_racing_tracks_2')) {
            className = "w-full rounded-lg shadow-2xl my-12 border-4 border-white/10";
        } else {
            // Default / Hero style
            className = "w-full rounded-lg shadow-xl my-8 border border-white/10";
        }

        return (
            <span className="block clear-both md:clear-none">
                <img
                    src={src}
                    alt={alt}
                    className={className}
                />
            </span>
        );
    };

    return (
        <LandingLayout
            title={post.title}
            description={seoDescription}
        >

            <div className="relative pt-32 pb-12 md:pt-48 md:pb-20 bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                <div className="container relative z-10 px-4 md:px-6 mx-auto">
                    <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 font-bold uppercase tracking-wider text-sm">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Paddock Pass
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        {post.category && (
                            <Link href={`/blog/category/${post.category.slug}`} className="bg-primary text-white text-xs font-bold uppercase px-3 py-1 -skew-x-12 hover:bg-primary/80 transition-colors">
                                <span className="skew-x-12">{post.category.name}</span>
                            </Link>
                        )}
                        <div className="flex items-center gap-2 text-primary font-heading font-bold uppercase tracking-widest text-sm">
                            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {post.published_at}</span>
                        </div>
                    </div>

                    <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black uppercase italic text-white mb-8 leading-tight max-w-4xl">
                        {post.title}
                    </h1>
                </div>
            </div>

            <article className="container px-4 md:px-6 mx-auto py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        {post.video_url ? (
                            <div className="mb-12 border-4 border-white/10 shadow-2xl -skew-x-2 overflow-hidden aspect-video bg-black relative group">
                                <iframe
                                    src={post.video_url.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                                    className="w-full h-full skew-x-2 scale-[1.02]"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Video"
                                />
                            </div>
                        ) : post.image_path ? (
                            <div className="mb-12 border-4 border-white/10 shadow-2xl -skew-x-2 overflow-hidden">
                                <img src={post.image_path} alt={post.title} className="w-full h-full object-cover skew-x-2 scale-[1.02]" />
                            </div>
                        ) : null}

                        <div className="text-muted-foreground prose prose-invert prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    img: ImageRenderer,
                                    h2: ({ node, ...props }) => <h2 className="font-heading text-3xl font-black uppercase italic text-white mt-12 mb-6" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="font-heading text-xl font-bold uppercase text-primary mt-8 mb-4" {...props} />,
                                    blockquote: ({ node, ...props }) => (
                                        <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-white text-xl bg-white/5 p-6 rounded-r-lg" {...props} />
                                    ),
                                    p: ({ node, ...props }) => <p className="mb-6 leading-relaxed" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-primary font-bold hover:underline" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="text-white font-bold" {...props} />,
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {post.tags.length > 0 && (
                            <div className="mt-8 flex flex-wrap gap-2">
                                {post.tags.map(tag => (
                                    <Link key={tag.slug} href={`/blog/tag/${tag.slug}`} className="inline-flex items-center gap-1 bg-secondary/30 border border-white/10 px-3 py-1 text-sm text-muted-foreground hover:text-white hover:border-primary/50 transition-colors">
                                        <Tag className="h-3 w-3" /> {tag.name}
                                    </Link>
                                ))}
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                            <Link href="/blog" className="text-white font-bold uppercase italic hover:text-primary transition-colors">
                                &larr; More News
                            </Link>
                            {/* Simple Share Button Placeholder */}
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="h-4 w-4" /> Share
                            </Button>
                        </div>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        {/* Sidebar */}
                        <div className="bg-secondary/20 border border-white/10 p-8 rounded-lg sticky top-24">
                            <h3 className="font-heading text-xl font-bold uppercase italic text-white mb-4">Newsletter</h3>
                            <p className="text-muted-foreground text-sm mb-4">Get the latest Jenkins Motorsports news delivered straight to your inbox.</p>
                            <Button className="w-full bg-primary font-bold uppercase italic" asChild>
                                <Link href="/contact">Subscribe</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        </LandingLayout>
    );
}
