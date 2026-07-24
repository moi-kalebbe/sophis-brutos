
"use client";

import { useState } from 'react';
import { FAQ as faqItems } from '@/lib/seo/faq';

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-12 text-text-dark">
                    Dúvidas Frequentes
                </h2>

                <div className="space-y-4">
                    {faqItems.map((item, index) => (
                        <div key={index} className="border-b border-bg-secondary last:border-b-0 pb-4">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left py-4 font-sans font-medium text-lg text-text-dark cursor-pointer flex justify-between items-center group"
                            >
                                <span className="group-hover:text-accent-gold transition-colors">{item.question}</span>
                                <span className={`text-xs text-text-medium transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-[max-height,padding] duration-300 ease-in-out ${activeIndex === index ? 'max-h-[300px] mb-4' : 'max-h-0'
                                    }`}
                            >
                                <p className="text-text-medium leading-relaxed font-light text-base pr-8">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
