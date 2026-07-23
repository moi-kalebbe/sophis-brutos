"use client";

import { useRef, useState } from "react";

interface EditorialVideoPlayerProps {
    src: string;
    poster: string;
    ariaLabel: string;
    badge: string;
    className?: string;
}

export default function EditorialVideoPlayer({
    src,
    poster,
    ariaLabel,
    badge,
    className = "",
}: EditorialVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasStarted, setHasStarted] = useState(false);

    const playVideo = async () => {
        setHasStarted(true);
        await videoRef.current?.play();
    };

    const resetVideo = () => {
        setHasStarted(false);
        videoRef.current?.load();
    };

    return (
        <div
            className={`group relative aspect-[9/16] overflow-hidden rounded-[1.65rem] ${className}`}
        >
            <video
                ref={videoRef}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
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
                    className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(to_top,rgba(45,25,31,0.36),transparent_46%)] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    aria-label={`Reproduzir ${ariaLabel.toLowerCase()}`}
                >
                    <span className="absolute left-5 top-5 rounded-full border border-white/40 bg-[#493038]/55 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                        {badge}
                    </span>
                    <span className="flex translate-y-8 flex-col items-center md:translate-y-10">
                        <span className="relative flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/65 bg-white/88 text-[#8f5967] shadow-[0_16px_44px_rgba(49,24,31,0.30)] backdrop-blur-md transition duration-300 group-hover:scale-105 group-hover:bg-white active:scale-95 md:h-[78px] md:w-[78px]">
                            <span
                                aria-hidden="true"
                                className="absolute inset-[-9px] rounded-full border border-white/28"
                            />
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="ml-1 h-8 w-8"
                                aria-hidden="true"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </span>
                    </span>
                </button>
            )}
        </div>
    );
}
