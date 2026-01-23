
"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useUTMTracking } from "@/hooks/use-utm-tracking";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";

export default function Hero() {
    const { trackClick } = useUTMTracking();
    const { isModalOpen, pendingSource, openQualificationModal, closeModal, confirmAndRedirect } = useWhatsAppQualification();

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-5 py-20 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/img/hero-new.png"
                    alt="Semijoias Sophia Brutos - Nova Coleção"
                    fill
                    className="object-cover object-center"
                    priority
                    quality={80}
                />
                {/* Overlay - Adjusted for contrast with new light image + blur for readability */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-4xl w-full animate-fadeInUp flex flex-col items-center -mt-10 md:mt-0">

                <div className="relative w-[180px] h-[70px] md:w-[280px] md:h-[100px] mb-6 md:mb-8">
                    <Image
                        src="/assets/logo.png"
                        alt="Sophia Brutos Logo"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="w-[60px] h-[1px] bg-accent-gold mb-4 md:mb-5 mx-auto" />

                <h1 className="font-serif text-4xl md:text-6xl font-semibold tracking-wide mb-4 md:mb-5 leading-tight text-[#3E2723]">
                    <span style={{
                        background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Semijoias no{" "}
                    </span>
                    <span className="inline-block bg-white px-3 py-1 rounded-lg font-extrabold text-[#C9A86C] border border-accent-gold shadow-md mx-1">BRUTO</span>
                    <span style={{
                        background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        • Indústria em Limeira
                    </span>
                    <span className="block text-[0.5em] font-normal tracking-[0.3em] uppercase text-[#5D4037] mt-2">
                        Margem de lucro real para lojistas
                    </span>
                </h1>

                <p className="font-sans text-lg md:text-xl font-light text-[#4E342E] max-w-lg mx-auto mb-8 md:mb-10 leading-relaxed font-medium">
                    Produção própria. Você escolhe o banho, nós garantimos a reposição.
                    Peças atemporais direto da fonte.
                </p>

                <div className="flex flex-col md:flex-row flex-wrap justify-center gap-2 md:gap-4 mb-5 md:mb-8 text-xs md:text-base font-bold text-[#3E2723] w-full max-w-lg">
                    <div className="flex justify-center items-center gap-3 md:gap-4 w-full whitespace-nowrap">
                        <span className="flex items-center gap-1">✓ Mínimo 5 de cada</span>
                        <span className="flex items-center gap-1">✓ Envio BR</span>
                        <span className="flex items-center gap-1">✓ CPF/CNPJ</span>
                    </div>
                </div>

                <button
                    onClick={() => openQualificationModal("Botão Principal (Topo)")}
                    className="inline-flex items-center gap-2 md:gap-3 bg-gradient-gold text-white py-3 md:py-5 px-6 md:px-12 rounded-full font-bold text-sm md:text-lg tracking-wider uppercase transition-all duration-300 shadow-[0_4px_14px_0_rgba(201,168,108,0.39)] hover:shadow-[0_6px_20px_rgba(201,168,108,0.23)] hover:-translate-y-1 hover:scale-105 cursor-pointer"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-7 md:h-7">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <span className="block text-xs md:text-lg">
                        QUERO CATÁLOGO + TABELA DO <span className="font-extrabold underline decoration-2 underline-offset-2">BRUTO</span>
                    </span>
                </button>

                <WhatsAppQualificationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmAndRedirect}
                    source={pendingSource}
                />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-accent-gold">
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-8 h-8"
                >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
}
