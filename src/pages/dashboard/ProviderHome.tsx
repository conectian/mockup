import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Coins, Eye, FolderKanban, Plus, Search, TrendingUp, Building2, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Mock data for leads
const mockLeads = [
    { id: 1, company: 'Banco Santander', sector: 'Banca', date: 'Hace 2 horas', status: 'Vio tu caso', statusColor: 'bg-blue-500' },
    { id: 2, company: 'Telefónica', sector: 'Telecomunicaciones', date: 'Hace 5 horas', status: 'Abrió chat', statusColor: 'bg-emerald-500' },
    { id: 3, company: 'Repsol', sector: 'Energía', date: 'Ayer', status: 'Vio tu caso', statusColor: 'bg-blue-500' },
    { id: 4, company: 'El Corte Inglés', sector: 'Retail', date: 'Ayer', status: 'Solicitó demo', statusColor: 'bg-violet-500' },
    { id: 5, company: 'Mapfre', sector: 'Seguros', date: 'Hace 2 días', status: 'Vio tu caso', statusColor: 'bg-blue-500' },
];

export default function ProviderHome() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">¡Bienvenido de vuelta!</h1>
                    <p className="text-muted-foreground text-lg">Este es tu centro de operaciones hoy</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Última actualización: hace 5 min</span>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {/* Credits */}
                <Card className="border-0 bg-gradient-to-br from-amber-400/20 via-orange-500/10 to-transparent relative overflow-hidden rounded-md shadow-xl shadow-amber-500/5 group col-span-2 lg:col-span-1">
                    <div className="absolute top-0 right-0 p-3 md:p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Coins className="h-12 w-12 md:h-20 md:w-20 text-amber-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400/70">Créditos Disponibles</CardTitle>
                        <Coins className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div className="text-3xl md:text-5xl font-display font-bold text-amber-700 dark:text-amber-400 mb-2 md:mb-4">150</div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] md:text-xs font-medium text-amber-600/70">Usa créditos para ver leads</span>
                            <Link to="/settings?tab=billing">
                                <Button size="sm" variant="outline" className="h-7 md:h-8 px-2 md:px-3 text-[10px] md:text-xs border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-md font-bold">
                                    Recargar
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Profile Views */}
                <Card className="border-white/5 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Visitas al Perfil</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-primary/10 text-primary">
                            <Eye className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div className="text-3xl md:text-5xl font-display font-bold mb-1 md:mb-2">1,240</div>
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full font-bold text-[10px] md:text-xs">
                            <TrendingUp className="h-3 w-3" />
                            <span>+12%</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Active Deals */}
                <Card className="border-white/5 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-1 md:pb-2 p-4 md:p-6">
                        <CardTitle className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Deals Activos</CardTitle>
                        <div className="p-1.5 md:p-2 rounded-md bg-indigo-500/10 text-indigo-500">
                            <FolderKanban className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
                        <div className="text-3xl md:text-5xl font-display font-bold mb-1 md:mb-2">3</div>
                        <p className="text-[10px] md:text-sm font-medium text-muted-foreground">Oportunidades abiertas</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Leads Table - Takes 2 columns */}
                <Card className="lg:col-span-2 border-white/5 rounded-md shadow-sm overflow-hidden">
                    <CardHeader className="px-8 pt-8">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl font-display font-bold">Última Actividad</CardTitle>
                                <p className="text-sm text-muted-foreground">Monitorea quién interactúa con tus soluciones</p>
                            </div>
                            <Link to="/provider/leads">
                                <Button variant="ghost" size="sm" className="font-bold text-primary rounded-md hover:bg-primary/5">
                                    Ver historial completo
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <div className="space-y-4 mt-4">
                            {mockLeads.map((lead) => (
                                <div
                                    key={lead.id}
                                    className="flex items-center justify-between p-4 rounded-md bg-muted/30 hover:bg-muted/60 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/5 group"
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 rounded-md shadow-sm">
                                            <AvatarFallback className="bg-gradient-to-br from-slate-200 to-slate-400 text-slate-700 text-base font-bold">
                                                {lead.company.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold text-base group-hover:text-primary transition-colors">{lead.company}</div>
                                            <div className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mt-0.5">
                                                <Building2 className="h-3 w-3" />
                                                {lead.sector} • {lead.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <Badge variant="secondary" className={cn(
                                            "gap-2 px-3 py-1 text-xs font-bold rounded-full border-0",
                                            lead.statusColor.replace('bg-', 'bg-') + "/10",
                                            lead.statusColor.replace('bg-', 'text-')
                                        )}>
                                            <div className={cn("h-2 w-2 rounded-full animate-pulse", lead.statusColor)} />
                                            {lead.status}
                                        </Badge>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <Card className="border-0 premium-gradient rounded-md shadow-2xl shadow-indigo-500/20 text-white overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px]" />
                        <CardHeader className="relative z-10 px-8 pt-8">
                            <CardTitle className="text-lg font-display font-bold">Impulsa tu catálogo</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 px-8 pb-8 space-y-4">
                            <Link to="/provider/catalog" className="block">
                                <Button className="w-full gap-3 h-14 bg-white text-indigo-600 hover:bg-white/95 scale-100 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-base rounded-md shadow-xl shadow-black/10">
                                    <Plus className="h-6 w-6" />
                                    Nuevo Caso de Uso
                                </Button>
                            </Link>
                            <Link to="/provider/marketplace" className="block">
                                <Button className="w-full gap-2 h-14 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:border-white/30 backdrop-blur-md font-bold rounded-md transition-all">
                                    <Search className="h-5 w-5" />
                                    Explorar RFPs
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="border-white/5 rounded-md shadow-sm bg-muted/20">
                        <CardContent className="p-8">
                            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-6 flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-violet-500" />
                                Próximos pasos
                            </h4>
                            <div className="space-y-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Perfil de empresa</div>
                                        <div className="text-muted-foreground/80 mt-1">Tu perfil está al 80%. Añade un banner.</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-amber-500" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Casos de Uso</div>
                                        <div className="text-muted-foreground/80 mt-1">Sube 2 casos más para ser "Verified Partner".</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-bold">Créditos de visibilidad</div>
                                        <div className="text-muted-foreground/80 mt-1">Has consumido el 40% de tus créditos mensuales.</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
