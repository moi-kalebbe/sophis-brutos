"use client";

import Image from "next/image";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";

const products = [
    { src: "/assets/img/conjunto-folha-marquise.jpg", alt: "Conjunto Folha Marquise", span: "md:col-span-2 md:row-span-2" },
    { src: "/assets/img/conjunto-barras-geometricas.jpg", alt: "Conjunto Barras Minimalista", span: "" },
    { src: "/assets/img/conjunto-perolas-classico.jpg", alt: "Conjunto Pérolas Clássico", span: "" },
    { src: "/assets/img/colares-camadas-minimalista.jpg", alt: "Colares em Camadas", span: "md:col-span-2" },
    { src: "/assets/img/conjunto-estrelas-brinco.jpg", alt: "Conjunto Estrelas", span: "" },
    { src: "/assets/img/colares-geometricos-camadas.jpg", alt: "Colares Geométricos", span: "" },
];

export default function ProductsSection() {
    const {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect,
    } = useWhatsAppQualification();

    return (
        <section id="colecao" className="bg-[var(--sb-cocoa)] px-5 py-28 text-[var(--sb-ivory)] md:py-40">
            <div className="sb-shell">
                <div data-reveal className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[var(--sb-champagne)]">Mix pronto para lojista</p>
                        <h2 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] md:text-7xl">
                            Peças atemporais para compor uma coleção que vende.
                        </h2>
                    </div>
                    <p className="max-w-[42ch] text-base leading-relaxed text-white/62 lg:justify-self-end">
                        Do básico ao destaque, escolha os modelos que combinam com a identidade da sua loja.
                    </p>
                </div>

                <div className="grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-2 md:auto-rows-[260px] md:grid-cols-4">
                    {products.map((product) => (
                        <button
                            type="button"
                            key={product.src}
                            onClick={() => openQualificationModal(`Produto Grid - ${product.alt}`)}
                            className={`group relative overflow-hidden bg-[var(--sb-blush)] text-left ${product.span}`}
                            aria-label={`Consultar ${product.alt}`}
                        >
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                className="object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[var(--sb-cocoa)]/82 px-4 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm transition duration-500 group-hover:translate-y-0">
                                {product.alt}
                            </span>
                        </button>
                    ))}
                </div>

                <div data-reveal className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center">
                    <p className="font-serif text-2xl italic text-white/75">Veja o catálogo completo e monte seu primeiro pedido.</p>
                    <button
                        type="button"
                        onClick={() => openQualificationModal("Ver Catálogo Completo - ProductsSection")}
                        className="rounded-full border border-[var(--sb-champagne)] px-6 py-3 text-xs font-bold uppercase tracking-[0.13em] text-[var(--sb-champagne)] transition hover:bg-[var(--sb-champagne)] hover:text-[var(--sb-cocoa)]"
                    >
                        Abrir catálogo
                    </button>
                </div>
            </div>

            <WhatsAppQualificationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmAndRedirect}
                source={pendingSource}
            />
        </section>
    );
}
