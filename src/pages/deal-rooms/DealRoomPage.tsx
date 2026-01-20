import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDealStore } from '@/store/useDealStore';
import { useAuthStore } from '@/store/useAuthStore';
import DealRightSidebar from '@/components/deal-room/DealRightSidebar';
import DealChat from '@/components/deal-room/DealChat';
import DealFinance from '@/components/deal-room/DealFinance';
import DealDocs from '@/components/deal-room/DealDocs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    MessageSquare,
    Calculator,
    FolderOpen,
    FileText as FileTextIcon,
    FileText,
    Users,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Menu,
    Settings,
    CheckCircle2,
    Zap,
    Calendar,
    Flag,
    Scale,

    Headphones,
    Clock,
    Eye,
    Pencil,
    Plus,
    Search,
    CheckCircle,
    AlertCircle,
    CircleDashed,

} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

import { cn } from '@/lib/utils';

type DealView = 'chat' | 'finance' | 'docs' | 'spec' | 'participants' | 'milestones' | 'legal' | 'reviews' | 'support' | 'proposal';

export default function DealRoomPage() {
    const { dealTitle, participants } = useDealStore();
    const { userType } = useAuthStore();
    
    // Group definitions
    type DealGroup = 'documentation' | 'communication' | 'milestones' | 'closing';
    
    interface GroupDef {
        id: DealGroup;
        label: string;
        icon: any;
        views: { id: DealView; label: string; icon: any }[];
    }

    
    const groups: GroupDef[] = [
        {
            id: 'documentation',
            label: 'Documentación',
            icon: FolderOpen,
            views: [
                { id: 'spec', label: 'Ficha Técnica', icon: FileTextIcon },
                { id: 'finance', label: 'Business Case', icon: Calculator },
                { id: 'legal', label: 'Legal & NDA', icon: Scale },
                { id: 'docs', label: 'Documentos', icon: FolderOpen },
                { id: 'proposal', label: 'Propuesta', icon: FileText },
            ]
        },
        {
            id: 'communication',
            label: 'Comunicación',
            icon: MessageSquare,
            views: [
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'support', label: 'Soporte', icon: Headphones },
                { id: 'participants', label: 'Equipos', icon: Users },
            ]
        },
        {
            id: 'milestones',
            label: 'Roadmap',
            icon: Flag,
            views: [
                { id: 'milestones', label: 'Hitos', icon: Flag },
            ]
        }
    ];

    const [searchParams, setSearchParams] = useSearchParams();
    const viewParam = searchParams.get('view') as DealView;
    const initialView = (viewParam && ['chat', 'finance', 'docs', 'spec', 'participants', 'milestones', 'legal', 'reviews', 'support', 'proposal'].includes(viewParam)) 
        ? viewParam 
        : 'chat';

    const [activeView, setActiveView] = useState<DealView>(initialView);
    const [leftMenuExpanded, setLeftMenuExpanded] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Sync state with URL
    const updateActiveView = (view: DealView) => {
        setActiveView(view);
        setSearchParams({ view }, { replace: true });
    };

    // Helper to change group and set default view for that group
    const handleGroupChange = (group: DealGroup) => {
        const targetGroup = groups.find(g => g.id === group);
        if (targetGroup && targetGroup.views.length > 0) {
            updateActiveView(targetGroup.views[0].id);
        }
    };

    const backPath = userType === 'provider' ? '/provider/deal-rooms?tab=dealrooms' : '/client/deal-rooms?tab=dealrooms';

    const renderView = () => {
        switch (activeView) {
            case 'chat':
                return <DealChat />;
            case 'spec':
                return (
                    <div className="p-4 md:p-8 space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Ficha Técnica</h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Especificaciones técnicas y requisitos del proyecto.
                            </p>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-2">
                            {/* Resumen del Proyecto */}
                            <Card className="p-5 border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Resumen del Proyecto</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between py-2 border-b border-border">
                                        <span className="text-muted-foreground">Nombre del Proyecto</span>
                                        <span className="font-medium">Plataforma de Automatización IA</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border">
                                        <span className="text-muted-foreground">Tipo de Solución</span>
                                        <span className="font-medium">SaaS Enterprise</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-border">
                                        <span className="text-muted-foreground">Industria</span>
                                        <span className="font-medium">Tecnología / FinServ</span>
                                    </div>
                                    <div className="flex justify-between py-2">
                                        <span className="text-muted-foreground">Prioridad</span>
                                        <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">Alta</Badge>
                                    </div>
                                </div>
                            </Card>

                            {/* Requisitos Técnicos */}
                            <Card className="p-5 border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                                        <Settings className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Requisitos Técnicos</h3>
                                </div>
                                <ul className="space-y-2.5 text-sm">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>API RESTful con autenticación OAuth 2.0</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>Infraestructura cloud (AWS/Azure/GCP)</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>SLA 99.9% de disponibilidad</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>Cumplimiento GDPR y SOC 2 Type II</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>Soporte para +10,000 usuarios concurrentes</span>
                                    </li>
                                </ul>
                            </Card>

                            {/* Integraciones */}
                            <Card className="p-5 border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                                        <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Integraciones Requeridas</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className="px-3 py-1">Salesforce CRM</Badge>
                                    <Badge variant="outline" className="px-3 py-1">SAP ERP</Badge>
                                    <Badge variant="outline" className="px-3 py-1">Microsoft 365</Badge>
                                    <Badge variant="outline" className="px-3 py-1">Slack</Badge>
                                    <Badge variant="outline" className="px-3 py-1">Jira</Badge>
                                    <Badge variant="outline" className="px-3 py-1">Power BI</Badge>
                                    <Badge variant="outline" className="px-3 py-1">Zapier</Badge>
                                </div>
                            </Card>

                            {/* Timeline */}
                            <Card className="p-5 border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <h3 className="font-semibold text-lg">Timeline Estimado</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">1</div>
                                        <div className="flex-1">
                                            <p className="font-medium">Fase de Diseño</p>
                                            <p className="text-xs text-muted-foreground">4-6 semanas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">2</div>
                                        <div className="flex-1">
                                            <p className="font-medium">Desarrollo MVP</p>
                                            <p className="text-xs text-muted-foreground">8-12 semanas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">3</div>
                                        <div className="flex-1">
                                            <p className="font-medium">Testing y QA</p>
                                            <p className="text-xs text-muted-foreground">3-4 semanas</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold text-white">4</div>
                                        <div className="flex-1">
                                            <p className="font-medium">Go-Live</p>
                                            <p className="text-xs text-muted-foreground">Q2 2026</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Alcance detallado */}
                        <Card className="p-5 border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="font-semibold text-lg">Alcance del Proyecto</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                El proyecto contempla el diseño, desarrollo e implementación de una plataforma integral de automatización
                                basada en inteligencia artificial. La solución permitirá optimizar procesos operativos, reducir tiempos
                                de gestión y mejorar la toma de decisiones mediante dashboards analíticos en tiempo real.
                            </p>
                            <div className="grid sm:grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-primary">€85K</p>
                                    <p className="text-xs text-muted-foreground">Presupuesto Base</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-primary">6</p>
                                    <p className="text-xs text-muted-foreground">Meses de Proyecto</p>
                                </div>
                                <div className="p-4 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-primary">12</p>
                                    <p className="text-xs text-muted-foreground">Meses de Soporte</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            case 'finance':
                return <DealFinance />;
            case 'docs':
                return <DealDocs />;
            case 'legal':
                return (
                    <div className="p-4 md:p-8 space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Legal & NDA</h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Documentos legales y acuerdos de confidencialidad del proyecto.
                            </p>
                        </div>

                        {/* Documents Table */}
                        <Card className="border-border overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/30">
                                            <th className="text-left p-4 font-semibold text-sm">Documento</th>
                                            <th className="text-center p-4 font-semibold text-sm">Versión</th>
                                            <th className="text-center p-4 font-semibold text-sm">Estado</th>
                                            <th className="text-center p-4 font-semibold text-sm">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold">Acuerdo de Confidencialidad (NDA)</p>
                                                    <p className="text-sm text-muted-foreground">Acuerdo de no divulgación entre las partes para proteger información confidencial del proyecto.</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-mono text-sm">1.0</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                                    SIGNED
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold">Contrato de Servicios</p>
                                                    <p className="text-sm text-muted-foreground">Contrato principal que establece los términos y condiciones del proyecto.</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-mono text-sm">2.1</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                                                    PENDING
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold">Anexo Técnico</p>
                                                    <p className="text-sm text-muted-foreground">Especificaciones técnicas detalladas del proyecto.</p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="font-mono text-sm">1.3</span>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0">
                                                    DRAFT
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                );
            case 'spec':

            case 'participants':
                return (
                    <div className="p-4 md:p-8 space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Participantes</h2>
                            <p className="text-muted-foreground text-sm md:text-base">Equipo multidisciplinar involucrado en la negociación.</p>
                        </div>

                        {/* Cliente Team */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="font-semibold">Equipo Cliente</h3>
                                <Badge variant="outline" className="ml-auto">3 miembros</Badge>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {participants.filter(p => p.company === 'client').map((p) => (
                                    <Card key={p.id} className="p-4 border-border hover:border-primary/30 transition-colors group relative">
                                        <div className="flex items-start gap-3">
                                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold truncate">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.role}</p>
                                                <p className="text-xs text-primary mt-1">cliente@empresa.com</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-border flex justify-end">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 gap-2 text-muted-foreground hover:text-primary"
                                                onClick={() => updateActiveView('chat')}
                                            >
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                <span className="text-xs">Enviar Mensaje</span>
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Provider Team */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-white" />
                                </div>
                                <h3 className="font-semibold">Equipo Partner</h3>
                                <Badge variant="outline" className="ml-auto">3 miembros</Badge>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {participants.filter(p => p.company === 'provider').map((p) => (
                                    <Card key={p.id} className="p-4 border-border hover:border-emerald-500/30 transition-colors group relative">
                                        <div className="flex items-start gap-3">
                                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-semibold truncate">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.role}</p>
                                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">partner@proveedor.com</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-border flex justify-end">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="h-8 gap-2 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400"
                                                onClick={() => updateActiveView('chat')}
                                            >
                                                <MessageSquare className="h-3.5 w-3.5" />
                                                <span className="text-xs">Enviar Mensaje</span>
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Activity Summary */}
                        <Card className="p-5 border-border">
                            <h3 className="font-semibold mb-4">Resumen de Actividad</h3>
                            <div className="grid sm:grid-cols-4 gap-4 text-center">
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-foreground">24</p>
                                    <p className="text-xs text-muted-foreground">Mensajes</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-foreground">8</p>
                                    <p className="text-xs text-muted-foreground">Documentos</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-foreground">3</p>
                                    <p className="text-xs text-muted-foreground">Reuniones</p>
                                </div>
                                <div className="p-3 rounded-lg bg-muted/50">
                                    <p className="text-2xl font-bold text-foreground">12</p>
                                    <p className="text-xs text-muted-foreground">Días Activos</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            case 'milestones':
                return (
                    <div className="p-4 md:p-8 space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Gestión del Proyecto</h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Seguimiento del progreso y aprobaciones del proyecto.
                            </p>
                        </div>

                        {/* Progress Overview */}
                        <Card className="p-5 border-border bg-gradient-to-br from-primary/5 to-transparent">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Flag className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">Progreso del Proyecto</h3>
                                    <p className="text-sm text-muted-foreground">58% Completado</p>
                                </div>
                                <div className="flex gap-6 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">2</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Completados</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">3</p>
                                        <p className="text-xs text-muted-foreground uppercase tracking-wider">Pendientes</p>
                                    </div>
                                </div>
                            </div>
                            <Progress value={58} className="h-2" />
                        </Card>

                        {/* Milestones List */}
                        <div className="space-y-4">
                            {/* Completed Milestone 1 */}
                            <Card className="p-5 border-border border-l-4 border-l-emerald-500">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">Kick-off Meeting</h4>
                                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                                COMPLETADO
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>15 Nov 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Completed Milestone 2 */}
                            <Card className="p-5 border-border border-l-4 border-l-emerald-500">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                        <CheckCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">Análisis de Requisitos</h4>
                                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-0">
                                                COMPLETADO
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>22 Nov 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* In Progress Milestone */}
                            <Card className="p-5 border-border border-l-4 border-l-amber-500">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                                        <Clock className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">Desarrollo Prototipo</h4>
                                            <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                                                ESPERANDO APROBACIÓN
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                            <Calendar className="h-4 w-4" />
                                            <span>Target: 10 Dic 2025</span>
                                        </div>

                                        {/* Progress */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-muted-foreground">Progreso</span>
                                                <span className="font-semibold text-primary">60%</span>
                                            </div>
                                            <Progress value={60} className="h-2" />
                                        </div>

                                        {/* Approvals */}
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Aprobaciones (2/3)
                                            </p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">C</div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">Carlos Martínez</p>
                                                        <p className="text-xs text-muted-foreground">Project Manager</p>
                                                    </div>
                                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                                </div>
                                                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-bold">A</div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">Ana García</p>
                                                        <p className="text-xs text-muted-foreground">Technical Lead</p>
                                                    </div>
                                                    <Clock className="h-5 w-5 text-amber-500" />
                                                </div>
                                                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">M</div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium">María López</p>
                                                        <p className="text-xs text-muted-foreground">Project Manager</p>
                                                    </div>
                                                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Pending Milestones */}
                            <Card className="p-5 border-border border-l-4 border-l-muted-foreground/30 opacity-60">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <CircleDashed className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">Testing & QA</h4>
                                            <Badge variant="outline">PENDIENTE</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Target: 20 Dic 2025</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-5 border-border border-l-4 border-l-muted-foreground/30 opacity-60">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                                        <CircleDashed className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-semibold text-lg">Go-Live</h4>
                                            <Badge variant="outline">PENDIENTE</Badge>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Target: Q1 2026</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                );

            case 'proposal':
                return (
                    <div className="p-4 md:p-8 space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Propuesta</h2>
                            <p className="text-muted-foreground text-sm md:text-base">
                                Detalles de la propuesta comercial y técnica.
                            </p>
                        </div>
                        <Card className="p-8 border-border flex flex-col items-center justify-center text-center min-h-[400px]">
                            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <FileText className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Propuesta en Revisión</h3>
                            <p className="text-muted-foreground max-w-md mb-6">
                                La propuesta detallada está disponible para su revisión. Por favor, descarga el documento adjunto.
                            </p>
                            <Button variant="outline">
                                <FolderOpen className="mr-2 h-4 w-4" />
                                Ver Documento de Propuesta
                            </Button>
                        </Card>
                    </div>
                );

            case 'support':
                return (
                    <div className="p-4 md:p-8 space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="space-y-1">
                                <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Centro de Soporte</h2>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Gestiona y realiza seguimiento de tus tickets de soporte.
                                </p>
                            </div>
                            <Button className="gap-2 w-fit">
                                <Plus className="h-4 w-4" />
                                Crear Ticket
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Card className="p-5 border-border">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">1</p>
                                        <p className="text-sm font-medium">Tickets Abiertos</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> Requieren atención
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-5 border-border">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <CircleDashed className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</p>
                                        <p className="text-sm font-medium">En Progreso</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Settings className="h-3 w-3" /> En resolución
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-5 border-border">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">0</p>
                                        <p className="text-sm font-medium">Resueltos</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                                            <CheckCircle2 className="h-3 w-3" /> Completados
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Tickets Table */}
                        <Card className="border-border">
                            <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Headphones className="h-4 w-4" />
                                    Tickets de Soporte
                                </h3>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Buscar tickets..." className="pl-10" />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/30">
                                            <th className="text-left p-4 font-semibold text-sm">ID</th>
                                            <th className="text-left p-4 font-semibold text-sm">Título</th>
                                            <th className="text-center p-4 font-semibold text-sm">Categoría</th>
                                            <th className="text-center p-4 font-semibold text-sm">Prioridad</th>
                                            <th className="text-center p-4 font-semibold text-sm">Estado</th>
                                            <th className="text-center p-4 font-semibold text-sm">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-border hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <span className="font-mono text-sm">TICK-001</span>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold">Pregunta sobre integración de APIs</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> Creado: 2024-01-20
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge variant="outline" className="border-cyan-500 text-cyan-600 dark:text-cyan-400">
                                                    TÉCNICO
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-0">
                                                    MEDIA
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-0">
                                                    ABIERTO
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-muted/20 transition-colors">
                                            <td className="p-4">
                                                <span className="font-mono text-sm">TICK-002</span>
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-semibold">Clarificación sobre términos del contrato</p>
                                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" /> Creado: 2024-01-18
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge variant="outline" className="border-amber-500 text-amber-600 dark:text-amber-400">
                                                    LEGAL
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-0">
                                                    ALTA
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                                                    EN PROGRESO
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-background overflow-hidden">
            {/* Top Bar */}
            <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <Link 
                        to={backPath}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                    </Link>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">DEAL ROOM ACTIVA</span>
                        </div>
                        <h1 className="text-sm font-semibold truncate max-w-[200px] md:max-w-md">{dealTitle}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="hidden md:flex gap-1.5 py-1.5 px-3 bg-muted/50">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-medium">Activo</span>
                    </Badge>
                    
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <div className="p-4 border-b border-border">
                                <h2 className="font-semibold">Menú</h2>
                            </div>
                            <div className="py-2 overflow-y-auto max-h-[calc(100vh-60px)]">
                                {groups.map((group) => (
                                    <div key={group.id} className="mb-2">
                                        <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                            <group.icon className="h-3 w-3" />
                                            {group.label}
                                        </div>
                                        {group.views.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => {
                                                    handleGroupChange(group.id);
                                                    updateActiveView(item.id);
                                                    setMobileMenuOpen(false);
                                                }}
                                                className={cn(
                                                    "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors",
                                                    activeView === item.id
                                                        ? "bg-primary/10 text-primary border-r-2 border-primary"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                <item.icon className={cn("h-4 w-4", activeView === item.id ? "text-primary" : "text-muted-foreground")} />
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Left Sidebar - Desktop */}
                <aside 
                    className={cn(
                        "hidden md:flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out relative z-10",
                        leftMenuExpanded ? "w-64" : "w-[70px]"
                    )}
                >
                    <div className="flex-1 overflow-y-auto py-4 space-y-6">
                        {groups.map((group) => (
                            <div key={group.id} className="space-y-1">
                                {leftMenuExpanded && (
                                    <div className="px-4 pb-2 flex items-center gap-2 text-muted-foreground">
                                        <group.icon className="h-3 w-3" />
                                        <h3 className="text-xs font-semibold uppercase tracking-wider">
                                            {group.label}
                                        </h3>
                                    </div>
                                )}
                                {group.views.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            handleGroupChange(group.id);
                                            updateActiveView(item.id);
                                        }}
                                        className={cn(
                                            "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-all relative group",
                                            activeView === item.id
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            !leftMenuExpanded && "justify-center px-2 py-3"
                                        )}
                                        title={!leftMenuExpanded ? item.label : undefined}
                                    >
                                        <item.icon 
                                            className={cn(
                                                "h-4 w-4 shrink-0 transition-colors", 
                                                activeView === item.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                            )} 
                                        />
                                        {leftMenuExpanded && <span>{item.label}</span>}
                                        
                                        {activeView === item.id && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                                        )}
                                    </button>
                                ))}
                                {!leftMenuExpanded && <div className="h-px w-8 mx-auto bg-border my-2" />}
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-border mt-auto">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn("w-full gap-2", !leftMenuExpanded && "justify-center px-0")}
                            onClick={() => setLeftMenuExpanded(!leftMenuExpanded)}
                        >
                            {leftMenuExpanded ? (
                                <>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="text-xs">Colapsar menú</span>
                                </>
                            ) : (
                                <ChevronRight className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-muted/10 relative">
                    {/* Sub-header for context */}
                    <div className="h-12 border-b border-border bg-background/50 backdrop-blur-sm flex items-center px-6 shrink-0 justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">
                                {groups.find(g => g.views.some(v => v.id === activeView))?.label}
                            </span>
                            <ChevronRight className="h-4 w-4" />
                            <span className="text-primary font-semibold">
                                {groups.flatMap(g => g.views).find(v => v.id === activeView)?.label}
                            </span>
                        </div>
                        
                        {/* Right sidebar toggle for mobile/tablet if needed, or extra actions */}
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="max-w-6xl mx-auto w-full h-full">
                            {renderView()}
                        </div>
                    </div>
                </main>
                
                {/* Right Sidebar - Desktop */}
                <aside className="w-[340px] shrink-0 hidden xl:block border-l border-border bg-card">
                    <DealRightSidebar />
                </aside>
            </div>
        </div>
    );
}
