import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Users,
    DollarSign,
    Target,
    Zap,
    Trophy,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Calendar,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const dashboardStats = [
    { title: 'MRR', value: '€14.405', subtext: '+12.5% vs mes anterior', trend: '+12.5%', trendUp: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { title: 'Usuarios Activos', value: '400', subtext: '+24 nuevos esta semana', trend: '+5.2%', trendUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Matches', value: '89', subtext: 'Matches exitosos este mes', trend: '+8.1%', trendUp: true, icon: Zap, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { title: 'Churn Rate', value: '2.4%', subtext: 'Bajo control (< 3%)', trend: '-0.5%', trendUp: true, icon: Target, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { title: 'NPS', value: '52', subtext: 'Excelente', trend: '+2', trendUp: true, icon: Trophy, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

const revenueData = [
    { name: 'Sem 1', value: 10000 },
    { name: '1.2', value: 10400 },
    { name: '1.4', value: 10800 },
    { name: 'Sem 2', value: 11500 },
    { name: '2.2', value: 11900 },
    { name: '2.4', value: 12100 },
    { name: 'Sem 3', value: 12800 },
    { name: '3.2', value: 13500 },
    { name: '3.4', value: 13900 },
    { name: 'Sem 4', value: 14405 },
];

const recentActivity = [
    { id: 1, user: 'Empresa ABC', action: 'Nueva suscripción PRO', time: 'Hace 2 min', amount: '€299' },
    { id: 2, user: 'DevStudio SL', action: 'Creó un nuevo caso de uso', time: 'Hace 15 min', amount: '' },
    { id: 3, user: 'Startup One', action: 'Pago procesado', time: 'Hace 45 min', amount: '€199' },
    { id: 4, user: 'Consultora X', action: 'Usuario registrado', time: 'Hace 1 hora', amount: '' },
    { id: 5, user: 'Tech Solutions', action: 'Agendó una demo', time: 'Hace 2 horas', amount: '' },
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground text-lg">Resumen de actividad y métricas clave.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Buscar..."
                            className="h-10 rounded-md border border-input bg-background pl-9 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-[200px] lg:w-[300px]"
                        />
                    </div>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Últimos 30 días
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {dashboardStats.map((stat, index) => (
                    <Card key={index} className="border-white/5 shadow-sm hover:shadow-md transition-all">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.title}
                            </CardTitle>
                            <div className={cn("p-2 rounded-full", stat.bg, stat.color)}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <span className={cn(
                                    "flex items-center font-medium mr-2",
                                    stat.trendUp ? "text-emerald-500" : "text-red-500"
                                )}>
                                    {stat.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                    {stat.trend}
                                </span>
                                {stat.subtext}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <Card className="lg:col-span-2 border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg font-display font-bold">Ingresos Recurrentes (MRR)</CardTitle>
                        <CardDescription>Crecimiento de ingresos en el último mes.</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-0">
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" strokeOpacity={0.4} />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                        dy={10}
                                        tickMargin={5}
                                        interval="preserveStartEnd"
                                        ticks={['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
                                        tickFormatter={(value) => `€${(value / 1000).toFixed(1)}k`}
                                        dx={-10}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                            color: 'hsl(var(--foreground))'
                                        }}
                                        labelStyle={{ color: 'hsl(var(--muted-foreground))', marginBottom: '4px' }}
                                        formatter={(value: number) => [`€${(value || 0).toLocaleString()}`, 'Ingresos']}
                                        cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorRevenue)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="border-white/5">
                    <CardHeader>
                        <CardTitle className="text-lg font-display font-bold">Actividad Reciente</CardTitle>
                        <CardDescription>Últimas acciones en la plataforma.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="w-full grid grid-cols-2 mb-4">
                                <TabsTrigger value="all">Todo</TabsTrigger>
                                <TabsTrigger value="sales">Ventas</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Activity className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{activity.user}</p>
                                                <p className="text-xs text-muted-foreground">{activity.action}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {activity.amount && <p className="text-sm font-bold text-emerald-500">{activity.amount}</p>}
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="sales" className="space-y-4">
                                {recentActivity.filter(a => a.amount).map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                <DollarSign className="h-4 w-4 text-emerald-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium leading-none">{activity.user}</p>
                                                <p className="text-xs text-muted-foreground">{activity.action}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-emerald-500">{activity.amount}</p>
                                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
