import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    Search,
    Building2,
    Store,
    FileText,
    Filter,
    X
} from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import CompanyCard from '@/components/marketplace/CompanyCard';
import ProviderCatalogPage from './ProviderCatalogPage';
import RFPMarketPage from './RFPMarketPage';
import { TARGET_COMPANIES } from '@/data/marketplace-data';

const SECTORS = ['Retail', 'Banca', 'Salud', 'Manufactura', 'Logística', 'Energía', 'Telecomunicaciones', 'Tecnología', 'Automoción'];
const COMPANY_SIZES = ['Startup', 'Pyme', 'Corporate/Enterprise', 'Fortune 100', 'Fortune 500'];
const TECHNOLOGIES = ['SAP', 'Microsoft', 'Salesforce', 'Azure', 'AWS', 'Oracle', 'Google Cloud', 'IBM', 'Pamis'];

interface FilterState {
    search: string;
    sectors: string[];
    companySizes: string[];
    technologies: string[];
    revenueMin: string;
    revenueMax: string;
}

const initialFilters: FilterState = {
    search: '',
    sectors: [],
    companySizes: [],
    technologies: [],
    revenueMin: '',
    revenueMax: '',
};

export default function ProviderMarketplacePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const getNormalizedTab = (tab: string | null) => {
        if (!tab) return 'empresas';
        if (tab === 'rfip') return 'rfp';
        return tab;
    };

    const [activeTab, setActiveTab] = useState(getNormalizedTab(tabFromUrl));

    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [sortBy, setSortBy] = useState<string>('name-asc');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Sync activeTab with URL search params
    useEffect(() => {
        const normalized = getNormalizedTab(tabFromUrl);
        if (tabFromUrl && ['empresas', 'casos-de-uso', 'rfp', 'rfip'].includes(tabFromUrl)) {
            setActiveTab(normalized);
            if (tabFromUrl === 'rfip') {
                setSearchParams({ tab: 'rfp' });
            }
        } else if (!tabFromUrl) {
            // Default redirect if no tab
            setSearchParams({ tab: 'empresas' });
        }
    }, [tabFromUrl, setSearchParams]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setSearchParams({ tab: value });
    };

    const resetFilters = () => setFilters(initialFilters);

    const activeFilterCount =
        filters.sectors.length +
        filters.companySizes.length +
        filters.technologies.length +
        (filters.revenueMin ? 1 : 0) +
        (filters.revenueMax ? 1 : 0);

    const filteredCompanies = useMemo(() => {
        const filtered = TARGET_COMPANIES.filter((company) => {
            const matchesSearch = company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                company.industry.toLowerCase().includes(filters.search.toLowerCase());
            const matchesSector = filters.sectors.length === 0 || filters.sectors.some(s => company.sector.toLowerCase().includes(s.toLowerCase()));
            const matchesSize = filters.companySizes.length === 0 || filters.companySizes.includes(company.tier);
            const matchesTech = filters.technologies.length === 0 || filters.technologies.some(t => company.tech.includes(t));
            return matchesSearch && matchesSector && matchesSize && matchesTech;
        });

        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'innovation-high': {
                    const rank: Record<string, number> = { 'ALTO': 3, 'MEDIO': 2, 'BAJO': 1 };
                    return (rank[b.innovation] || 0) - (rank[a.innovation] || 0);
                }
                case 'rfps-high':
                    return (b.rfps || 0) - (a.rfps || 0);
                default:
                    return 0;
            }
        });
    }, [filters, sortBy]);

    const SidebarContent = () => (
        <div className="space-y-8 md:p-4 p-2">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-display font-bold flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtros
                </h3>
                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 w-fit text-xs text-muted-foreground hover:text-destructive px-0 justify-start"
                    >
                        <X className="h-3 w-3 mr-1" />
                        Limpiar filtros ({activeFilterCount})
                    </Button>
                )}
            </div>

            {/* SECTOR */}
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Sector</Label>
                <MultiSelect
                    options={SECTORS}
                    selected={filters.sectors}
                    onChange={(selected) => setFilters({ ...filters, sectors: selected })}
                    placeholder="Seleccionar sectores..."
                />
            </div>

            {/* TAMAÑO DE EMPRESA */}
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Tamaño de Empresa</Label>
                <MultiSelect
                    options={COMPANY_SIZES}
                    selected={filters.companySizes}
                    onChange={(selected) => setFilters({ ...filters, companySizes: selected })}
                    placeholder="Seleccionar tamaños..."
                />
            </div>

            {/* TECNOLOGÍA BASE */}
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Tecnología Base</Label>
                <MultiSelect
                    options={TECHNOLOGIES}
                    selected={filters.technologies}
                    onChange={(selected) => setFilters({ ...filters, technologies: selected })}
                    placeholder="Seleccionar tecnologías..."
                />
            </div>

            {/* FACTURACIÓN ANUAL */}
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Facturación Anual</Label>
                <div className="flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Min"
                        className="bg-muted/30 border-white/10 h-9"
                        value={filters.revenueMin}
                        onChange={(e) => setFilters({ ...filters, revenueMin: e.target.value })}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="text"
                        placeholder="Max"
                        className="bg-muted/30 border-white/10 h-9"
                        value={filters.revenueMax}
                        onChange={(e) => setFilters({ ...filters, revenueMax: e.target.value })}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-4rem)] overflow-hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full flex flex-col">
                {/* Tabs Navigation - At the very top */}
                <TabsList className="hidden p-1 h-auto bg-white/5 border border-white/10 rounded-lg justify-start gap-1 w-fit mx-4 mt-4">
                    <TabsTrigger value="empresas" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                        <Building2 className="h-4 w-4" /> <span className="hidden sm:inline">Empresas</span>
                    </TabsTrigger>
                    <TabsTrigger value="casos-de-uso" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                        <Store className="h-4 w-4" /> <span className="hidden sm:inline">Casos de Uso</span>
                    </TabsTrigger>
                    <TabsTrigger value="rfp" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                        <FileText className="h-4 w-4" /> <span className="hidden sm:inline">RFP</span>
                    </TabsTrigger>
                </TabsList>

                {/* Tab Content: Empresas */}
                <TabsContent value="empresas" className="mt-0 flex-1 min-h-0">
                    <div className="flex gap-6 h-full">
                        {/* Sidebar - Fixed, no scroll */}
                        <div className="hidden lg:flex lg:flex-col w-[320px] shrink-0 p-4 border-r border-white/10 h-full shadow-sm overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <SidebarContent />
                        </div>

                        {/* Main Content - Scrollable */}
                        <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                            {/* Header - Fixed */}
                            <div className="shrink-0 p-4 md:p-6 pb-4">
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h1 className="text-3xl font-display font-bold tracking-tight">Marketplace</h1>
                                        <p className="text-muted-foreground">
                                            {filteredCompanies.length} empresas objetivo para tu empresa
                                        </p>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        {/* Mobile Filters Button */}
                                        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                                            <SheetTrigger asChild>
                                                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                                                    <Filter className="h-4 w-4" />
                                                    Filtros
                                                    {activeFilterCount > 0 && (
                                                        <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">
                                                            {activeFilterCount}
                                                        </Badge>
                                                    )}
                                                </Button>
                                            </SheetTrigger>
                                            <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                                                <div className="py-6 px-6">
                                                    <SidebarContent />
                                                </div>
                                            </SheetContent>
                                        </Sheet>

                                        {/* Sort Dropdown */}
                                        <Select value={sortBy} onValueChange={setSortBy}>
                                            <SelectTrigger className="w-[160px] bg-background/50 border-white/10 h-10">
                                                <SelectValue placeholder="Ordenar por" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                                                <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                                                <SelectItem value="innovation-high">Más Innovadoras</SelectItem>
                                                <SelectItem value="rfps-high">Más RFPs Activas</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        {/* Search */}
                                        <div className="relative w-full md:w-[280px]">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Buscar empresas..."
                                                value={filters.search}
                                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                                className="pl-10 bg-background/50 border-white/10 h-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Cards Grid - Scrollable area */}
                            <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                                {filteredCompanies.length > 0 ? (
                                    <div className="zoom-adaptive-grid">
                                        {filteredCompanies.map((company) => (
                                            <CompanyCard key={company.id} company={company} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed border-white/10">
                                        <Building2 className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                                        <h3 className="text-xl font-display font-bold mb-2">No se encontraron empresas</h3>
                                        <p className="text-muted-foreground mb-6">
                                            Intenta ajustar los filtros o buscar con otros términos
                                        </p>
                                        <Button variant="outline" onClick={resetFilters}>
                                            Limpiar filtros
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Tab Content: Casos de Uso */}
                <TabsContent value="casos-de-uso" className="mt-0 flex-1 min-h-0">
                    <ProviderCatalogPage />
                </TabsContent>

                {/* Tab Content: RFP */}
                <TabsContent value="rfp" className="mt-0 flex-1 min-h-0">
                    <RFPMarketPage />
                </TabsContent>
            </Tabs>
        </div>
    );
}



