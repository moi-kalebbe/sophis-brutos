
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MousePointerClick, ToggleRight, Clock } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalClicks: 0,
        activePixels: 0,
        lastAccess: "N/A" as string | null
    });
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            const supabase = createClient();

            // 1. Total Clicks
            const { count: clicksCount } = await supabase.from("click_tracking").select("*", { count: "exact" });

            // 2. Active Pixels
            const { data: settings } = await supabase.from("settings").select("*").single();
            let activeCount = 0;
            if (settings) {
                if (settings.facebook_active) activeCount++;
                if (settings.analytics_active) activeCount++;
                if (settings.ads_active) activeCount++;
                if (settings.custom_scripts && settings.custom_scripts.length > 5) activeCount++;
            }

            // 3. Last Access
            const { data: lastClick } = await supabase.from("click_tracking")
                .select("created_at")
                .order("created_at", { ascending: false })
                .limit(1)
                .single();

            // 4. Chart Data (Last 7 days)
            const today = new Date();
            const last7Days = new Date(today);
            last7Days.setDate(today.getDate() - 7);

            const { data: clicks } = await supabase.from("click_tracking")
                .select("created_at")
                .gte("created_at", last7Days.toISOString());

            const dailyData: Record<string, number> = {};
            clicks?.forEach((click) => {
                const date = new Date(click.created_at).toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit' });
                dailyData[date] = (dailyData[date] || 0) + 1;
            });

            const formattedChartData = Object.keys(dailyData).map(date => ({
                name: date,
                clicks: dailyData[date]
            }));

            setStats({
                totalClicks: clicksCount || 0,
                activePixels: activeCount,
                lastAccess: lastClick ? new Date(lastClick.created_at).toLocaleString('pt-BR') : "Nenhum"
            });
            setChartData(formattedChartData);
            setLoading(false);
        }

        fetchStats();
    }, []);

    if (loading) return <div className="p-10 text-center">Carregando dashboard...</div>;

    return (
        <div className="space-y-8 animate-fadeInUp">
            <h1 className="font-serif text-3xl font-bold text-text-dark">Visão Geral</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total de Cliques WhatsApp"
                    value={stats.totalClicks}
                    icon={MousePointerClick}
                    color="bg-blue-50 text-blue-600"
                />
                <StatsCard
                    title="Pixels/Scripts Ativos"
                    value={stats.activePixels}
                    icon={ToggleRight}
                    color="bg-green-50 text-green-600"
                />
                <StatsCard
                    title="Último Acesso"
                    value={stats.lastAccess || "N/A"}
                    icon={Clock}
                    color="bg-purple-50 text-purple-600"
                    isText
                />
            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-xl font-semibold text-text-dark">Desempenho (Últimos 7 dias)</h3>
                    <div className="text-sm text-text-medium bg-bg-primary px-3 py-1 rounded-full">
                        Cliques diários
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    {chartData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="clicks"
                                    stroke="#C9A86C"
                                    strokeWidth={3}
                                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-text-medium opacity-50">
                            Sem dados suficientes para o gráfico
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color, isText = false }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary flex items-start justify-between">
            <div>
                <p className="text-sm text-text-medium font-medium mb-1">{title}</p>
                <h3 className={`font-bold text-text-dark ${isText ? "text-lg" : "text-3xl"}`}>
                    {value}
                </h3>
            </div>
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
