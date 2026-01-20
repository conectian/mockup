import { type Proposal } from './ClientProposalCard';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Lock, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ClientProposalCardGridProps {
    proposal: Proposal;
}

export default function ClientProposalCardGrid({ proposal }: ClientProposalCardGridProps) {
    // Determine gradient based on whether it's private
    const cardGradient = proposal.isPrivate 
        ? 'from-indigo-500/20 via-purple-500/10' 
        : 'from-blue-500/20 via-cyan-500/10';

    return (
        <Card className="py-0 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border border-white/5 rounded-xl bg-card/40 backdrop-blur-sm hover:border-primary/30">
            {/* Header with gradient */}
            <div className={cn("aspect-[16/10] relative overflow-hidden bg-gradient-to-br", cardGradient, "to-transparent")}>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                {/* Icon centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-500">
                        <FileText className="h-10 w-10" />
                    </div>
                </div>

                {/* Private Badge */}
                {proposal.isPrivate && (
                    <Badge className="absolute top-4 right-4 gap-1.5 px-3 py-1 shadow-lg backdrop-blur-md border-indigo-500/30 bg-indigo-500/20 text-indigo-300">
                        <Lock className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Privada</span>
                    </Badge>
                )}

                {/* Savings/Efficiency Badge (Bottom Left) */}
                {(proposal.savingEstimation || proposal.efficiencyEstimation) && (
                    <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-md border-white/20 flex items-center gap-2">
                        {proposal.savingEstimation ? (
                            <>
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                                    {proposal.savingEstimation} ahorro
                                </span>
                            </>
                        ) : (
                            <>
                                <Zap className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                                    {proposal.efficiencyEstimation} eficiencia
                                </span>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Content */}
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    {/* Provider Name */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                            {proposal.providerName.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground/80 tracking-tight">{proposal.providerName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                        {proposal.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-4">
                        {proposal.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-[10px] font-bold bg-white/5 hover:bg-white/10 border-white/5 px-2 py-0.5 rounded-md text-muted-foreground">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-white/5 mt-auto pt-4">
                    <Button asChild className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-md font-bold h-11 bg-white/5 text-foreground border border-white/10 hover:border-primary/50">
                        <Link to={`/client/proposals/${proposal.id}`}>
                            Ver Propuesta
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
