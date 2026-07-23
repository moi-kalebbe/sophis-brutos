import { Suspense } from "react";
import LandingMotion from "@/components/lp2/LandingMotion";
import Header from "@/components/lp2/Header";
import Hero from "@/components/lp2/Hero";
import IdealSection from "@/components/lp2/IdealSection";
import ProductsSection from "@/components/lp2/ProductsSection";
import BenefitsSection from "@/components/lp2/BenefitsSection";
import FactorySection from "@/components/lp2/FactorySection";
import TestimonialsSection from "@/components/lp2/TestimonialsSection";
import FAQSection from "@/components/lp2/FAQSection";
import FinalCTA from "@/components/lp2/FinalCTA";
import Footer from "@/components/lp2/Footer";

export default function Home() {
    return (
        <LandingMotion>
            <main className="w-full max-w-full overflow-x-hidden bg-[var(--sb-ivory)]">
                <Suspense fallback={null}>
                    <Header />
                    <Hero />
                </Suspense>
                <IdealSection />
                <Suspense fallback={null}>
                    <ProductsSection />
                </Suspense>
                <BenefitsSection />
                <FactorySection />
                <TestimonialsSection />
                <FAQSection />
                <Suspense fallback={null}>
                    <FinalCTA />
                </Suspense>
                <Footer />
            </main>
        </LandingMotion>
    );
}
