/**
 * Perguntas frequentes da home.
 *
 * Fonte única: alimenta o acordeão visível e o JSON-LD `FAQPage`. Manter os dois
 * lados idênticos é requisito do Google — resposta estruturada divergente do que
 * está na página é motivo de perder o rich snippet.
 *
 * As respostas também aparecem citadas em buscas com IA (AI Overviews, ChatGPT,
 * Perplexity), então valem ser diretas e completas em si mesmas.
 */

export type PerguntaFrequente = {
    question: string;
    answer: string;
};

export const FAQ: readonly PerguntaFrequente[] = [
    {
        question: "Precisa ter CNPJ para comprar?",
        answer:
            "Não! Atendemos tanto CPF quanto CNPJ. O importante é o pedido mínimo para atacado.",
    },
    {
        question: "Qual o pedido mínimo?",
        answer:
            "O mínimo é de 5 peças de cada modelo. Você pode variar modelos e quantidades como quiser.",
    },
    {
        question: "Vocês indicam onde dar o banho?",
        answer:
            "Sim! Temos parceiros de confiança em Limeira para indicar, caso você ainda não tenha sua galvanoplastia.",
    },
    {
        question: "Como funciona o envio?",
        answer:
            "Enviamos para todo o Brasil via Correios ou Transportadora. O frete é calculado no fechamento do pedido. Frete para Limeira ou entrega no seu banho é grátis.",
    },
    {
        question: "As peças têm garantia?",
        answer:
            "Garantimos a qualidade do bruto (defeitos de fabricação). A garantia do banho será dada por você ou sua galvanoplastia.",
    },
] as const;

export function faqEstruturada() {
    return {
        "@type": "FAQPage",
        mainEntity: FAQ.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
    };
}
