
"use client";

import { Quote } from "lucide-react";

export default function TestimonialsSection() {
    return (
        <section className="py-20 px-5 bg-bg-secondary">
            <div className="max-w-6xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12 text-text-dark">
                    O que dizem nossos parceiros
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Testimonial 1 */}
                    <div className="relative bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                        <div className="absolute top-8 right-8 text-gray-300/30 group-hover:text-gray-400/40 transition-colors duration-300">
                            <Quote className="w-8 h-8" />
                        </div>
                        <p className="italic text-text-gray-600 mb-8 relative z-10 text-base md:text-lg leading-relaxed font-serif">
                            “Depois que conheci a Sophia, passei a comprar no bruto e escolher meu próprio banho. Ganhei mais controle sobre a coleção e minha margem dobrou.”
                        </p>
                        <div className="w-12 h-[2px] bg-accent-gold mb-4" />
                        <div className="flex flex-col">
                            <span className="font-bold text-text-dark text-base">Maria S.</span>
                            <span className="text-sm text-text-medium uppercase tracking-wider text-xs">Lojista em SP</span>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="relative bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                        <div className="absolute top-8 right-8 text-gray-300/30 group-hover:text-gray-400/40 transition-colors duration-300">
                            <Quote className="w-8 h-8" />
                        </div>
                        <p className="italic text-text-gray-600 mb-8 relative z-10 text-base md:text-lg leading-relaxed font-serif">
                            “A principal diferença pra mim é a reposição. Quando uma peça vende bem, eu ligo e eles têm no estoque ou fabricam rápido. Não perco venda.”
                        </p>
                        <div className="w-12 h-[2px] bg-accent-gold mb-4" />
                        <div className="flex flex-col">
                            <span className="font-bold text-text-dark text-base">Roberto A.</span>
                            <span className="text-sm text-text-medium uppercase tracking-wider text-xs">Atacadista</span>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="relative bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
                        <div className="absolute top-8 right-8 text-gray-300/30 group-hover:text-gray-400/40 transition-colors duration-300">
                            <Quote className="w-8 h-8" />
                        </div>
                        <p className="italic text-text-gray-600 mb-8 relative z-10 text-base md:text-lg leading-relaxed font-serif">
                            “As peças são leves e o acabamento do latão é impecável. Meu banhista sempre elogia a qualidade da fundição. Recomendo demais.”
                        </p>
                        <div className="w-12 h-[2px] bg-accent-gold mb-4" />
                        <div className="flex flex-col">
                            <span className="font-bold text-text-dark text-base">Carla M.</span>
                            <span className="text-sm text-text-medium uppercase tracking-wider text-xs">Marca Própria</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
