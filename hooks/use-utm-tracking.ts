
"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UTMParams {
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_term: string | null;
    utm_content: string | null;
}

export function useUTMTracking() {
    const searchParams = useSearchParams();
    const utms = useMemo<UTMParams>(() => ({
        utm_source: searchParams.get("utm_source"),
        utm_medium: searchParams.get("utm_medium"),
        utm_campaign: searchParams.get("utm_campaign"),
        utm_term: searchParams.get("utm_term"),
        utm_content: searchParams.get("utm_content"),
    }), [searchParams]);

    const trackClick = async (location?: string) => {
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? "mobile" : "desktop";
        const pixelWindow = window as typeof window & {
            fbq?: (action: string, event: string, payload: Record<string, string>) => void;
        };

        if (pixelWindow.fbq) {
            pixelWindow.fbq("track", "Contact", {
                content_name: location || "unknown_button",
                content_category: "WhatsApp Lead",
            });
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            return;
        }

        const supabase = createClient();

        try {
            await supabase.from("click_tracking").insert({
                utm_source: utms.utm_source,
                utm_medium: utms.utm_medium,
                utm_campaign: utms.utm_campaign,
                utm_term: utms.utm_term,
                utm_content: utms.utm_content,
                button_location: location || "unknown",
                user_agent: userAgent,
                referrer: document.referrer,
                page_url: window.location.href,
                device_type: deviceType,
            });
        } catch (error) {
            console.error("Error tracking click:", error);
        }
    };

    return { trackClick };
}
