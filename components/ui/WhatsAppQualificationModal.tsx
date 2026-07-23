"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
    source,
}: WhatsAppQualificationModalProps) {
    if (!isOpen) return null;

    return <ModalContent onClose={onClose} onConfirm={onConfirm} source={source} />;
}

function ModalContent({
    onClose,
    onConfirm,
    source,
}: Omit<WhatsAppQualificationModalProps, "isOpen">) {
    const [confirmed, setConfirmed] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onClose]);

    const continueToWhatsApp = () => {
        if (!confirmed) {
            setShowError(true);
            return;
        }
        onConfirm();
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <button
                type="button"
                className="absolute inset-0 cursor-default bg-[var(--sb-cocoa)]/76 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Fechar modal"
            />

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="qualification-title"
                className="relative max-h-[92vh] w-full max-w-xl overflow-auto bg-[var(--sb-ivory)] p-6 shadow-[0_35px_100px_rgba(25,12,10,0.35)] md:p-10"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--sb-line)] text-[var(--sb-ink-soft)] transition hover:bg-[var(--sb-blush)]"
                    aria-label="Fechar"
                >
                    <X className="h-5 w-5" />
                </button>

                <p className="sb-kicker mb-4 pr-12">Antes de continuar</p>
                <h3 id="qualification-title" className="max-w-md font-serif text-3xl font-semibold leading-none text-[var(--sb-cocoa)] md:text-4xl">
                    Você será direcionado ao WhatsApp.
                </h3>

                <div className="my-7 border-y border-[var(--sb-line)] py-6">
                    <p className="text-base leading-relaxed text-[var(--sb-cocoa)]">
                        <strong>Nossas peças são vendidas no bruto.</strong>
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--sb-ink-soft)] md:text-base">
                        Isso significa que as semijoias não vêm com banho aplicado. Você escolhe o acabamento, ródio, ouro 18k ou prata, e envia as peças para a galvânica de sua confiança. Se preferir, indicamos uma para você.
                    </p>
                </div>

                <label className={`flex cursor-pointer items-start gap-4 border p-4 transition ${showError && !confirmed ? "border-[var(--sb-terracotta)] bg-[var(--sb-blush)]" : "border-[var(--sb-line)]"}`}>
                    <input
                        type="checkbox"
                        checked={confirmed}
                        onChange={(event) => {
                            setConfirmed(event.target.checked);
                            setShowError(false);
                        }}
                        className="mt-1 h-5 w-5 accent-[var(--sb-terracotta)]"
                    />
                    <span className="text-sm leading-relaxed text-[var(--sb-ink-soft)]">
                        Eu entendo que as peças são <strong>no bruto, sem banho</strong>, e que precisarei aplicar o acabamento desejado.
                    </span>
                </label>
                {showError && !confirmed && (
                    <p className="mt-2 text-sm text-[var(--sb-terracotta)]">Confirme a informação acima para continuar.</p>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="min-h-12 rounded-full border border-[var(--sb-cocoa)] px-6 text-sm font-semibold text-[var(--sb-cocoa)] transition hover:bg-[var(--sb-blush)]"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={continueToWhatsApp}
                        className="min-h-12 rounded-full bg-[var(--sb-cocoa)] px-6 text-sm font-bold text-[var(--sb-ivory)] transition hover:bg-[var(--sb-terracotta)]"
                    >
                        Concordo e continuar
                    </button>
                </div>

                <p className="mt-5 text-center text-[0.68rem] text-[var(--sb-ink-soft)]/65">Origem: {source}</p>
            </div>
        </div>
    );
}
