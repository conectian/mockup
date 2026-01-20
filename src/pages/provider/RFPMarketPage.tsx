import { useState, useMemo } from 'react';
import { mockRFPs } from '@/data/rfp-data';
import RFPActionCard from '@/components/rfp/RFPActionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

const SECTORS = [
    'Fintech & Banca',
    'Retail & E-commerce',
    'Logística & Supply Chain',
    'Salud & Healthcare',
    'Marketing & Publicidad',
    'Manufactura',
    'Energía',
    'Educación',
];

const OFFERING_TYPES = ['Servicio', 'Producto', 'Formación'];
const PROVIDER_SIZES = ['Startup', 'Scale-up', 'Enterprise', 'Cualquiera'];
const USE_CASE_MATURITY = ['Piloto', 'Producción', 'Escalado', 'Cualquiera'];
const AI_TYPES = ['Cerrada', 'Abierta', 'Mixta'];
const TECH_MODALITIES = ['On-premise', 'Cloud', 'Híbrida', 'SaaS'];
const INTEGRATION_TIMES = ['Cualquiera', '1-2 semanas', '1 mes', '2-3 meses', '3-6 meses', '6+ meses'];
const LANGUAGES = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués'];
const LOCATIONS = ['Cualquiera', 'España', 'Unión Europea', 'Estados Unidos', 'Reino Unido', 'Latinoamérica'];

const REGULATIONS = ['GDPR', 'HIPAA', 'SOC 2', 'ISO 27001', 'PCI DSS'];
const CERTIFICATIONS = ['ISO 9001', 'ISO 14001', 'CMMI', 'ITIL'];
const DATA_SECURITY = ['Encriptación', 'Backup automático', 'Redundancia', 'Auditoría'];

interface FilterState {
    search: string;
    sector: string[];
    offeringType: string[];
    costMin: string;
    costMax: string;
    providerSize: string[];
    maturity: string[];
    aiType: string[];
    techModality: string[];
    humanIntervention: boolean;
    techStack: string;
    integrations: string;
    integrationTime: string;
    language: string[];
    location: string[];
    regulations: string[];
    certifications: string[];
    dataSecurity: string[];
}

const initialFilters: FilterState = {
    search: '',
    sector: [],
    offeringType: [],
    costMin: '',
    costMax: '',
    providerSize: [],
    maturity: [],
    aiType: [],
    techModality: [],
    humanIntervention: false,
    techStack: '',
    integrations: '',
    integrationTime: 'Cualquiera',
    language: [],
    location: [],
    regulations: [],
    certifications: [],
    dataSecurity: [],
};

