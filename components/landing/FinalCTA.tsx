
"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useUTMTracking } from "@/hooks/use-utm-tracking";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";

export default function FinalCTA() {
    const { trackClick } = useUTMTracking();
    const { isModalOpen, pendingSource, openQualificationModal, closeModal, confirmAndRedirect } = useWhatsAppQualification();

    return (
        <section className="relative py-32 px-5 bg-[#111] text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/craftsman_bg.jpg"
                    alt="Background"
                    fill
                    className="object-cover grayscale brightness-[0.3]"
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto">
                <span className="block font-sans text-sm tracking-[0.3em] uppercase text-white/60 mb-3">
                    Direto da Capital da Semijoia
                </span>
                <h2 className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-[1.1]">
                    <span style={{
                        background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Ouro em<br />Estado <span className="inline-block bg-gradient-to-r from-accent-gold/40 to-accent-gold/30 px-3 py-1 rounded-lg font-extrabold border-2 border-accent-gold/60 shadow-xl text-white">BRUTO</span>.
                    </span>
                </h2>

                <div className="w-[60px] h-[1px] bg-accent-gold mb-8 mx-auto" />

                <p className="text-xl md:text-2xl text-white/80 mb-10 font-light leading-relaxed">
                    Leve sua marca para o Próximo Nível.<br />
                    Receba nosso catálogo completo e comece a lucrar mais.
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {[
                        "Pedido Mínimo 15 Peças",
                        "Reposição Garantida",
                        "Indicação de Banho",
                        "Atacado CPF/CNPJ"
                    ].map((badge, i) => (
                        <span key={i} className="px-5 py-2 rounded-full border border-accent-gold bg-white/10 text-white text-sm md:text-base backdrop-blur-sm">
                            ✓ {badge}
                        </span>
                    ))}
                </div>

                <button
                    onClick={() => openQualificationModal("Botão Final (Rodapé)")}
                    className="inline-flex items-center gap-3 bg-gradient-gold text-white py-4 px-10 rounded-full font-semibold text-base tracking-wider uppercase transition-all duration-300 shadow-[0_10px_40px_rgba(201,168,108,0.3)] hover:-translate-y-1 hover:scale-105 hover:shadow-[0_15px_50px_rgba(201,168,108,0.4)] cursor-pointer"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    ACIONAR CONSULTOR NO WHATSAPP
                </button>

                <WhatsAppQualificationModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onConfirm={confirmAndRedirect}
                    source={pendingSource}
                />
            </div>
        </section>
    );
}
