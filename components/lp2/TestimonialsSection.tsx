"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Depois que conheci a Sophia, passei a comprar no bruto e escolher meu próprio banho. Ganhei mais controle sobre a coleção e minha margem dobrou.",
        name: "Maria S.",
        role: "Lojista em SP",
    },
    {
        quote: "A principal diferença para mim é a reposição. Quando uma peça vende bem, eles têm no estoque ou fabricam rápido. Não perco venda.",
        name: "Roberto A.",
        role: "Atacadista",
    },
    {
        quote: "As peças são leves e o acabamento do latão é impecável. Minha galvanoplastia sempre elogia a qualidade da fundição.",
        name: "Carla M.",
        role: "Marca própria",
    },
];

export default function TestimonialsSection() {
    const [active, setActive] = useState(0);
    const testimonial = testimonials[active];

    const move = (direction: number) => {
        setActive((current) => (current + direction + testimonials.length) % testimonials.length);
    };

    return (
        <section className="bg-[var(--sb-blush-deep)] px-5 py-28 md:py-40">
            <div className="sb-shell grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:items-end">
                <div data-reveal>
                    <p className="sb-kicker mb-6">Parcerias que permanecem</p>
                    <h2 className="sb-title max-w-xl">Quem compra no bruto, ganha escolha.</h2>
                    <div className="mt-10 flex gap-3">
                        <button
                            type="button"
                            onClick={() => move(-1)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sb-cocoa)] text-[var(--sb-cocoa)] transition hover:bg-[var(--sb-cocoa)] hover:text-white"
                            aria-label="Depoimento anterior"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => move(1)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--sb-cocoa)] text-[var(--sb-cocoa)] transition hover:bg-[var(--sb-cocoa)] hover:text-white"
                            aria-label="Próximo depoimento"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <figure data-reveal className="relative border-l border-[var(--sb-cocoa)]/20 pl-8 md:pl-14">
                    <Quote className="mb-8 h-9 w-9 text-[var(--sb-terracotta)]" strokeWidth={1.4} />
                    <blockquote className="max-w-4xl font-serif text-3xl font-medium leading-[1.14] text-[var(--sb-cocoa)] md:text-5xl">
                        “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-10 flex items-center gap-4">
                        <span className="h-px w-10 bg-[var(--sb-terracotta)]" />
                        <span>
                            <strong className="block text-sm uppercase tracking-[0.12em]">{testimonial.name}</strong>
                            <span className="mt-1 block text-sm text-[var(--sb-ink-soft)]">{testimonial.role}</span>
                        </span>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
}
