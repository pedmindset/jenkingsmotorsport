import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';

export default function TermsOfService() {
    return (
        <LandingLayout
            title="Terms of Service"
            description="Jenkins Motorsports Terms of Service. Read the rules and regulations for using our website."
        >
            <Head title="Terms of Service" />
            <div className="pt-32 pb-24 container mx-auto px-4 md:px-6">
                <h1 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-8">Terms of Service</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        These terms and conditions outline the rules and regulations for the use of the Jenkins Motorsports website.
                    </p>
                    {/* Add more terms content here */}
                    <h2 className="text-2xl text-white font-bold mt-8 mb-4">Acceptance of Terms</h2>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Jenkins Motorsports if you do not agree to take all of the terms and conditions stated on this page.</p>
                    <h2 className="text-2xl text-white font-bold mt-8 mb-4">License</h2>
                    <p>Unless otherwise stated, Jenkins Motorsports and/or its licensors own the intellectual property rights for all material on Jenkins Motorsports. All intellectual property rights are reserved.</p>
                </div>
            </div>
        </LandingLayout>
    );
}
