
import Image from "next/image";

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center mb-20">
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        "/assets/img/9f062afa9305c0ec55414c402ea9bbb7.webp",
                        "/assets/img/0f7de0dc68705c25c498fbd8357494e8.webp",
                        "/assets/img/4ca2b13d3b83ca66339307c2f1df8b4d.webp"
                    ].map((src, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-accent-gold/30 bg-white/10 group">
                            <Image
                                src={src}
                                alt={`Produção Sophia Brutos ${i + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
