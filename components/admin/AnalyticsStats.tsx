
"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Click {
    id: string;
    created_at: string;
    button_location: string | null;
    device_type: string | null;
    utm_source: string | null;
}

interface AnalyticsStatsProps {
    data: Click[];
}

const COLORS = ['#D4AF37', '#2A2A2A', '#E5E5E5', '#A3A3A3'];

export default function AnalyticsStats({ data }: AnalyticsStatsProps) {
    // 1. Agrupamento por Localização (Button Location)
    const locationData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(click => {
            const loc = click.button_location || "Desconhecido";
            counts[loc] = (counts[loc] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value) // Ordenar decrescente
            .slice(0, 5); // Top 5 para não poluir
    }, [data]);

    // 2. Agrupamento por Dispositivo
    const deviceData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(click => {
            const device = click.device_type === 'mobile' ? 'Mobile' : 'Desktop';
            counts[device] = (counts[device] || 0) + 1;
        });

        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, [data]);

    // 3. Tendência de Cliques (Últimos 7 dias)
    const trendData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = subDays(new Date(), 6 - i);
            return d;
        });

        return last7Days.map(day => {
            const count = data.filter(click => isSameDay(parseISO(click.created_at), day)).length;
            return {
                date: format(day, "dd/MM", { locale: ptBR }),
                count
            };
        });
    }, [data]);

    // 4. Agrupamento por UTM Source
    const sourceData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach(click => {
            const source = click.utm_source ? click.utm_source.toUpperCase() : "DIRETO/DESCONHECIDO";
            counts[source] = (counts[source] || 0) + 1;
        });

        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 5);
    }, [data]);

    return (
        <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-text-dark">Analytics Avançado</h2>

            {/* Row 1: Conversion Points & Devices */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Gráfico de Barras - Top Localizações */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary lg:col-span-2 flex flex-col">
                    <h3 className="font-serif text-lg font-bold text-text-dark mb-1">📍 Pontos de Conversão</h3>
                    <p className="text-sm text-text-medium mb-6">Onde seus clientes mais clicam.</p>
                    <div className="h-[300px] w-full min-h-[300px]">
                        {locationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={locationData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={140}
                                        tick={{ fontSize: 11, fill: '#666' }}
                                        interval={0}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                                        formatter={(value: any) => [`${value} cliques`, 'Quantidade']}
                                    />
                                    <Bar dataKey="value" fill="#D4AF37" radius={[0, 4, 4, 0]} barSize={24} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-text-medium opacity-50 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                Sem dados de cliques
                            </div>
                        )}
                    </div>
                </div>

                {/* Gráfico de Pizza - Dispositivos */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary flex flex-col">
                    <h3 className="font-serif text-lg font-bold text-text-dark mb-1">📱 Dispositivos</h3>
                    <p className="text-sm text-text-medium mb-6">Origem do tráfego.</p>
                    <div className="h-[250px] w-full min-h-[250px] relative">
                        {deviceData.some(d => d.value > 0) ? (
                            <>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={deviceData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {deviceData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#D4AF37' : '#2A2A2A'} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
                                    {deviceData.map((entry, index) => (
                                        <div key={entry.name} className="flex items-center gap-2 text-xs text-text-medium">
                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: index === 0 ? '#D4AF37' : '#2A2A2A' }}></span>
                                            {entry.name} ({entry.value})
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center text-text-medium opacity-50 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                Sem dados de dispositivos
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Row 2: UTM Sources & Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Gráfico de Barras - Fontes de Tráfego (UTM) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary flex flex-col">
                    <h3 className="font-serif text-lg font-bold text-text-dark mb-1">📢 Fontes de Tráfego</h3>
                    <p className="text-sm text-text-medium mb-6">Campanhas (UTM Source)</p>
                    <div className="h-[250px] w-full min-h-[250px]">
                        {sourceData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sourceData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        type="category"
                                        dataKey="name"
                                        width={100}
                                        tick={{ fontSize: 10, fill: '#666' }}
                                        interval={0}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#f9fafb' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                                        formatter={(value: any) => [`${value}`, 'Cliques']}
                                    />
                                    <Bar dataKey="value" fill="#2A2A2A" radius={[0, 4, 4, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-text-medium opacity-50 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                Sem dados de origem
                            </div>
                        )}
                    </div>
                </div>

                {/* Gráfico de Linha - Tendência Temporal (2 cols) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-bg-secondary lg:col-span-2">
                    <h3 className="font-serif text-lg font-bold text-text-dark mb-1">📈 Desempenho Semanal</h3>
                    <p className="text-sm text-text-medium mb-6">Evolução dos cliques nos últimos 7 dias.</p>
                    <div className="h-[250px] w-full min-h-[250px]">
                        {trendData.some(d => d.count > 0) ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12, fill: '#999' }}
                                        dy={10}
                                    />
                                    <YAxis
                                        allowDecimals={false}
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12, fill: '#999' }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#2A2A2A"
                                        strokeWidth={3}
                                        dot={{ fill: '#D4AF37', r: 5, strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 8, fill: '#D4AF37', stroke: '#fff', strokeWidth: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-text-medium opacity-50 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                Sem atividade recente
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
