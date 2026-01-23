
"use client";

import { useEffect, useState } from "react";
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
    const [utms, setUtms] = useState<UTMParams>({
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        utm_term: null,
        utm_content: null,
    });

    useEffect(() => {
        if (searchParams) {
            setUtms({
                utm_source: searchParams.get("utm_source"),
                utm_medium: searchParams.get("utm_medium"),
                utm_campaign: searchParams.get("utm_campaign"),
                utm_term: searchParams.get("utm_term"),
                utm_content: searchParams.get("utm_content"),
            });
        }
    }, [searchParams]);

    const trackClick = async (location?: string) => {
        const supabase = createClient();

        // Detect device type roughly
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? "mobile" : "desktop";

        // Advanced Pixel Tracking: Fire 'Contact' event
        if (typeof window !== "undefined" && (window as any).fbq) {
            (window as any).fbq('track', 'Contact', {
                content_name: location || "unknown_button",
                content_category: "WhatsApp Lead"
            });
        }

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
