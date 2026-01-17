import { useState } from 'react';
import { type RFP } from '@/data/rfp-data';
import { useCreditsStore } from '@/store/useCreditsStore';
import UnlockLeadModal from './UnlockLeadModal';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Lock,
    Unlock,
    Send,
    Calendar,
    Users,
    Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RFPActionCardProps {
    rfp: RFP;
}

export default function RFPActionCard({ rfp }: RFPActionCardProps) {
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const isUnlocked = useCreditsStore((state) => state.isRFPUnlocked(rfp.id));

    return (
        <>
            <Card className={cn(
                'glass-card border-white/10 transition-all hover:shadow-lg hover:border-primary/30',
                isUnlocked && 'ring-2 ring-emerald-500/30 border-emerald-500/30'
            )}>
                <CardContent className="p-5 space-y-4">
                    {/* Header: Industry + Budget + Status */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <Badge className="bg-amber-500/10 text-amber-500 border-0 text-[11px] px-2 h-5">
                                {rfp.industry}
                            </Badge>
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-[11px] px-2 h-5">
                                $ {rfp.budget}
                            </Badge>
                        </div>
                        {isUnlocked ? (
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-0 gap-1 text-[11px] h-5 px-2">
                                <Unlock className="h-3 w-3" />
                                Desbloqueado
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-white/5 text-muted-foreground gap-1 border-0 text-[11px] h-5 px-2">
                                <Lock className="h-3 w-3" />
                                Bloqueado
                            </Badge>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-[#243A57] dark:text-white leading-tight">
                        {rfp.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {rfp.description}
                    </p>

                    {/* Client Info - Locked/Unlocked */}
                    <div className={cn(
                        'rounded-xl p-4 transition-all',
                        isUnlocked
                            ? 'bg-emerald-500/5 border border-emerald-500/20'
                            : 'bg-gradient-to-br from-slate-100/80 to-slate-200/60 dark:from-slate-800/60 dark:to-slate-900/40 border border-white/10 relative overflow-hidden'
                    )}>
                        {!isUnlocked && (
                            <div className="absolute inset-0 backdrop-blur-[6px] flex items-center justify-center z-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 via-slate-400/10 to-slate-600/20 dark:from-slate-700/40 dark:via-slate-800/30 dark:to-slate-900/40" />
                                <div className="relative text-center px-4">
                                    <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/20">
                                        <Lock className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Información protegida</span>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Desbloquea para ver los datos de contacto</p>
                                </div>
                            </div>
                        )}

                        <div className={cn(!isUnlocked && 'blur-md select-none opacity-50', 'space-y-3')}>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                                    {rfp.clientName.charAt(0)}
                                </div>
                                <div>
                                    <span className="font-bold text-sm block">{rfp.clientName}</span>
                                    <span className="text-xs text-muted-foreground">Empresa verificada</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/50 dark:bg-white/5 rounded-lg px-3 py-2">
                                <Mail className="h-4 w-4 text-primary" />
                                <span className="text-xs font-medium">{rfp.clientEmail}</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {rfp.deadline}
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {rfp.applicants} propuestas
                        </div>
                        <span className="text-muted-foreground/60">{rfp.postedAt}</span>
                    </div>

                    {/* Action Button */}
                    {isUnlocked ? (
                        <Link to={`/deal-room/new-${rfp.id}`}>
                            <Button className="w-full h-10 gap-2 premium-gradient text-sm font-medium rounded-lg">
                                <Send className="h-4 w-4" />
                                Enviar Propuesta
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className="w-full h-10 gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-sm font-medium rounded-lg"
                            onClick={() => setShowUnlockModal(true)}
                        >
                            <Lock className="h-4 w-4" />
                            Desbloquear Oportunidad ({rfp.cost} Créditos)
                        </Button>
                    )}
                </CardContent>
            </Card>

            <UnlockLeadModal
                isOpen={showUnlockModal}
                onClose={() => setShowUnlockModal(false)}
                rfpId={rfp.id}
                rfpTitle={rfp.title}
                cost={rfp.cost}
                onUnlocked={() => { }}
            />
        </>
    );
}
