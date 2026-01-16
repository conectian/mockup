import { ArrowRight, Lock, Building2, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export interface Proposal {
    id: string;
    title: string;
    providerName: string;
    savingEstimation?: string;
    efficiencyEstimation?: string;
    tags: string[];
    isPrivate: boolean;
}

interface ClientProposalCardProps {
    proposal: Proposal;
}

export default function ClientProposalCard({ proposal }: ClientProposalCardProps) {
    return (
        <Card className="flex flex-col h-full bg-white/5 border-white/10 backdrop-blur-md hover:border-primary/40 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <CardContent className="p-5 flex flex-col h-full">
                {/* Header: Private Badge + Provider */}
                <div className="flex justify-between items-start mb-3">
                    {proposal.isPrivate && (
                        <Badge variant="secondary" className="gap-1 bg-amber-500/10 text-amber-500 border-amber-500/20 px-2 py-0.5 text-[10px] h-5">
                            <Lock className="h-3 w-3" />
                            Privada
                        </Badge>
                    )}
                    <div className="flex items-center gap-1.5 text-muted-foreground ml-auto bg-white/5 px-2 py-1 rounded-full border border-white/5">
                        <Building2 className="h-3 w-3" />
                        <span className="text-xs font-medium truncate max-w-[120px]">{proposal.providerName}</span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[3rem]">
                    {proposal.title}
                </h3>

                {/* Stats (Compact Grid) */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {proposal.savingEstimation && (
                        <div className="bg-white/5 rounded-md p-2 border border-white/5">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                                <p className="text-[9px] uppercase text-muted-foreground font-bold">Ahorro</p>
                            </div>
                            <p className="text-lg font-bold text-foreground leading-none">
                                {proposal.savingEstimation}
                            </p>
                        </div>
                    )}
                    {proposal.efficiencyEstimation && (
                        <div className="bg-white/5 rounded-md p-2 border border-white/5">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <Zap className="h-3 w-3 text-blue-500" />
                                <p className="text-[9px] uppercase text-muted-foreground font-bold">Eficiencia</p>
                            </div>
                            <p className="text-lg font-bold text-foreground leading-none">
                                {proposal.efficiencyEstimation}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Actions (Tags + Button) */}
                <div className="mt-auto pt-2 flex items-center justify-between gap-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1.5">
                        {proposal.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-transparent border-white/10 text-muted-foreground">
                                {tag}
                            </Badge>
                        ))}
                        {proposal.tags.length > 2 && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5 bg-transparent border-white/10 text-muted-foreground">
                                +{proposal.tags.length - 2}
                            </Badge>
                        )}
                    </div>

                    <Link to={`/client/proposals/${proposal.id}`}>
                        <Button size="sm" className="h-8 gap-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20 hover:border-primary text-xs font-semibold px-3">
                            Ver
                            <ArrowRight className="h-3 w-3" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
