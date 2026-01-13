import { useDealStore, type DealPhase } from '@/store/useDealStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    CheckCircle2,
    Award,
    Shield,
    FileCheck,
    FileSignature,
    Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';

const phases: { id: DealPhase; label: string }[] = [
    { id: 'descubrimiento', label: 'Descubrimiento' },
    { id: 'propuesta', label: 'Propuesta' },
    { id: 'legal', label: 'Legal' },
    { id: 'firma', label: 'Firma' },
    { id: 'kickoff', label: 'Kickoff' },
];

export default function DealRightSidebar() {
    const {
        providerName,
        clientName,
        currentPhase,
        dealHealth,
        escrowBalance,
        providerVerified,
        ndaSigned,
        proposalApproved,
        approveProposal,
        setPhase,
    } = useDealStore();

    const currentPhaseIndex = phases.findIndex((p) => p.id === currentPhase);

    const getActionButton = () => {
        const baseClass = "w-full h-14 rounded-md font-bold text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]";
        switch (currentPhase) {
            case 'descubrimiento':
                return (
                    <Button className={cn(baseClass, "bg-primary text-white shadow-primary/20")} onClick={() => setPhase('propuesta')}>
                        Solicitar Propuesta
                    </Button>
                );
            case 'propuesta':
                return (
                    <Button
                        className={cn(baseClass, "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-emerald-500/20")}
                        onClick={approveProposal}
                        disabled={proposalApproved}
                    >
                        <FileCheck className="mr-2 h-5 w-5" />
                        {proposalApproved ? 'Propuesta Aprobada' : 'Aprobar Propuesta'}
                    </Button>
                );
            case 'legal':
                return (
                    <Button className={cn(baseClass, "bg-primary text-white shadow-primary/20")} onClick={() => setPhase('firma')}>
                        Revisar Contrato
                    </Button>
                );
            case 'firma':
                return (
                    <Button
                        className={cn(baseClass, "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-indigo-500/20")}
                        onClick={() => setPhase('kickoff')}
                    >
                        <FileSignature className="mr-2 h-5 w-5" />
                        Firmar Contrato (Digital)
                    </Button>
                );
            case 'kickoff':
                return (
                    <Button className={cn(baseClass, "bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-violet-500/20")}>
                        <Rocket className="mr-2 h-5 w-5" />
                        Iniciar Proyecto
                    </Button>
                );
        }
    };

    return (
        <div className="h-full flex flex-col bg-card/10 backdrop-blur-3xl overflow-hidden">
            {/* HUD Header - Connection Status */}
            <div className="p-6 border-b border-white/5 bg-white/5 relative">
                <div className="absolute top-0 right-4 h-full flex items-center">
                    <div className="w-1 h-32 bg-gradient-to-b from-primary/50 via-primary to-primary/50 blur-md opacity-20" />
                </div>

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-14 w-14 rounded-md bg-gradient-to-br from-blue-400 to-indigo-500 p-[1px] shadow-lg shadow-blue-500/20">
                            <div className="h-full w-full rounded-md bg-background/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl">
                                {clientName.charAt(0)}
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Cliente</span>
                    </div>

                    <div className="flex flex-col items-center gap-1 opacity-40">
                        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
                        <span className="text-xl">⚡</span>
                        <div className="h-0.5 w-12 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    </div>

                    <div className="flex flex-col items-center gap-2">
                        <div className="h-14 w-14 rounded-md bg-gradient-to-br from-emerald-400 to-teal-500 p-[1px] shadow-lg shadow-emerald-500/20">
                            <div className="h-full w-full rounded-md bg-background/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-xl">
                                {providerName.charAt(0)}
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">Partner</span>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Estado de la Sesión</h3>
                    <Badge
                        className={cn(
                            "px-4 py-1.5 rounded-md font-bold text-[10px] tracking-widest uppercase border-0 shadow-lg",
                            dealHealth === 'bueno'
                                ? "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/5"
                                : "bg-amber-500/10 text-amber-500 shadow-amber-500/5"
                        )}
                    >
                        {dealHealth === 'bueno' ? (
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Saludable
                            </div>
                        ) : (
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                En Riesgo
                            </div>
                        )}
                    </Badge>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-6 space-y-8">
                    {/* Project Pipeline HUD */}
                    <div className="space-y-4 pb-2">
                        <div className="flex items-center justify-between px-1">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Pipeline de Proyecto</h4>
                            <span className="text-[10px] font-bold text-primary">{Math.round(((currentPhaseIndex + 1) / phases.length) * 100)}%</span>
                        </div>

                        <div className="space-y-2">
                            {phases.map((phase, index) => {
                                const isCompleted = index < currentPhaseIndex;
                                const isActive = index === currentPhaseIndex;
                                return (
                                    <div key={phase.id} className={cn(
                                        "flex items-center gap-4 px-4 py-3 rounded-md border transition-all duration-500",
                                        isActive ? "bg-primary/5 border-primary/20 shadow-xl shadow-primary/5" : "border-transparent opacity-50"
                                    )}>
                                        <div className={cn(
                                            "h-7 w-7 rounded-md flex items-center justify-center text-xs font-bold transition-all",
                                            isCompleted ? "bg-emerald-500 text-white" : isActive ? "bg-primary text-white" : "bg-white/5 text-muted-foreground"
                                        )}>
                                            {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <div className={cn(
                                                "text-xs font-bold tracking-tight",
                                                isActive ? "text-foreground" : "text-muted-foreground"
                                            )}>
                                                {phase.label}
                                            </div>
                                        </div>
                                        {isActive && <div className="h-2 w-2 rounded-full bg-primary animate-ping" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Financial HUD */}
                    <div className="glass-card bg-gradient-to-br from-blue-500/10 to-indigo-600/5 p-6 rounded-md border-blue-500/20 shadow-2xl shadow-blue-500/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Shield className="h-12 w-12 text-blue-500" />
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-blue-500/70 mb-2">Fondos en Escrow</div>
                        <div className="text-4xl font-display font-bold text-foreground mb-1 tracking-tight">
                            <span className="text-lg text-blue-500 mr-1">$</span>
                            {escrowBalance.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500/80 uppercase">
                            <Shield className="h-3 w-3" /> Verificado por Segurify
                        </div>
                    </div>

                    {/* Compliance Checkpad */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 px-1">Compliance Checkpad</h4>
                        <div className="grid gap-2">
                            <div className={cn(
                                "flex items-center justify-between p-4 rounded-md border bg-white/5 backdrop-blur-sm transition-all",
                                providerVerified ? "border-emerald-500/20" : "border-white/5"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-md flex items-center justify-center shadow-sm",
                                        providerVerified ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-muted-foreground/30"
                                    )}>
                                        <Award className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground/80">Partner Verificado</span>
                                </div>
                                {providerVerified && (
                                    <Badge className="bg-amber-500 text-white border-0 text-[9px] font-bold px-2 py-0.5 rounded-md shadow-lg shadow-amber-500/20">GOLD</Badge>
                                )}
                            </div>

                            <div className={cn(
                                "flex items-center justify-between p-4 rounded-md border bg-white/5 backdrop-blur-sm transition-all",
                                ndaSigned ? "border-emerald-500/20" : "border-white/5"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-md flex items-center justify-center shadow-sm",
                                        ndaSigned ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-muted-foreground/30"
                                    )}>
                                        <FileSignature className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground/80">NDA Firmado</span>
                                </div>
                                {ndaSigned && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                            </div>

                            <div className={cn(
                                "flex items-center justify-between p-4 rounded-md border bg-white/5 backdrop-blur-sm transition-all",
                                proposalApproved ? "border-emerald-500/20" : "border-white/5"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-md flex items-center justify-center shadow-sm",
                                        proposalApproved ? "bg-emerald-500/10 text-emerald-500" : "bg-white/5 text-muted-foreground/30"
                                    )}>
                                        <FileCheck className="h-4 w-4" />
                                    </div>
                                    <span className="text-xs font-bold text-foreground/80">Propuesta Final</span>
                                </div>
                                {proposalApproved ? (
                                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                ) : (
                                    <Badge variant="outline" className="text-[9px] font-bold border-white/10 text-muted-foreground/60">PENDIENTE</Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* Global HUD Action */}
            <div className="p-6 border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent">
                {getActionButton()}
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                        <Shield className="h-3 w-3" /> Transacción Asegurada
                    </div>
                    <div className="h-1 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-primary/40 rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
