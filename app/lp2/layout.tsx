import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sophia Brutos | Experiência editorial",
    alternates: {
        canonical: "/",
    },
    robots: {
        index: false,
        follow: false,
    },
};

export default function LP2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return children;
}
