import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import LandingLayout from '@/layouts/LandingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function Contact() {
    const [formType, setFormType] = useState<'contact' | 'sponsorship'>('contact');
    const params = new URLSearchParams(window.location.search);
    const tierParam = params.get('tier');

    // Sponsorship Form
    const sponsorshipForm = useForm({
        name: '',
        email: '',
        company: '',
        interest_tier: tierParam || 'hospitality',
        message: '',
    });

    // General Contact Form
    const contactForm = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submitSponsorship = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sponsorshipForm.post('/sponsorship', {
            onSuccess: () => sponsorshipForm.reset(),
        });
    };

    const submitContact = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        contactForm.post('/contact', {
            onSuccess: () => contactForm.reset(),
        });
    };

    const isSuccess = (formType === 'contact' ? contactForm.recentlySuccessful : sponsorshipForm.recentlySuccessful);

    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Jenkins Motorsports",
        "mainEntity": {
            "@type": "Organization",
            "name": "Jenkins Motorsports",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Wood Farm, Stone Aston Estate",
                "addressLocality": "Stafford",
                "addressRegion": "Staffordshire",
                "postalCode": "ST18 9SD",
                "addressCountry": "UK"
            },
            "telephone": "+44 7907 777177",
            "email": "info@jenkinstrucksports.com"
        }
    };

    return (
        <LandingLayout
            title="Contact Us"
            description="Get in touch with Jenkins Motorsports. Champions in British Truck Racing. Based in Stafford, Staffordshire."
            schema={contactSchema}
        >
            <Head title="Contact Us" />

            {/* Hero Section */}
            <div className="relative pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden bg-black">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />

                <div className="container relative z-10 px-4 md:px-6 mx-auto text-center">
                    <span className="font-heading text-primary font-bold uppercase tracking-widest mb-4 block">Get in Touch</span>
                    <h1 className="font-heading text-5xl md:text-7xl font-black uppercase italic text-white mb-6">
                        Start Your <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-destructive">Engine</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Connect with the champions. Whether it's a partnership inquiry or a general question, we're ready to listen.
                    </p>
                </div>
            </div>

            <div className="container px-4 md:px-6 mx-auto py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <div>
                        <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-8 border-l-4 border-primary pl-6">Mission Control</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                    <MapPin className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider mb-1">Workshop & Office</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Wood Farm, Stone Aston Estate,<br />
                                        Stafford, Staffordshire,<br />
                                        ST18 9SD, United Kingdom
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider mb-1">Email Us</h3>
                                    <div className="space-y-1">
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            <span className="text-white/40 text-xs w-24">GENERAL:</span>
                                            <a href="mailto:info@jenkinstrucksports.com" className="hover:text-primary transition-colors">info@jenkinstrucksports.com</a>
                                        </p>
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            <span className="text-white/40 text-xs w-24">SPONSORSHIP:</span>
                                            <a href="mailto:partner@jenkinstrucksports.com" className="hover:text-primary transition-colors">partner@jenkinstrucksports.com</a>
                                        </p>
                                        <p className="text-muted-foreground flex items-center gap-2">
                                            <span className="text-white/40 text-xs w-24">PRESS:</span>
                                            <a href="mailto:press@jenkinstrucksports.com" className="hover:text-primary transition-colors">press@jenkinstrucksports.com</a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-primary/10 rounded-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white uppercase tracking-wider mb-1">Call Us</h3>
                                    <p className="text-muted-foreground">
                                        <a href="tel:+447907777177" className="hover:text-primary transition-colors font-mono">+44 7907 777177</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-secondary/20 border border-white/10 rounded-lg backdrop-blur-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                            <h3 className="font-heading text-xl font-bold uppercase text-white mb-4">Press Inquiries</h3>
                            <p className="text-muted-foreground mb-4">
                                For media accreditation, interview requests, and high-res asset access, please contact our press office directly.
                            </p>
                            <Button variant="outline" className="w-full skew-x-[-12deg] border-white/10 hover:bg-white/5">
                                <span className="skew-x-[12deg]">Access Press Area</span>
                            </Button>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="bg-secondary/10 border border-white/10 rounded-lg p-8">
                        <div className="flex bg-black/40 p-1 mb-8 rounded-sm">
                            <button
                                onClick={() => setFormType('contact')}
                                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all ${formType === 'contact' ? 'bg-primary text-white skew-x-[-6deg]' : 'text-muted-foreground'}`}
                            >
                                <span className={formType === 'contact' ? 'skew-x-[6deg] inline-block' : ''}>General Contact</span>
                            </button>
                            <button
                                onClick={() => setFormType('sponsorship')}
                                className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider transition-all ${formType === 'sponsorship' ? 'bg-primary text-white skew-x-[-6deg]' : 'text-muted-foreground'}`}
                            >
                                <span className={formType === 'sponsorship' ? 'skew-x-[6deg] inline-block' : ''}>Sponsorship</span>
                            </button>
                        </div>

                        <h2 className="font-heading text-3xl font-bold uppercase italic text-white mb-8">
                            {formType === 'contact' ? 'Send a Message' : 'Sponsorship Enquiry'}
                        </h2>

                        {isSuccess ? (
                            <div className="bg-green-500/10 border border-green-500/20 p-6 rounded-lg text-center animate-in fade-in zoom-in duration-300">
                                <h3 className="text-green-500 font-bold text-xl mb-2">Message Sent!</h3>
                                <p className="text-muted-foreground">
                                    {formType === 'contact'
                                        ? "Thank you for reaching out. We'll get back to you shortly."
                                        : "Thank you for your interest in partnering with us. We'll be in touch soon."}
                                </p>
                                <Button
                                    variant="link"
                                    className="mt-4 text-primary"
                                    onClick={() => {
                                        contactForm.reset();
                                        sponsorshipForm.reset();
                                    }}
                                >
                                    Send another message
                                </Button>
                            </div>
                        ) : (
                            formType === 'contact' ? (
                                <form onSubmit={submitContact} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="c-name" className="text-white">Your Name</Label>
                                            <Input
                                                id="c-name"
                                                value={contactForm.data.name}
                                                onChange={e => contactForm.setData('name', e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                placeholder="John Doe"
                                            />
                                            {contactForm.errors.name && <p className="text-destructive text-sm">{contactForm.errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="c-email" className="text-white">Email Address</Label>
                                            <Input
                                                id="c-email"
                                                type="email"
                                                value={contactForm.data.email}
                                                onChange={e => contactForm.setData('email', e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                placeholder="john@example.com"
                                            />
                                            {contactForm.errors.email && <p className="text-destructive text-sm">{contactForm.errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-white">Subject</Label>
                                        <Input
                                            id="subject"
                                            value={contactForm.data.subject}
                                            onChange={e => contactForm.setData('subject', e.target.value)}
                                            className="bg-black/50 border-white/10 text-white"
                                            placeholder="What's this about?"
                                        />
                                        {contactForm.errors.subject && <p className="text-destructive text-sm">{contactForm.errors.subject}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="c-message" className="text-white">Message</Label>
                                        <Textarea
                                            id="c-message"
                                            value={contactForm.data.message}
                                            onChange={e => contactForm.setData('message', e.target.value)}
                                            className="bg-black/50 border-white/10 text-white min-h-[150px]"
                                            placeholder="How can we help you?"
                                        />
                                        {contactForm.errors.message && <p className="text-destructive text-sm">{contactForm.errors.message}</p>}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full skew-x-[-12deg] h-12 text-lg font-bold"
                                        variant="destructive"
                                        disabled={contactForm.processing}
                                    >
                                        <span className="skew-x-[12deg]">
                                            {contactForm.processing ? 'Sending...' : 'Send Message'}
                                        </span>
                                    </Button>
                                </form>
                            ) : (
                                <form onSubmit={submitSponsorship} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="s-name" className="text-white">Representative Name</Label>
                                            <Input
                                                id="s-name"
                                                value={sponsorshipForm.data.name}
                                                onChange={e => sponsorshipForm.setData('name', e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                placeholder="John Doe"
                                            />
                                            {sponsorshipForm.errors.name && <p className="text-destructive text-sm">{sponsorshipForm.errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="s-email" className="text-white">Work Email</Label>
                                            <Input
                                                id="s-email"
                                                type="email"
                                                value={sponsorshipForm.data.email}
                                                onChange={e => sponsorshipForm.setData('email', e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                placeholder="john@company.com"
                                            />
                                            {sponsorshipForm.errors.email && <p className="text-destructive text-sm">{sponsorshipForm.errors.email}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="company" className="text-white">Company Name</Label>
                                            <Input
                                                id="company"
                                                value={sponsorshipForm.data.company}
                                                onChange={e => sponsorshipForm.setData('company', e.target.value)}
                                                className="bg-black/50 border-white/10 text-white"
                                                placeholder="Your Company Ltd."
                                            />
                                            {sponsorshipForm.errors.company && <p className="text-destructive text-sm">{sponsorshipForm.errors.company}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tier" className="text-white">Proposed Partnership</Label>
                                            <Select
                                                value={sponsorshipForm.data.interest_tier}
                                                onValueChange={val => sponsorshipForm.setData('interest_tier', val)}
                                            >
                                                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                                                    <SelectValue placeholder="Select tier" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="hospitality">Hospitality Packages</SelectItem>
                                                    <SelectItem value="technical">Technical Partnership</SelectItem>
                                                    <SelectItem value="primary">Primary Sponsorship</SelectItem>
                                                    <SelectItem value="title">Title Sponsorship (Tier 1)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {sponsorshipForm.errors.interest_tier && <p className="text-destructive text-sm">{sponsorshipForm.errors.interest_tier}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="s-message" className="text-white">Partnership Overview</Label>
                                        <Textarea
                                            id="s-message"
                                            value={sponsorshipForm.data.message}
                                            onChange={e => sponsorshipForm.setData('message', e.target.value)}
                                            className="bg-black/50 border-white/10 text-white min-h-[150px]"
                                            placeholder="Tell us about your sponsorship goals..."
                                        />
                                        {sponsorshipForm.errors.message && <p className="text-destructive text-sm">{sponsorshipForm.errors.message}</p>}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full skew-x-[-12deg] h-12 text-lg font-bold"
                                        variant="destructive"
                                        disabled={sponsorshipForm.processing}
                                    >
                                        <span className="skew-x-[12deg]">
                                            {sponsorshipForm.processing ? 'Sending Enquiry...' : 'Request Partnership'}
                                        </span>
                                    </Button>
                                </form>
                            )
                        )}
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
