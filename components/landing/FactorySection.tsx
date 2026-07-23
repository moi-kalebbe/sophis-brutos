
import Image from "next/image";
import EditorialVideoPlayer from "@/components/ui/EditorialVideoPlayer";

export default function FactorySection() {
    return (
        <section className="relative py-20 px-5 bg-[#1a1a1a] text-white overflow-hidden">
            {/* Background with low opacity */}
            <div className="absolute inset-0 z-0 opacity-10">
                <Image
                    src="/assets/img/26eda64624b41d402700dac03eb4d53f.webp"
                    alt="Factory Background"
                    fill
                    className="object-cover opacity-20"
                    sizes="100vw"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-3">
                    Indústria própria em Limeira: padrão, reposição e confiança
                </h2>
                <p className="text-center opacity-80 mb-12 max-w-2xl mx-auto">
                    Segurança de comprar direto da capital da semijoia
                </p>

                <div className="mb-20 grid grid-cols-1 gap-12 text-center md:grid-cols-3">
                    <div className="px-4">
                        <h4 className="font-serif text-2xl md:text-3xl mb-4 font-semibold">
                            <span style={{
                                background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                100% Produção Própria
                            </span>
                        </h4>
                        <p className="opacity-80 text-base leading-relaxed">Controle total da qualidade, do molde ao acabamento final.</p>
                    </div>
                    <div className="px-4">
                        <h4 className="font-serif text-2xl md:text-3xl mb-4 font-semibold">
                            <span style={{
                                background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Matéria-Prima Premium
                            </span>
                        </h4>
                        <p className="opacity-80 text-base leading-relaxed">Latão de alta fusão que garante leveza e resistência.</p>
                    </div>
                    <div className="px-4">
                        <h4 className="font-serif text-2xl md:text-3xl mb-4 font-semibold">
                            <span style={{
                                background: 'linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                Envio Todo Brasil
                            </span>
                        </h4>
                        <p className="opacity-80 text-base leading-relaxed">Logística ágil para lojistas de todas as regiões.</p>
                    </div>
                </div>

                <div className="mb-20 grid items-center gap-12 lg:grid-cols-[1fr_390px] lg:gap-20">
                    <div className="max-w-2xl">
                        <span className="mb-4 block text-sm font-semibold uppercase tracking-[0.24em] text-[#C9A86C]">
                            Por dentro da Sophia
                        </span>
                        <h3 className="text-balance font-serif text-3xl font-semibold leading-tight md:text-5xl">
                            Estrutura própria para produzir e repor com consistência.
                        </h3>
                        <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-white/70">
                            Conheça nossa Loja 2 e veja de perto a estrutura, os processos e
                            o cuidado que sustentam cada pedido enviado aos nossos clientes.
                        </p>
                        <div className="mt-8 grid gap-5 border-t border-white/15 pt-8 sm:grid-cols-2">
                            <div>
                                <strong className="block font-serif text-3xl text-[#C9A86C]">
                                    Limeira/SP
                                </strong>
                                <span className="mt-1 block text-sm text-white/60">
                                    Capital nacional da semijoia
                                </span>
                            </div>
                            <div>
                                <strong className="block font-serif text-3xl text-[#C9A86C]">
                                    Duas lojas
                                </strong>
                                <span className="mt-1 block text-sm text-white/60">
                                    Atendimento e produção próximos
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mx-auto w-full max-w-[390px]">
                        <EditorialVideoPlayer
                            src="/videos/loja-2.mp4"
                            poster="/videos/loja-2-poster.webp"
                            ariaLabel="Vídeo mostrando a Loja 2 e a estrutura da Sophia Brutos"
                            badge="Tour • 59 segundos"
                            className="bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)] ring-1 ring-[#C9A86C]/40"
                        />
                        <p className="mt-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                            Tour pela Loja 2
                        </p>
                    </div>
                </div>

                <div className="mx-auto mb-10 max-w-3xl text-center">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#C9A86C]">
                        Indústria, atacado e entrega
                    </p>
                    <h3 className="text-balance font-serif text-3xl font-semibold leading-tight text-white md:text-5xl">
                        Do bruto ao seu sucesso.
                    </h3>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        {
                            src: "/assets/img/factory-producao-sophia.webp",
                            alt: "Equipe da Sophia Brutos na linha de produção própria",
                            title: "Nós produzimos",
                            description:
                                "Fábrica própria com produção em larga escala e alto padrão de qualidade.",
                        },
                        {
                            src: "/assets/img/factory-atacado-sophia.webp",
                            alt: "Peças no bruto e pedidos de atacado da Sophia Brutos",
                            title: "Vendemos no atacado",
                            description:
                                "Peças no bruto para você criar sua coleção e aumentar sua margem.",
                        },
                        {
                            src: "/assets/img/factory-envio-sophia.webp",
                            alt: "Caixa da Sophia Brutos preparada para envio",
                            title: "Enviamos para todo o Brasil",
                            description:
                                "Pedidos preparados com segurança e agilidade para todo o país.",
                        },
                    ].map(({ src, alt, title, description }) => (
                        <article key={src} className="group">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-accent-gold/30 bg-white/10">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                            <h4 className="mt-5 font-serif text-2xl font-semibold text-[#C9A86C]">
                                {title}
                            </h4>
                            <p className="mt-2 max-w-[36ch] text-sm leading-relaxed text-white/65">
                                {description}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
