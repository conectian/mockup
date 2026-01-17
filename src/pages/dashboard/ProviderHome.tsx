import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coins, Eye, FolderKanban, Plus, Search, TrendingUp, Building2, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/common/PageHeader';
import StatsCard from '@/components/common/StatsCard';
import StatusBadge, { type StatusType } from '@/components/common/StatusBadge';
import CompanyAvatar from '@/components/common/CompanyAvatar';

// Mock data for leads
const mockLeads = [
    { id: 1, company: 'Banco Santander', sector: 'Banca', date: 'Hace 2 horas', status: 'Vio tu caso', statusType: 'blue' as StatusType },
    { id: 2, company: 'Telefónica', sector: 'Telecomunicaciones', date: 'Hace 5 horas', status: 'Abrió chat', statusType: 'active' as StatusType },
    { id: 3, company: 'Repsol', sector: 'Energía', date: 'Ayer', status: 'Vio tu caso', statusType: 'blue' as StatusType },
    { id: 4, company: 'El Corte Inglés', sector: 'Retail', date: 'Ayer', status: 'Solicitó demo', statusType: 'purple' as StatusType },
    { id: 5, company: 'Mapfre', sector: 'Seguros', date: 'Hace 2 días', status: 'Vio tu caso', statusType: 'blue' as StatusType },
];

export default function ProviderHome() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <PageHeader
                title="¡Bienvenido de vuelta!"
                description="Este es tu centro de operaciones hoy"
            >
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Última actualización: hace 5 min</span>
                </div>
            </PageHeader>

            {/* KPI Row */}
            <div className="grid gap-6 md:grid-cols-3">
                {/* Credits */}
                <StatsCard
                    title="Créditos Disponibles"
                    value={150}
                    icon={Coins}
                    gradient="from-amber-400/20 via-orange-500/10 to-transparent"
                    iconColor="text-amber-500"
                    titleColor="text-amber-600 dark:text-amber-400/70"
                    textColor="text-amber-700 dark:text-amber-400"
                    shadowColor="shadow-amber-500/5"
                    showHeaderIcon={true}
                >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-amber-600/70">Usa créditos para ver leads</span>
                        <Link to="/settings?tab=billing">
                            <Button size="sm" variant="outline" className="h-8 text-xs border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-md font-bold">
                                Recargar
                            </Button>
                        </Link>
                    </div>
                </StatsCard>

                {/* Profile Views */}
                <StatsCard
                    title="Visitas al Perfil"
                    value="1,240"
                    icon={Eye}
                    gradient="from-blue-400/20 via-indigo-500/10 to-transparent"
                    iconColor="text-blue-500"
                    titleColor="text-blue-600 dark:text-blue-400/70"
                    textColor="text-blue-700 dark:text-blue-400"
                    shadowColor="shadow-blue-500/5"
                    showHeaderIcon={true}
                >
                    <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 w-fit px-2 py-0.5 rounded-full font-bold text-xs">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12%</span>
                    </div>
                </StatsCard>

                {/* Active Deals */}
                <StatsCard
                    title="Deals Activos"
                    value={3}
                    icon={FolderKanban}
                    gradient="from-indigo-400/20 via-violet-500/10 to-transparent"
                    iconColor="text-indigo-500"
                    titleColor="text-indigo-600 dark:text-indigo-400/70"
                    textColor="text-indigo-700 dark:text-indigo-400"
                    shadowColor="shadow-indigo-500/5"
                    showHeaderIcon={true}
                >
                    <p className="text-sm font-medium text-muted-foreground">Oportunidades abiertas</p>
                </StatsCard>
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
                                        <CompanyAvatar
                                            alt={lead.company}
                                            size="lg"
                                            variant="neutral"
                                        />
                                        <div>
                                            <div className="font-bold text-base group-hover:text-primary transition-colors">{lead.company}</div>
                                            <div className="text-xs text-muted-foreground/80 flex items-center gap-1.5 mt-0.5">
                                                <Building2 className="h-3 w-3" />
                                                {lead.sector} • {lead.date}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <StatusBadge status={lead.statusType} className="gap-2 px-3 py-1 text-xs">
                                            {lead.status}
                                        </StatusBadge>
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
