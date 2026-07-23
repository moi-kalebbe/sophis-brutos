import { Suspense } from "react";
import LandingMotion from "@/components/landing/LandingMotion";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import IdealSection from "@/components/landing/IdealSection";
import ProductsSection from "@/components/landing/ProductsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import FactorySection from "@/components/landing/FactorySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

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
