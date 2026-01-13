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
    DollarSign,
    Building2,
    Mail
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RFPActionCardProps {
    rfp: RFP;
}

const budgetColors = {
    low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
    high: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
};

export default function RFPActionCard({ rfp }: RFPActionCardProps) {
    const [showUnlockModal, setShowUnlockModal] = useState(false);
    const isUnlocked = useCreditsStore((state) => state.isRFPUnlocked(rfp.id));

    return (
        <>
            <Card className={cn(
                'transition-all hover:shadow-lg',
                isUnlocked && 'border-emerald-300 dark:border-emerald-700'
            )}>
                <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline">{rfp.industry}</Badge>
                                <Badge className={budgetColors[rfp.budgetLevel]}>
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    {rfp.budget}
                                </Badge>
                            </div>
                            <h3 className="text-lg font-semibold">{rfp.title}</h3>
                        </div>

                        {isUnlocked ? (
                            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400 gap-1">
                                <Unlock className="h-3 w-3" />
                                Desbloqueado
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="gap-1">
                                <Lock className="h-3 w-3" />
                                Bloqueado
                            </Badge>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {rfp.description}
                    </p>

                    {/* Client Info - Locked/Unlocked */}
                    <div className={cn(
                        'bg-muted/50 rounded-lg p-4 mb-4 transition-all',
                        !isUnlocked && 'relative overflow-hidden'
                    )}>
                        {!isUnlocked && (
                            <div className="absolute inset-0 bg-muted/80 backdrop-blur-sm flex items-center justify-center z-10">
                                <div className="text-center">
                                    <Lock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">Información protegida</span>
                                </div>
                            </div>
                        )}

                        <div className={cn(!isUnlocked && 'blur-sm select-none')}>
                            <div className="flex items-center gap-2 mb-2">
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{rfp.clientName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{rfp.clientEmail}</span>
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {rfp.deadline}
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {rfp.applicants} propuestas
                        </div>
                        <span className="text-xs">{rfp.postedAt}</span>
                    </div>

                    {/* Action Button */}
                    {isUnlocked ? (
                        <Link to={`/deal-room/new-${rfp.id}`}>
                            <Button className="w-full gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                                <Send className="h-4 w-4" />
                                Enviar Propuesta
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            className="w-full gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
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
