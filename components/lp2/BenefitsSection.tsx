"use client";

import { useState } from "react";

const benefits = [
    {
        number: "01",
        title: "Margem até 3x maior",
        description: "Paga menos na peça base, vende pelo mesmo preço do mercado. O lucro fica no seu bolso.",
    },
    {
        number: "02",
        title: "Sua coleção, sua regra",
        description: "Escolha entre ródio, ouro 18k ou prata e defina o padrão da sua marca.",
    },
    {
        number: "03",
        title: "Reposição garantida",
        description: "Somos indústria. O modelo que vendeu bem continua disponível para novos pedidos.",
    },
    {
        number: "04",
        title: "Indústria em Limeira",
        description: "Latão de alta fusão e micro zircônia em peças leves, resistentes e bem construídas.",
    },
];

export default function BenefitsSection() {
    const [active, setActive] = useState(0);

    return (
        <section id="diferenciais" className="bg-[var(--sb-blush)] px-5 py-28 md:py-40">
            <div className="sb-shell">
                <div data-reveal className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
                    <div>
                        <p className="sb-kicker mb-5">Por que comprar no bruto</p>
                        <h2 className="sb-title max-w-xl">Mais liberdade para criar. Mais espaço para lucrar.</h2>
                    </div>
                    <p className="sb-copy max-w-[48ch] lg:justify-self-end lg:pt-4">
                        Você escolhe o acabamento, constrói a identidade da coleção e mantém o controle da margem.
                    </p>
                </div>

                <div data-reveal className="mt-16 flex min-h-[430px] flex-col overflow-hidden border-y border-[var(--sb-line)] lg:flex-row">
                    {benefits.map((benefit, index) => {
                        const isActive = active === index;
                        return (
                            <button
                                type="button"
                                key={benefit.number}
                                onMouseEnter={() => setActive(index)}
                                onFocus={() => setActive(index)}
                                onClick={() => setActive(index)}
                                className={`relative flex min-h-28 flex-col justify-between border-b border-[var(--sb-line)] p-7 text-left transition-[flex,background-color] duration-500 last:border-0 lg:min-h-0 lg:border-b-0 lg:border-r ${
                                    isActive ? "bg-[var(--sb-ivory)] lg:flex-[2.2]" : "lg:flex-1"
                                }`}
                                aria-expanded={isActive}
                            >
                                <span className="text-xs font-bold tracking-[0.18em] text-[var(--sb-clay)]">{benefit.number}</span>
                                <div className="mt-8">
                                    <h3 className="font-serif text-3xl font-semibold leading-none text-[var(--sb-cocoa)] lg:text-4xl">{benefit.title}</h3>
                                    <p className={`mt-5 max-w-sm overflow-hidden text-base leading-relaxed text-[var(--sb-ink-soft)] transition-all duration-500 ${
                                        isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0 lg:max-h-40 lg:opacity-0"
                                    }`}>
                                        {benefit.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
