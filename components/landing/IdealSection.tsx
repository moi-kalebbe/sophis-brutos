
import { Check, X } from "lucide-react";

export default function IdealSection() {
    return (
        <section className="py-20 px-5 bg-bg-primary">
            <div className="max-w-5xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-10 text-text-dark">
                    O Bruto é para o seu negócio?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {/* Card Yes */}
                    <div className="p-10 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-50/50">
                        <h3 className="font-serif text-2xl md:text-3xl mb-8 text-[#2e7d32] flex items-center gap-3">
                            Ideal para você que:
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Já tem loja ou revenda e quer aumentar a margem.",
                                "Quer criar uma coleção com sua própria assinatura.",
                                "Busca fornecedor com reposição constante.",
                                "Tem parceiro de galvanoplastia (banho) ou quer indicação."
                            ].map((item, i) => (
                                <li key={i} className="relative pl-10 text-text-medium leading-relaxed text-lg">
                                    <span className="absolute left-0 top-1">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Card No */}
                    <div className="p-10 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-red-50/50">
                        <h3 className="font-serif text-2xl md:text-3xl mb-8 text-[#c62828] flex items-center gap-3">
                            Não é para você se:
                        </h3>
                        <ul className="space-y-6">
                            {[
                                "Busca apenas 1 ou 2 peças para uso pessoal.",
                                "Quer a peça pronta (já banhada) imediatamente.",
                                "Não tem interesse em gerenciar o processo de banho."
                            ].map((item, i) => (
                                <li key={i} className="relative pl-10 text-text-medium leading-relaxed text-lg">
                                    <span className="absolute left-0 top-1">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#c62828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
