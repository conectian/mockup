import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type LucideIcon } from 'lucide-react';

export interface Company {
    id: string;
    name: string;
    industry: string;
    tier: string;
    tierBadge: string;
    innovation: string;
    cloud: string;
    revenue: string;
    employees: string;
    sector: string;
    tech: string[];
    rfps: number;
    color: string;
    icon: LucideIcon;
    image: string;
    description?: string;
}

interface CompanyCardProps {
    company: Company;
}

const tierConfig: Record<string, { className: string }> = {
    'Fortune 100': {
        className: 'bg-gradient-to-r from-amber-500 to-yellow-400 text-white border-0',
    },
    'Fortune 500': {
        className: 'bg-gradient-to-r from-slate-400 to-slate-300 text-slate-800 border-0',
    },
    'Innovation Leader': {
        className: 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white border-0',
    },
    'Enterprise': {
        className: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0',
    },
};

export default function CompanyCard({ company }: CompanyCardProps) {
    const IconComponent = company.icon;
    const tierStyle = tierConfig[company.tier] || tierConfig['Enterprise'];

    return (
        <Card className="py-0 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border-white/5 rounded-xl bg-card/40 backdrop-blur-sm">
            {/* Image Header */}
            <div className="aspect-[16/9] relative overflow-hidden">
                <img
                    src={company.image}
                    alt={company.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Tier Badge */}
                <Badge className={cn("absolute top-3 right-3 gap-1.5 px-2.5 py-1 shadow-lg backdrop-blur-md border-white/20 text-[10px] font-bold uppercase tracking-wider", tierStyle.className)}>
                    {company.tier}
                </Badge>

                {/* Company Logo / Icon */}
                <div className="absolute bottom-3 left-3 flex items-center gap-3">
                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-xl shrink-0 border-2 border-white/20", company.color)}>
                        <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white drop-shadow-lg line-clamp-1">{company.name}</h3>
                        <span className="text-xs text-white/80 font-medium">{company.sector}</span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-5 flex-1 flex flex-col gap-4">
                {/* Innovation & Seeking Badge */}
                <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={cn(
                        "text-[10px] px-2 py-0.5 font-bold",
                        company.innovation === 'ALTO' && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                        company.innovation === 'MEDIO' && "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    )}>
                        <Zap className="h-3 w-3 mr-1" />
                        Innovación {company.innovation}
                    </Badge>
                    {company.tierBadge && (
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-violet-500/10 text-violet-400 border-violet-500/30 font-medium">
                            {company.tierBadge}
                        </Badge>
                    )}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">Facturación</span>
                        <span className="font-bold text-xs">{company.revenue}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">Cloud</span>
                        <span className="font-bold text-xs">{company.cloud}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">Empleados</span>
                        <span className="font-bold text-xs">{company.employees}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">RFPs Activas</span>
                        <Badge className="bg-primary/20 text-primary text-[10px] px-1.5 py-0 h-5">{company.rfps}</Badge>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                    {company.tech.slice(0, 4).map((t) => (
                        <Badge key={t} variant="secondary" className="text-[10px] font-medium bg-white/5 hover:bg-white/10 border-white/5 px-2 py-0.5 rounded-md text-muted-foreground">
                            {t}
                        </Badge>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/5">
                    <Button variant="outline" size="sm" className="flex-1 h-9 text-xs font-bold border-primary/30 text-primary hover:bg-primary/5 rounded-lg">
                        <Building2 className="h-3.5 w-3.5 mr-1.5" />
                        Ver Necesidades
                    </Button>
                    <Button size="sm" className="flex-1 h-9 text-xs font-bold premium-gradient rounded-lg gap-1.5">
                        Propuesta
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
