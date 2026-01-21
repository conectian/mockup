import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    ArrowLeft,
    MessageSquare,
    Plus,
    CheckCircle,
    Clock,
    Sparkles,
    ArrowRight,
    Target,
    FileText,
    TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock Data for Received Proposals (Use Cases)
const mockProposals = [
    {
        id: 'prop-001',
        title: 'Automatización de Facturación con IA',
        provider: 'TechFlow Solutions',
        providerInitials: 'TF',
        providerColor: 'bg-blue-600',
        matchScore: 98,
        description: 'Solución integral para automatizar el procesamiento de facturas utilizando modelos de LLM avanzados para extracción de datos.',
        price: '€12k - €15k',
        timeline: '2 meses',
        status: 'new',
        tags: ['Automata', 'Finance', 'OCR'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop'
    },
    {
        id: 'prop-002',
        title: 'Sistema de Conciliación Inteligente',
        provider: 'DataMinds Corp',
        providerInitials: 'DM',
        providerColor: 'bg-purple-600',
        matchScore: 92,
        description: 'Plataforma de conciliación bancaria en tiempo real conectada a ERPs principales (SAP, Oracle). Detección de anomalías.',
        price: '€25k',
        timeline: '3 meses',
        status: 'reviewed',
        tags: ['ERP', 'Banking', 'Real-time'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
        id: 'prop-003',
        title: 'Bot de Soporte Financiero',
        provider: 'AI Service Pro',
        providerInitials: 'AS',
        providerColor: 'bg-emerald-600',
        matchScore: 85,
        description: 'Chatbot especializado en resolver dudas de facturación para proveedores internos y externos. Disponible 24/7.',
        price: '€8k',
        timeline: '4 semanas',
        status: 'shortlisted',
        tags: ['Chatbot', 'Support', 'NLP'],
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop'
    }
];

export default function ClientRequestDetail() {
    const { id } = useParams();

    return (
        <div className="max-w-7xl mx-auto space-y-8 p-6 pb-20">
            {/* Header Navigation */}
            <div className="flex items-center gap-4">
                <Link to="/client/marketplace?tab=propuestas">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted">
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/5 text-emerald-600 gap-1.5 py-0.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Solicitud Activa
                        </Badge>
                        <span className="text-xs text-muted-foreground font-mono">REQ-{id}</span>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Optimización de Procesos Financieros</h1>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 hidden sm:flex">
                        <FileText className="h-4 w-4" />
                        Ver Detalles
                    </Button>
                    <Button className="gap-2 bg-primary text-white shadow-lg shadow-primary/20">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Invitar Proveedores</span>
                        <span className="sm:hidden">Invitar</span>
                    </Button>
                </div>
            </div>

            {/* Main Layout Grid */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Left Column: Proposals List */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-amber-500" />
                            Propuestas Recibidas
                            <Badge variant="secondary" className="ml-2 rounded-full px-2.5">{mockProposals.length}</Badge>
                        </h2>

                        {/* Simple Filter mock */}
                        <div className="text-sm text-muted-foreground">
                            Ordenar por: <span className="font-medium text-foreground cursor-pointer hover:underline">Match %</span>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {mockProposals.map((proposal) => (
                            <Card key={proposal.id} className="group border-white/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Card Image Side (Mobile: Top, Desktop: Left) */}
                                    <div className="relative sm:w-48 shrink-0 aspect-video sm:aspect-auto overflow-hidden">
                                        <img
                                            src={proposal.image}
                                            alt={proposal.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/10" />

                                        <div className="absolute bottom-3 left-3 sm:top-3 sm:left-3 sm:bottom-auto">
                                            <Badge className="bg-white/90 text-black backdrop-blur-md border-0 font-bold shadow-sm gap-1">
                                                <Target className="h-3 w-3 text-emerald-600" />
                                                {proposal.matchScore}% Match
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <CardContent className="flex-1 p-5 md:p-6 flex flex-col">
                                        {/* Header: Provider & Tags */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className={cn("text-[10px] text-white", proposal.providerColor)}>
                                                        {proposal.providerInitials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-semibold text-muted-foreground">{proposal.provider}</span>
                                            </div>
                                            {proposal.status === 'new' && (
                                                <Badge variant="default" className="bg-blue-500 text-[10px] h-5 px-2">NUEVA</Badge>
                                            )}
                                        </div>

                                        {/* Title & Desc */}
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                            {proposal.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                            {proposal.description}
                                        </p>

                                        {/* Metrics Grid */}
                                        <div className="grid grid-cols-2 gap-4 mb-5 p-3 rounded-lg bg-muted/30 border border-white/5">
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Inversión Est.</p>
                                                <p className="text-sm font-semibold">{proposal.price}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tiempo Est.</p>
                                                <p className="text-sm font-semibold flex items-center gap-1">
                                                    <Clock className="h-3 w-3 text-muted-foreground" />
                                                    {proposal.timeline}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Footer Actions */}
                                        <div className="mt-auto pt-2 flex items-center justify-between gap-4">
                                            <div className="flex gap-2 overflow-hidden mask-linear-fade">
                                                {proposal.tags.map(tag => (
                                                    <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-muted border border-white/5 text-muted-foreground whitespace-nowrap">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <Button size="sm" className="gap-2 font-semibold md:px-6 shrink-0 group/btn">
                                                Analizar
                                                <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                                {/* Highlight Bar based on status/score */}
                                <div className={cn("h-1 w-full",
                                    proposal.matchScore > 90 ? "bg-emerald-500" :
                                        proposal.matchScore > 80 ? "bg-amber-500" : "bg-slate-500"
                                )} />
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right Column: Sidebar Info */}
                <div className="space-y-6">
                    <Card className="p-6 border-white/10 sticky top-24">
                        <h3 className="font-bold border-b border-white/10 pb-4 mb-4 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Estadísticas de la Solicitud
                        </h3>
                        <div className="space-y-5">
                            {/* Stats Items */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                    <MessageSquare className="h-4 w-4" /> Propuestas
                                </span>
                                <span className="text-xl font-display font-bold">3</span>
                            </div>
                            <Progress value={25} className="h-1.5" />

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Target className="h-4 w-4" /> Match Promedio
                                </span>
                                <span className="text-xl font-display font-bold text-emerald-500">91%</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <span className="text-sm text-muted-foreground">Vistas Totales</span>
                                <span className="font-mono font-medium">1,240</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Tiempo Restante</span>
                                <span className="font-mono font-medium text-amber-500">5 días</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <h4 className="text-sm font-semibold mb-3">Requisitos Clave</h4>
                            <ul className="space-y-2">
                                {[
                                    'Integración SAP nativa',
                                    'Soporte Multi-idioma',
                                    'Certificación ISO 27001'
                                ].map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mt-0.5 shrink-0" />
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>

            </div>
        </div >
    );
}
