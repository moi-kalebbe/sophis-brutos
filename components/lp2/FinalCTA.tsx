"use client";

import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";

export default function FinalCTA() {
    const {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect,
    } = useWhatsAppQualification();

    return (
        <section className="relative overflow-hidden bg-[var(--sb-terracotta)] px-5 py-28 text-[var(--sb-ivory)] md:py-40">
            <div aria-hidden="true" className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full border border-white/15" />
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-[24rem] w-[24rem] rounded-full border border-white/15" />
            <div data-reveal className="sb-shell relative z-10 text-center">
                <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-white/70">Direto da capital da semijoia</p>
                <h2 className="mx-auto max-w-5xl font-serif text-5xl font-semibold leading-[0.92] tracking-[-0.04em] md:text-8xl">
                    Sua próxima coleção começa no bruto.
                </h2>
                <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                    Receba o catálogo completo, conheça as condições do atacado e monte seu pedido com nossa equipe.
                </p>
                <button
                    type="button"
                    onClick={() => openQualificationModal("Botão Final (Rodapé)")}
                    className="mt-10 inline-flex min-h-16 items-center justify-center rounded-full bg-[var(--sb-cocoa)] px-8 text-xs font-bold uppercase tracking-[0.14em] text-[var(--sb-ivory)] shadow-[0_20px_50px_rgba(52,33,30,0.24)] transition hover:-translate-y-1 hover:bg-[var(--sb-ivory)] hover:text-[var(--sb-cocoa)] md:px-12 md:text-sm"
                >
                    Quero catálogo + tabela do bruto
                </button>
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
