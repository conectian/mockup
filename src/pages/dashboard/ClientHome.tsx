import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FolderKanban, Search, ArrowRight, Sparkles, TrendingUp, Euro, Clock, Zap, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock recommended use cases
const mockRecommendations = [
    {
        id: 1,
        title: 'Automatización de Facturas con IA',
        provider: 'DataFlow AI',
        category: 'Fintech',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop',
    },
    {
        id: 2,
        title: 'Chatbot de Soporte 24/7',
        provider: 'BotMaster',
        category: 'Customer Service',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=200&fit=crop',
    },
    {
        id: 3,
        title: 'Analytics Predictivo de Ventas',
        provider: 'InsightPro',
        category: 'Analytics',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop',
    },
    {
        id: 4,
        title: 'Optimización de Logística con IA',
        provider: 'LogiSmart',
        category: 'Logistics',
        image: 'https://images.unsplash.com/photo-1566576912902-1b91ceb5ec3f?w=400&h=200&fit=crop',
    },
];

export default function ClientHome() {
    const companyName = 'Acme Corp'; // Mock company name

    return (
        <div className="space-y-10">
            {/* Hero Banner - Compact & Light */}
            <Card className="border border-primary/10 bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden relative rounded-md shadow-lg shadow-primary/5">
                <div className="absolute inset-0 bg-primary/5 backdrop-blur-[1px]" />
                <CardContent className="py-8 px-8 md:px-10 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="max-w-xl">
                            <h1 className="text-2xl md:text-3xl font-display font-bold mb-1 tracking-tight text-foreground">
                                Hola, {companyName} <span className="inline-block animate-bounce-slow">👋</span>
                            </h1>
                            <p className="text-muted-foreground text-base md:text-lg font-medium">
                                ¿Qué desafío de innovación resolvemos hoy para tu empresa?
                            </p>
                        </div>
                        <Link to="/client/marketplace" className="shrink-0">
                            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-lg shadow-primary/20 px-6 h-12 text-base font-bold rounded-md transition-all hover:scale-105 active:scale-95">
                                <Search className="h-5 w-5" />
                                Explorar Soluciones
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* ROI & Value Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Ahorros Estimados */}
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Euro className="h-12 w-12 md:h-24 md:w-24 -mr-4 md:-mr-8 -mt-4 md:-mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">Ahorros Estimados</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-emerald-500/20 text-emerald-500">
                            <Euro className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div>
                            <div className="text-2xl md:text-5xl font-display font-bold text-emerald-500">€245K</div>
                            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-1 text-balance">Ahorro anual proyectado</p>
                            <div className="flex items-center gap-1 mt-2">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <span className="text-xs font-bold text-emerald-500">+32% vs año anterior</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ROI Promedio */}
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-blue-500/20 bg-blue-500/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <TrendingUp className="h-12 w-12 md:h-24 md:w-24 -mr-4 md:-mr-8 -mt-4 md:-mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">ROI Promedio</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-blue-500/20 text-blue-500">
                            <Target className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div>
                            <div className="text-2xl md:text-5xl font-display font-bold text-blue-500">285%</div>
                            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-1 text-balance">En proyectos activos</p>
                            <div className="flex items-center gap-1 mt-2">
                                <Clock className="h-3 w-3 text-blue-500" />
                                <span className="text-xs font-bold text-blue-500">Payback: 4.2 meses</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tiempo Ahorrado */}
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-amber-500/20 bg-amber-500/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Zap className="h-12 w-12 md:h-24 md:w-24 -mr-4 md:-mr-8 -mt-4 md:-mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">Eficiencia Ganada</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-amber-500/20 text-amber-500">
                            <Zap className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div>
                            <div className="text-2xl md:text-5xl font-display font-bold text-amber-500">1,840h</div>
                            <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-1 text-balance">Horas ahorradas/año</p>
                            <div className="flex items-center gap-1 mt-2">
                                <Users className="h-3 w-3 text-amber-500" />
                                <span className="text-xs font-bold text-amber-500">≈ 1.1 FTE liberados</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Deal Rooms */}
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-indigo-500/20 bg-indigo-500/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FolderKanban className="h-12 w-12 md:h-24 md:w-24 -mr-4 md:-mr-8 -mt-4 md:-mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">Deal Rooms</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-indigo-500/20 text-indigo-500">
                            <FolderKanban className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
                            <div>
                                <div className="text-2xl md:text-5xl font-display font-bold text-indigo-500">3</div>
                                <p className="text-[10px] md:text-sm font-medium text-muted-foreground mt-0.5 md:mt-1 text-balance">Proyectos activos</p>
                            </div>
                            <Link to="/client/deal-rooms">
                                <Button variant="ghost" size="sm" className="h-8 rounded-md gap-1.5 md:gap-2 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-all text-[10px] md:text-sm">
                                    Ir a salas
                                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommendations */}
            <div className="pt-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-violet-500">
                            <Sparkles className="h-5 w-5 fill-current" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">IA Recomendaciones</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold tracking-tight">Seleccionado para ti</h2>
                    </div>
                    <Link to="/client/marketplace">
                        <Button variant="outline" className="rounded-md border-white/10 hover:bg-white/5 font-bold gap-2">
                            Ver catálogo completo
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="zoom-adaptive-grid">
                    {mockRecommendations.map((item) => (
                        <Card key={item.id} className="py-0 overflow-hidden group cursor-pointer border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-md">
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30">
                                        Explorar detalles
                                    </Badge>
                                </div>
                                <Badge className="absolute top-4 left-4 glass-card text-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                                    {item.category}
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                        {item.provider.charAt(0)}
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground/80">{item.provider}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
