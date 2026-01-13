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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import MatchRadar from '@/components/MatchRadar';

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
                <Link to="/marketplace">
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
        <div className="space-y-6">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground">
                <Link to="/marketplace" className="hover:text-foreground transition-colors">
                    Marketplace
                </Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="hover:text-foreground transition-colors">{useCase.industry}</span>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground font-medium truncate max-w-[200px]">{useCase.title}</span>
            </nav>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Header */}
                    <div className="relative rounded-md overflow-hidden">
                        <img
                            src={useCase.image}
                            alt={useCase.title}
                            className="w-full h-48 md:h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                {useCase.techStack.map((tech) => (
                                    <Badge key={tech} variant="secondary" className="bg-white/20 text-white border-0">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white">{useCase.title}</h1>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="solution" className="w-full">
                        <TabsList className="w-full justify-start h-auto p-1 bg-muted/50">
                            <TabsTrigger value="solution" className="gap-2">
                                <Target className="h-4 w-4" />
                                Desafío y Solución
                            </TabsTrigger>
                            <TabsTrigger value="roi" className="gap-2">
                                <TrendingUp className="h-4 w-4" />
                                Resultados
                            </TabsTrigger>
                            <TabsTrigger value="technical" className="gap-2">
                                <Settings className="h-4 w-4" />
                                Detalles Técnicos
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="solution" className="mt-6 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-red-500" />
                                        El Desafío
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Las empresas del sector {useCase.industry} enfrentan procesos manuales que consumen tiempo y recursos.
                                        La falta de automatización genera errores, retrasos y costes operativos elevados.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Zap className="h-5 w-5 text-emerald-500" />
                                        La Solución
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{useCase.description}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="roi" className="mt-6">
                            <div className="grid gap-4 md:grid-cols-3">
                                <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800">
                                    <CardContent className="pt-6 text-center">
                                        <div className="text-3xl font-bold text-emerald-600 mb-1">{useCase.roi}</div>
                                        <p className="text-sm text-muted-foreground">Beneficio Principal</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
                                    <CardContent className="pt-6 text-center">
                                        <div className="text-3xl font-bold text-blue-600 mb-1">3 meses</div>
                                        <p className="text-sm text-muted-foreground">Time to Value</p>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-violet-200 dark:border-violet-800">
                                    <CardContent className="pt-6 text-center">
                                        <div className="text-3xl font-bold text-violet-600 mb-1">98%</div>
                                        <p className="text-sm text-muted-foreground">Satisfacción</p>
                                    </CardContent>
                                </Card>
                            </div>
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
                                    className="w-full h-12 text-base gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                                    onClick={() => setContactModalOpen(true)}
                                >
                                    Solicitar Propuesta
                                </Button>

                                <Button variant="outline" className="w-full mt-2 gap-2">
                                    <Download className="h-4 w-4" />
                                    Descargar One-Pager (PDF)
                                </Button>
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
