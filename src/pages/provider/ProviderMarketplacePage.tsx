import { useState, useMemo } from 'react';
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
    Zap,
    Cpu,
    Landmark,
    ShoppingCart,
    Truck,
    Heart,
    Radio,
    Factory,
    Leaf,
    Car,
    X,
    Filter
} from 'lucide-react';
import { MultiSelect } from '@/components/ui/multi-select';
import CompanyCard from '@/components/marketplace/CompanyCard';
import ProviderCatalogPage from './ProviderCatalogPage';
import RFPMarketPage from './RFPMarketPage';

const TARGET_COMPANIES = [
    {
        id: '1',
        name: 'MERCADONA',
        industry: 'Retail',
        tier: 'Fortune 100',
        tierBadge: 'Seeking Innovation Partner',
        innovation: 'ALTO',
        cloud: 'Azure',
        revenue: '>€25B',
        employees: '90,000+',
        sector: 'Retail',
        tech: ['SAP', 'Azure', 'Microsoft'],
        rfps: 3,
        color: 'bg-emerald-500',
        icon: ShoppingCart,
        image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=500&fit=crop'
    },
    {
        id: '2',
        name: 'HP Enterprise',
        industry: 'Tecnología',
        tier: 'Fortune 100',
        tierBadge: 'Seeking Innovation Partner',
        innovation: 'ALTO',
        cloud: 'Azure',
        revenue: '>$3B USD',
        employees: '30,000+',
        sector: 'Tecnología',
        tech: ['SAP', 'Microsoft', 'Azure'],
        rfps: 5,
        color: 'bg-amber-500',
        icon: Cpu,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
    },
    {
        id: '3',
        name: 'Banco Santander',
        industry: 'Banca',
        tier: 'Fortune 100',
        tierBadge: '',
        innovation: 'ALTO',
        cloud: 'Azure',
        revenue: '>€50B',
        employees: '200,000+',
        sector: 'Banca',
        tech: ['SAP', 'Azure', 'Salesforce'],
        rfps: 2,
        color: 'bg-red-500',
        icon: Landmark,
        image: 'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop'
    },
    {
        id: '4',
        name: 'TalentFlow HR',
        industry: 'HR',
        tier: 'Innovation Leader',
        tierBadge: 'HR Tech Pioneer',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '€500M-1B',
        employees: '5,000+',
        sector: 'HR',
        tech: ['Salesforce', 'AWS'],
        rfps: 1,
        color: 'bg-indigo-500',
        icon: Building2,
        image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop'
    },
    {
        id: '5',
        name: 'TechCorp Solutions',
        industry: 'Tecnología',
        tier: 'Enterprise',
        tierBadge: 'AI First',
        innovation: 'MEDIO',
        cloud: 'Google Cloud',
        revenue: '€1B-5B',
        employees: '10,000+',
        sector: 'Tecnología',
        tech: ['Google Cloud', 'Salesforce'],
        rfps: 0,
        color: 'bg-teal-500',
        icon: Zap,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
    },
    {
        id: '6',
        name: 'LogiTech Global',
        industry: 'Logística',
        tier: 'Fortune 500',
        tierBadge: 'Supply Chain Expert',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '€5B-10B',
        employees: '25,000+',
        sector: 'Logística',
        tech: ['SAP', 'AWS', 'Oracle'],
        rfps: 4,
        color: 'bg-cyan-500',
        icon: Truck,
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop'
    },
    {
        id: '7',
        name: 'Telefónica',
        industry: 'Telecomunicaciones',
        tier: 'Fortune 100',
        tierBadge: 'Strategic Partner',
        innovation: 'ALTO',
        cloud: 'Azure',
        revenue: '>€40B',
        employees: '100,000+',
        sector: 'Telecomunicaciones',
        tech: ['SAP', 'Azure', 'Oracle', 'AWS'],
        rfps: 7,
        color: 'bg-blue-600',
        icon: Radio,
        image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=500&fit=crop'
    },
    {
        id: '8',
        name: 'Repsol',
        industry: 'Energía',
        tier: 'Fortune 500',
        tierBadge: 'Green Transition',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '>€60B',
        employees: '24,000+',
        sector: 'Energía',
        tech: ['SAP', 'AWS', 'Microsoft'],
        rfps: 3,
        color: 'bg-orange-500',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop'
    },
    {
        id: '9',
        name: 'SEAT / Cupra',
        industry: 'Automoción',
        tier: 'Enterprise',
        tierBadge: 'Innovation Partner',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '>€10B',
        employees: '15,000+',
        sector: 'Automoción',
        tech: ['SAP', 'AWS', 'Salesforce'],
        rfps: 2,
        color: 'bg-rose-500',
        icon: Car,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop'
    },
    {
        id: '10',
        name: 'Mapfre',
        industry: 'Seguros',
        tier: 'Fortune 500',
        tierBadge: 'InsurTech Ready',
        innovation: 'MEDIO',
        cloud: 'Azure',
        revenue: '>€25B',
        employees: '30,000+',
        sector: 'Seguros',
        tech: ['SAP', 'Microsoft', 'Salesforce'],
        rfps: 1,
        color: 'bg-red-600',
        icon: Heart,
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop'
    },
    {
        id: '11',
        name: 'Inditex',
        industry: 'Retail',
        tier: 'Fortune 100',
        tierBadge: 'Global Leader',
        innovation: 'ALTO',
        cloud: 'Google Cloud',
        revenue: '>€30B',
        employees: '160,000+',
        sector: 'Retail',
        tech: ['Google Cloud', 'SAP', 'Microsoft'],
        rfps: 6,
        color: 'bg-slate-700',
        icon: ShoppingCart,
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop'
    },
    {
        id: '12',
        name: 'Acciona',
        industry: 'Infraestructura',
        tier: 'Enterprise',
        tierBadge: 'Sustainable',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '>€8B',
        employees: '40,000+',
        sector: 'Infraestructura',
        tech: ['SAP', 'AWS', 'Oracle'],
        rfps: 2,
        color: 'bg-lime-600',
        icon: Factory,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop'
    }
];

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
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const resetFilters = () => setFilters(initialFilters);



    const activeFilterCount =
        filters.sectors.length +
        filters.companySizes.length +
        filters.technologies.length +
        (filters.revenueMin ? 1 : 0) +
        (filters.revenueMax ? 1 : 0);

    const filteredCompanies = useMemo(() => {
        return TARGET_COMPANIES.filter((company) => {
            const matchesSearch = company.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                company.industry.toLowerCase().includes(filters.search.toLowerCase());
            const matchesSector = filters.sectors.length === 0 || filters.sectors.some(s => company.sector.toLowerCase().includes(s.toLowerCase()));
            const matchesSize = filters.companySizes.length === 0 || filters.companySizes.includes(company.tier);
            const matchesTech = filters.technologies.length === 0 || filters.technologies.some(t => company.tech.includes(t));
            return matchesSearch && matchesSector && matchesSize && matchesTech;
        });
    }, [filters]);

    const SidebarContent = () => (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtros
                </h3>
                {activeFilterCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetFilters}
                        className="h-8 text-xs text-muted-foreground hover:text-destructive px-2"
                    >
                        <X className="h-3 w-3 mr-1" />
                        Limpiar ({activeFilterCount})
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
        <Tabs defaultValue="empresas" className="space-y-6">
            {/* Tabs Navigation - At the very top */}
            <TabsList className="p-1 h-auto bg-white/5 border border-white/10 rounded-lg justify-start gap-1 w-fit">
                <TabsTrigger value="empresas" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Building2 className="h-4 w-4" /> <span className="hidden sm:inline">Empresas</span>
                </TabsTrigger>
                <TabsTrigger value="casos-de-uso" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Store className="h-4 w-4" /> <span className="hidden sm:inline">Casos de Uso</span>
                </TabsTrigger>
                <TabsTrigger value="demandas" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <FileText className="h-4 w-4" /> <span className="hidden sm:inline">Demandas</span>
                </TabsTrigger>
            </TabsList>

            {/* Tab Content: Empresas */}
            <TabsContent value="empresas" className="mt-0">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <SidebarContent />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="space-y-6">
                        {/* Header Row: Title + Search */}
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

                                {/* Search */}
                                <div className="relative w-full md:w-[280px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar empresas..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                        className="pl-10 bg-background/50 border-white/10"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Results Grid */}
                        {filteredCompanies.length > 0 ? (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
            </TabsContent>

            {/* Tab Content: Casos de Uso */}
            <TabsContent value="casos-de-uso" className="mt-0">
                <ProviderCatalogPage />
            </TabsContent>

            {/* Tab Content: Demandas */}
            <TabsContent value="demandas" className="mt-0">
                <RFPMarketPage />
            </TabsContent>
        </Tabs>
    );
}



