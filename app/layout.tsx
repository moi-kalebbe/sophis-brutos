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
    title: "Sophia Brutos | Semijoias no Bruto Direto da Fábrica",
    description: "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
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
                {children}
                <Suspense fallback={null}>
                    <FloatingWhatsApp />
                </Suspense>
            </body>
        </html>
    );
}
