import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Activity,
    Database,
    Globe,
    Clock,
    Cpu,
    HardDrive,
    Zap,
    RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock Logs
const initialLogs = [
    { id: 1, time: '10:42:05', level: 'INFO', message: 'User login from 192.168.1.105', service: 'AuthService' },
    { id: 2, time: '10:42:01', level: 'INFO', message: 'Health check passed', service: 'HealthMonitor' },
    { id: 3, time: '10:41:58', level: 'WARN', message: 'High memory usage detected (85%)', service: 'Worker-04' },
    { id: 4, time: '10:41:45', level: 'INFO', message: 'Database backup completed', service: 'BackupService' },
    { id: 5, time: '10:41:30', level: 'ERROR', message: 'Connection timeout: Payment Gateway', service: 'PaymentService' },
    { id: 6, time: '10:41:12', level: 'INFO', message: 'New content published: ID-452', service: 'ContentManager' },
];

export default function AdminMonitoringPage() {
    const [logs, setLogs] = useState(initialLogs);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refreshStats = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            setIsRefreshing(false);
            toast.success('Métricas actualizadas');
            // Mock adding a new log
            const newLog = {
                id: Date.now(),
                time: new Date().toLocaleTimeString(),
                level: 'INFO',
                message: 'Manual system refresh triggered',
                service: 'AdminConsole'
            };
            setLogs([newLog, ...logs]);
        }, 800);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Monitoreo del Sistema</h1>
                    <p className="text-muted-foreground text-lg">Estado de salud, logs y métricas de rendimiento en tiempo real</p>
                </div>
                <Button
                    onClick={refreshStats}
                    disabled={isRefreshing}
                    className="gap-2 bg-slate-800 text-white hover:bg-slate-700 border border-white/10"
                >
                    <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
                    Actualizar
                </Button>
            </div>

            {/* Health Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-slate-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                <Cpu className="h-5 w-5 text-blue-400" />
                            </div>
                            <Badge variant="outline" className="text-blue-400 border-blue-500/20 bg-blue-500/10">Estable</Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-mono">24%</h3>
                            <p className="text-sm text-muted-foreground">Uso de CPU</p>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 w-[24%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-purple-400" />
                            </div>
                            <Badge variant="outline" className="text-purple-400 border-purple-500/20 bg-purple-500/10">6.2 GB</Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-mono">75%</h3>
                            <p className="text-sm text-muted-foreground">Memoria RAM</p>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 w-[75%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <HardDrive className="h-5 w-5 text-emerald-400" />
                            </div>
                            <Badge variant="outline" className="text-emerald-400 border-emerald-500/20 bg-emerald-500/10">OK</Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-mono">45%</h3>
                            <p className="text-sm text-muted-foreground">Espacio en Disco</p>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[45%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-slate-900 border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors" />
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                <Activity className="h-5 w-5 text-amber-400" />
                            </div>
                            <Badge variant="outline" className="text-amber-400 border-amber-500/20 bg-amber-500/10">Normal</Badge>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold font-mono">124ms</h3>
                            <p className="text-sm text-muted-foreground">Latencia API</p>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[30%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Graph (Mock) */}
                <Card className="lg:col-span-2 border-white/5 bg-slate-900/50">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            Tiempo de Respuesta (24h)
                        </CardTitle>
                        <Badge variant="outline" className="font-mono">Avg: 110ms</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full flex items-end justify-between gap-1 pt-4">
                            {[40, 65, 45, 80, 55, 60, 40, 30, 50, 60, 75, 50, 45, 70, 85, 60, 45, 55, 40, 30, 45, 50, 65, 40].map((h, i) => (
                                <div key={i} className="w-full bg-primary/20 hover:bg-primary/40 transition-colors rounded-t-sm relative group" style={{ height: `${h}%` }}>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h * 3}ms
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-muted-foreground border-t border-white/5 pt-2">
                            <span>00:00</span>
                            <span>06:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>Now</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Status List */}
                <div className="space-y-6">
                    <Card className="border-white/5 bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Estado de Servicios</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/50" />
                                    <span className="font-medium">API Gateway</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Up 24d</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/50" />
                                    <span className="font-medium">Database (Primary)</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Up 10d</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px] shadow-amber-500/50" />
                                    <span className="font-medium">Worker Nodes</span>
                                </div>
                                <span className="text-xs text-amber-500">High Load</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-500/50" />
                                    <span className="font-medium">Storage Service</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Up 45d</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 bg-slate-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Sesiones Activas</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center py-6">
                            <div className="inline-flex items-center justify-center p-6 rounded-full bg-blue-500/10 mb-4 animate-pulse">
                                <Globe className="h-8 w-8 text-blue-500" />
                            </div>
                            <h3 className="text-4xl font-bold font-display">342</h3>
                            <p className="text-muted-foreground">Usuarios Online</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Logs Table */}
            <Card className="border-white/5 bg-slate-950">
                <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Logs del Sistema
                    </CardTitle>
                    <Badge variant="outline" className="bg-slate-900">Live</Badge>
                </CardHeader>
                <CardContent className="p-0">
                    <ScrollArea className="h-[300px]">
                        <div className="divide-y divide-white/5 font-mono text-sm">
                            {logs.map((log) => (
                                <div key={log.id} className="flex items-center p-3 hover:bg-white/5 transition-colors gap-4">
                                    <span className="text-muted-foreground whitespace-nowrap opacity-60 w-20">{log.time}</span>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            "w-16 justify-center text-[10px] border-none bg-transparent font-bold",
                                            log.level === 'INFO' && "text-blue-400",
                                            log.level === 'WARN' && "text-amber-400",
                                            log.level === 'ERROR' && "text-red-400"
                                        )}
                                    >
                                        [{log.level}]
                                    </Badge>
                                    <span className="text-xs uppercase text-muted-foreground w-32 shrink-0 tracking-wider text-right pr-4 border-r border-white/10">{log.service}</span>
                                    <span className={cn("flex-1 truncate", log.level === 'ERROR' ? "text-red-300" : "text-slate-300")}>
                                        {log.message}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
