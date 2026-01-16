import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Eye, MousePointerClick, DollarSign } from 'lucide-react';

const viewsData = [
    { name: 'Lun', views: 120, clicks: 45 },
    { name: 'Mar', views: 145, clicks: 52 },
    { name: 'Mie', views: 180, clicks: 68 },
    { name: 'Jue', views: 210, clicks: 80 },
    { name: 'Vie', views: 195, clicks: 75 },
    { name: 'Sab', views: 110, clicks: 35 },
    { name: 'Dom', views: 95, clicks: 28 },
];

const engagementData = [
    { name: 'Sem 1', deals: 2 },
    { name: 'Sem 2', deals: 4 },
    { name: 'Sem 3', deals: 3 },
    { name: 'Sem 4', deals: 6 },
];

export default function ProviderAnalyticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-display font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground mt-1">Rendimiento de tus casos de uso y oportunidades</p>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <Card className="border-white/5 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vistas Totales</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,240</div>
                        <p className="text-xs text-muted-foreground">+12% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card className="border-white/5 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Interacciones</CardTitle>
                        <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">345</div>
                        <p className="text-xs text-muted-foreground">+5% desde el mes pasado</p>
                    </CardContent>
                </Card>
                <Card className="border-white/5 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Deals Iniciados</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">+2 esta semana</p>
                    </CardContent>
                </Card>
                <Card className="border-white/5 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Retorno Estimado</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45.2k €</div>
                        <p className="text-xs text-muted-foreground">En pipeline activo</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <Tabs defaultValue="traffic" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="traffic">Tráfico y Vistas</TabsTrigger>
                    <TabsTrigger value="engagement">Conversión</TabsTrigger>
                </TabsList>
                <TabsContent value="traffic" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Vistas vs Clics (Últimos 7 días)</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={viewsData}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--popover))',
                                                borderRadius: '8px',
                                                border: '1px solid hsl(var(--border))',
                                                color: 'hsl(var(--popover-foreground))'
                                            }}
                                        />
                                        <Area type="monotone" dataKey="views" stroke="#8884d8" fillOpacity={1} fill="url(#colorViews)" name="Vistas" />
                                        <Area type="monotone" dataKey="clicks" stroke="#82ca9d" fillOpacity={1} fill="url(#colorClicks)" name="Clics" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="engagement">
                    <Card>
                        <CardHeader>
                            <CardTitle>Deals Generados (Últimas 4 semanas)</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <div className="h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={engagementData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--popover))',
                                                borderRadius: '8px',
                                                border: '1px solid hsl(var(--border))',
                                                color: 'hsl(var(--popover-foreground))'
                                            }}
                                        />
                                        <Bar dataKey="deals" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Nuevos Deals" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
