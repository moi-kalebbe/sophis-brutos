import { Suspense } from "react";
import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import DynamicScripts from "@/components/DynamicScripts";
import FloatingWhatsApp from "@/components/landing/FloatingWhatsApp";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: 'swap',
    style: ['normal', 'italic'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://sophiabrutos.space'),
    title: {
        default: "Sophia Brutos | Semijoias no Bruto Direto da Fábrica",
        template: "%s | Sophia Brutos"
    },
    description: "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
    keywords: ["semijoias", "bruto", "limeira", "atacado", "fábrica", "revenda", "lucro", "joias"],
    authors: [{ name: "Sophia Brutos" }],
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: 'https://sophiabrutos.space',
        title: "Sophia Brutos | Semijoias no Bruto Direto da Fábrica",
        description: "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
        siteName: "Sophia Brutos",
        images: [
            {
                url: '/opengraph-image.png',
                width: 1200,
                height: 630,
                alt: 'Sophia Brutos - Semijoias no Bruto',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Sophia Brutos | Semijoias no Bruto Direto da Fábrica",
        description: "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
        images: ['/twitter-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sophia Brutos",
    "url": "https://sophiabrutos.space",
    "logo": "https://sophiabrutos.space/assets/logo.png",
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-19-99999-9999",
        "contactType": "sales",
        "areaServed": "BR",
        "availableLanguage": "Portuguese"
    },
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Limeira",
        "addressRegion": "SP",
        "addressCountry": "BR"
    },
    "sameAs": [
        "https://www.instagram.com/sophiabrutos",
        "https://www.facebook.com/sophiabrutos"
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR" className={`${montserrat.variable} ${cormorant.variable}`}>
            <body className={montserrat.className}>
                <Suspense fallback={null}>
                    <DynamicScripts />
                </Suspense>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
                <Suspense fallback={null}>
                    <FloatingWhatsApp />
                </Suspense>
            </body>
        </html>
    );
}
