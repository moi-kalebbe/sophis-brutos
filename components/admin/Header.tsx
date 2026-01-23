
"use client";

import { usePathname } from "next/navigation";
import { User } from "lucide-react";

export default function Header() {
    const pathname = usePathname();

    // Format pathname for breadcrumb (e.g., /admin/dashboard -> Dashboard)
    const segments = pathname.split('/').filter(Boolean).slice(1);
    const title = segments.length > 0 ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1) : "Dashboard";

    return (
        <header className="h-[70px] bg-white border-b border-bg-secondary w-full px-6 flex items-center justify-between sticky top-0 z-30">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-text-medium">
                <span className="opacity-60">Admin</span>
                <span>/</span>
                <span className="font-semibold text-text-dark">{title}</span>
            </div>

            {/* User Profile Placeholder */}
            <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-semibold text-text-dark">Admin User</p>
                    <p className="text-xs text-text-medium opacity-70">Sophia Brutos</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center text-text-dark hover:bg-accent-gold hover:text-white transition-colors cursor-pointer">
                    <User className="w-5 h-5" />
                </div>
            </div>
        </header>
    );
}
