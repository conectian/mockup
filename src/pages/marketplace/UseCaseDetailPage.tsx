import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockUseCases } from '@/data/marketplace-data';
import ContactProviderModal from '@/components/marketplace/ContactProviderModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronRight,
    Award,
    ShieldCheck,
    Medal,
    Download,
    Shield,
    Clock,
    TrendingUp,
    Target,
    Zap,
    Settings,
    ArrowLeft,
    CheckCircle2,
    MessageSquare,
    DollarSign,
    BarChart3,
    AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MatchRadar from '@/components/MatchRadar';
import ROICalculator from '@/components/marketplace/ROICalculator';

const tierConfig = {
    Gold: {
        icon: Award,
        className: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0',
        label: 'Gold Partner',
    },
    Silver: {
        icon: ShieldCheck,
        className: 'bg-gradient-to-r from-slate-400 to-slate-300 text-slate-800 border-0',
        label: 'Silver Partner',
    },
    Bronze: {
        icon: Medal,
        className: 'bg-gradient-to-r from-orange-400 to-amber-600 text-white border-0',
        label: 'Bronze Partner',
    },
};

export default function UseCaseDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [contactModalOpen, setContactModalOpen] = useState(false);

    const useCase = mockUseCases.find((uc) => uc.id === id);

    if (!useCase) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 text-muted-foreground" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Caso no encontrado</h1>
                <p className="text-muted-foreground mb-6">
                    El caso de uso que buscas no existe o ha sido eliminado.
                </p>
                <Link to="/client/marketplace">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Volver al Marketplace
                    </Button>
                </Link>
            </div>
        );
    }

    const tier = tierConfig[useCase.providerTier];
    const TierIcon = tier.icon;

    return (
        <div className="space-y-6 min-w-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-xs md:text-sm text-muted-foreground overflow-x-auto scrollbar-none">
                <Link to="/client/marketplace" className="hover:text-foreground transition-colors shrink-0">
                    Marketplace
                </Link>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mx-1 md:mx-2 shrink-0" />
                <span className="hover:text-foreground transition-colors shrink-0">{useCase.industry}</span>
                <ChevronRight className="h-3 w-3 md:h-4 md:w-4 mx-1 md:mx-2 shrink-0" />
                <span className="text-foreground font-medium truncate">{useCase.title}</span>
            </nav>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="relative rounded-xl overflow-hidden border border-white/10">
                        <img
                            src={useCase.image}
                            alt={useCase.title}
                            className="w-full h-56 md:h-72 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute top-4 left-4 right-4">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 backdrop-blur-sm">
                                IA & Automatización
                            </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {useCase.techStack.slice(0, 4).map((tech) => (
                                    <Badge key={tech} variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                                        {tech}
                                    </Badge>
                                ))}
                                {useCase.techStack.length > 4 && (
                                    <Badge variant="secondary" className="bg-white/20 text-white border-0 backdrop-blur-sm">
                                        +{useCase.techStack.length - 4} más
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">{useCase.title}</h1>
                            <p className="text-white/80 text-sm md:text-base">
                                Reducción del fraude transaccional en 25% mediante Machine Learning
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="solution" className="w-full">
                        <div className="overflow-x-auto scrollbar-none -mx-1 px-1">
                            <TabsList className="w-full justify-start h-auto p-1 bg-muted/50 min-w-max">
                                <TabsTrigger value="solution" className="gap-1.5 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                                    <Target className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    <span className="hidden xs:inline">Desafío y</span> Solución
                                </TabsTrigger>
                                <TabsTrigger value="roi" className="gap-1.5 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                                    <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    Resultados
                                </TabsTrigger>
                                <TabsTrigger value="technical" className="gap-1.5 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                                    <Settings className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    Detalles
                                </TabsTrigger>
                                <TabsTrigger value="calculator" className="gap-1.5 md:gap-2 text-xs md:text-sm px-2 md:px-3">
                                    <DollarSign className="h-3.5 w-3.5 md:h-4 md:w-4" />
                                    Calculadora ROI
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <TabsContent value="solution" className="mt-6 space-y-6">
                            <Card className="border-red-500/20 bg-red-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                            <AlertTriangle className="h-5 w-5 text-red-500" />
                                        </div>
                                        <span>El Desafío</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-base leading-relaxed">
                                        El banco enfrentaba un aumento del 40% en transacciones fraudulentas en los últimos 18 meses, con 
                                        pérdidas estimadas de €3.2M anuales. Los sistemas de detección basados en reglas generaban un alto 
                                        número de falsos positivos (65%), afectando la experiencia del cliente.
                                    </p>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400">
                                            Pérdidas: €3.2M/año
                                        </Badge>
                                        <Badge variant="outline" className="bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400">
                                            Falsos positivos: 65%
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-emerald-500/20 bg-emerald-500/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-emerald-500" />
                                        </div>
                                        <span>La Solución Implementada</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-base leading-relaxed">
                                        Implementamos un modelo de Machine Learning basado en XGBoost con:
                                    </p>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                            <span className="text-sm">Análisis en tiempo real de 150+ variables</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                            <span className="text-sm">Detección de patrones anómalos con 97.3% de precisión</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                            <span className="text-sm">Integración con sistemas legacy vía API REST</span>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                                            <span className="text-sm">Dashboard de monitoreo 24/7 para el equipo de fraude</span>
                                        </li>
                                    </ul>
                                    <div className="pt-2">
                                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                            Stack Tecnológico:
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            <Badge variant="secondary" className="bg-emerald-500/10 border-emerald-500/20">
                                                Python
                                            </Badge>
                                            <Badge variant="secondary" className="bg-emerald-500/10 border-emerald-500/20">
                                                XGBoost
                                            </Badge>
                                            <Badge variant="secondary" className="bg-emerald-500/10 border-emerald-500/20">
                                                TensorFlow
                                            </Badge>
                                            <Badge variant="secondary" className="bg-emerald-500/10 border-emerald-500/20">
                                                AWS
                                            </Badge>
                                            <Badge variant="secondary" className="bg-emerald-500/10 border-emerald-500/20">
                                                Docker
                                            </Badge>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="roi" className="mt-6 space-y-6">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5 text-blue-500" />
                                        Resultados Cuantificables
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                        {/* ROI Card */}
                                        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                                            <CardContent className="pt-6 pb-6 text-center">
                                                <div className="h-14 w-14 mx-auto mb-3 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                                    <DollarSign className="h-7 w-7 text-emerald-500" />
                                                </div>
                                                <div className="text-4xl font-bold text-emerald-500 mb-2">300%</div>
                                                <p className="text-sm font-medium text-muted-foreground">ROI</p>
                                            </CardContent>
                                        </Card>

                                        {/* Reducción de Fraude */}
                                        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                                            <CardContent className="pt-6 pb-6 text-center">
                                                <div className="h-14 w-14 mx-auto mb-3 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                                    <ShieldCheck className="h-7 w-7 text-blue-500" />
                                                </div>
                                                <div className="text-4xl font-bold text-blue-500 mb-2">25%</div>
                                                <p className="text-sm font-medium text-muted-foreground">Reducción de Fraude</p>
                                            </CardContent>
                                        </Card>

                                        {/* Falsos Positivos */}
                                        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                                            <CardContent className="pt-6 pb-6 text-center">
                                                <div className="h-14 w-14 mx-auto mb-3 rounded-xl bg-green-500/20 flex items-center justify-center">
                                                    <CheckCircle2 className="h-7 w-7 text-green-500" />
                                                </div>
                                                <div className="text-4xl font-bold text-green-500 mb-2">-45%</div>
                                                <p className="text-sm font-medium text-muted-foreground">Falsos Positivos</p>
                                            </CardContent>
                                        </Card>

                                        {/* Tiempo de Detección */}
                                        <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
                                            <CardContent className="pt-6 pb-6 text-center">
                                                <div className="h-14 w-14 mx-auto mb-3 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                                    <Zap className="h-7 w-7 text-amber-500" />
                                                </div>
                                                <div className="text-4xl font-bold text-amber-500 mb-2">&lt;2s</div>
                                                <p className="text-sm font-medium text-muted-foreground">Tiempo de detección</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Resumen de Métricas */}
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-base font-semibold">Resumen de Métricas</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
                                            <div>
                                                <div className="font-medium">Industria</div>
                                                <p className="text-sm text-muted-foreground">Banca/Fintech</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="h-2 w-2 rounded-full bg-blue-500 mt-2"></div>
                                            <div>
                                                <div className="font-medium">Tamaño de empresa</div>
                                                <p className="text-sm text-muted-foreground">3 meses</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="h-2 w-2 rounded-full bg-violet-500 mt-2"></div>
                                            <div>
                                                <div className="font-medium">5 Analistas de Datos</div>
                                                <p className="text-sm text-muted-foreground">Tiempo de equipo</p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="technical" className="mt-6">
                            <Card>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Integraciones</div>
                                            <p className="text-sm text-muted-foreground">
                                                API REST, Webhooks, SAP, Salesforce, Microsoft 365
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Tiempo de implementación</div>
                                            <p className="text-sm text-muted-foreground">
                                                4-8 semanas según complejidad
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Requisitos</div>
                                            <p className="text-sm text-muted-foreground">
                                                Acceso API al sistema origen, documentación de procesos actuales
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                                        <div>
                                            <div className="font-medium">Stack Tecnológico</div>
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {useCase.techStack.map((tech) => (
                                                    <Badge key={tech} variant="outline">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="calculator" className="mt-6">
                            <ROICalculator 
                                defaultSavingsPercentage={25}
                                defaultImplementationCost={50000}
                                defaultImplementationTime={3}
                            />
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-6 space-y-4">
                        {/* Match Radar */}
                        <MatchRadar />


                        {/* Provider Card */}
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                        {useCase.providerName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-semibold">{useCase.providerName}</div>
                                        <Badge className={cn("mt-1", tier.className)}>
                                            <TierIcon className="h-3 w-3 mr-1" />
                                            {tier.label}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                    <ShieldCheck className="h-4 w-4 text-emerald-500" />
                                    Proveedor verificado
                                </div>

                                <Button
                                    className="w-full h-12 text-base gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-semibold"
                                    onClick={() => setContactModalOpen(true)}
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    Empezar Chat
                                </Button>

                                <Button variant="outline" className="w-full mt-2 gap-2 hover:bg-white/10">
                                    <Download className="h-4 w-4" />
                                    Descargar One-Pager (PDF)
                                </Button>

                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span className="text-muted-foreground">Respuesta típica en 2-4 horas</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Guarantee */}
                        <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
                            <CardContent className="pt-4 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                                        <Shield className="h-5 w-5 text-emerald-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-emerald-800 dark:text-emerald-200">Garantía Conectian</div>
                                        <div className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            Respuesta en 24h
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Contact Modal */}
            <ContactProviderModal
                isOpen={contactModalOpen}
                onClose={() => setContactModalOpen(false)}
                providerName={useCase.providerName}
                useCaseTitle={useCase.title}
            />
        </div>
    );
}
