import LandingLayout from '@/layouts/LandingLayout';
import { motion } from 'framer-motion';

export default function CookiePolicy() {
    return (
        <LandingLayout title="Cookie Policy" description="Learn about how Jenkins Motorsports uses cookies on our website.">
            <div className="relative min-h-screen bg-background">
                {/* Hero Section */}
                <div className="relative h-[30vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-black">
                    <div className="absolute inset-0 bg-linear-to-b from-black to-background" />
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 container mx-auto px-4 md:px-6 text-center"
                    >
                        <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white">
                            Cookie <span className="text-primary">Policy</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 md:px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="max-w-4xl mx-auto prose prose-invert prose-lg"
                    >
                        <div className="bg-neutral-900/50 border border-white/10 p-8 md:p-12 space-y-8">
                            <section>
                                <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4 border-l-4 border-primary pl-4">
                                    What Are Cookies
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                                    They are widely used to make websites work more efficiently and provide information to website owners.
                                </p>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4 border-l-4 border-primary pl-4">
                                    How We Use Cookies
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    Jenkins Motorsports uses cookies to:
                                </p>
                                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                                    <li>Remember your preferences and settings</li>
                                    <li>Analyze how you use our website to improve user experience</li>
                                    <li>Enable essential website functionality</li>
                                    <li>Provide social media features</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4 border-l-4 border-primary pl-4">
                                    Types of Cookies We Use
                                </h2>
                                <div className="space-y-4">
                                    <div className="border-l-2 border-primary/30 pl-6">
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">Essential Cookies</h3>
                                        <p className="text-muted-foreground">Required for the website to function properly. These cannot be disabled.</p>
                                    </div>
                                    <div className="border-l-2 border-primary/30 pl-6">
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">Analytics Cookies</h3>
                                        <p className="text-muted-foreground">Help us understand how visitors interact with our website.</p>
                                    </div>
                                    <div className="border-l-2 border-primary/30 pl-6">
                                        <h3 className="font-heading text-xl font-bold uppercase text-white mb-2">Preference Cookies</h3>
                                        <p className="text-muted-foreground">Remember your settings and preferences for a better experience.</p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-4 border-l-4 border-primary pl-4">
                                    Managing Cookies
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
                                    computer and you can set most browsers to prevent them from being placed. However, if you do this, you
                                    may have to manually adjust some preferences every time you visit our site.
                                </p>
                            </section>

                            <section className="border-t border-white/10 pt-8">
                                <p className="text-sm text-muted-foreground italic">
                                    Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </div>
        </LandingLayout>
    );
}
