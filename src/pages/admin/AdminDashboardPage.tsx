import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Users, DollarSign, Activity, MoreHorizontal, ShieldCheck, AlertTriangle, Clock, TrendingUp, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const adminStats = [
    { title: 'Usuarios Totales', value: '1,234', icon: Users, trend: '+12%', trendLabel: 'vs mes anterior', color: 'blue' },
    { title: 'Ingresos Mensuales', value: '€45,230', icon: DollarSign, trend: '+8%', trendLabel: 'vs mes anterior', color: 'emerald' },
    { title: 'Deals Activos', value: '86', icon: Activity, trend: '+5', trendLabel: 'nuevos hoy', color: 'violet' },
];

const users = [
    { id: 1, company: 'Logistics Pro', type: 'Client', status: 'Activo', tier: 'N/A', verified: true },
    { id: 2, company: 'FinanceBot AI', type: 'Provider', status: 'Activo', tier: 'Gold', verified: true },
    { id: 3, company: 'Retail Master', type: 'Client', status: 'Activo', tier: 'N/A', verified: true },
    { id: 4, company: 'TechSolutions Inc', type: 'Provider', status: 'Bloqueado', tier: 'Bronze', verified: false },
    { id: 5, company: 'Startup Nova', type: 'Provider', status: 'Pendiente', tier: 'Silver', verified: false },
];

const pendingTasks = [
    { id: 1, task: 'Verificar certificado ISO 27001', company: 'DataSecure Ltd', time: 'Hace 2h', avatar: 'D' },
    { id: 2, task: 'Revisar documentación fiscal', company: 'Global Trade SA', time: 'Hace 5h', avatar: 'G' },
];

