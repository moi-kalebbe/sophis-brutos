const ideal = [
    "Já tem loja ou revenda e quer aumentar a margem.",
    "Quer criar uma coleção com sua própria assinatura.",
    "Busca fornecedor com reposição constante.",
    "Tem parceiro de galvanoplastia ou quer indicação.",
];

const notIdeal = [
    "Busca apenas 1 ou 2 peças para uso pessoal.",
    "Quer a peça pronta, já banhada, imediatamente.",
    "Não tem interesse em gerenciar o processo de banho.",
];

export default function IdealSection() {
    return (
        <section className="bg-[var(--sb-ivory)] px-5 py-28 md:py-40">
            <div className="sb-shell">
                <div data-reveal className="grid gap-8 border-b border-[var(--sb-line)] pb-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                    <p className="sb-kicker">Uma escolha de negócio</p>
                    <h2 className="sb-title max-w-4xl">
                        O bruto é para quem quer mais controle sobre a própria coleção.
                    </h2>
                </div>

                <div className="grid lg:grid-cols-2">
                    <article data-reveal className="border-b border-[var(--sb-line)] py-12 lg:border-b-0 lg:border-r lg:pr-14">
                        <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sb-terracotta)]">Faz sentido para você se</p>
                        <ul className="space-y-6">
                            {ideal.map((item, index) => (
                                <li key={item} className="grid grid-cols-[2rem_1fr] gap-4 text-lg leading-relaxed text-[var(--sb-cocoa)]">
                                    <span className="font-serif text-2xl italic text-[var(--sb-clay)]">{String(index + 1).padStart(2, "0")}</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article data-reveal className="py-12 lg:pl-14">
                        <p className="mb-8 text-xs font-bold uppercase tracking-[0.18em] text-[var(--sb-ink-soft)]">Talvez não seja o momento se</p>
                        <ul className="space-y-6">
                            {notIdeal.map((item) => (
                                <li key={item} className="border-l border-[var(--sb-blush-deep)] pl-6 text-lg leading-relaxed text-[var(--sb-ink-soft)]">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}
