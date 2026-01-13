import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import { INDUSTRIES, TECHNOLOGIES, type ProviderTier } from '@/data/marketplace-data';
import { cn } from '@/lib/utils';

export interface FilterState {
    search: string;
    industries: string[];
    technologies: string[];
    tiers: ProviderTier[];
}

interface MarketplaceFiltersProps {
    filters: FilterState;
    onChange: (filters: FilterState) => void;
    onReset: () => void;
    resultCount: number;
}

const TIERS: ProviderTier[] = ['Gold', 'Silver', 'Bronze'];

export default function MarketplaceFilters({
    filters,
    onChange,
    onReset,
    resultCount,
}: MarketplaceFiltersProps) {
    const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    const hasActiveFilters =
        filters.search ||
        filters.industries.length > 0 ||
        filters.technologies.length > 0 ||
        filters.tiers.length > 0;

    return (
        <div className="space-y-8 glass-card p-6 rounded-md border-white/5">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                        <Filter className="h-4 w-4" />
                    </div>
                    <h3 className="font-display font-bold text-lg tracking-tight">Filtros Avanzados</h3>
                </div>
                {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={onReset} className="h-8 text-xs font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md">
                        <X className="h-3 w-3 mr-1.5" />
                        Limpiar
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="space-y-3">
                <Label htmlFor="search" className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/70 ml-1">Buscar Solución</Label>
                <div className="relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        id="search"
                        placeholder="IA, Blockchain, Fintech..."
                        value={filters.search}
                        onChange={(e) => onChange({ ...filters, search: e.target.value })}
                        className="pl-10 h-12 bg-white/5 border-white/10 rounded-md focus:ring-primary/20 focus:border-primary/40 transition-all placeholder:text-muted-foreground/40 font-medium"
                    />
                </div>
            </div>

            {/* Partner Tier */}
            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/70 ml-1">Nivel de Partner</Label>
                <div className="flex flex-wrap gap-2">
                    {TIERS.map((tier) => (
                        <Badge
                            key={tier}
                            variant={filters.tiers.includes(tier) ? 'default' : 'outline'}
                            className={cn(
                                'cursor-pointer transition-all px-3 py-1.5 rounded-md font-bold text-[11px] border-white/10',
                                !filters.tiers.includes(tier) && 'bg-white/5 hover:bg-white/10 text-muted-foreground',
                                filters.tiers.includes(tier) && tier === 'Gold' && 'bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-500/20',
                                filters.tiers.includes(tier) && tier === 'Silver' && 'bg-slate-400 text-white hover:bg-slate-500 shadow-lg shadow-slate-500/20',
                                filters.tiers.includes(tier) && tier === 'Bronze' && 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                            )}
                            onClick={() =>
                                onChange({ ...filters, tiers: toggleArrayItem(filters.tiers, tier) })
                            }
                        >
                            {tier}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Industries */}
            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/70 ml-1">Industrias</Label>
                <div className="flex flex-wrap gap-2">
                    {INDUSTRIES.map((industry) => (
                        <Badge
                            key={industry}
                            variant={filters.industries.includes(industry) ? 'default' : 'outline'}
                            className={cn(
                                "cursor-pointer transition-all px-3 py-1.5 rounded-md font-bold text-[11px] border-white/10",
                                filters.industries.includes(industry) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                            )}
                            onClick={() =>
                                onChange({
                                    ...filters,
                                    industries: toggleArrayItem(filters.industries, industry),
                                })
                            }
                        >
                            {industry}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground/70 ml-1">Tecnologías</Label>
                <div className="flex flex-wrap gap-2">
                    {TECHNOLOGIES.map((tech) => (
                        <Badge
                            key={tech}
                            variant={filters.technologies.includes(tech) ? 'default' : 'outline'}
                            className={cn(
                                "cursor-pointer transition-all px-3 py-1.5 rounded-md font-bold text-[11px] border-white/10",
                                filters.technologies.includes(tech) ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "bg-white/5 hover:bg-white/10 text-muted-foreground"
                            )}
                            onClick={() =>
                                onChange({
                                    ...filters,
                                    technologies: toggleArrayItem(filters.technologies, tech),
                                })
                            }
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div className="pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-sm px-1">
                    <span className="text-muted-foreground font-medium">Resultados</span>
                    <span className="font-bold text-foreground bg-primary/10 text-primary px-2.5 py-0.5 rounded-md border border-primary/20">
                        {resultCount}
                    </span>
                </div>
            </div>
        </div>
    );
}
