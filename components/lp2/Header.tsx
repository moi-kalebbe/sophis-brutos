"use client";

import Image from "next/image";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";

export default function Header() {
    const {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect,
    } = useWhatsAppQualification();

    return (
        <>
            <header className="absolute inset-x-0 top-0 z-40">
                <div className="sb-shell flex h-24 items-center justify-between border-b border-[var(--sb-line)]">
                    <a href="#inicio" className="relative h-12 w-32 sm:w-36" aria-label="Ir para o início">
                        <Image
                            src="/assets/logo.png"
                            alt="Sophia Brutos"
                            fill
                            sizes="144px"
                            className="object-contain object-left"
                            priority
                        />
                        <span
                            aria-hidden="true"
                            className="absolute right-0 top-0 text-[0.58rem] font-semibold text-[var(--sb-cocoa)] sm:text-[0.65rem]"
                        >
                            ®
                        </span>
                    </a>

                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Navegação principal">
                        <a className="sb-link" href="#colecao">Coleção</a>
                        <a className="sb-link" href="#diferenciais">Diferenciais</a>
                        <a className="sb-link" href="#industria">Indústria</a>
                        <a className="sb-link" href="#duvidas">Dúvidas</a>
                    </nav>

                    <button
                        type="button"
                        onClick={() => openQualificationModal("Navegação (Topo)")}
                        className="rounded-full border border-[var(--sb-cocoa)] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-[var(--sb-cocoa)] transition hover:bg-[var(--sb-cocoa)] hover:text-[var(--sb-ivory)] md:px-5 md:text-xs"
                    >
                        <span className="hidden sm:inline">Falar com consultor</span>
                        <span className="sm:hidden">WhatsApp</span>
                    </button>
                </div>
            </header>

            <WhatsAppQualificationModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={confirmAndRedirect}
                source={pendingSource}
            />
        </>
    );
}
