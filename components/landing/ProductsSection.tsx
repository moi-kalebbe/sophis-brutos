
"use client";

import Image from "next/image";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";

const products = [
    // Fila 1: Branca | Branca
    { src: "/assets/img/conjunto-folha-marquise.jpg", alt: "Conjunto Folha Marquise" },
    { src: "/assets/img/conjunto-barras-geometricas.jpg", alt: "Conjunto Barras Minimalista" },

    // Fila 2: Negra | Negra
    { src: "/assets/img/conjunto-perolas-classico.jpg", alt: "Conjunto Pérolas Clássico" },
    { src: "/assets/img/colares-camadas-minimalista.jpg", alt: "Colares em Camadas" },

    // Fila 3: Branca | Branca
    { src: "/assets/img/conjunto-estrelas-brinco.jpg", alt: "Conjunto Estrelas" },
    { src: "/assets/img/colares-geometricos-camadas.jpg", alt: "Colares Geométricos" },
];

export default function ProductsSection() {
    const { isModalOpen, pendingSource, openQualificationModal, closeModal, confirmAndRedirect } = useWhatsAppQualification();

    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-3 text-text-dark">
                    Peças vendáveis o ano todo (atemporais)
                </h2>
                <p className="text-center text-text-medium mb-12">Mix pronto para lojista, do básico ao destaque.</p>

                <div className="grid grid-cols-2 gap-6 md:gap-10 mb-12">
                    {products.map((product, index) => (
                        <button
                            key={index}
                            onClick={() => openQualificationModal(`Produto Grid - ${product.alt}`)}
                            className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-primary shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer text-left w-full"
                        >
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-medium tracking-wide uppercase text-sm border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Ver Detalhes
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="text-center">
                    <button
                        onClick={() => openQualificationModal("Ver Catálogo Completo - ProductsSection")}
                        className="inline-block text-accent-gold font-semibold border-b border-accent-gold pb-1 hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        Ver catálogo completo →
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
