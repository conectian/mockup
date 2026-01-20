import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    DollarSign,
    TrendingUp,
    TrendingDown,
    CreditCard,
    Users,
    Download,
    Calendar,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Gem,
    Euro
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

const financeStats = [
    { title: 'MRR Total', value: '€24,850', trend: '+12.5% vs mes anterior', trendUp: true, icon: DollarSign, color: 'emerald' },
    { title: 'ARR Proyectado', value: '€298,200', trend: '+18.2% crecimiento', trendUp: true, icon: TrendingUp, color: 'blue' },
    { title: 'Clientes de Pago', value: '89', trend: '+12 este mes', trendUp: true, icon: Users, color: 'violet' },
    { title: 'LTV Promedio', value: '€1,245', subValue: 'CAC: €85', trendUp: true, icon: Gem, color: 'amber' },
];

const revenueBreakdown = [
    { label: 'Suscripciones CEOs (PRO IA)', value: '€2,871/mes', percentage: 11.6, color: 'bg-emerald-500' },
    { label: 'Suscripciones Proveedores (PRO)', value: '€11,920/mes', percentage: 48.0, color: 'bg-blue-500' },
    { label: 'Suscripciones Proveedores (Base)', value: '€7,960/mes', percentage: 32.0, color: 'bg-violet-500' },
    { label: 'Comisiones por Transacciones', value: '€2,099/mes', percentage: 8.4, color: 'bg-amber-500' },
];

const riskUsers = [
    { email: 'pedro@legal.com', plan: 'Free', daysInactive: 30, risk: 'high' },
    { email: 'maria@tech.io', plan: 'PRO IA', daysInactive: 14, risk: 'medium' },
    { email: 'hello@dataco.com', plan: 'Base', daysInactive: 12, risk: 'medium' },
    { email: 'hello@dataco.com', plan: 'Base', daysInactive: 12, risk: 'medium' },
];

const mockTransactions = [
    { id: 1, date: '19 Ene 2026', client: 'Empresa A', amount: '€1,200.00', status: 'Completado', type: 'Suscripción PRO' },
    { id: 2, date: '18 Ene 2026', client: 'Startup Tech', amount: '€850.00', status: 'Completado', type: 'Comisión' },
    { id: 3, date: '18 Ene 2026', client: 'Global Logistics', amount: '€2,400.00', status: 'Pendiente', type: 'Suscripción Enterprise' },
    { id: 4, date: '17 Ene 2026', client: 'Retail Solutions', amount: '€150.00', status: 'Completado', type: 'Add-on' },
    { id: 5, date: '16 Ene 2026', client: 'Data Corp', amount: '€1,200.00', status: 'Fallido', type: 'Suscripción PRO' },
];

export default function AdminFinancesPage() {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [sheetTitle, setSheetTitle] = useState('Detalles Financieros');

    const handleCardClick = (title: string) => {
        setSheetTitle(`Detalles de ${title}`);
        setSheetOpen(true);
    };
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Finanzas</h1>
                    <p className="text-muted-foreground text-lg">Control financiero y métricas de ingresos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Últimos 30 días
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4" />
                        Exportar Reporte
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {financeStats.map((stat, index) => (
                    <Card 
                        key={index} 
                        className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/50 to-slate-900/10 shadow-xl cursor-pointer hover:ring-2 ring-primary/50 transition-all"
                        onClick={() => handleCardClick(stat.title)}
                    >
                        <div className={cn(
                            "absolute top-0 right-0 p-4 opacity-10",
                            stat.color === 'emerald' && "text-emerald-500",
                            stat.color === 'blue' && "text-blue-500",
                            stat.color === 'violet' && "text-violet-500",
                            stat.color === 'amber' && "text-amber-500"
                        )}>
                            <stat.icon className="h-24 w-24" />
                        </div>
                        <CardHeader className="pb-2">
                            <div className={cn(
                                "p-2 w-fit rounded-lg mb-2",
                                stat.color === 'emerald' && "bg-emerald-500/20 text-emerald-500",
                                stat.color === 'blue' && "bg-blue-500/20 text-blue-500",
                                stat.color === 'violet' && "bg-violet-500/20 text-violet-500",
                                stat.color === 'amber' && "bg-amber-500/20 text-amber-500"
                            )}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-bold mb-1">{stat.value}</div>
                            {stat.subValue && <div className="text-sm text-muted-foreground font-medium mb-2">{stat.subValue}</div>}
                            {stat.trend && (
                                <Badge variant="outline" className={cn(
                                    "border-0 rounded-md font-bold",
                                    stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                                )}>
                                    {stat.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    {stat.trend}
                                </Badge>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Breakdown */}
                <Card className="border-white/5">
                    <CardHeader>
                        <CardTitle className="text-xl font-display font-bold">Desglose de Ingresos</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {revenueBreakdown.map((item, index) => (
                            <div key={index} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-sm font-bold text-muted-foreground mb-1">{item.label}</div>
                                        <div className="text-lg font-bold text-blue-400">{item.value}</div>
                                    </div>
                                    <div className="text-sm font-bold text-muted-foreground">{item.percentage}%</div>
                                </div>
                                <Progress value={item.percentage} className={cn("h-2", item.color)} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Retention & Churn */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-white/5 bg-slate-900/30">
                            <CardContent className="p-6">
                                <div className="text-4xl font-display font-bold text-emerald-500 mb-1">94.5%</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tasa de Retención</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-slate-900/30">
                            <CardContent className="p-6">
                                <div className="text-4xl font-display font-bold text-red-500 mb-1">5.5%</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tasa de Churn</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-slate-900/30">
                            <CardContent className="p-6">
                                <div className="text-4xl font-display font-bold text-slate-300 mb-1">3</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Churns este mes</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-slate-900/30">
                            <CardContent className="p-6">
                                <div className="text-4xl font-display font-bold text-red-400 mb-1">€596</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Ingresos Perdidos</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Users at Risk */}
                    <Card className="border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg font-display font-bold text-amber-500 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Usuarios en Riesgo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {riskUsers.map((user, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{user.email}</div>
                                            <div className="text-xs text-muted-foreground">{user.plan}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="border-amber-500/20 text-amber-500 bg-amber-500/10">
                                            ● {user.daysInactive} días inactivo
                                        </Badge>
                                        <Button size="sm" variant="ghost" className="h-8 text-xs font-bold">Contactar</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Drill-down Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
                    <SheetHeader className="pb-6 border-b border-border">
                        <SheetTitle className="text-xl font-display font-bold">{sheetTitle}</SheetTitle>
                        <SheetDescription>Historial de transacciones y movimientos recientes.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => (
                                    <TableRow key={tx.id} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell className="font-mono text-xs">{tx.date}</TableCell>
                                        <TableCell className="font-medium">{tx.client}</TableCell>
                                        <TableCell className="text-muted-foreground">{tx.type}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "text-[10px]",
                                                tx.status === 'Completado' && "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
                                                tx.status === 'Pendiente' && "text-amber-500 border-amber-500/20 bg-amber-500/10",
                                                tx.status === 'Fallido' && "text-red-500 border-red-500/20 bg-red-500/10",
                                            )}>
                                                {tx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono font-bold">{tx.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
