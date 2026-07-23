
const benefits = [
    {
        svgPath: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
        title: "Margem até 3x maior",
        description: "Paga menos na peça base, vende pelo mesmo preço do mercado. O lucro fica no seu bolso."
    },
    {
        svgPath: <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
        title: "Sua Coleção, Sua Regra",
        description: "Dê o acabamento que quiser: Ródio, Ouro 18k, Prata. Você define o padrão da sua marca."
    },
    {
        svgPath: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
        title: "Reposição Garantida",
        description: "Somos indústria. O modelo que vendeu bem hoje estará disponível para reposição amanhã."
    },
    {
        svgPath: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
        title: "Indústria em Limeira",
        description: "Latão de alta fusão e micro zircônia. Peças leves e resistentes, direto da capital da semijoia."
    }
];

export default function BenefitsSection() {
    return (
        <section className="py-20 px-5 bg-bg-secondary">
            <div className="max-w-6xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12 text-text-dark">
                    Por que comprar no <span className="inline-block bg-gradient-to-r from-accent-gold/30 to-accent-gold/20 px-2 py-0.5 rounded font-bold text-accent-gold border border-accent-gold/40">BRUTO</span>?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefits.map((benefit, i) => (
                        <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                            <div className="w-12 h-12 bg-gradient-gold rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                                    {benefit.svgPath}
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl md:text-2xl mb-2 text-text-dark font-medium">
                                    {benefit.title}
                                </h4>
                                <p className="text-text-medium text-sm md:text-base leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
