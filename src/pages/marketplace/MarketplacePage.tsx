import { useState, useMemo } from 'react';
import { mockUseCases } from '@/data/marketplace-data';
import UseCaseCard from '@/components/marketplace/UseCaseCard';
import ClientProposalCard, { type Proposal } from '@/components/marketplace/ClientProposalCard';
import ClientInnovationRequestCard, { type InnovationRequest } from '@/components/marketplace/ClientInnovationRequestCard';
import AIChatbotModal from '@/components/marketplace/AIChatbotModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from '@/components/ui/switch';
import {
    Sheet,
    SheetContent,
    SheetTrigger
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, X, SlidersHorizontal, Sparkles, Filter, Globe, Inbox, Lightbulb, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';

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

const MOCK_PROPOSALS: Proposal[] = [
    {
        id: '1',
        title: 'Propuesta Personalizada: Automatización de Inventario',
        providerName: 'LogiTech Solutions',
        savingEstimation: '30%',
        tags: ['Private Offer', 'Automation'],
        isPrivate: true
    },
    {
        id: '2',
        title: 'Propuesta: Chatbot Interno HR',
        providerName: 'HR Tech AI',
        efficiencyEstimation: '40%',
        tags: ['Private Offer', 'NLP'],
        isPrivate: true
    }
];

const MOCK_REQUESTS: InnovationRequest[] = [
    {
        id: '1',
        title: 'Sistema de Detección de Anomalías en Producción',
        createdAt: '2025-10-15',
        status: 'Active',
        budgetRange: '50k - 100k',
        responsesCount: 5
    },
    {
        id: '2',
        title: 'Motor de Recomendación para E-commerce',
        createdAt: '2025-09-20',
        status: 'Closed',
        budgetRange: '20k - 50k',
        responsesCount: 12
    }
];

export interface FilterState {
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
    providerSizeMulti: string[];
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
    providerSizeMulti: [],
    location: [],
    regulations: [],
    certifications: [],
    dataSecurity: [],
};

export default function MarketplacePage() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [chatbotOpen, setChatbotOpen] = useState(false);

    const handleChatbotSuggestion = (query: string) => {
        setFilters({ ...filters, search: query });
    };

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

    const filteredUseCases = useMemo(() => {
        return mockUseCases.filter((uc) => {
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const matches =
                    uc.title.toLowerCase().includes(searchLower) ||
                    uc.description.toLowerCase().includes(searchLower) ||
                    uc.providerName.toLowerCase().includes(searchLower) ||
                    uc.industry.toLowerCase().includes(searchLower) ||
                    uc.techStack.some((t) => t.toLowerCase().includes(searchLower));
                if (!matches) return false;
            }
            if (filters.sector.length > 0) {
                const hasMatch = filters.sector.some(selectedSector =>
                    uc.industry.toLowerCase().includes(selectedSector.split(' ')[0].toLowerCase())
                );
                if (!hasMatch) return false;
            }
            if (filters.techStack) {
                const stackSearch = filters.techStack.toLowerCase();
                if (!uc.techStack.some(t => t.toLowerCase().includes(stackSearch))) return false;
            }
            return true;
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

            {/* Other filters emitted for brevity in thought process but included in action */}
            {/* ... keeping previous filters 3-17 ... */}

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

    const ProposalsSidebar = () => (
        <div className="space-y-8">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtros
            </h3>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Estado</Label>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="p_all" className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary" defaultChecked />
                        <Label htmlFor="p_all" className="text-sm font-normal cursor-pointer">Todas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="p_priv" className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                        <Label htmlFor="p_priv" className="text-sm font-normal cursor-pointer">Privadas</Label>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Proveedor</Label>
                <Input placeholder="Buscar proveedor..." className="bg-muted/30 border-white/10 h-9" />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Ahorro Estimado</Label>
                <div className="flex items-center gap-2">
                    <Input placeholder="Min %" className="bg-muted/30 border-white/10 h-9" />
                    <span className="text-muted-foreground">-</span>
                    <Input placeholder="Max %" className="bg-muted/30 border-white/10 h-9" />
                </div>
            </div>
        </div>
    );

    const RequestsSidebar = () => (
        <div className="space-y-8">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtros
            </h3>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Estado</Label>
                <div className="space-y-2">
                    {['Activo', 'Cerrado', 'Borrador'].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                            <input type="checkbox" id={`r_${status}`} className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary" defaultChecked={status === 'Activo'} />
                            <Label htmlFor={`r_${status}`} className="text-sm font-normal cursor-pointer">{status}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Presupuesto</Label>
                <Select>
                    <SelectTrigger className="w-full bg-muted/30 border-white/10">
                        <SelectValue placeholder="Cualquier rango" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">{'< 50k'}</SelectItem>
                        <SelectItem value="mid">{'50k - 100k'}</SelectItem>
                        <SelectItem value="high">{'> 100k'}</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    return (
        <Tabs defaultValue="mercado" className="space-y-6">
            <TabsList className="p-1 h-auto bg-white/5 border border-white/10 rounded-lg justify-start gap-1 w-fit">
                <TabsTrigger value="mercado" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Globe className="h-4 w-4" /> <span className="hidden sm:inline">Mercado Global</span>
                </TabsTrigger>
                <TabsTrigger value="propuestas" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Inbox className="h-4 w-4" />
                    <span className="hidden sm:inline">Propuestas Recibidas</span>
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 text-white text-[10px] rounded-full">2</Badge>
                </TabsTrigger>
                <TabsTrigger value="innovacion" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Lightbulb className="h-4 w-4" />
                    <span className="hidden sm:inline">Mis Solicitudes (Innovación)</span>
                    <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-500 text-white text-[10px] rounded-full">2</Badge>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="mercado" className="mt-0">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    <div className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold tracking-tight">Marketplace</h1>
                                <p className="text-muted-foreground mt-1">{filteredUseCases.length} soluciones verificadas para tu empresa</p>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
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
                                <div className="relative flex-1 md:w-[300px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Buscar solución, proveedor..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="pl-10 bg-background/50 border-white/10" />
                                </div>
                                <Button onClick={() => setChatbotOpen(true)} className="gap-2 premium-gradient shadow-lg shadow-violet-500/20 text-white hover:opacity-90">
                                    <Sparkles className="h-4 w-4" /> <span className="hidden sm:inline">IA Assistant</span>
                                </Button>
                            </div>
                        </div>
                        {filteredUseCases.length > 0 ? (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {filteredUseCases.map((useCase) => (
                                    <UseCaseCard key={useCase.id} useCase={useCase} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed border-white/10">
                                <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                                <h3 className="text-xl font-display font-bold mb-2">No se encontraron resultados</h3>
                                <p className="text-muted-foreground mb-6">Intenta ajustar los filtros o buscar con otros términos</p>
                                <Button variant="outline" onClick={resetFilters}>Limpiar filtros</Button>
                            </div>
                        )}
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="propuestas" className="mt-0">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    <div className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <ProposalsSidebar />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Propuestas Recibidas</h2>
                                <p className="text-muted-foreground">Casos de uso y ofertas enviadas directamente a ti</p>
                            </div>
                            <div className="relative w-full md:w-[280px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Buscar propuestas..." className="pl-10 bg-background/50 border-white/10" />
                            </div>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {MOCK_PROPOSALS.map(proposal => (
                                <ClientProposalCard key={proposal.id} proposal={proposal} />
                            ))}
                        </div>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="innovacion" className="mt-0">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    <div className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <RequestsSidebar />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Mis Solicitudes de Innovación</h2>
                                <p className="text-muted-foreground">Gestiona tus retos publicados y revisa las respuestas</p>
                            </div>
                            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                <Plus className="h-4 w-4" /> Publicar Nuevo Reto
                            </Button>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {MOCK_REQUESTS.map(request => (
                                <ClientInnovationRequestCard key={request.id} request={request} />
                            ))}
                        </div>
                    </div>
                </div>
            </TabsContent>

            <AIChatbotModal open={chatbotOpen} onOpenChange={setChatbotOpen} onSearchSuggestion={handleChatbotSuggestion} />
        </Tabs>
    );
}
