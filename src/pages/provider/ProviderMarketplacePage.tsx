import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProviderCatalogPage from './ProviderCatalogPage';
import RFPMarketPage from './RFPMarketPage';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
        icon: ShoppingCart
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
        icon: Cpu
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
        icon: Landmark
    },
    {
        id: '4',
        name: 'Asistente RRHH Pro',
        industry: 'HR',
        tier: 'Innovation Leader',
        tierBadge: '',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '€500M-1B',
        employees: '5,000+',
        sector: 'HR',
        tech: ['Salesforce', 'AWS'],
        rfps: 1,
        color: 'bg-indigo-500',
        icon: Building2
    },
    {
        id: '5',
        name: 'TechCorp Solutions',
        industry: 'Tecnología',
        tier: 'Startup',
        tierBadge: '',
        innovation: 'MEDIO',
        cloud: 'Google Cloud',
        revenue: '€1B-5B',
        employees: '10,000+',
        sector: 'Tecnología',
        tech: ['Google Cloud', 'Salesforce'],
        rfps: 0,
        color: 'bg-teal-500',
        icon: Zap
    },
    {
        id: '6',
        name: 'LogiTech Global',
        industry: 'Logística',
        tier: 'Logistics Leader',
        tierBadge: '',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '€5B-10B',
        employees: '25,000+',
        sector: 'Logística',
        tech: ['SAP', 'AWS', 'Oracle'],
        rfps: 4,
        color: 'bg-cyan-500',
        icon: Truck
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
        icon: Radio
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
        icon: Leaf
    },
    {
        id: '9',
        name: 'SEAT / Cupra',
        industry: 'Automoción',
        tier: 'Corporate/Enterprise',
        tierBadge: 'Innovation Partner',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '>€10B',
        employees: '15,000+',
        sector: 'Automoción',
        tech: ['SAP', 'AWS', 'Salesforce'],
        rfps: 2,
        color: 'bg-rose-500',
        icon: Car
    },
    {
        id: '10',
        name: 'Mapfre',
        industry: 'Seguros',
        tier: 'Fortune 500',
        tierBadge: '',
        innovation: 'MEDIO',
        cloud: 'Azure',
        revenue: '>€25B',
        employees: '30,000+',
        sector: 'Seguros',
        tech: ['SAP', 'Microsoft', 'Salesforce'],
        rfps: 1,
        color: 'bg-red-600',
        icon: Heart
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
        icon: ShoppingCart
    },
    {
        id: '12',
        name: 'Acciona',
        industry: 'Infraestructura',
        tier: 'Corporate/Enterprise',
        tierBadge: 'Sustainable',
        innovation: 'ALTO',
        cloud: 'AWS',
        revenue: '>€8B',
        employees: '40,000+',
        sector: 'Infraestructura',
        tech: ['SAP', 'AWS', 'Oracle'],
        rfps: 2,
        color: 'bg-lime-600',
        icon: Factory
    }
];

const SECTORS = ['Retail', 'Banca', 'Salud', 'Manufactura', 'Logística', 'Energía', 'Telecomunicaciones', 'Tecnología', 'Automoción', 'HR', 'Seguros', 'Infraestructura'];
const COMPANY_SIZES = ['Startup', 'Pyme', 'Corporate/Enterprise', 'Fortune 100', 'Fortune 500'];
const TECHNOLOGIES = ['SAP', 'Microsoft', 'Salesforce', 'Azure', 'AWS', 'Oracle', 'Google Cloud'];

interface MultiSelectProps {
    label: string;
    options: string[];
    selected: string[];
    onToggle: (option: string) => void;
}

