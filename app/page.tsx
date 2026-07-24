
import { Suspense } from "react";
import type { Metadata } from "next";
import { faqEstruturada } from "@/lib/seo/faq";
import { SITE_URL } from "@/lib/seo/site";
import Hero from "@/components/landing/Hero";
import IdealSection from "@/components/landing/IdealSection";
import ProductsSection from "@/components/landing/ProductsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FactorySection from "@/components/landing/FactorySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
    alternates: { canonical: "/" },
};

/**
 * FAQ e identidade da página no mesmo grafo do layout, ligados pelo `@id`.
 * O FAQPage é o que habilita a resposta expandida no Google e o que os
 * buscadores com IA citam quando alguém pergunta sobre pedido mínimo, banho
 * ou envio.
 */
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            ...faqEstruturada(),
            "@id": `${SITE_URL}/#faq`,
            inLanguage: "pt-BR",
            isPartOf: { "@id": `${SITE_URL}/#site` },
        },
        {
            "@type": "WebPage",
            "@id": `${SITE_URL}/#pagina`,
            url: SITE_URL,
            name: "Sophia Brutos | Semijoias no bruto direto da indústria",
            description:
                "Produção própria em Limeira. Semijoias no bruto com reposição garantida e margem de lucro real para lojistas.",
            inLanguage: "pt-BR",
            isPartOf: { "@id": `${SITE_URL}/#site` },
            about: { "@id": `${SITE_URL}/#organizacao` },
        },
    ],
};

export default function Home() {
    return (
        <main className="min-h-screen font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={null}>
                <Hero />
            </Suspense>
            <IdealSection />
            <Suspense fallback={null}>
                <ProductsSection />
            </Suspense>
            <BenefitsSection />
            <FactorySection />
            <TestimonialsSection />
            <FAQSection />
            <Suspense fallback={null}>
                <FinalCTA />
            </Suspense>
            <Footer />
        </main>
    );
}
