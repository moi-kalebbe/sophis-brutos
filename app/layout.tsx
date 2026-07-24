import { Suspense } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Outfit } from "next/font/google";
import DynamicScripts from "@/components/DynamicScripts";
import LandingFloatingWhatsApp from "@/components/LandingFloatingWhatsApp";
import "./v2-globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    variable: "--font-montserrat",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
    style: ["normal", "italic"],
});

export const metadata: Metadata = {
    metadataBase: new URL("https://sophiabrutos.com.br"),
    title: {
        default: "Sophia Brutos | Semijoias no bruto direto da indústria",
        template: "%s | Sophia Brutos",
    },
    description:
        "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
    keywords: ["semijoias", "bruto", "Limeira", "atacado", "fábrica", "revenda", "joias"],
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: "https://sophiabrutos.com.br",
        title: "Sophia Brutos | Semijoias no bruto direto da indústria",
        description:
            "Produção própria em Limeira, reposição garantida e envio para todo o Brasil.",
        siteName: "Sophia Brutos",
        images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Sophia Brutos" }],
    },
    robots: { index: true, follow: true },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sophia Brutos",
    url: "https://sophiabrutos.com.br",
    logo: "https://sophiabrutos.com.br/assets/logo.png",
    // Endereço da indústria, onde fica a loja da fábrica.
    address: {
        "@type": "PostalAddress",
        streetAddress: "Rua José Faccioni Filho, 301",
        addressLocality: "Limeira",
        addressRegion: "SP",
        postalCode: "13487-211",
        addressCountry: "BR",
    },
    location: [
        {
            "@type": "Place",
            name: "Sophia Brutos | Loja da Fábrica",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Rua José Faccioni Filho, 301",
                addressLocality: "Limeira",
                addressRegion: "SP",
                postalCode: "13487-211",
                addressCountry: "BR",
            },
        },
        {
            "@type": "Place",
            name: "Sophia Brutos | Shopping Boulevard",
            address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Marechal Arthur da Costa e Silva, 795 - Loja 144",
                addressLocality: "Limeira",
                addressRegion: "SP",
                postalCode: "13487-220",
                addressCountry: "BR",
            },
        },
    ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" className={`${outfit.variable} ${montserrat.variable} ${cormorant.variable}`}>
            <body className={outfit.className}>
                <Suspense fallback={null}>
                    <DynamicScripts />
                </Suspense>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
                <Suspense fallback={null}>
                    <LandingFloatingWhatsApp />
                </Suspense>
            </body>
        </html>
    );
}
