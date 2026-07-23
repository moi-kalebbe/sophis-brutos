"use client";

import { usePathname } from "next/navigation";
import LP1FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import LP2FloatingWhatsApp from "@/components/lp2/FloatingWhatsApp";

export default function LandingFloatingWhatsApp() {
    const pathname = usePathname();

    if (pathname.startsWith("/admin")) {
        return null;
    }

    return pathname.startsWith("/lp2")
        ? <LP2FloatingWhatsApp />
        : <LP1FloatingWhatsApp />;
}
