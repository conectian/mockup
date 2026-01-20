import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    DollarSign,
    TrendingUp,
    Users,
    Download,
    Calendar,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Gem,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
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

const financeStats = [
    { title: 'MRR Total', value: '€24,850', trend: '+12.5%', trendUp: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'ARR Proyectado', value: '€298,200', trend: '+18.2%', trendUp: true, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Clientes de Pago', value: '89', trend: '+12', trendUp: true, icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { title: 'LTV Promedio', value: '€1,245', subValue: 'CAC: €85', trendUp: true, icon: Gem, color: 'text-amber-500', bg: 'bg-amber-500/10' },
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
    { email: 'juan@logistic.es', plan: 'Base', daysInactive: 10, risk: 'low' },
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
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Finanzas</h1>
                    <p className="text-muted-foreground text-lg">Control financiero y métricas de ingresos.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Últimos 30 días
                    </Button>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
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
                        className="relative overflow-hidden border-white/5 shadow-md cursor-pointer hover:shadow-lg hover:border-primary/20 transition-all group"
                        onClick={() => handleCardClick(stat.title)}
                    >
                        <div className={cn(
                            "absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500",
                            stat.color
                        )}>
                            <stat.icon className="h-24 w-24" />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2 rounded-full", stat.bg, stat.color)}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            {stat.subValue && <div className="text-sm text-muted-foreground font-medium mb-1">{stat.subValue}</div>}
                            {stat.trend && (
                                <div className="flex items-center text-xs mt-1">
                                    <span className={cn(
                                        "flex items-center font-bold mr-2 px-1.5 py-0.5 rounded-full",
                                        stat.trendUp ? "text-emerald-600 bg-emerald-500/10 dark:text-emerald-400" : "text-red-600 bg-red-500/10 dark:text-red-400"
                                    )}>
                                        {stat.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                        {stat.trend}
                                    </span>
                                    <span className="text-muted-foreground">vs mes anterior</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Breakdown */}
                <Card className="border-white/5 h-full">
                    <CardHeader>
                        <CardTitle className="text-lg font-display font-bold">Desglose de Ingresos</CardTitle>
                        <CardDescription>Distribución de ingresos por canal.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {revenueBreakdown.map((item, index) => (
                            <div key={index} className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-sm font-medium text-muted-foreground mb-1">{item.label}</div>
                                        <div className="text-lg font-bold">{item.value}</div>
                                    </div>
                                    <div className="text-sm font-bold text-muted-foreground">{item.percentage}%</div>
                                </div>
                                <Progress value={item.percentage} className="h-2" indicatorClassName={item.color} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    {/* Retention & Churn */}
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="border-white/5 bg-muted/20">
                            <CardContent className="p-6">
                                <div className="text-3xl font-display font-bold text-emerald-500 mb-2">94.5%</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Tasa de Retención</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-muted/20">
                            <CardContent className="p-6">
                                <div className="text-3xl font-display font-bold text-red-500 mb-2">5.5%</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Tasa de Churn</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-muted/20">
                            <CardContent className="p-6">
                                <div className="text-3xl font-display font-bold mb-2">3</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Churns este mes</div>
                            </CardContent>
                        </Card>
                        <Card className="border-white/5 bg-muted/20">
                            <CardContent className="p-6">
                                <div className="text-3xl font-display font-bold text-red-400 mb-2">€596</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70">Ingresos Perdidos</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Users at Risk */}
                    <Card className="border-white/5">
                        <CardHeader>
                            <CardTitle className="text-lg font-display font-bold text-amber-600 dark:text-amber-500 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                Usuarios en Riesgo
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {riskUsers.map((user, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm">{user.email}</div>
                                            <div className="text-xs text-muted-foreground">{user.plan}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] whitespace-nowrap">
                                            {user.daysInactive}d inactivo
                                        </Badge>
                                        <Button size="sm" variant="ghost" className="h-8 text-xs font-bold px-2">Contactar</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Drill-down Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent side="right" className="w-[100%] sm:w-[540px] overflow-y-auto">
                    <SheetHeader className="pb-6 border-b border-border">
                        <SheetTitle className="text-xl font-display font-bold">{sheetTitle}</SheetTitle>
                        <SheetDescription>Historial de transacciones y movimientos recientes.</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                        <div className="relative mb-4">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="search"
                                placeholder="Buscar transacciones..."
                                className="h-9 rounded-md border border-input bg-background pl-9 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full"
                            />
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha / Cliente</TableHead>
                                    <TableHead className="text-right">Estado / Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockTransactions.map((tx) => (
                                    <TableRow key={tx.id} className="cursor-pointer hover:bg-muted/50">
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{tx.client}</span>
                                                <span className="text-xs text-muted-foreground">{tx.date} • {tx.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex flex-col items-end gap-1">
                                                <span className="font-mono font-bold">{tx.amount}</span>
                                                <Badge variant="outline" className={cn(
                                                    "text-[10px] w-fit",
                                                    tx.status === 'Completado' && "text-emerald-600 border-emerald-500/20 bg-emerald-500/10 dark:text-emerald-400",
                                                    tx.status === 'Pendiente' && "text-amber-600 border-amber-500/20 bg-amber-500/10 dark:text-amber-400",
                                                    tx.status === 'Fallido' && "text-red-600 border-red-500/20 bg-red-500/10 dark:text-red-400",
                                                )}>
                                                    {tx.status}
                                                </Badge>
                                            </div>
                                        </TableCell>
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
