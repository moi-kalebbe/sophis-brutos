
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Download, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function AnalyticsPage() {
    const [clicks, setClicks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const PAGE_SIZE = 20;

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    async function loadData() {
        setLoading(true);
        const supabase = createClient();

        const { data, error } = await supabase
            .from("click_tracking")
            .select("*")
            .order("created_at", { ascending: false })
            .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

        if (data) setClicks(data);
        setLoading(false);
    }

    const exportCSV = () => {
        // Simple manual CSV export of current view (or fetch all for proper export - opting for current view for MVP simplicity effectively)
        // For full export we would fetch all.
        const headers = ["Data", "Source", "Medium", "Local", "Device", "UA"];
        const rows = clicks.map(c => [
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

    return (
        <div className="space-y-6 animate-fadeInUp">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-text-dark">Rastreamento de Cliques (WhatsApp)</h1>
                    <p className="text-text-medium text-sm mt-1">Monitore quem está clicando no botão de contato.</p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 bg-white border border-bg-secondary px-4 py-2 rounded-lg text-text-medium hover:bg-bg-primary transition-colors text-sm font-medium"
                >
                    <Download className="w-4 h-4" /> Exportar CSV
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-bg-secondary overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-bg-primary/50 text-text-medium font-semibold border-b border-bg-secondary">
                            <tr>
                                <th className="p-4">Data/Hora</th>
                                <th className="p-4">UTM Source</th>
                                <th className="p-4">UTM Medium</th>
                                <th className="p-4">Local</th>
                                <th className="p-4">Dispositivo</th>
                                <th className="p-4">Page URL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-bg-secondary">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center">Carregando dados...</td></tr>
                            ) : clicks.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-text-medium">Nenhum clique registrado.</td></tr>
                            ) : (
                                clicks.map((click) => (
                                    <tr key={click.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-text-dark flex items-center gap-2">
                                            <Calendar className="w-3 h-3 opacity-50" />
                                            {format(new Date(click.created_at), "dd/MM/yyyy HH:mm")}
                                        </td>
                                        <td className="p-4">
                                            {click.utm_source ? (
                                                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold uppercase">{click.utm_source}</span>
                                            ) : (
                                                <span className="opacity-40">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-text-medium">{click.utm_medium || "-"}</td>
                                        <td className="p-4 text-text-medium font-medium text-accent-gold">{click.button_location || "-"}</td>
                                        <td className="p-4">
                                            {click.device_type === 'mobile' ? (
                                                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">📱 Mobile</span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">💻 Desktop</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-text-medium opacity-70">
                                            <div className="w-[150px] truncate" title={click.page_url}>
                                                {click.page_url}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-bg-secondary flex justify-between items-center text-sm text-text-medium">
                    <span>Página {page + 1}</span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 0}
                            onClick={() => setPage(p => p - 1)}
                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setPage(p => p + 1)}
                            disabled={clicks.length < PAGE_SIZE}
                            className="p-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
