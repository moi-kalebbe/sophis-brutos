
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { MousePointerClick, ToggleRight, Clock, ChevronLeft, ChevronRight, Calendar, Download } from "lucide-react";
import { format } from "date-fns";
import AnalyticsStats from "@/components/admin/AnalyticsStats";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalClicks: 0,
        activePixels: 0,
        lastAccess: "N/A" as string | null
    });
    const [analyticsData, setAnalyticsData] = useState<any[]>([]);
    const [tableData, setTableData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 10;

    useEffect(() => {
        fetchDashboardData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    async function fetchDashboardData() {
        setLoading(true);
        const supabase = createClient();

        // 1. Stats Cards & Charts Data (Heavy query, limit to last 30 days for charts)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Fetch stats for cards (Total count separate to be accurate)
        const { count: totalClicks } = await supabase.from("click_tracking").select("*", { count: "exact" });

        // Fetch data for charts (Last 30 days)
        const { data: recentClicks } = await supabase.from("click_tracking")
            .select("*")
            .gte("created_at", thirtyDaysAgo.toISOString())
            .order("created_at", { ascending: false });

        if (recentClicks) {
            setAnalyticsData(recentClicks);
        }

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
        const lastClick = recentClicks?.[0]; // optimization since we already have sorted data

        // 4. Table Data (Paginated)
        const { data: tableClicks } = await supabase.from("click_tracking")
            .select("*")
            .order("created_at", { ascending: false })
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

        if (tableClicks) {
            setTableData(tableClicks);
        }

        setStats({
            totalClicks: totalClicks || 0,
            activePixels: activeCount,
            lastAccess: lastClick ? new Date(lastClick.created_at).toLocaleString('pt-BR') : "Nenhum"
        });
        setLoading(false);
    }

    const exportCSV = () => {
        const headers = ["Data", "Source", "Medium", "Local", "Device", "UA"];
        // Exporting from tableData (current page) for simplicity, or could export analyticsData (last 30 days)
        const rows = analyticsData.map(c => [
            c.created_at,
            c.utm_source || "-",
            c.utm_medium || "-",
            c.button_location || "-",
            c.device_type,
            c.user_agent
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "cliques_sophia_brutos.csv");
        document.body.appendChild(link);
        link.click();
    };

    if (loading && page === 0 && analyticsData.length === 0) return <div className="p-10 text-center animate-pulse">Carregando dashboard...</div>;

    return (
        <div className="space-y-8 animate-fadeInUp pb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-text-dark">Visão Geral</h1>
                    <p className="text-text-medium text-sm mt-1">Acompanhe o desempenho do seu negócio em tempo real.</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 bg-white border border-bg-secondary px-4 py-2 rounded-lg text-text-medium hover:bg-bg-primary transition-colors text-sm font-medium shadow-sm"
                >
                    <Download className="w-4 h-4" /> Exportar Relatório
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Total de Cliques"
                    value={stats.totalClicks}
                    icon={MousePointerClick}
                    color="bg-blue-50 text-blue-600"
                />
                <StatsCard
                    title="Pixels Ativos"
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

            {/* Analytics Section */}
            <div className="border-t border-bg-secondary pt-8">
                <AnalyticsStats data={analyticsData} />
            </div>

            {/* Recent Clicks Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-bg-secondary overflow-hidden mt-8">
                <div className="p-6 border-b border-bg-secondary flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-serif text-xl font-bold text-text-dark">Últimos Cliques</h2>
                    <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-600">Tempo Real</span>
                </div>
                <div className="overflow-x-auto hidden md:block">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-bg-primary/30 text-text-medium font-semibold border-b border-bg-secondary">
                            <tr>
                                <th className="p-4 whitespace-nowrap">Data/Hora</th>
                                <th className="p-4">UTM Source</th>
                                <th className="p-4">UTM Medium</th>
                                <th className="p-4">Local</th>
                                <th className="p-4">Dispositivo</th>
                                <th className="p-4">Page URL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-bg-secondary">
                            {tableData.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-text-medium">Nenhum clique registrado.</td></tr>
                            ) : (
                                tableData.map((click) => (
                                    <tr key={click.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-text-dark flex items-center gap-2 whitespace-nowrap">
                                            <Calendar className="w-3 h-3 opacity-50" />
                                            {format(new Date(click.created_at), "dd/MM HH:mm")}
                                        </td>
                                        <td className="p-4">
                                            {click.utm_source ? (
                                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold uppercase whitespace-nowrap">{click.utm_source}</span>
                                            ) : (
                                                <span className="opacity-30">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-text-medium">{click.utm_medium || "-"}</td>
                                        <td className="p-4 text-text-medium font-medium text-accent-gold whitespace-nowrap">{click.button_location || "-"}</td>
                                        <td className="p-4">
                                            {click.device_type === 'mobile' ? (
                                                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 w-fit">📱 Mobile</span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 w-fit">💻 Desktop</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-text-medium opacity-70 max-w-[200px]">
                                            <div className="truncate" title={click.page_url}>
                                                {click.page_url?.replace('http://localhost:3000', '')?.replace('https://sophiabrutos.com.br', '') || '/'}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-bg-secondary">
                    {tableData.length === 0 ? (
                        <div className="p-8 text-center text-text-medium">Nenhum clique registrado.</div>
                    ) : (
                        tableData.map((click) => (
                            <div key={click.id} className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 text-text-dark font-medium text-sm">
                                        <Calendar className="w-3 h-3 text-text-medium" />
                                        {format(new Date(click.created_at), "dd/MM HH:mm")}
                                    </div>
                                    {click.device_type === 'mobile' ? (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">📱 Mobile</span>
                                    ) : (
                                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">💻 Desktop</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <span className="text-xs text-text-medium block">Local</span>
                                        <span className="font-medium text-accent-gold">{click.button_location || "-"}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-text-medium block">Source</span>
                                        {click.utm_source ? (
                                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-bold uppercase">{click.utm_source}</span>
                                        ) : (
                                            <span className="text-gray-400">-</span>
                                        )}
                                    </div>
                                    {click.utm_medium && (
                                        <div className="col-span-2">
                                            <span className="text-xs text-text-medium block">Medium</span>
                                            <span className="text-gray-600">{click.utm_medium}</span>
                                        </div>
                                    )}
                                    <div className="col-span-2">
                                        <span className="text-xs text-text-medium block">URL</span>
                                        <div className="truncate text-gray-500 text-xs" title={click.page_url}>
                                            {click.page_url?.replace('http://localhost:3000', '')?.replace('https://sophiabrutos.com.br', '') || '/'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-bg-secondary flex justify-between items-center text-sm text-text-medium bg-gray-50/50">
                    <span>Página {page + 1}</span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 border bg-white rounded hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={tableData.length < PAGE_SIZE}
                            className="p-2 border bg-white rounded hover:bg-gray-50 disabled:opacity-50 transition-all shadow-sm"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, icon: Icon, color, isText = false }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-sm text-text-medium font-medium mb-1">{title}</p>
                <h3 className={`font-bold text-text-dark ${isText ? "text-lg" : "text-3xl"}`}>
                    {value}
                </h3>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
    );
}
