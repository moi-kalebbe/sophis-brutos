
"use client";

import { useEffect, useState, useRef } from "react";
import Script from "next/script";
import { createClient } from "@/lib/supabase/client";

interface Settings {
    facebook_pixel_id: string | null;
    facebook_active: boolean;
    google_analytics_id: string | null;
    analytics_active: boolean;
    google_ads_id: string | null;
    ads_active: boolean;
    custom_scripts: string | null;
}

export default function DynamicScripts() {
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        async function fetchSettings() {
            const supabase = createClient();
            const { data } = await supabase.from("settings").select("*").single();
            if (data) {
                setSettings(data);
            }
        }
        fetchSettings();
    }, []);

    if (!settings) return null;

    return (
        <>
            {/* Facebook Pixel */}
            {settings.facebook_active && settings.facebook_pixel_id && (
                <Script id="facebook-pixel" strategy="afterInteractive">
                    {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.facebook_pixel_id}');
            fbq('track', 'PageView');
          `}
                </Script>
            )}

            {/* Google Analytics */}
            {settings.analytics_active && settings.google_analytics_id && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${settings.google_analytics_id}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_analytics_id}');
            `}
                    </Script>
                </>
            )}

            {/* Google Ads */}
            {settings.ads_active && settings.google_ads_id && (
                <Script id="google-ads" strategy="afterInteractive">
                    {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.google_ads_id}');
           `}
                </Script>
            )}

            {/* Custom Scripts */}
            {settings.custom_scripts && <CustomScriptRunner scriptHtml={settings.custom_scripts} />}

            {/* Scroll Tracking (50%) */}
            {settings.facebook_active && <ScrollTracker />}
        </>
    );
}

function ScrollTracker() {
    useEffect(() => {
        let fired = false;
        const handleScroll = () => {
            if (fired) return;
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            if (scrollPercent > 0.5) {
                if ((window as any).fbq) {
                    (window as any).fbq('trackCustom', 'ScrollDepth', { depth: '50%' });
                }
                fired = true;
                window.removeEventListener("scroll", handleScroll);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return null;
}

function CustomScriptRunner({ scriptHtml }: { scriptHtml: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Reset
        containerRef.current.innerHTML = "";

        // Create range for contextual fragment (which executes scripts)
        const range = document.createRange();
        range.selectNode(containerRef.current);
        const fragment = range.createContextualFragment(scriptHtml);

        containerRef.current.appendChild(fragment);
    }, [scriptHtml]);

    return <div ref={containerRef} />;
}

