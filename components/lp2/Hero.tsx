"use client";

import EditorialVideoPlayer from "@/components/ui/EditorialVideoPlayer";
import WhatsAppQualificationModal from "@/components/ui/WhatsAppQualificationModal";
import { useWhatsAppQualification } from "@/hooks/use-whatsapp-qualification";

const WhatsappIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

export default function Hero() {
    const {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect,
    } = useWhatsAppQualification();

    return (
        <section id="inicio" className="sb-grain relative overflow-hidden bg-[var(--sb-blush)] pb-20 pt-32 md:pb-28 md:pt-40">
            <div aria-hidden="true" className="absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-[var(--sb-clay)]/15 blur-3xl" />
            <div className="sb-shell grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.6fr)] lg:grid-rows-[auto_auto] lg:gap-x-20 lg:gap-y-8">
                <div data-reveal className="relative z-10 lg:col-start-1 lg:row-start-1 lg:self-end">
                    <p className="sb-kicker mb-6">Indústria de semijoias em Limeira</p>
                    <h1 className="sb-display max-w-4xl">
                        Semijoias no <span className="italic text-[var(--sb-terracotta)]">bruto</span>, direto da indústria.
                    </h1>
                </div>

                <div data-media-reveal className="relative mx-auto w-full max-w-[350px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[390px]">
                    <div aria-hidden="true" className="absolute -inset-4 rounded-[2.4rem] border border-white/50" />
                    <EditorialVideoPlayer
                        src="/videos/envio-brasil.mp4"
                        poster="/videos/envio-brasil-poster.webp"
                        ariaLabel="Vídeo sobre os envios da Sophia Brutos para todo o Brasil"
                        badge="Envio para todo o Brasil"
                        className="bg-[var(--sb-cocoa)] shadow-[0_36px_80px_rgba(80,43,39,0.26)] ring-1 ring-white/70"
                    />
                    <p className="mt-5 text-center text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--sb-burgundy)]">
                        Aperte o play e conheça a Sophia
                    </p>
                </div>

                <div data-reveal className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-start">
                    <p className="sb-copy max-w-[52ch]">
                        Produção própria, reposição garantida e peças atemporais para aumentar a margem da sua loja.
                    </p>

                    <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-[var(--sb-line)] py-5">
                        {[
                            ["5", "mínimo de cada"],
                            ["Brasil", "envio nacional"],
                            ["CPF/CNPJ", "atacado"],
                        ].map(([value, label]) => (
                            <div key={value} className="border-r border-[var(--sb-line)] px-3 first:pl-0 last:border-0 last:pr-0">
                                <strong className="block whitespace-nowrap font-serif text-lg text-[var(--sb-cocoa)] sm:text-xl md:text-2xl">{value}</strong>
                                <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--sb-ink-soft)] md:text-xs">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center">
                        <button
                            type="button"
                            onClick={() => openQualificationModal("Botão Principal (Topo)")}
                            className="sb-primary"
                        >
                            <WhatsappIcon />
                            VER CATÁLOGO
                        </button>
                        <a href="#industria" className="sb-link text-center sm:text-left">Conhecer a indústria</a>
                    </div>
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
