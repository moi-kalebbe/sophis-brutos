
import Image from "next/image";

export default function DifferenceSection() {
    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12 text-text-dark">
                    <span className="inline-block bg-gradient-to-r from-accent-gold/30 to-accent-gold/20 px-3 py-1 rounded-lg font-extrabold text-accent-gold border-2 border-accent-gold/50">BRUTO</span> vs Folheado: onde seu lucro nasce
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                    {/* Card Folheado */}
                    <div className="p-8 md:p-10 rounded-3xl text-center transition-transform hover:-translate-y-2 bg-[#f5f5f5] border border-[#e0e0e0]">
                        <div className="relative w-full h-[200px] mb-6 rounded-xl overflow-hidden shadow-sm">
                            <Image
                                src="/assets/img/85c3824ddddba2b292de52147565a36d.webp"
                                alt="Semijoia folheada"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-text-dark">
                            Revenda de Folheado
                        </h3>
                        <p className="text-text-medium text-base leading-relaxed">
                            Você compra pronto e briga por preço.<br />
                            <strong>Margem apertada.</strong><br />
                            Concorrentes vendem a mesma peça.
                        </p>
                    </div>

                    {/* Card Bruto */}
                    <div className="p-8 md:p-10 rounded-3xl text-center transition-transform hover:-translate-y-2 bg-gradient-to-br from-bg-secondary to-bg-primary border-2 border-accent-gold relative shadow-lg">
                        <div className="relative w-full h-[200px] mb-6 rounded-xl overflow-hidden shadow-sm border border-white/50">
                            <Image
                                src="/assets/img/conjunto-flor-zirconias.jpg"
                                alt="Semijoia no bruto"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        <h3 className="font-serif text-3xl mb-4 text-text-dark">
                            Produção no <span className="inline-block bg-gradient-to-r from-accent-gold/30 to-accent-gold/20 px-2 py-0.5 rounded font-bold text-accent-gold border border-accent-gold/40">BRUTO</span>
                        </h3>
                        <p className="text-text-medium text-base leading-relaxed">
                            Você cria sua marca com acabamento exclusivo.<br />
                            <strong>Lucro até 3x maior.</strong><br />
                            Reposição garantida direto da fábrica.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
