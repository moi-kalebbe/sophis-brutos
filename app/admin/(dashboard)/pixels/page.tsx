
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Save, AlertCircle, ToggleLeft, ToggleRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface SettingsForm {
    facebook_pixel_id: string;
    facebook_active: boolean;
    google_analytics_id: string;
    analytics_active: boolean;
    google_ads_id: string;
    ads_active: boolean;
    custom_scripts: string;
}

export default function PixelsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const { register, handleSubmit, setValue, watch } = useForm<SettingsForm>();
    const activeStates = watch(["facebook_active", "analytics_active", "ads_active"]);

    useEffect(() => {
        async function loadSettings() {
            setLoading(true);
            const supabase = createClient();
            const { data } = await supabase.from("settings").select("*").single();

            if (data) {
                setValue("facebook_pixel_id", data.facebook_pixel_id || "");
                setValue("facebook_active", data.facebook_active);
                setValue("google_analytics_id", data.google_analytics_id || "");
                setValue("analytics_active", data.analytics_active);
                setValue("google_ads_id", data.google_ads_id || "");
                setValue("ads_active", data.ads_active);
                setValue("custom_scripts", data.custom_scripts || "");
            }
            setLoading(false);
        }
        loadSettings();
    }, [setValue]);

    const onSubmit = async (data: SettingsForm) => {
        console.log("Submitting form settings:", data);
        setSaving(true);
        setMessage(null);

        try {
            const supabase = createClient();
            // Just updated the single row
            const { error } = await supabase.from("settings").update(data).neq('id', '00000000-0000-0000-0000-000000000000'); // Hacky where clause to update all (there is only one row) or select ID first

            // Better approach: update based on knowing there is only one row or fetching ID
            // Since we know there is one row 
            // We can fetch ID first or simply update where ID is not null (unsafe without ID).
            // Actually, best is to get ID in loadSettings.
            // As quick fix, we'll fetch the single ID and update.
            const { data: current } = await supabase.from("settings").select("id").single();
            if (current) {
                await supabase.from("settings").update(data).eq("id", current.id);
            }

            setMessage({ type: 'success', text: "Configurações salvas com sucesso! As alterações já estão valendo." });
        } catch (e) {
            setMessage({ type: 'error', text: "Erro ao salvar configurações." });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-10 text-center">Carregando configurações...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeInUp">
            <div>
                <h1 className="font-serif text-3xl font-bold text-text-dark mb-2">Gerenciar Pixels e Scripts</h1>
                <div className="w-[60px] h-[3px] bg-accent-gold rounded-full" />
                <p className="mt-4 text-text-medium">Configure aqui os códigos de rastreamento da sua Landing Page.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    <AlertCircle className="w-5 h-5" />
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Facebook */}
                <PixelCard
                    title="Facebook Pixel"
                    icon="/images/facebook-icon.png" // placeholder
                    isActive={activeStates[0]}
                    toggleName="facebook_active"
                    inputName="facebook_pixel_id"
                    register={register}
                    setValue={setValue}
                    placeholder="Ex: 123456789012345"
                    helperText="Cole apenas o ID do pixel numérico."
                />

                {/* Google Analytics */}
                <PixelCard
                    title="Google Analytics 4"
                    icon="/images/ga-icon.png"
                    isActive={activeStates[1]}
                    toggleName="analytics_active"
                    inputName="google_analytics_id"
                    register={register}
                    setValue={setValue}
                    placeholder="Ex: G-XXXXXXXXXX"
                    helperText="Cole o ID da métrica (Começa com G-)."
                />

                {/* Google Ads */}
                <PixelCard
                    title="Google Ads"
                    icon="/images/ads-icon.png"
                    isActive={activeStates[2]}
                    toggleName="ads_active"
                    inputName="google_ads_id"
                    register={register}
                    setValue={setValue}
                    placeholder="Ex: AW-123456789"
                    helperText="Cole o ID de conversão."
                />

                {/* Custom Scripts */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary">
                    <h3 className="font-semibold text-lg text-text-dark mb-4">Scripts Customizados (Head/Body)</h3>
                    <textarea
                        {...register("custom_scripts")}
                        className="w-full h-40 p-4 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold"
                        placeholder="<script>...</script>"
                    />
                    <p className="text-xs text-text-medium mt-2 opacity-70">
                        Cuidado: Scripts mal formatados podem quebrar o site. Use apenas se souber o que está fazendo.
                    </p>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={saving}
                        style={{ background: "linear-gradient(to right, #C9A86C, #D4AF37, #C9A86C)" }}
                        className="text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wide shadow-lg hover:-translate-y-1 transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save className="w-5 h-5" />}
                        Salvar Todas Configurações
                    </button>
                </div>
            </form>
        </div>
    );
}

function PixelCard({ title, isActive, toggleName, inputName, register, setValue, placeholder, helperText }: any) {
    const handleToggle = () => setValue(toggleName, !isActive);

    return (
        <div className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${isActive ? 'border-accent-gold/50 shadow-md' : 'border-bg-secondary'}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-text-dark">{title}</h3>
                </div>
                <button type="button" onClick={handleToggle} className={`transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                    {isActive ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                </button>
            </div>

            <div className={`${!isActive && 'opacity-50 pointer-events-none grayscale'}`}>
                <input
                    {...register(inputName)}
                    type="text"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-gold text-text-dark font-mono"
                    placeholder={placeholder}
                />
                <p className="text-xs text-text-medium mt-2 pl-1">{helperText}</p>
            </div>
        </div>
    );
}
