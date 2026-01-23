
import Image from "next/image";
import { Play } from "lucide-react";

export default function VideoSection() {
    return (
        <section className="py-20 px-5 bg-bg-secondary text-center">
            <div className="max-w-4xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3 text-text-dark">
                    Veja nossa produção: você compra da fonte
                </h2>
                <p className="text-text-medium opacity-90 mb-8 max-w-2xl mx-auto">
                    Transparência total: acompanhe o processo de fabricação em Limeira/SP
                </p>

                <div className="relative w-full max-w-[800px] mx-auto aspect-video bg-black rounded-3xl overflow-hidden flex items-center justify-center group cursor-pointer shadow-lg">
                    <Image
                        src="/assets/img/54fcbf9bffe22d87e1b67b4a19123462.webp"
                        alt="Capa do Vídeo"
                        fill
                        className="object-cover opacity-60 transition-opacity group-hover:opacity-70"
                    />
                    <div className="absolute z-10 w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white transition-transform group-hover:scale-110">
                        <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className="w-[30px] h-[30px] text-white ml-2">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
