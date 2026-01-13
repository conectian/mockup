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
    Building2,
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
                        'bg-white/5 border border-white/5 rounded-lg p-3 transition-all',
                        !isUnlocked && 'relative overflow-hidden'
                    )}>
                        {!isUnlocked && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
                                <div className="text-center">
                                    <Lock className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                                    <span className="text-xs font-medium text-muted-foreground">Información protegida</span>
                                </div>
                            </div>
                        )}

                        <div className={cn(!isUnlocked && 'blur-sm select-none', 'space-y-2')}>
                            <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">{rfp.clientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span className="text-xs">{rfp.clientEmail}</span>
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
