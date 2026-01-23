
import Image from "next/image";

const products = [
    { src: "/assets/img/72f424d5cfd6e4c620d3d90aeb5c10f7.webp", alt: "Anéis Semijoia" },
    { src: "/assets/img/756a8aa793e9d3c7046f36325c05cf90.webp", alt: "Colares" },
    { src: "/assets/img/1f497626dfd37115e52fc9b50e2fcf03.webp", alt: "Brincos" },
    { src: "/assets/img/7d282ad66fe4181aae20f122779cc74b.webp", alt: "Correntes" },
    { src: "/assets/img/ad006ab724c390e3d5e77af00592b508.webp", alt: "Pingentes" },
    { src: "/assets/img/a30f04518d5142bd25e343abb711a57c.webp", alt: "Conjunto" },
];

export default function ProductsSection() {
    return (
        <section className="py-20 px-5 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="w-[60px] h-[1px] bg-accent-gold mb-5 mx-auto" />
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-center mb-3 text-text-dark">
                    Peças vendáveis o ano todo (atemporais)
                </h2>
                <p className="text-center text-text-medium mb-12">Mix pronto para lojista — do básico ao destaque</p>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
                    {products.map((product, index) => (
                        <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-bg-secondary to-bg-primary shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="bg-white/10 backdrop-blur-md text-white px-6 py-2 rounded-full font-medium tracking-wide uppercase text-sm border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    Ver Detalhes
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a href="https://wa.link/1nxmx6" target="_blank" className="inline-block text-accent-gold font-semibold border-b border-accent-gold pb-1 hover:opacity-80 transition-opacity">
                        Ver catálogo completo →
                    </a>
                </div>
            </div>
        </section>
    );
}
