import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

const data = [
    { subject: 'Presupuesto', A: 120, B: 110, fullMark: 150 },
    { subject: 'Tecnología', A: 98, B: 130, fullMark: 150 },
    { subject: 'Experiencia', A: 86, B: 130, fullMark: 150 },
    { subject: 'Velocidad', A: 99, B: 100, fullMark: 150 },
    { subject: 'Compliance', A: 85, B: 90, fullMark: 150 },
    { subject: 'Soporte', A: 65, B: 85, fullMark: 150 },
];

export default function MatchRadar() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    Match Score
                    <Badge variant="outline" className="ml-2 bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400">
                        94% Compatible
                    </Badge>
                </CardTitle>
                <Info className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#e5e7eb" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                            <Radar
                                name="Tus Requisitos"
                                dataKey="A"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="#3b82f6"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="Perfil Proveedor"
                                dataKey="B"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="#10b981"
                                fillOpacity={0.3}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex justify-center gap-4 text-sm mt-2">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-blue-500 opacity-50" />
                        <span className="text-muted-foreground">Tus Requisitos</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-50" />
                        <span className="text-muted-foreground">Proveedor</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
