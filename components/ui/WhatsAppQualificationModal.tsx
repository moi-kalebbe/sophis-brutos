"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface WhatsAppQualificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    source: string;
}

export default function WhatsAppQualificationModal({
    isOpen,
    onClose,
    onConfirm,
    source
}: WhatsAppQualificationModalProps) {

    // Prevenir scroll quando modal aberto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fadeIn">
            {/* Backdrop com blur */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 md:p-10 animate-slideUp">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-lg">
                        <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </div>
                </div>

                {/* Título */}
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-center mb-4 text-text-dark">
                    Você será redirecionado ao WhatsApp
                </h3>

                <div className="w-12 h-[2px] bg-accent-gold mb-6 mx-auto" />

                {/* Mensagem de qualificação */}
                <div className="bg-gradient-to-br from-bg-secondary to-bg-primary p-6 rounded-xl mb-6 border-2 border-accent-gold/20">
                    <p className="text-text-medium text-center leading-relaxed mb-4">
                        ⚠️ <strong>Importante:</strong> Nossas peças são vendidas <span className="inline-block bg-gradient-to-r from-accent-gold/30 to-accent-gold/20 px-2 py-0.5 rounded font-bold text-accent-gold">NO BRUTO</span>
                    </p>
                    <p className="text-text-medium text-sm text-center leading-relaxed">
                        Isso significa que as semijoias <strong>não vêm com banho aplicado</strong>.
                        Você escolhe o acabamento (ródio, ouro 18k, prata) e aplica com seu banhista de confiança.
                    </p>
                </div>

                {/* Checkbox de concordância */}
                <div className="flex items-start gap-3 mb-6 p-4 bg-white rounded-lg border border-gray-200">
                    <input
                        type="checkbox"
                        id="understand-checkbox"
                        className="mt-1 w-5 h-5 text-accent-gold border-gray-300 rounded focus:ring-accent-gold"
                    />
                    <label htmlFor="understand-checkbox" className="text-sm text-text-medium cursor-pointer select-none">
                        Eu entendo que as peças são <strong>no bruto (sem banho)</strong> e que precisarei aplicar o acabamento desejado.
                    </label>
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 px-6 rounded-full border-2 border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            const checkbox = document.getElementById('understand-checkbox') as HTMLInputElement;
                            if (checkbox?.checked) {
                                onConfirm();
                            } else {
                                // Shake animation se não marcou
                                checkbox?.parentElement?.classList.add('animate-shake');
                                setTimeout(() => {
                                    checkbox?.parentElement?.classList.remove('animate-shake');
                                }, 500);
                            }
                        }}
                        className="flex-1 py-3 px-6 rounded-full bg-gradient-gold text-white font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                    >
                        Concordo e Continuar
                    </button>
                </div>

                {/* Origem do clique (para debug) */}
                <p className="text-xs text-gray-400 text-center mt-4">
                    Origem: {source}
                </p>
            </div>
        </div>
    );
}
