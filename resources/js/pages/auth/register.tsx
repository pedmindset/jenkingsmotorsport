import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';

export default function Register() {
    return (
        <AuthLayout
            title="Registration disabled"
            description="New account registration is currently restricted."
        >
            <Head title="Register" />
            <div className="text-center py-10">
                <p className="text-muted-foreground">
                    Please contact the administrator if you need access.
                </p>
                <div className="mt-6">
                    <a href="/login" className="text-primary hover:underline">
                        Return to login
                    </a>
                </div>
            </div>
        </AuthLayout>
    );
}
