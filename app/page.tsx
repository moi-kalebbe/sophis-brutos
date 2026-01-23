
import { Suspense } from "react";
import Hero from "@/components/landing/Hero";
import DifferenceSection from "@/components/landing/DifferenceSection";
import IdealSection from "@/components/landing/IdealSection";
import ProductsSection from "@/components/landing/ProductsSection";
import BenefitsSection from "@/components/landing/BenefitsSection";
import VideoSection from "@/components/landing/VideoSection";
import FactorySection from "@/components/landing/FactorySection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Suspense fallback={null}>
                <Hero />
            </Suspense>
            <DifferenceSection />
            <IdealSection />
            <ProductsSection />
            <BenefitsSection />
            <VideoSection />
            <FactorySection />
            <TestimonialsSection />
            <FAQSection />
            <Suspense fallback={null}>
                <FinalCTA />
            </Suspense>
            <Footer />
        </main>
    );
}
