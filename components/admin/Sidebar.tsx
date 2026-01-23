
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, BarChart2, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false); // Mobile state
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    const navItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Pixels & Scripts", href: "/admin/pixels", icon: Target },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-white border-r border-bg-secondary">
            {/* Header */}
            <div className="p-6 border-b border-bg-secondary flex justify-center">
                <div className="relative w-[180px] h-[50px]">
                    <Image
                        src="/assets/logo.png"
                        alt="Sophia Brutos Admin"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                ? "bg-bg-secondary text-text-dark font-semibold"
                                : "text-text-medium hover:bg-bg-primary hover:text-text-dark"
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-accent-gold" : "opacity-70"}`} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-bg-secondary">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                >
                    <LogOut className="w-5 h-5 opacity-70" />
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-text-dark text-white rounded-full shadow-lg flex items-center justify-center"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar Desktop */}
            <aside className="hidden lg:block w-[280px] h-screen sticky top-0 overflow-y-auto">
                <SidebarContent />
            </aside>

            {/* Sidebar Mobile Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-0 bottom-0 left-0 w-[280px] z-50">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
}
