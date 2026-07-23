import Image from "next/image";
import { MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[var(--sb-cocoa)] px-5 py-14 text-[var(--sb-ivory)]">
            <div className="sb-shell grid gap-12 border-b border-white/12 pb-12 md:grid-cols-[1fr_1fr_0.8fr]">
                <div>
                    <div className="flex items-center gap-2 text-[var(--sb-champagne)]">
                        <MapPin className="h-5 w-5" />
                        <span className="font-serif text-2xl">Limeira/SP</span>
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                        Capital das semijoias. Lojas no Shopping Boulevard e na Avenida Costa e Silva.
                    </p>
                </div>

                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--sb-champagne)]">Atendimento</h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/60">
                        Segunda a quinta, das 8h às 18h<br />
                        Sexta, das 8h às 17h
                    </p>
                </div>

                <div className="md:text-right">
                    <div className="relative h-16 w-44 md:ml-auto">
                        <Image
                            src="/assets/logo.png"
                            alt="Sophia Brutos"
                            fill
                            sizes="176px"
                            className="object-contain object-left brightness-0 invert md:object-right"
                        />
                    </div>
                </div>
            </div>
            <div className="sb-shell flex flex-col gap-3 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
                <p>© 2026 Sophia Brutos. Todos os direitos reservados.</p>
                <p>Semijoias no bruto direto da indústria.</p>
            </div>
        </footer>
    );
}