export default function RFPMarketPage() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    const resetFilters = () => setFilters(initialFilters);

    const activeFilterCount = Object.entries(filters).reduce((acc, [key, value]) => {
        if (key === 'humanIntervention') return value ? acc + 1 : acc;
        if (Array.isArray(value)) return acc + value.length;
        if (typeof value === 'string' && value && value !== 'Cualquiera') return acc + 1;
        return acc;
    }, 0);

    const filteredRFPs = useMemo(() => {
        const searchLower = filters.search.toLowerCase();
        const stackSearch = filters.techStack.toLowerCase();

        return mockRFPs.filter((rfp) => {
            if (filters.search) {
                const matches =
                    rfp.title.toLowerCase().includes(searchLower) ||
                    rfp.description.toLowerCase().includes(searchLower) ||
                    rfp.industry.toLowerCase().includes(searchLower);
                if (!matches) return false;
            }
            if (filters.sector.length > 0) {
                const hasMatch = filters.sector.some(selectedSector =>
                    rfp.industry.toLowerCase().includes(selectedSector.split(' ')[0].toLowerCase())
                );
                if (!hasMatch) return false;
            }
            if (filters.techStack) {
                // Assuming RFPs might have tech stack info, adjust as needed
                const rfpTech = (rfp as any).techStack || [];
                if (!rfpTech.some((t: string) => t.toLowerCase().includes(stackSearch))) return false;
            }
            return true;
        });
    }, [filters]);

    const SidebarContent = () => (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-bold flex items-center gap-2">
                    <Filter className="h-4 w-4" /> Filtros Avanzados
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

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Sector</Label>
                <MultiSelect
                    options={SECTORS}
                    selected={filters.sector}
                    onChange={(selected) => setFilters({ ...filters, sector: selected })}
                    placeholder="Seleccionar sectores..."
                />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Servicio / Producto</Label>
                <div className="flex flex-wrap gap-2">
                    {OFFERING_TYPES.map((type) => (
                        <Badge
                            key={type}
                            variant="outline"
                            className={cn(
                                "cursor-pointer px-3 py-1.5 hover:bg-muted transition-colors",
                                filters.offeringType.includes(type)
                                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                                    : "bg-transparent border-white/20 text-muted-foreground"
                            )}
                            onClick={() => setFilters({ ...filters, offeringType: toggleArrayItem(filters.offeringType, type) })}
                        >
                            {type}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Coste (€)</Label>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        className="bg-muted/30 border-white/10 h-9"
                        value={filters.costMin}
                        onChange={(e) => setFilters({ ...filters, costMin: e.target.value })}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        className="bg-muted/30 border-white/10 h-9"
                        value={filters.costMax}
                        onChange={(e) => setFilters({ ...filters, costMax: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Tamaño Proveedor</Label>
                <MultiSelect options={PROVIDER_SIZES} selected={filters.providerSize} onChange={(s) => setFilters({ ...filters, providerSize: s })} placeholder="Seleccionar..." />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Madurez Use Case</Label>
                <MultiSelect options={USE_CASE_MATURITY} selected={filters.maturity} onChange={(s) => setFilters({ ...filters, maturity: s })} placeholder="Seleccionar..." />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Tipo de IA</Label>
                <div className="flex flex-wrap gap-2">
                    {AI_TYPES.map(type => (
                        <Badge key={type} variant="outline" className={cn("cursor-pointer px-3 py-1.5 rounded-full", filters.aiType.includes(type) ? "bg-indigo-600/20 text-indigo-400 border-indigo-500/50" : "bg-transparent border-white/20 text-muted-foreground")} onClick={() => setFilters({ ...filters, aiType: toggleArrayItem(filters.aiType, type) })}>{type}</Badge>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Modalidad Técnica</Label>
                <MultiSelect options={TECH_MODALITIES} selected={filters.techModality} onChange={s => setFilters({ ...filters, techModality: s })} placeholder="Seleccionar..." />
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-muted/20 border border-white/5">
                <Label className="text-sm font-medium">Intervención Humana</Label>
                <Switch checked={filters.humanIntervention} onCheckedChange={c => setFilters({ ...filters, humanIntervention: c })} />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Stack Tecnológico</Label>
                <Input placeholder="Buscar..." className="bg-muted/30 border-white/10 h-9" value={filters.techStack} onChange={e => setFilters({ ...filters, techStack: e.target.value })} />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Integraciones</Label>
                <Input placeholder="Buscar..." className="bg-muted/30 border-white/10 h-9" value={filters.integrations} onChange={e => setFilters({ ...filters, integrations: e.target.value })} />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Tiempo Integración</Label>
                <Select value={filters.integrationTime} onValueChange={v => setFilters({ ...filters, integrationTime: v })}>
                    <SelectTrigger className="w-full bg-muted/30 border-white/10"><SelectValue /></SelectTrigger>
                    <SelectContent>{INTEGRATION_TIMES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Idiomas</Label>
                <MultiSelect options={LANGUAGES} selected={filters.language} onChange={s => setFilters({ ...filters, language: s })} placeholder="Seleccionar..." />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Ubicación</Label>
                <MultiSelect options={LOCATIONS} selected={filters.location} onChange={s => setFilters({ ...filters, location: s })} placeholder="Seleccionar..." />
            </div>

            <div className="h-px bg-white/10 my-6" />
            <h4 className="font-display font-bold text-sm mb-4">Compliance & Seguridad</h4>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Regulaciones</Label>
                <MultiSelect options={REGULATIONS} selected={filters.regulations} onChange={s => setFilters({ ...filters, regulations: s })} placeholder="Seleccionar..." />
            </div>
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Certificaciones</Label>
                <MultiSelect options={CERTIFICATIONS} selected={filters.certifications} onChange={s => setFilters({ ...filters, certifications: s })} placeholder="Seleccionar..." />
            </div>
            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Seguridad de Datos</Label>
                <MultiSelect options={DATA_SECURITY} selected={filters.dataSecurity} onChange={s => setFilters({ ...filters, dataSecurity: s })} placeholder="Seleccionar..." />
            </div>
        </div>
    );

    return (
        <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block zoom-fixed-sidebar">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <SidebarContent />
                </div>
            </div>

            <div className="space-y-6 min-w-0 flex-1">
                {/* Search & Filters Header */}
                <div className="flex flex-col gap-4">
                    <div className="min-w-0">
                        <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight truncate">RFIP - Oportunidades</h1>
                        <p className="text-muted-foreground text-sm md:text-base">Encuentra nuevas demandas de innovación</p>
                    </div>

                    <div className="flex gap-2 w-full">
                        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                            <SheetTrigger asChild>
                                <Button variant="outline" className="lg:hidden flex-1 gap-2">
                                    <SlidersHorizontal className="h-4 w-4" /> Filtros
                                    {activeFilterCount > 0 && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">{activeFilterCount}</Badge>}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                                <div className="py-6 px-6"><SidebarContent /></div>
                            </SheetContent>
                        </Sheet>
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título, industria..."
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                className="pl-10 bg-background/50 border-white/10 h-10"
                            />
                        </div>
                    </div>
                </div>

                {/* Results Info */}
                <div className="flex items-center gap-2">
                    <Badge className="bg-primary/10 text-primary border-0 text-sm px-3 h-6">
                        {filteredRFPs.length} oportunidades
                    </Badge>
                    {filters.search && (
                        <span className="text-sm text-muted-foreground truncate">
                            para "{filters.search}"
                        </span>
                    )}
                </div>

                {/* RFP Cards Grid */}
                <div className="zoom-adaptive-grid">
                    {filteredRFPs.map((rfp) => (
                        <RFPActionCard key={rfp.id} rfp={rfp} />
                    ))}
                </div>

                {filteredRFPs.length === 0 && (
                    <Card className="glass-card border-white/10">
                        <CardContent className="py-12 text-center">
                            <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-semibold mb-2 text-[#243A57] dark:text-white">No se encontraron oportunidades</h3>
                            <p className="text-muted-foreground">Prueba ajustando los filtros de búsqueda</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
