
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-12 px-5 border-t border-white/10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">

                {/* Column 1: Contact/Location */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-2 text-xl font-serif text-accent-gold">
                        <MapPin className="w-5 h-5" />
                        <span>Limeira/SP</span>
                    </div>
                    <p className="text-sm opacity-80 font-light">
                        Capital das Semijoias<br />
                        Duas lojas físicas:<br />
                        Shopping Boulevard e Costa e Silva
                    </p>
                </div>

                {/* Column 2: Hours */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <h4 className="text-lg font-serif text-accent-gold">Horário de Atendimento</h4>
                    <div className="space-y-1 text-sm opacity-80 font-light">
                        <p>Segunda a Quinta: 8h às 18h</p>
                        <p>Sexta-feira: 8h às 17h</p>
                    </div>
                </div>

                {/* Column 3: Social/Brand */}
                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="relative w-[180px] h-[60px]">
                        <Image
                            src="/assets/logo.png"
                            alt="Sophia Brutos Link"
                            fill
                            className="object-contain object-right"
                        />
                    </div>
                    <p className="text-xs opacity-50 text-center md:text-right mt-auto">
                        © 2026 Sophia Brutos.<br />Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
