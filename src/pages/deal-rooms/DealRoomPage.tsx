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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    MessageSquare,
    Calculator,
    FolderOpen,
    FileText as FileTextIcon,
    Users,
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    Menu,
    PanelRightOpen
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
                    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Ficha Técnica</h2>
                            <p className="text-muted-foreground text-sm md:text-lg">
                                Especificaciones técnicas y requisitos funcionales del proyecto.
                            </p>
                        </div>
                        <div className="grid gap-6">
                            <Card className="glass-card border-white/5 p-6 rounded-md">
                                <h3 className="font-bold mb-2">Resumen Ejecutivo</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Esta sección contiene la descripción técnica detallada recopilada durante la fase de RFP y las sesiones de descubrimiento.
                                </p>
                            </Card>
                        </div>
                    </div>
                );
            case 'participants':
                return (
                    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Participantes</h2>
                            <p className="text-muted-foreground text-sm md:text-lg">Equipo multidisciplinar involucrado en la negociación.</p>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {participants.map((p) => (
                                <div key={p.id} className="flex items-center gap-4 p-4 md:p-5 glass-card border-white/5 rounded-md hover:border-primary/20 transition-all group">
                                    <div className={cn(
                                        "h-10 w-10 md:h-12 md:w-12 rounded-md flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/10 group-hover:scale-110 transition-transform",
                                        p.company === 'client' ? "bg-gradient-to-br from-blue-400 to-indigo-500" : "bg-gradient-to-br from-emerald-400 to-teal-500"
                                    )}>
                                        {p.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm md:text-base group-hover:text-primary transition-colors">{p.name}</div>
                                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground/60">{p.role}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
        <div className="fixed inset-0 flex flex-col lg:flex-row bg-background/95 backdrop-blur-3xl">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between h-14 px-4 border-b border-white/5 bg-card/40 backdrop-blur-xl shrink-0">
                <div className="flex items-center gap-3">
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-72 p-0 bg-card/95 backdrop-blur-xl border-white/5">
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
                    <SheetContent side="right" className="w-full sm:w-[340px] p-0 bg-card/95 backdrop-blur-xl border-white/5">
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
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-gradient-to-br from-background to-muted/20">
                {activeView === 'chat' ? (
                    <DealChat />
                ) : (
                    <ScrollArea className="flex-1">
                        <div className="pb-24">
                            {renderView()}
                        </div>
                    </ScrollArea>
                )}
            </main>

            {/* Right HUD Sidebar - Desktop only */}
            <aside className="w-[340px] shrink-0 hidden xl:block border-l border-white/5 bg-card/20 backdrop-blur-md">
                <DealRightSidebar />
            </aside>
        </div>
    );
}
