"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

const faqItems = [
    {
        question: "Precisa ter CNPJ para comprar?",
        answer: "Não. Atendemos tanto CPF quanto CNPJ. O importante é respeitar o pedido mínimo para atacado.",
    },
    {
        question: "Qual é o pedido mínimo?",
        answer: "O mínimo é de 5 peças de cada modelo. Você pode variar os modelos e as quantidades no seu pedido.",
    },
    {
        question: "Vocês indicam onde dar o banho?",
        answer: "Sim. Temos parceiros de confiança em Limeira para indicar, caso você ainda não tenha sua galvanoplastia.",
    },
    {
        question: "Como funciona o envio?",
        answer: "Enviamos para todo o Brasil via Correios ou transportadora. O frete é calculado no fechamento do pedido.",
    },
    {
        question: "As peças têm garantia?",
        answer: "Garantimos a qualidade do bruto e eventuais defeitos de fabricação. A garantia do banho é responsabilidade da galvanoplastia escolhida.",
    },
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="duvidas" className="bg-[var(--sb-ivory)] px-5 py-28 md:py-40">
            <div className="sb-shell grid gap-14 lg:grid-cols-[0.72fr_1.28fr]">
                <div data-reveal>
                    <p className="sb-kicker mb-6">Antes do primeiro pedido</p>
                    <h2 className="sb-title max-w-lg">Dúvidas frequentes, respostas diretas.</h2>
                </div>

                <div data-reveal className="border-t border-[var(--sb-line)]">
                    {faqItems.map((item, index) => {
                        const open = activeIndex === index;
                        return (
                            <div key={item.question} className="border-b border-[var(--sb-line)]">
                                <button
                                    type="button"
                                    onClick={() => setActiveIndex(open ? null : index)}
                                    className="flex w-full items-center justify-between gap-6 py-7 text-left"
                                    aria-expanded={open}
                                >
                                    <span className="font-serif text-2xl font-semibold text-[var(--sb-cocoa)] md:text-3xl">{item.question}</span>
                                    <Plus className={`h-5 w-5 shrink-0 text-[var(--sb-terracotta)] transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
                                </button>
                                <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="max-w-2xl pb-8 pr-10 text-base leading-relaxed text-[var(--sb-ink-soft)]">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
