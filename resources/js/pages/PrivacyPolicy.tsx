import LandingLayout from '@/layouts/LandingLayout';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <LandingLayout
            title="Privacy Policy"
            description="Jenkins Motorsports Privacy Policy. Learn how we collect, use, and protect your personal data."
        >
            <Head title="Privacy Policy" />
            <div className="pt-32 pb-24 container mx-auto px-4 md:px-6">
                <h1 className="font-heading text-4xl md:text-5xl font-black uppercase italic text-white mb-8">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-muted-foreground">
                    <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At Jenkins Motorsports, we are committed to looking after your personal data and respecting your privacy.
                        This privacy policy explains how we collect and use personal data about you when you visit our website or interact with us.
                    </p>
                    {/* Add more privacy content here */}
                    <h2 className="text-2xl text-white font-bold mt-8 mb-4">Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you including identity data, contact data, and technical data.</p>
                    <h2 className="text-2xl text-white font-bold mt-8 mb-4">How We Use Your Data</h2>
                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: where we need to perform the contract we are about to enter into or have entered into with you; where it is necessary for our legitimate interests; and where we need to comply with a legal or regulatory obligation.</p>
                </div>
            </div>
        </LandingLayout>
    );
}
