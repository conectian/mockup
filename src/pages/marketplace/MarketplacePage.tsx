import { useState, useMemo } from 'react';
import { mockUseCases, INDUSTRIES, TECHNOLOGIES, type ProviderTier } from '@/data/marketplace-data';
import UseCaseCard from '@/components/marketplace/UseCaseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Search, X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface FilterState {
    search: string;
    industries: string[];
    technologies: string[];
    tiers: ProviderTier[];
}

const initialFilters: FilterState = {
    search: '',
    industries: [],
    technologies: [],
    tiers: [],
};

const TIERS: ProviderTier[] = ['Gold', 'Silver', 'Bronze'];

export default function MarketplacePage() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    // Filter logic
    const filteredUseCases = useMemo(() => {
        return mockUseCases.filter((uc) => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matchesSearch =
                    uc.title.toLowerCase().includes(searchLower) ||
                    uc.description.toLowerCase().includes(searchLower) ||
                    uc.providerName.toLowerCase().includes(searchLower) ||
                    uc.industry.toLowerCase().includes(searchLower) ||
                    uc.techStack.some((t) => t.toLowerCase().includes(searchLower));
                if (!matchesSearch) return false;
            }

            if (filters.industries.length > 0) {
                if (!filters.industries.includes(uc.industry)) return false;
            }

            if (filters.technologies.length > 0) {
                const hasMatchingTech = uc.techStack.some((t) =>
                    filters.technologies.includes(t)
                );
                if (!hasMatchingTech) return false;
            }

            if (filters.tiers.length > 0) {
                if (!filters.tiers.includes(uc.providerTier)) return false;
            }

            return true;
        });
    }, [filters]);

    const resetFilters = () => setFilters(initialFilters);

    const hasActiveFilters =
        filters.search ||
        filters.industries.length > 0 ||
        filters.technologies.length > 0 ||
        filters.tiers.length > 0;

    const activeFilterCount =
        filters.industries.length +
        filters.technologies.length +
        filters.tiers.length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Explorar Marketplace</h1>
                <p className="text-muted-foreground">
                    Encontrados <span className="font-semibold text-foreground">{filteredUseCases.length}</span> casos de uso
                </p>
            </div>

            {/* Horizontal Filters Bar */}
            <div className="glass-card rounded-md p-4 space-y-4">
                {/* Top Row: Search + Filter Dropdowns */}
                <div className="flex flex-col lg:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar solución..."
                            value={filters.search}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            className="pl-10 h-11 bg-background/50"
                        />
                    </div>

                    {/* Desktop Filter Dropdowns */}
                    <div className="hidden lg:flex items-center gap-2">
                        {/* Partner Level Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 gap-2">
                                    Partner
                                    {filters.tiers.length > 0 && (
                                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                                            {filters.tiers.length}
                                        </Badge>
                                    )}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-40">
                                {TIERS.map((tier) => (
                                    <DropdownMenuCheckboxItem
                                        key={tier}
                                        checked={filters.tiers.includes(tier)}
                                        onCheckedChange={() =>
                                            setFilters({ ...filters, tiers: toggleArrayItem(filters.tiers, tier) })
                                        }
                                    >
                                        <span className={cn(
                                            "mr-2",
                                            tier === 'Gold' && "text-amber-500",
                                            tier === 'Silver' && "text-slate-400",
                                            tier === 'Bronze' && "text-orange-500"
                                        )}>●</span>
                                        {tier}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Industry Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 gap-2">
                                    Industria
                                    {filters.industries.length > 0 && (
                                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                                            {filters.industries.length}
                                        </Badge>
                                    )}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
                                {INDUSTRIES.map((industry) => (
                                    <DropdownMenuCheckboxItem
                                        key={industry}
                                        checked={filters.industries.includes(industry)}
                                        onCheckedChange={() =>
                                            setFilters({ ...filters, industries: toggleArrayItem(filters.industries, industry) })
                                        }
                                    >
                                        {industry}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Technology Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-11 gap-2">
                                    Tecnología
                                    {filters.technologies.length > 0 && (
                                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-indigo-600 text-xs">
                                            {filters.technologies.length}
                                        </Badge>
                                    )}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-48 max-h-64 overflow-y-auto">
                                {TECHNOLOGIES.map((tech) => (
                                    <DropdownMenuCheckboxItem
                                        key={tech}
                                        checked={filters.technologies.includes(tech)}
                                        onCheckedChange={() =>
                                            setFilters({ ...filters, technologies: toggleArrayItem(filters.technologies, tech) })
                                        }
                                    >
                                        {tech}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-11 text-muted-foreground hover:text-destructive">
                                <X className="h-4 w-4 mr-1" />
                                Limpiar
                            </Button>
                        )}
                    </div>

                    {/* Mobile Filters Button */}
                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden h-11 gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filtros
                                {activeFilterCount > 0 && (
                                    <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                                        {activeFilterCount}
                                    </Badge>
                                )}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
                            <SheetHeader className="pb-4">
                                <SheetTitle>Filtros</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-6 overflow-y-auto">
                                {/* Partner Tier */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold">Partner Level</label>
                                    <div className="flex flex-wrap gap-2">
                                        {TIERS.map((tier) => (
                                            <Badge
                                                key={tier}
                                                variant={filters.tiers.includes(tier) ? 'default' : 'outline'}
                                                className={cn(
                                                    "cursor-pointer px-4 py-2",
                                                    filters.tiers.includes(tier) && tier === 'Gold' && 'bg-amber-500',
                                                    filters.tiers.includes(tier) && tier === 'Silver' && 'bg-slate-400',
                                                    filters.tiers.includes(tier) && tier === 'Bronze' && 'bg-orange-500'
                                                )}
                                                onClick={() => setFilters({ ...filters, tiers: toggleArrayItem(filters.tiers, tier) })}
                                            >
                                                {tier}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Industries */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold">Industrias</label>
                                    <div className="flex flex-wrap gap-2">
                                        {INDUSTRIES.map((industry) => (
                                            <Badge
                                                key={industry}
                                                variant={filters.industries.includes(industry) ? 'default' : 'outline'}
                                                className="cursor-pointer px-3 py-1.5"
                                                onClick={() => setFilters({ ...filters, industries: toggleArrayItem(filters.industries, industry) })}
                                            >
                                                {industry}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {/* Technologies */}
                                <div className="space-y-3">
                                    <label className="text-sm font-semibold">Tecnologías</label>
                                    <div className="flex flex-wrap gap-2">
                                        {TECHNOLOGIES.map((tech) => (
                                            <Badge
                                                key={tech}
                                                variant={filters.technologies.includes(tech) ? 'default' : 'outline'}
                                                className={cn(
                                                    "cursor-pointer px-3 py-1.5",
                                                    filters.technologies.includes(tech) && "bg-indigo-600"
                                                )}
                                                onClick={() => setFilters({ ...filters, technologies: toggleArrayItem(filters.technologies, tech) })}
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <Button variant="outline" className="flex-1" onClick={resetFilters}>
                                        Limpiar
                                    </Button>
                                    <Button className="flex-1" onClick={() => setMobileFiltersOpen(false)}>
                                        Ver {filteredUseCases.length} resultados
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Active Filter Chips */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2">
                        {filters.tiers.map((tier) => (
                            <Badge
                                key={tier}
                                className={cn(
                                    "gap-1.5 px-3 py-1 cursor-pointer",
                                    tier === 'Gold' && "bg-amber-500 hover:bg-amber-600",
                                    tier === 'Silver' && "bg-slate-400 hover:bg-slate-500",
                                    tier === 'Bronze' && "bg-orange-500 hover:bg-orange-600"
                                )}
                                onClick={() => setFilters({ ...filters, tiers: toggleArrayItem(filters.tiers, tier) })}
                            >
                                {tier} <X className="h-3 w-3" />
                            </Badge>
                        ))}
                        {filters.industries.map((industry) => (
                            <Badge
                                key={industry}
                                className="gap-1.5 px-3 py-1 cursor-pointer bg-primary hover:bg-primary/80"
                                onClick={() => setFilters({ ...filters, industries: toggleArrayItem(filters.industries, industry) })}
                            >
                                {industry} <X className="h-3 w-3" />
                            </Badge>
                        ))}
                        {filters.technologies.map((tech) => (
                            <Badge
                                key={tech}
                                className="gap-1.5 px-3 py-1 cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => setFilters({ ...filters, technologies: toggleArrayItem(filters.technologies, tech) })}
                            >
                                {tech} <X className="h-3 w-3" />
                            </Badge>
                        ))}
                    </div>
                )}
            </div>

            {/* Results Grid */}
            {filteredUseCases.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUseCases.map((useCase) => (
                        <UseCaseCard key={useCase.id} useCase={useCase} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-muted/30 rounded-md border-2 border-dashed">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No se encontraron resultados</h3>
                    <p className="text-muted-foreground mb-4">
                        Prueba ajustando los filtros de búsqueda
                    </p>
                    <Button variant="outline" onClick={resetFilters}>
                        Limpiar filtros
                    </Button>
                </div>
            )}
        </div>
    );
}
