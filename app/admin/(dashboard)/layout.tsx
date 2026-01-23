"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";

const AUTHORIZED_ADMIN_EMAIL = 'trabalhosmktsophia@gmail.com';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthorization = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user || user.email !== AUTHORIZED_ADMIN_EMAIL) {
                // Not authorized - redirect to login
                await supabase.auth.signOut();
                router.push('/admin/login?error=unauthorized');
            } else {
                setIsAuthorized(true);
            }
            setIsLoading(false);
        };

        checkAuthorization();
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bg-primary/20">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent-gold border-r-transparent"></div>
                    <p className="mt-4 text-text-medium">Verificando acesso...</p>
                </div>
            </div>
        );
    }

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-bg-primary/20">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
