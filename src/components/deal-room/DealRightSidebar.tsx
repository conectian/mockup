import { useDealStore, type DealPhase } from '@/store/useDealStore';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    CheckCircle2,
    Award,
    Shield,
    FileCheck,
    FileSignature,
    Rocket,
    Zap,
    X
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
    const progressPercent = Math.round(((currentPhaseIndex + 1) / phases.length) * 100);

    const getActionButton = () => {
        const baseClass = "w-full h-12 rounded-lg font-semibold text-sm shadow-md transition-all hover:shadow-lg active:scale-[0.98]";
        switch (currentPhase) {
            case 'descubrimiento':
                return (
                    <Button className={cn(baseClass, "bg-primary text-white hover:bg-primary/90")} onClick={() => setPhase('propuesta')}>
                        Solicitar Propuesta
                    </Button>
                );
            case 'propuesta':
                return (
                    <Button
                        className={cn(baseClass, "bg-emerald-600 hover:bg-emerald-700 text-white")}
                        onClick={approveProposal}
                        disabled={proposalApproved}
                    >
                        <FileCheck className="mr-2 h-4 w-4" />
                        {proposalApproved ? 'Propuesta Aprobada' : 'Aprobar Propuesta'}
                    </Button>
                );
            case 'legal':
                return (
                    <Button className={cn(baseClass, "bg-primary text-white hover:bg-primary/90")} onClick={() => setPhase('firma')}>
                        Revisar Contrato
                    </Button>
                );
            case 'firma':
                return (
                    <Button
                        className={cn(baseClass, "bg-indigo-600 hover:bg-indigo-700 text-white")}
                        onClick={() => setPhase('kickoff')}
                    >
                        <FileSignature className="mr-2 h-4 w-4" />
                        Firmar Contrato
                    </Button>
                );
            case 'kickoff':
                return (
                    <Button className={cn(baseClass, "bg-violet-600 hover:bg-violet-700 text-white")}>
                        <Rocket className="mr-2 h-4 w-4" />
                        Iniciar Proyecto
                    </Button>
                );
        }
    };

    return (
        <div className="h-full flex flex-col bg-card safe-area-top">
            {/* Header - Participants */}
            <div className="p-4 border-b border-border shrink-0">
                <div className="flex items-center justify-between">
                    {/* Client */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {clientName.charAt(0)}
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Cliente</span>
                    </div>

                    {/* Connection indicator */}
                    <div className="flex flex-col items-center">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>

                    {/* Provider */}
                    <div className="flex flex-col items-center gap-1.5">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                            {providerName.charAt(0)}
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Partner</span>
                    </div>
                </div>

                {/* Session Status */}
                <div className="mt-4 text-center">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Estado de la Sesión</p>
                    <Badge
                        className={cn(
                            "px-3 py-1 rounded-full font-semibold text-xs border-0",
                            dealHealth === 'bueno'
                                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        )}
                    >
                        <span className={cn(
                            "h-2 w-2 rounded-full mr-2",
                            dealHealth === 'bueno' ? "bg-emerald-500" : "bg-amber-500"
                        )} />
                        {dealHealth === 'bueno' ? 'Saludable' : 'En Riesgo'}
                    </Badge>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="p-4 space-y-6">
                    {/* Pipeline */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Pipeline de Proyecto</h4>
                            <span className="text-xs font-bold text-primary">{progressPercent}%</span>
                        </div>

                        <div className="space-y-1.5">
                            {phases.map((phase, index) => {
                                const isCompleted = index < currentPhaseIndex;
                                const isActive = index === currentPhaseIndex;
                                return (
                                    <div key={phase.id} className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                                        isActive ? "bg-primary/10" : "hover:bg-muted/50",
                                        !isActive && !isCompleted && "opacity-50"
                                    )}>
                                        <div className={cn(
                                            "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold",
                                            isCompleted ? "bg-emerald-500 text-white" :
                                                isActive ? "bg-primary text-white" :
                                                    "bg-muted text-muted-foreground"
                                        )}>
                                            {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                                        </div>
                                        <span className={cn(
                                            "text-sm font-medium",
                                            isActive ? "text-foreground" : "text-muted-foreground"
                                        )}>
                                            {phase.label}
                                        </span>
                                        {isActive && <span className="ml-auto h-2 w-2 rounded-full bg-primary animate-pulse" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Escrow */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
                        <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-1">Fondos en Escrow</p>
                        <div className="text-3xl font-bold text-foreground">
                            <span className="text-lg text-indigo-500 mr-0.5">$</span>
                            {escrowBalance.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <Shield className="h-3.5 w-3.5" />
                            Verificado por Segurify
                        </div>
                    </div>

                    {/* Compliance */}
                    <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Compliance Checkpad</h4>
                        <div className="space-y-2">
                            {/* Partner Verified */}
                            <div className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                providerVerified ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-border"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center",
                                        providerVerified ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                                    )}>
                                        <Award className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Partner Verificado</span>
                                </div>
                                {providerVerified && (
                                    <Badge className="bg-amber-500 text-white border-0 text-[10px] font-bold px-2">GOLD</Badge>
                                )}
                            </div>

                            {/* NDA */}
                            <div className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                ndaSigned ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-border"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center",
                                        ndaSigned ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                                    )}>
                                        <FileSignature className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">NDA Firmado</span>
                                </div>
                                {ndaSigned ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <X className="h-5 w-5 text-muted-foreground/30" />
                                )}
                            </div>

                            {/* Proposal */}
                            <div className={cn(
                                "flex items-center justify-between p-3 rounded-lg border transition-colors",
                                proposalApproved ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20" : "border-border"
                            )}>
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-8 w-8 rounded-lg flex items-center justify-center",
                                        proposalApproved ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                                    )}>
                                        <FileCheck className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-medium">Propuesta Final</span>
                                </div>
                                {proposalApproved ? (
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                ) : (
                                    <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground">Pendiente</Badge>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button - Fixed at bottom */}
            <div className="p-4 border-t border-border shrink-0 safe-area-bottom">
                {getActionButton()}
                <p className="text-[10px] text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
                    <Shield className="h-3 w-3" />
                    Transacción Asegurada
                </p>
            </div>
        </div>
    );
}
