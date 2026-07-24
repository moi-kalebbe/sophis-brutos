"use client";

import Image from "next/image";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";
import EditorialVideoPlayer from "@/components/ui/EditorialVideoPlayer";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";

export default function Hero() {
    const {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect,
    } = useWhatsAppQualification();

    return (
        <section className="relative isolate min-h-[100dvh] overflow-hidden bg-[#efd5dc] px-5 pb-16 pt-7 md:px-8 md:pb-20 md:pt-9">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_16%,rgba(255,255,255,0.82),transparent_32%),radial-gradient(circle_at_88%_72%,rgba(174,101,121,0.24),transparent_38%),linear-gradient(120deg,rgba(255,255,255,0.08),transparent_46%)]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 opacity-[0.18] [background-image:radial-gradient(rgba(105,58,70,0.28)_0.55px,transparent_0.55px)] [background-size:5px_5px]"
            />
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 h-px bg-[#8f5363]/30"
            />

            <div className="mx-auto grid max-w-7xl items-center gap-y-9 lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-0">
                <div className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:self-end lg:text-left">
                    <div className="relative mb-5 h-[62px] w-[172px] md:mb-7 md:h-[88px] md:w-[240px]">
                        <Image
                            src="/assets/logo.png"
                            alt="Sophia Brutos"
                            fill
                            sizes="(max-width: 767px) 172px, 240px"
                            className="object-contain object-left"
                            priority
                        />
                        <span
                            aria-hidden="true"
                            className="absolute right-0 top-0 font-sans text-[0.62rem] font-semibold text-[#3f282d] md:text-xs"
                        >
                            ®
                        </span>
                    </div>

                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-[#875764] md:mb-4 md:text-sm">
                        Indústria de semijoias em Limeira
                    </p>

                    <h1 className="max-w-3xl text-balance font-serif text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.025em] text-[#3f282d] sm:text-6xl lg:text-[4.45rem]">
                        Semijoias no{" "}
                        <span className="inline-block rounded-lg border border-[#b98757]/40 bg-[#fff9f7]/78 px-3 py-1 text-[#a77742] shadow-[0_8px_24px_rgba(111,61,74,0.10)]">
                            BRUTO
                        </span>
                        <span className="mt-2 block text-[#6b3e49]">
                            direto da indústria
                        </span>
                    </h1>
                </div>

                <div className="relative mx-auto w-full max-w-[335px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[390px] lg:justify-self-end">
                    <div
                        aria-hidden="true"
                        className="absolute -inset-x-3 -inset-y-4 -z-10 rounded-[2.2rem] bg-white/18 blur-[1px]"
                    />
                    <EditorialVideoPlayer
                        priority
                        src="/videos/envio-brasil.mp4"
                        poster="/videos/envio-brasil-poster.webp"
                        ariaLabel="Vídeo sobre os envios da Sophia Brutos para todo o Brasil"
                        badge="Vídeo • 32 segundos"
                        className="bg-[#3d292e] shadow-[0_32px_72px_rgba(91,48,60,0.28)] ring-1 ring-white/65"
                    />

                    <div className="mt-4 flex items-center justify-center gap-3 text-center text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#7e5360]">
                        <span>Produção própria</span>
                        <span className="h-1 w-1 rounded-full bg-[#aa7a52]" />
                        <span>Envio Brasil</span>
                    </div>
                </div>

                <div className="flex flex-col items-center text-center lg:col-start-1 lg:row-start-2 lg:items-start lg:self-start lg:text-left">
                    <p className="max-w-[52ch] text-pretty text-base font-medium leading-relaxed text-[#684b52] md:text-lg">
                        Produção própria, reposição garantida e peças atemporais para
                        aumentar a margem da sua loja.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-[#4c3339] lg:justify-start">
                        <span>✓ Mínimo 5 de cada</span>
                        <span>✓ Envio para todo o Brasil</span>
                        <span>✓ CPF/CNPJ</span>
                    </div>

                    <button
                        onClick={() => openQualificationModal("Botão Principal (Topo)")}
                        className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#3f282d] bg-[#3f282d] px-7 py-4 text-sm font-bold uppercase tracking-[0.1em] text-[#fffaf6] shadow-[0_16px_38px_rgba(63,40,45,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#6b3e49] hover:bg-[#6b3e49] hover:shadow-[0_22px_48px_rgba(63,40,45,0.34)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b3e49] focus-visible:ring-offset-4 focus-visible:ring-offset-[#efd5dc] active:translate-y-0 sm:w-auto md:px-10 md:py-5 md:text-base"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        VER CATÁLOGO
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
