
"use client";

import { createClient } from "@/lib/supabase/client";

interface UTMParams {
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_term: string | null;
    utm_content: string | null;
}

/**
 * Lê as UTMs da URL no momento do clique.
 *
 * Antes isso vinha de `useSearchParams`, que obriga o Next a abortar o
 * pré-render de todo o Suspense em volta: o hero saía do HTML e só aparecia
 * depois do JS, o que jogava a LCP para 4s. Como as UTMs só são necessárias
 * quando o usuário clica, ler da URL aqui dá o mesmo resultado e devolve o
 * hero ao HTML inicial.
 */
function lerUTMs(): UTMParams {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_term: params.get("utm_term"),
        utm_content: params.get("utm_content"),
    };
}

export function useUTMTracking() {
    const trackClick = async (location?: string) => {
        const utms = lerUTMs();
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const deviceType = isMobile ? "mobile" : "desktop";
        const pageVersion = window.location.pathname.startsWith("/lp2") ? "LP2" : "LP1";
        const trackedLocation = `${pageVersion} | ${location || "unknown"}`;
        const pixelWindow = window as typeof window & {
            fbq?: (action: string, event: string, payload: Record<string, string>) => void;
        };

        if (pixelWindow.fbq) {
            pixelWindow.fbq("track", "Contact", {
                content_name: trackedLocation,
                content_category: "WhatsApp Lead",
                page_version: pageVersion,
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
                button_location: trackedLocation,
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
