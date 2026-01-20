import { type UseCase } from '@/data/marketplace-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Award, ShieldCheck, Medal, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UseCaseCardProps {
    useCase: UseCase;
    matchScore?: number;
    hasFilters?: boolean;
}

const tierConfig = {
    Gold: {
        icon: Award,
        className: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0',
        label: 'Gold Partner',
    },
    Silver: {
        icon: ShieldCheck,
        className: 'bg-gradient-to-r from-slate-400 to-slate-300 text-slate-800 border-0',
        label: 'Silver Partner',
    },
    Bronze: {
        icon: Medal,
        className: 'bg-gradient-to-r from-orange-400 to-amber-600 text-white border-0',
        label: 'Bronze Partner',
    },
};

export default function UseCaseCard({ useCase, matchScore, hasFilters = false }: UseCaseCardProps) {
    const tier = tierConfig[useCase.providerTier];
    const TierIcon = tier.icon;
    const isGoldPartner = useCase.providerTier === 'Gold';

    return (
        <Card className={cn(
            "py-0 overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col h-full rounded-xl bg-card/40 backdrop-blur-sm relative",
            isGoldPartner 
                ? "border-2 border-amber-400/60 hover:border-amber-400 hover:shadow-amber-400/20" 
                : "border-2 border-white/10 hover:border-primary/30 hover:shadow-primary/5"
        )}>
            {/* Gold Partner Corner Ribbon */}
            {isGoldPartner && (
                <div className="absolute top-0 left-0 z-10">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 text-white text-[9px] font-bold px-3 py-1 uppercase tracking-wider shadow-lg">
                        🏆 Gold Partner
                    </div>
                </div>
            )}

            {/* Match Score Badge (when filters applied) */}
            {hasFilters && matchScore && (
                <div className="absolute top-4 left-4 z-10 glass-card px-3 py-1.5 rounded-lg border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                        <Target className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-400">{matchScore}% Match</span>
                    </div>
                </div>
            )}

            {/* Image Header */}
            <div className="aspect-[16/10] relative overflow-hidden">
                <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Tier Badge */}
                <Badge className={cn("absolute top-4 right-4 gap-1.5 px-3 py-1 shadow-lg backdrop-blur-md border-white/20", tier.className)}>
                    <TierIcon className="h-3.5 w-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{tier.label}</span>
                </Badge>

                {/* ROI Badge (Bottom Left on Image) */}
                <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-md border-white/20 flex items-center gap-2">
                    <Rocket className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">{useCase.roi}</span>
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    {/* Provider & Category */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                            {useCase.providerName.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-muted-foreground/80 tracking-tight">{useCase.providerName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                        {useCase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4 font-medium leading-relaxed">
                        {useCase.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {useCase.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-[10px] font-bold bg-white/5 hover:bg-white/10 border-white/5 px-2 py-0.5 rounded-md text-muted-foreground">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-white/5 mt-auto pt-4">
                    <Button asChild className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-md font-bold h-11 bg-white/5 text-foreground border border-white/10 hover:border-primary/50">
                        <Link to={`/client/marketplace/${useCase.id}`}>
                            Ver Detalles
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