function MultiSelect({ label, options, selected, onToggle }: MultiSelectProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "h-10 px-4 gap-2 bg-white/5 border-white/10 hover:bg-white/10 justify-between min-w-[140px]",
                        selected.length > 0 && "border-primary/50 bg-primary/5"
                    )}
                >
                    <span className="text-sm font-medium truncate">
                        {selected.length > 0 ? `${label} (${selected.length})` : label}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-2 glass-card border-white/10" align="start">
                <div className="space-y-1 max-h-64 overflow-y-auto">
                    {options.map(option => (
                        <label
                            key={option}
                            className={cn(
                                "flex items-center gap-2.5 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
                                selected.includes(option) ? "bg-primary/10 text-primary" : "hover:bg-white/5"
                            )}
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => onToggle(option)}
                                className="h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary/30"
                            />
                            <span className="text-sm">{option}</span>
                        </label>
                    ))}
                </div>
                {selected.length > 0 && (
                    <div className="pt-2 mt-2 border-t border-white/5">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-8 text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => selected.forEach(s => onToggle(s))}
                        >
                            Limpiar selección
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}

export default function ProviderMarketplacePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

    const toggleSector = (sector: string) => {
        setSelectedSectors(prev =>
            prev.includes(sector) ? prev.filter(s => s !== sector) : [...prev, sector]
        );
    };

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const toggleTech = (tech: string) => {
        setSelectedTechs(prev =>
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
        );
    };

    const clearAllFilters = () => {
        setSelectedSectors([]);
        setSelectedSizes([]);
        setSelectedTechs([]);
        setSearchTerm('');
    };

    const hasActiveFilters = selectedSectors.length > 0 || selectedSizes.length > 0 || selectedTechs.length > 0 || searchTerm;

    const filteredCompanies = TARGET_COMPANIES.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.industry.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSector = selectedSectors.length === 0 || selectedSectors.some(s => company.sector.toLowerCase().includes(s.toLowerCase()));
        const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(company.tier);
        const matchesTech = selectedTechs.length === 0 || selectedTechs.some(t => company.tech.includes(t));
        return matchesSearch && matchesSector && matchesSize && matchesTech;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold tracking-tight text-[#243A57] dark:text-white">Marketplace</h1>
                <p className="text-muted-foreground mt-1 text-sm">Empresas objetivo, tus soluciones y demandas activas.</p>
            </div>

            <Tabs defaultValue="empresas" className="w-full">
                <TabsList className="bg-white/50 dark:bg-white/5 border border-white/10 p-1 h-12">
                    <TabsTrigger value="empresas" className="gap-2 px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">
                        <Building2 className="h-4 w-4" /> Empresas
                    </TabsTrigger>
                    <TabsTrigger value="casos-de-uso" className="gap-2 px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">
                        <Store className="h-4 w-4" /> Casos de Uso
                    </TabsTrigger>
                    <TabsTrigger value="demandas" className="gap-2 px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-white/10 data-[state=active]:shadow-sm">
                        <FileText className="h-4 w-4" /> Demandas (RFPs)
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="empresas" className="pt-6 space-y-6">
                    {/* Top Filters Bar */}
                    <Card className="glass-card border-white/10">
                        <CardContent className="p-4">
                            <div className="flex flex-wrap items-center gap-3">
                                {/* Multi-selects */}
                                <MultiSelect
                                    label="Sector"
                                    options={SECTORS}
                                    selected={selectedSectors}
                                    onToggle={toggleSector}
                                />
                                <MultiSelect
                                    label="Tamaño"
                                    options={COMPANY_SIZES}
                                    selected={selectedSizes}
                                    onToggle={toggleSize}
                                />
                                <MultiSelect
                                    label="Tecnología"
                                    options={TECHNOLOGIES}
                                    selected={selectedTechs}
                                    onToggle={toggleTech}
                                />

                                <div className="h-8 w-px bg-white/10 mx-1" />

                                {/* Search */}
                                <div className="relative flex-1 min-w-[200px] max-w-xs">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Buscar empresas..."
                                        className="pl-10 bg-white/5 border-white/10 h-10"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                {/* Order by */}
                                <div className="flex items-center gap-2 ml-auto">
                                    <span className="text-[11px] font-bold uppercase text-muted-foreground/60">Ordenar:</span>
                                    <select className="bg-transparent text-sm font-semibold border-none focus:ring-0 cursor-pointer">
                                        <option>Relevancia</option>
                                        <option>Nuevos</option>
                                        <option>RFPs activos</option>
                                    </select>
                                </div>

                                {/* Clear Filters */}
                                {hasActiveFilters && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-10 px-3 text-xs text-muted-foreground hover:text-foreground gap-1.5"
                                        onClick={clearAllFilters}
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Limpiar
                                    </Button>
                                )}
                            </div>

                            {/* Active Filter Tags */}
                            {hasActiveFilters && (
                                <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/5">
                                    {selectedSectors.map(s => (
                                        <Badge key={s} variant="secondary" className="bg-primary/10 text-primary gap-1.5 pr-1.5">
                                            {s}
                                            <button onClick={() => toggleSector(s)} className="hover:bg-primary/20 rounded-full p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {selectedSizes.map(s => (
                                        <Badge key={s} variant="secondary" className="bg-blue-500/10 text-blue-400 gap-1.5 pr-1.5">
                                            {s}
                                            <button onClick={() => toggleSize(s)} className="hover:bg-blue-500/20 rounded-full p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                    {selectedTechs.map(t => (
                                        <Badge key={t} variant="secondary" className="bg-emerald-500/10 text-emerald-400 gap-1.5 pr-1.5">
                                            {t}
                                            <button onClick={() => toggleTech(t)} className="hover:bg-emerald-500/20 rounded-full p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Results Header */}
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#243A57] dark:text-white">
                            EMPRESAS OBJETIVO
                            <Badge variant="secondary" className="ml-3 bg-white/10 text-muted-foreground">
                                {filteredCompanies.length} resultados
                            </Badge>
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filteredCompanies.map((company) => {
                            const IconComponent = company.icon;
                            return (
                                <Card key={company.id} className="glass-card group hover:border-primary/30 transition-all overflow-hidden border-white/10">
                                    <CardContent className="p-5 space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start gap-4">
                                            <div className={cn("h-14 w-14 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0", company.color)}>
                                                <IconComponent className="h-7 w-7" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-[#243A57] dark:text-white truncate">{company.name}</h3>
                                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 text-[10px] h-5 leading-none border-0 px-2">
                                                        {company.tier}
                                                    </Badge>
                                                    {company.tierBadge && (
                                                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 text-[10px] h-5 leading-none border-0 px-2">
                                                            {company.tierBadge}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Details - Vertical List */}
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Innovación:</span>
                                                <Badge className={cn(
                                                    "text-[10px] h-5 border-0 px-2",
                                                    company.innovation === 'ALTO' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                                )}>
                                                    {company.innovation}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Cloud:</span>
                                                <span className="font-semibold text-foreground">{company.cloud}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Facturación:</span>
                                                <span className="font-semibold text-foreground">{company.revenue}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Empleados:</span>
                                                <span className="font-semibold text-foreground">{company.employees}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-muted-foreground">Sector:</span>
                                                <span className="font-semibold text-foreground">{company.sector}</span>
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-muted-foreground shrink-0">Tecnologías:</span>
                                            <div className="flex flex-wrap gap-1.5">
                                                {company.tech.map(t => (
                                                    <Badge key={t} variant="outline" className="text-[10px] bg-white/5 border-white/10 px-2 h-5">{t}</Badge>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="pt-3 border-t border-white/5 flex items-center gap-3">
                                            <Button variant="outline" size="sm" className="flex-1 h-9 text-xs border-primary/30 text-primary hover:bg-primary/5">
                                                Ver Necesidades ({company.rfps})
                                            </Button>
                                            <Button size="sm" className="flex-1 premium-gradient h-9 text-xs rounded-lg">
                                                Enviar Propuesta
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredCompanies.length === 0 && (
                        <div className="text-center py-16 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <Building2 className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-bold text-[#243A57] dark:text-white mb-2">No se encontraron empresas</h3>
                            <p className="text-muted-foreground mb-4">Prueba a ajustar los filtros o el término de búsqueda.</p>
                            <Button variant="outline" onClick={clearAllFilters}>Limpiar filtros</Button>
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="casos-de-uso" className="pt-6">
                    <ProviderCatalogPage />
                </TabsContent>

                <TabsContent value="demandas" className="pt-6">
                    <RFPMarketPage />
                </TabsContent>
            </Tabs>
        </div>
    );
}
