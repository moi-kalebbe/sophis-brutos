"use client";

import { useState } from "react";
import { useUTMTracking } from "./use-utm-tracking";

export function useWhatsAppQualification() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pendingSource, setPendingSource] = useState("");
    const { trackClick } = useUTMTracking();

    const openQualificationModal = (source: string) => {
        setPendingSource(source);
        setIsModalOpen(true);

        // Track: Modal aberto
        trackClick(`WhatsApp Modal Aberto - ${source}`);
    };

    const closeModal = () => {
        setIsModalOpen(false);

        // Track: Modal fechado sem confirmar
        trackClick(`WhatsApp Modal Cancelado - ${pendingSource}`);

        setPendingSource("");
    };

    const confirmAndRedirect = () => {
        // Track: Usuário concordou
        trackClick(`WhatsApp Qualificado - ${pendingSource}`);

        // Mensagem personalizada para WhatsApp
        const message = encodeURIComponent(
            `Olá! Vim do site Sophia Brutos e quero falar sobre peças NO BRUTO. 

Entendo que as semijoias não vêm com banho aplicado e preciso escolher o acabamento.

Origem: ${pendingSource}`
        );

        // Redirecionar para WhatsApp
        const whatsappUrl = `https://wa.link/1nxmx6?text=${message}`;
        window.open(whatsappUrl, '_blank');

        // Track: Redirecionado com sucesso
        trackClick(`WhatsApp Redirecionado - ${pendingSource}`);

        setIsModalOpen(false);
        setPendingSource("");
    };

    return {
        isModalOpen,
        pendingSource,
        openQualificationModal,
        closeModal,
        confirmAndRedirect
    };
}
