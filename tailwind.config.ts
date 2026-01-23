import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "bg-primary": "#FDF2F4",
                "bg-secondary": "#FBE8EB",
                "text-dark": "#1a1a1a",
                "text-medium": "#4a4a4a",
                "accent-gold": "#C9A86C",
                "accent-rose": "#D4A5A5",
                white: "#ffffff",
            },
            backgroundImage: {
                "gradient-gold": "linear-gradient(135deg, #C9A86C 0%, #A6864C 100%)",
            },
            fontFamily: {
                sans: ["var(--font-montserrat)", "sans-serif"],
                serif: ["var(--font-cormorant)", "serif"],
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(30px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulse: {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.4)" },
                    "50%": { boxShadow: "0 0 0 15px rgba(37, 211, 102, 0)" },
                },
                bounce: {
                    "0%, 100%": { transform: "translateX(-50%) translateY(0)" },
                    "50%": { transform: "translateX(-50%) translateY(10px)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                shake: {
                    "0%, 100%": { transform: "translateX(0)" },
                    "25%": { transform: "translateX(-5px)" },
                    "75%": { transform: "translateX(5px)" },
                }
            },
            animation: {
                fadeInUp: "fadeInUp 1s ease-out",
                pulse: "pulse 2s infinite",
                bounce: "bounce 2s infinite",
                fadeIn: "fadeIn 0.2s ease-out",
                slideUp: "slideUp 0.3s ease-out",
                shake: "shake 0.3s ease-in-out",
            },
        },
    },
    plugins: [],
};
export default config;
