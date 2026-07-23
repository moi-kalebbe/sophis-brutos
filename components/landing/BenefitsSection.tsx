
import { Factory, Palette, RefreshCw, TrendingUp } from "lucide-react";

const benefits = [
    {
        icon: TrendingUp,
        title: "Margem até 3x maior",
        description: "Paga menos na peça base, vende pelo mesmo preço do mercado. O lucro fica no seu bolso."
    },
    {
        icon: Palette,
        title: "Sua Coleção, Sua Regra",
        description: "Dê o acabamento que quiser: Ródio, Ouro 18k, Prata. Você define o padrão da sua marca."
    },
    {
        icon: RefreshCw,
        title: "Reposição Garantida",
        description: "Somos indústria. O modelo que vendeu bem hoje estará disponível para reposição amanhã."
    },
    {
        icon: Factory,
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
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <div key={benefit.title} className="flex gap-5 rounded-3xl bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:gap-6 md:p-8">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#a9554a]/20 bg-[#f4ddd7] text-[#91493f] shadow-[0_8px_24px_rgba(145,73,63,0.10)]">
                                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                                </div>
                                <div>
                                    <h4 className="mb-2 font-serif text-xl font-medium text-text-dark md:text-2xl">
                                        {benefit.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-text-medium md:text-base">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