export default function AdminDashboardPage() {
    const handleAction = (action: string, user: string) => {
        toast.success(`${action} ejecutado para ${user}`);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Panel de Administrador</h1>
                    <p className="text-muted-foreground text-lg">Visión global y gestión de la plataforma</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Última actualización: hace 5 min</span>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                {adminStats.map((stat, index) => (
                    <Card key={index} className={cn(
                        "border-0 relative overflow-hidden rounded-md shadow-xl group",
                        stat.color === 'blue' && "bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-transparent shadow-blue-500/5",
                        stat.color === 'emerald' && "bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent shadow-emerald-500/5",
                        stat.color === 'violet' && "bg-gradient-to-br from-violet-400/20 via-violet-500/10 to-transparent shadow-violet-500/5"
                    )}>
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <stat.icon className={cn(
                                "h-12 w-12 md:h-20 md:w-20",
                                stat.color === 'blue' && "text-blue-500",
                                stat.color === 'emerald' && "text-emerald-500",
                                stat.color === 'violet' && "text-violet-500"
                            )} />
                        </div>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className={cn(
                                "text-xs font-bold uppercase tracking-[0.2em]",
                                stat.color === 'blue' && "text-blue-600 dark:text-blue-400/70",
                                stat.color === 'emerald' && "text-emerald-600 dark:text-emerald-400/70",
                                stat.color === 'violet' && "text-violet-600 dark:text-violet-400/70"
                            )}>
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={cn(
                                "h-5 w-5",
                                stat.color === 'blue' && "text-blue-500",
                                stat.color === 'emerald' && "text-emerald-500",
                                stat.color === 'violet' && "text-violet-500"
                            )} />
                        </CardHeader>
                        <CardContent>
                            <div className={cn(
                                "text-3xl md:text-5xl font-display font-bold mb-4",
                                stat.color === 'blue' && "text-blue-700 dark:text-blue-400",
                                stat.color === 'emerald' && "text-emerald-700 dark:text-emerald-400",
                                stat.color === 'violet' && "text-violet-700 dark:text-violet-400"
                            )}>{stat.value}</div>
                            <div className={cn(
                                "flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full font-bold text-xs",
                                stat.color === 'blue' && "text-blue-500 bg-blue-500/10",
                                stat.color === 'emerald' && "text-emerald-500 bg-emerald-500/10",
                                stat.color === 'violet' && "text-violet-500 bg-violet-500/10"
                            )}>
                                <TrendingUp className="h-3 w-3" />
                                <span>{stat.trend} {stat.trendLabel}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* User Management Table - 2 Cols */}
                <Card className="lg:col-span-2 border-white/5 rounded-md shadow-sm overflow-hidden">
                    <CardHeader className="px-8 pt-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-display font-bold">Gestión de Usuarios</CardTitle>
                                <p className="text-sm text-muted-foreground">Últimos usuarios registrados y su estado</p>
                            </div>
                            <Button variant="ghost" size="sm" className="font-bold text-primary rounded-md hover:bg-primary/5">
                                Ver todos
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-white/5">
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Empresa</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tipo</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Estado</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Nivel</TableHead>
                                    <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id} className="border-white/5 hover:bg-muted/30 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 rounded-md shadow-sm">
                                                    <AvatarFallback className={cn(
                                                        "text-sm font-bold rounded-md",
                                                        user.type === 'Provider' ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white" : "bg-gradient-to-br from-blue-400 to-indigo-500 text-white"
                                                    )}>
                                                        {user.company.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold">{user.company}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "font-bold rounded-full border-0",
                                                user.type === 'Provider' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                            )}>
                                                {user.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "font-bold rounded-full border-0 gap-1.5",
                                                user.status === 'Activo' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                                user.status === 'Bloqueado' && "bg-red-500/10 text-red-600 dark:text-red-400",
                                                user.status === 'Pendiente' && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                            )}>
                                                <div className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    user.status === 'Activo' && "bg-emerald-500",
                                                    user.status === 'Bloqueado' && "bg-red-500",
                                                    user.status === 'Pendiente' && "bg-amber-500 animate-pulse"
                                                )} />
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.tier !== 'N/A' && (
                                                <div className="flex items-center gap-1.5 text-sm font-bold">
                                                    {user.tier === 'Gold' && <span className="text-amber-500">●</span>}
                                                    {user.tier === 'Silver' && <span className="text-slate-400">●</span>}
                                                    {user.tier === 'Bronze' && <span className="text-orange-600">●</span>}
                                                    {user.tier}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="glass-card">
                                                    <DropdownMenuLabel className="font-display">Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleAction('Verificar', user.company)} className="cursor-pointer">
                                                        Verificar Manualmente
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleAction('Reset Password', user.company)} className="cursor-pointer">
                                                        Enviar Reset Password
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/5" />
                                                    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleAction('Suspender', user.company)}>
                                                        Suspender Cuenta
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Approvals Center - 1 Col */}
                <div className="space-y-6">
                    <Card className="border-0 premium-gradient rounded-md shadow-2xl shadow-indigo-500/20 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
                        <CardHeader className="relative z-10 px-8 pt-8">
                            <CardTitle className="text-lg font-display font-bold flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5" />
                                Centro de Aprobaciones
                            </CardTitle>
                            <p className="text-sm text-white/70">{pendingTasks.length} tareas pendientes</p>
                        </CardHeader>
                        <CardContent className="relative z-10 px-8 pb-8 space-y-4">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex flex-col space-y-3 p-4 rounded-md bg-white/10 backdrop-blur-sm border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 rounded-md">
                                            <AvatarFallback className="bg-white/20 text-white font-bold rounded-md">
                                                {task.avatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="font-bold text-sm">{task.company}</div>
                                            <div className="text-xs text-white/60">{task.time}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/80">{task.task}</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" className="flex-1 gap-1.5 h-9 bg-white text-indigo-600 hover:bg-white/95 font-bold rounded-md" onClick={() => handleAction('Aprobado', task.company)}>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Aprobar
                                        </Button>
                                        <Button size="sm" variant="outline" className="flex-1 gap-1.5 h-9 border-white/20 text-white hover:bg-white/10 font-bold rounded-md" onClick={() => handleAction('Rechazado', task.company)}>
                                            <XCircle className="h-4 w-4" />
                                            Rechazar
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {pendingTasks.length === 0 && (
                                <div className="text-center py-6 text-white/60 text-sm">
                                    ¡Todo al día! No hay tareas pendientes.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-0 bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent rounded-md shadow-xl shadow-red-500/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-display font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" />
                                Alertas del Sistema
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-red-700 dark:text-red-300/80">
                                Alta latencia detectada en el módulo de pagos (Stripe).
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Messages Section */}
            <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                <CardHeader className="px-8 pt-8 flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-display font-bold">Mensajes Recientes</CardTitle>
                        <p className="text-sm text-muted-foreground">Comunicaciones en Deal Rooms activas</p>
                    </div>
                    <Button variant="ghost" size="sm" className="font-bold text-primary rounded-md hover:bg-primary/5 gap-1.5">
                        Ver Todos
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="space-y-2">
                        {[
                            { from: 'Logistics Pro', to: 'FinanceBot AI', message: 'Perfecto, agendamos la demo para el jueves entonces.', time: 'Hace 5 min', avatar: 'L' },
                            { from: 'Retail Master', to: 'TechSolutions Inc', message: 'Necesitamos revisar el contrato antes de firmar...', time: 'Hace 15 min', avatar: 'R' },
                            { from: 'Startup Nova', to: 'DataSecure Ltd', message: '¿Podéis enviar el certificado ISO actualizado?', time: 'Hace 1h', avatar: 'S' },
                        ].map((msg, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-md hover:bg-muted/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/5 group">
                                <Avatar className="h-12 w-12 rounded-md shadow-sm">
                                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-bold rounded-md">
                                        {msg.avatar}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-bold text-sm group-hover:text-primary transition-colors">{msg.from} → {msg.to}</span>
                                        <span className="text-xs text-muted-foreground/60">{msg.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-3" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
