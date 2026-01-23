"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";


function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Check for unauthorized error from middleware
        if (searchParams.get('error') === 'unauthorized') {
            setError('Acesso negado. Apenas o email autorizado pode acessar este painel.');
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 md:p-12 animate-fadeInUp">
            <div className="flex flex-col items-center mb-8 text-center">
                {/* Logo placeholder */}
                <div className="mb-4">
                    <span className="font-serif text-3xl font-bold tracking-widest text-text-dark">SOPHIA</span>
                    <span className="block font-sans text-xs tracking-[0.4em] text-text-medium mt-1">BRUTOS</span>
                </div>
                <div className="w-[40px] h-[1px] bg-accent-gold mb-4" />
                <h1 className="font-serif text-2xl text-text-dark">Painel Administrativo</h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-text-medium mb-1 pl-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-secondary/30 border border-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 transition-all text-text-dark"
                        placeholder="admin@sophiabrutos.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-text-medium mb-1 pl-1">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-secondary/30 border border-bg-secondary rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-gold/50 transition-all text-text-dark"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full text-white py-3 rounded-xl font-semibold shadow-[0_5px_20px_rgba(201,168,108,0.3)] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(201,168,108,0.4)] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(to right, #C9A86C, #D4AF37, #C9A86C)' }}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Entrando...
                        </>
                    ) : (
                        "Entrar no Painel"
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-text-medium opacity-60">
                Acesso restrito para equipe Sophia Brutos
            </p>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-5">
            <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-accent-gold" />}>
                <LoginContent />
            </Suspense>
        </div>
    );
}
