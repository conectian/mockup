import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { Users, DollarSign, Activity, MoreHorizontal, ShieldCheck, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const adminStats = [
    { title: 'Usuarios Totales', value: '1,234', icon: Users, trend: '+12% vs mes anterior' },
    { title: 'Ingresos Mensuales', value: '€45,230', icon: DollarSign, trend: '+8% vs mes anterior' },
    { title: 'Deals Activos', value: '86', icon: Activity, trend: '+5 nuevas hoy' },
];

const users = [
    { id: 1, company: 'Logistics Pro', type: 'Client', status: 'Activo', tier: 'N/A', verified: true },
    { id: 2, company: 'FinanceBot AI', type: 'Provider', status: 'Activo', tier: 'Gold', verified: true },
    { id: 3, company: 'Retail Master', type: 'Client', status: 'Activo', tier: 'N/A', verified: true },
    { id: 4, company: 'TechSolutions Inc', type: 'Provider', status: 'Bloqueado', tier: 'Bronze', verified: false },
    { id: 5, company: 'Startup Nova', type: 'Provider', status: 'Pendiente', tier: 'Silver', verified: false },
];

const pendingTasks = [
    { id: 1, task: 'Verificar certificado ISO 27001', company: 'DataSecure Ltd', time: 'Hace 2h' },
    { id: 2, task: 'Revisar documentación fiscal', company: 'Global Trade SA', time: 'Hace 5h' },
];

export default function AdminDashboardPage() {
    const handleAction = (action: string, user: string) => {
        toast.success(`${action} ejecutado para ${user}`);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Panel de Administrador</h1>
                <p className="text-muted-foreground">Visión global y gestión de la plataforma</p>
            </div>

            {/* KPI Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                {adminStats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.trend}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* User Management Table - 2 Cols */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Gestión de Usuarios</CardTitle>
                        <CardDescription>Últimos usuarios registrados y su estado.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Empresa</TableHead>
                                    <TableHead>Tipo</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Nivel</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.company}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{user.type}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={user.status === 'Activo' ? 'default' : user.status === 'Bloqueado' ? 'destructive' : 'secondary'}
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.tier !== 'N/A' && (
                                                <div className="flex items-center gap-1 text-sm">
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
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleAction('Verificar', user.company)}>
                                                        Verificar Manualmente
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleAction('Reset Password', user.company)}>
                                                        Enviar Reset Password
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600" onClick={() => handleAction('Suspender', user.company)}>
                                                        Suspender Cuenta
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Approvals Center - 1 Col */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Centro de Aprobaciones
                            </CardTitle>
                            <CardDescription>{pendingTasks.length} tareas pendientes</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex flex-col space-y-2 p-3 border rounded-md bg-muted/30">
                                    <div className="flex justify-between items-start">
                                        <span className="font-medium text-sm">{task.company}</span>
                                        <span className="text-xs text-muted-foreground">{task.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{task.task}</p>
                                    <div className="flex gap-2 pt-2">
                                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 h-8" onClick={() => handleAction('Aprobado', task.company)}>
                                            Aprobar
                                        </Button>
                                        <Button size="sm" variant="outline" className="w-full h-8" onClick={() => handleAction('Rechazado', task.company)}>
                                            Rechazar
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            {pendingTasks.length === 0 && (
                                <div className="text-center py-6 text-muted-foreground text-sm">
                                    ¡Todo al día! No hay tareas pendientes.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base text-red-600 dark:text-red-400 flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" /> Alertas del Sistema
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-red-800 dark:text-red-300">
                                Alta latencia detectada en el módulo de pagos (Stripe).
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Recent Messages Section */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Mensajes Recientes</CardTitle>
                        <CardDescription>Comunicaciones en Deal Rooms activas</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">Ver Todos</Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { from: 'Logistics Pro', to: 'FinanceBot AI', message: 'Perfecto, agendamos la demo para el jueves entonces.', time: 'Hace 5 min', avatar: 'L' },
                            { from: 'Retail Master', to: 'TechSolutions Inc', message: 'Necesitamos revisar el contrato antes de firmar...', time: 'Hace 15 min', avatar: 'R' },
                            { from: 'Startup Nova', to: 'DataSecure Ltd', message: '¿Podéis enviar el certificado ISO actualizado?', time: 'Hace 1h', avatar: 'S' },
                        ].map((msg, i) => (
                            <div key={i} className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
                                    {msg.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm">{msg.from} → {msg.to}</span>
                                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground truncate">{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
