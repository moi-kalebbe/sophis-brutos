import { Suspense } from "react";
import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Outfit } from "next/font/google";
import DynamicScripts from "@/components/DynamicScripts";
import LandingFloatingWhatsApp from "@/components/LandingFloatingWhatsApp";
import { EMPRESA, SEDE, SITE_URL, enderecoPostal, lojasEstruturadas } from "@/lib/seo/site";
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
        // A imagem vem de app/opengraph-image.png pela convenção do Next, que
        // monta a URL com hash de versão. Declarar aqui à mão duplicaria a tag.
    },
    twitter: {
        card: "summary_large_image",
        title: "Sophia Brutos | Semijoias no bruto direto da indústria",
        description:
            "Produção própria em Limeira, reposição garantida e envio para todo o Brasil.",
    },
    robots: { index: true, follow: true },
};

/**
 * Grafo de dados estruturados do site.
 *
 * Um único bloco `@graph` com `@id` em cada nó, para que Organization, as lojas
 * e a página se refiram umas às outras em vez de repetir dados soltos. É o
 * formato que o Google e os buscadores com IA conseguem ligar melhor.
 */
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organizacao`,
            name: EMPRESA.nome,
            url: SITE_URL,
            logo: `${SITE_URL}/assets/logo.png`,
            image: `${SITE_URL}/assets/logo.png`,
            description: EMPRESA.descricaoCurta,
            foundingDate: EMPRESA.fundacao,
            telephone: EMPRESA.telefone,
            address: enderecoPostal(SEDE),
            areaServed: { "@type": "Country", name: "Brasil" },
            knowsAbout: [
                "semijoias no bruto",
                "atacado de semijoias",
                "galvanoplastia",
                "revenda de semijoias",
            ],
            location: lojasEstruturadas(),
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#site`,
            url: SITE_URL,
            name: EMPRESA.nome,
            inLanguage: "pt-BR",
            publisher: { "@id": `${SITE_URL}/#organizacao` },
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
