import type { Metadata } from "next";

/**
 * O robots.txt já bloqueia /admin, mas bloquear o rastreio não impede a
 * indexação: se algum link externo apontar para cá, o Google pode listar a URL
 * mesmo sem ler a página. A meta tag noindex é o que realmente mantém o painel
 * fora dos resultados.
 */
export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
    },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
