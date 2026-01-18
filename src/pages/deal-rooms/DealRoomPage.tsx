import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
    PanelRightOpen,
    Settings,
    CheckCircle2,
    Zap,
    Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

type DealView = 'chat' | 'finance' | 'docs' | 'spec' | 'participants';

const menuItems: { id: DealView; label: string; icon: typeof MessageSquare }[] = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'finance', label: 'Business Case', icon: Calculator },
    { id: 'docs', label: 'Documentos', icon: FolderOpen },
    { id: 'spec', label: 'Ficha Técnica', icon: FileTextIcon },
    { id: 'participants', label: 'Participantes', icon: Users },
];

export default function DealRoomPage() {
    const { id } = useParams<{ id: string }>();
    const { dealTitle, participants } = useDealStore();
    const { userType } = useAuthStore();
    const [activeView, setActiveView] = useState<DealView>('chat');
    const [leftMenuExpanded, setLeftMenuExpanded] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const backPath = userType === 'provider' ? '/provider/deal-rooms' : '/client/deal-rooms';

    const renderView = () => {
        switch (activeView) {
            case 'chat':
                return <DealChat />;
            case 'finance':
                return <DealFinance />;
            case 'docs':
                return <DealDocs />;
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
                                    <Card key={p.id} className="p-4 border-border hover:border-primary/30 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold truncate">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.role}</p>
                                                <p className="text-xs text-primary mt-1">cliente@empresa.com</p>
                                            </div>
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
                                    <Card key={p.id} className="p-4 border-border hover:border-emerald-500/30 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md shrink-0">
                                                {p.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold truncate">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.role}</p>
                                                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">partner@proveedor.com</p>
                                            </div>
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
            default:
                return null;
        }
    };

    const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => (
        <nav className="flex-1 px-3 py-6 space-y-2">
            {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveView(item.id);
                            onItemClick?.();
                        }}
                        className={cn(
                            'w-full flex items-center gap-4 px-4 py-3.5 rounded-md text-sm font-bold transition-all relative group overflow-hidden',
                            isActive
                                ? 'text-white'
                                : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                        )}
                    >
                        {isActive && (
                            <div className="absolute inset-0 bg-primary shadow-lg shadow-primary/20 animate-in fade-in zoom-in-95 duration-300" />
                        )}
                        <Icon className={cn(
                            "h-5 w-5 shrink-0 relative z-10 transition-transform group-hover:scale-110",
                            isActive ? "text-white" : "text-muted-foreground/60 group-hover:text-primary"
                        )} />
                        <span className="relative z-10 tracking-tight">{item.label}</span>
                        {isActive && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-l-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                        )}
                    </button>
                );
            })}
        </nav>
    );

    return (
        <div className="fixed inset-0 flex flex-col lg:flex-row bg-background/95 backdrop-blur-3xl safe-area-top">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-white/5 bg-card/40 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-xl border-white/5 safe-area-top">
                            <div className="h-16 flex items-center px-4 border-b border-white/5">
                                <Link to={backPath} className="w-full">
                                    <Button variant="ghost" className="w-full justify-start gap-3 rounded-md hover:bg-white/5">
                                        <ArrowLeft className="h-5 w-5" />
                                        <span className="font-bold text-sm">Volver al listado</span>
                                    </Button>
                                </Link>
                            </div>
                            <div className="px-6 py-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                                <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 opacity-70">
                                    Deal Room Activa
                                </div>
                                <div className="font-display font-bold text-lg leading-tight mb-1 truncate text-foreground">
                                    {dealTitle}
                                </div>
                                <div className="text-xs font-medium text-muted-foreground/60">ID Session: {id}</div>
                            </div>
                            <NavigationMenu onItemClick={() => setMobileMenuOpen(false)} />
                        </SheetContent>
                    </Sheet>
                    <div className="font-bold text-sm truncate max-w-[200px]">{dealTitle}</div>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <PanelRightOpen className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:w-[340px] p-0 bg-card/95 backdrop-blur-xl border-white/5 safe-area-top">
                        <DealRightSidebar />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop Left Menu */}
            <aside
                className={cn(
                    'hidden lg:flex bg-card/40 backdrop-blur-xl border-r border-white/5 flex-col transition-all duration-500 shrink-0 z-40',
                    leftMenuExpanded ? 'w-64' : 'w-20'
                )}
            >
                {/* Back Button Container */}
                <div className="h-16 flex items-center px-4 border-b border-white/5">
                    <Link to={backPath} className="w-full">
                        <Button variant="ghost" className="w-full justify-start gap-3 rounded-md hover:bg-white/5 text-muted-foreground hover:text-foreground transition-all group">
                            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                            {leftMenuExpanded && <span className="font-bold text-sm tracking-tight">Volver al listado</span>}
                        </Button>
                    </Link>
                </div>

                {/* Deal Header Badge */}
                {leftMenuExpanded && (
                    <div className="px-6 py-6 border-b border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                        <div className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2 opacity-70">
                            Deal Room Activa
                        </div>
                        <div className="font-display font-bold text-lg leading-tight mb-1 truncate text-foreground">
                            {dealTitle}
                        </div>
                        <div className="text-xs font-medium text-muted-foreground/60">ID Session: {id}</div>
                    </div>
                )}

                {/* Navigation Menu */}
                <nav className="flex-1 px-3 py-6 space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveView(item.id)}
                                className={cn(
                                    'w-full flex items-center gap-4 px-4 py-3.5 rounded-md text-sm font-bold transition-all relative group overflow-hidden',
                                    isActive
                                        ? 'text-white'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-primary shadow-lg shadow-primary/20 animate-in fade-in zoom-in-95 duration-300" />
                                )}
                                <Icon className={cn(
                                    "h-5 w-5 shrink-0 relative z-10 transition-transform group-hover:scale-110",
                                    isActive ? "text-white" : "text-muted-foreground/60 group-hover:text-primary"
                                )} />
                                {leftMenuExpanded && <span className="relative z-10 tracking-tight">{item.label}</span>}
                                {isActive && (
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-white rounded-l-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </nav>

                {/* Bottom Actions & Collapse */}
                <div className="p-4 border-t border-white/5 bg-white/5">
                    <Button
                        variant="ghost"
                        onClick={() => setLeftMenuExpanded(!leftMenuExpanded)}
                        className="w-full h-12 justify-center rounded-md hover:bg-white/10 transition-all"
                    >
                        {leftMenuExpanded ? (
                            <div className="flex items-center gap-2">
                                <ChevronLeft className="h-5 w-5" />
                                <span className="font-bold text-xs uppercase tracking-widest">Colapsar</span>
                            </div>
                        ) : (
                            <ChevronRight className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 min-h-0 relative bg-gradient-to-br from-background to-muted/20">
                {activeView === 'chat' ? (
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        <DealChat />
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto">
                        <div className="pb-24">
                            {renderView()}
                        </div>
                    </div>
                )}
            </main>

            {/* Right HUD Sidebar - Desktop only */}
            <aside className="w-[340px] shrink-0 hidden xl:block border-l border-white/5 bg-card/20 backdrop-blur-md">
                <DealRightSidebar />
            </aside>
        </div>
    );
}
