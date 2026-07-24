"use client";

import { useRef, useState } from "react";

interface EditorialVideoPlayerProps {
    src: string;
    poster: string;
    ariaLabel: string;
    badge: string;
    className?: string;
    /**
     * Marque como `true` no player que aparece acima da dobra.
     *
     * O poster de um `<video>` não é descoberto pelo pré-scanner do navegador,
     * então ele entra tarde na fila e vira o gargalo da LCP. O preload declarado
     * aqui é içado para o `<head>` pelo React e resolve isso.
     */
    priority?: boolean;
}

export default function EditorialVideoPlayer({
    src,
    poster,
    ariaLabel,
    badge,
    className = "",
    priority = false,
}: EditorialVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    const playVideo = async () => {
        setHasStarted(true);
        try {
            await videoRef.current?.play();
        } catch {
            setHasStarted(false);
        }
    };

    const resetVideo = () => {
        setHasStarted(false);
        videoRef.current?.load();
    };

    return (
        <div className={`group relative aspect-[9/16] overflow-hidden rounded-[1.8rem] ${className}`}>
            {priority && (
                <link rel="preload" as="image" href={poster} fetchPriority="high" />
            )}
            <video
                ref={videoRef}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                controls={hasStarted}
                playsInline
                preload="metadata"
                poster={poster}
                onEnded={resetVideo}
                aria-label={ariaLabel}
            >
                <source src={src} type="video/mp4" />
                Seu navegador não oferece suporte à reprodução de vídeo.
            </video>

            {!hasStarted && (
                <button
                    type="button"
                    onClick={playVideo}
                    className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(to_top,rgba(52,33,30,0.32),transparent_52%)] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    aria-label={`Reproduzir ${ariaLabel.toLowerCase()}`}
                >
                    <span className="absolute left-5 top-5 max-w-[calc(100%-2.5rem)] border border-white/35 bg-[var(--sb-cocoa)]/65 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                        {badge}
                    </span>
                    <span className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-white/70 bg-[var(--sb-ivory)] text-[var(--sb-terracotta)] shadow-[0_16px_44px_rgba(52,33,30,0.28)] transition duration-300 group-hover:scale-105 active:scale-95">
                        <span aria-hidden="true" className="absolute -inset-3 rounded-full border border-white/30" />
                        <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </span>
                    <span className="absolute bottom-6 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white">Assistir vídeo</span>
                </button>
            )}
        </div>
    );
}
