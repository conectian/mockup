import { useState, useMemo } from 'react';
import { mockUseCases } from '@/data/marketplace-data';
import UseCaseCard from '@/components/marketplace/UseCaseCard';
import MarketplaceFilters, { type FilterState } from '@/components/marketplace/MarketplaceFilters';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SlidersHorizontal, Search } from 'lucide-react';

const initialFilters: FilterState = {
    search: '',
    industries: [],
    technologies: [],
    tiers: [],
};

export default function MarketplacePage() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filter logic
    const filteredUseCases = useMemo(() => {
        return mockUseCases.filter((uc) => {
            // Search filter
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

            // Industry filter
            if (filters.industries.length > 0) {
                if (!filters.industries.includes(uc.industry)) return false;
            }

            // Technology filter
            if (filters.technologies.length > 0) {
                const hasMatchingTech = uc.techStack.some((t) =>
                    filters.technologies.includes(t)
                );
                if (!hasMatchingTech) return false;
            }

            // Tier filter
            if (filters.tiers.length > 0) {
                if (!filters.tiers.includes(uc.providerTier)) return false;
            }

            return true;
        });
    }, [filters]);

    const resetFilters = () => setFilters(initialFilters);

    return (
        <div className="flex gap-6">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-6 glass-card rounded-xl p-4 shadow-lg">
                    <MarketplaceFilters
                        filters={filters}
                        onChange={setFilters}
                        onReset={resetFilters}
                        resultCount={filteredUseCases.length}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Explorar Marketplace</h1>
                        <p className="text-muted-foreground">
                            Encontrados <span className="font-semibold text-foreground">{filteredUseCases.length}</span> casos de uso
                        </p>
                    </div>

                    {/* Mobile Filter Button */}
                    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="lg:hidden gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                Filtros
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 p-6">
                            <MarketplaceFilters
                                filters={filters}
                                onChange={(f) => {
                                    setFilters(f);
                                }}
                                onReset={() => {
                                    resetFilters();
                                    setMobileFiltersOpen(false);
                                }}
                                resultCount={filteredUseCases.length}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Results Grid */}
                {filteredUseCases.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredUseCases.map((useCase) => (
                            <UseCaseCard key={useCase.id} useCase={useCase} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-muted/30 rounded-xl border-2 border-dashed">
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
        </div>
    );
}
