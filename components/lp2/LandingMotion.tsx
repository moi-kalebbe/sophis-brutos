"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingMotion({ children }: { children: React.ReactNode }) {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let context: gsap.MatchMedia | null = null;
        const timer = window.setTimeout(() => {
            const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            if (reduceMotion) return;

            context = gsap.matchMedia();

            context.add("(min-width: 768px)", () => {
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
                    gsap.fromTo(
                        element,
                        { autoAlpha: 0, y: 36 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.9,
                            ease: "power3.out",
                            scrollTrigger: { trigger: element, start: "top 86%", once: true },
                        },
                    );
                });

                gsap.utils.toArray<HTMLElement>("[data-media-reveal]").forEach((element) => {
                    gsap.fromTo(
                        element,
                        { scale: 0.92, autoAlpha: 0.45 },
                        {
                            scale: 1,
                            autoAlpha: 1,
                            ease: "sine.out",
                            scrollTrigger: {
                                trigger: element,
                                start: "top 92%",
                                end: "center 58%",
                                scrub: 0.7,
                            },
                        },
                    );
                });

                const factoryCards = gsap.utils.toArray<HTMLElement>("[data-factory-card]");
                if (factoryCards.length) {
                    gsap.set(factoryCards, { y: 70, autoAlpha: 0 });
                    gsap.to(factoryCards, {
                        y: 0,
                        autoAlpha: 1,
                        stagger: 0.14,
                        duration: 0.9,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: "[data-factory-grid]",
                            start: "top 76%",
                            once: true,
                        },
                    });
                }
            });

            context.add("(max-width: 767px)", () => {
                gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
                    gsap.fromTo(
                        element,
                        { autoAlpha: 0, y: 20 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.58,
                            ease: "power2.out",
                            scrollTrigger: { trigger: element, start: "top 92%", once: true },
                        },
                    );
                });
            });

        }, 250);

        return () => {
            window.clearTimeout(timer);
            context?.revert();
        };
    }, []);

    return <div ref={root}>{children}</div>;
}
