import Image from "next/image";
import EditorialVideoPlayer from "@/components/ui/EditorialVideoPlayer";

const pillars = [
    {
        src: "/assets/img/factory-producao-sophia.webp",
        alt: "Equipe Sophia Brutos na produção própria",
        eyebrow: "Nós produzimos",
        title: "Fábrica própria, do molde à separação.",
        description: "Produção em larga escala, controle de qualidade e consistência para manter sua coleção sempre abastecida.",
    },
    {
        src: "/assets/img/factory-atacado-sophia.webp",
        alt: "Peças no bruto e pedidos de atacado Sophia Brutos",
        eyebrow: "Vendemos no atacado",
        title: "Peças no bruto para o seu negócio crescer.",
        description: "Modelos atemporais, variedade para compor seu mix e reposição para o que mais vende.",
    },
    {
        src: "/assets/img/factory-envio-sophia.webp",
        alt: "Pedido Sophia Brutos preparado para envio",
        eyebrow: "Entregamos em todo o país",
        title: "Da nossa indústria para todo o Brasil.",
        description: "Pedidos separados com cuidado e enviados com segurança e agilidade para todas as regiões.",
    },
];

export default function FactorySection() {
    return (
        <section id="industria" className="bg-[var(--sb-ivory)] px-5 py-28 md:py-40">
            <div className="sb-shell">
                <div data-reveal className="mx-auto max-w-5xl text-center">
                    <p className="sb-kicker mb-6">Indústria própria em Limeira</p>
                    <h2 className="sb-title">Do bruto ao seu sucesso.</h2>
                    <p className="sb-copy mx-auto mt-6 max-w-2xl">
                        Qualidade, confiança e parceria para transformar peças em oportunidades para o seu negócio.
                    </p>
                </div>

                <div data-factory-grid className="mt-16 grid gap-4 lg:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <article
                            key={pillar.src}
                            data-factory-card
                            className={`group ${index === 1 ? "lg:translate-y-10" : ""}`}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--sb-blush)]">
                                <Image
                                    src={pillar.src}
                                    alt={pillar.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 33vw"
                                />
                                <span className="absolute left-5 top-5 bg-[var(--sb-ivory)]/90 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-[var(--sb-cocoa)] backdrop-blur-sm">
                                    {pillar.eyebrow}
                                </span>
                            </div>
                            <div className="border-x border-b border-[var(--sb-line)] p-7">
                                <h3 className="font-serif text-3xl font-semibold leading-none text-[var(--sb-cocoa)]">{pillar.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-[var(--sb-ink-soft)]">{pillar.description}</p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-28 grid items-center gap-14 border-t border-[var(--sb-line)] pt-16 lg:grid-cols-[1fr_380px] lg:gap-24">
                    <div data-reveal>
                        <p className="sb-kicker mb-5">Por dentro da Sophia</p>
                        <h3 className="sb-title max-w-3xl">Estrutura para produzir e repor com consistência.</h3>
                        <p className="sb-copy mt-7 max-w-[58ch]">
                            Conheça nossa Loja 2 e veja de perto a estrutura, os processos e o cuidado que sustentam cada pedido.
                        </p>
                        <div className="mt-10 grid gap-8 border-y border-[var(--sb-line)] py-8 sm:grid-cols-2">
                            <div>
                                <strong className="block font-serif text-4xl text-[var(--sb-terracotta)]">Limeira/SP</strong>
                                <span className="mt-2 block text-sm text-[var(--sb-ink-soft)]">Capital nacional da semijoia</span>
                            </div>
                            <div>
                                <strong className="block font-serif text-4xl text-[var(--sb-terracotta)]">Duas lojas</strong>
                                <span className="mt-2 block text-sm text-[var(--sb-ink-soft)]">Atendimento próximo e produção própria</span>
                            </div>
                        </div>
                    </div>

                    <div data-media-reveal className="mx-auto w-full max-w-[380px]">
                        <EditorialVideoPlayer
                            src="/videos/loja-2.mp4"
                            poster="/videos/loja-2-poster.webp"
                            ariaLabel="Vídeo mostrando a Loja 2 e a estrutura da Sophia Brutos"
                            badge="Tour pela Loja 2"
                            className="bg-[var(--sb-cocoa)] shadow-[0_30px_70px_rgba(52,33,30,0.22)] ring-1 ring-[var(--sb-line)]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
