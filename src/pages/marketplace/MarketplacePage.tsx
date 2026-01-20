import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockUseCases, MOCK_REQUESTS } from '@/data/marketplace-data';
import UseCaseCard from '@/components/marketplace/UseCaseCard';
import { type Proposal } from '@/components/marketplace/ClientProposalCard';
import ClientProposalCardGrid from '@/components/marketplace/ClientProposalCardGrid';
import ClientRequestCardGrid from '@/components/marketplace/ClientRequestCardGrid';
import MarketplaceChatbot from '@/components/marketplace/MarketplaceChatbot';
import UseCaseCreateSidebar from '@/components/marketplace/UseCaseCreateSidebar';

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
import { Search, X, SlidersHorizontal, Filter, Globe, Inbox, Lightbulb, Bot, Sparkles, FileText } from 'lucide-react';
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
    },
    {
        id: '3',
        title: 'Propuesta: Sistema de Predicción de Demanda',
        providerName: 'DataFlow Analytics',
        savingEstimation: '25%',
        tags: ['AI/ML', 'Forecasting'],
        isPrivate: true
    },
    {
        id: '4',
        title: 'Propuesta: Automatización de Procesamiento de Facturas',
        providerName: 'FinanceBot Pro',
        efficiencyEstimation: '60%',
        tags: ['RPA', 'Finance'],
        isPrivate: false
    },
    {
        id: '5',
        title: 'Propuesta: Plataforma de Gestión de Contratos con IA',
        providerName: 'LegalTech Solutions',
        savingEstimation: '45%',
        tags: ['Legal', 'Contract Management'],
        isPrivate: true
    },
    {
        id: '6',
        title: 'Propuesta: Sistema de Análisis de Sentimiento en Redes',
        providerName: 'SocialInsight AI',
        efficiencyEstimation: '35%',
        tags: ['NLP', 'Social Media'],
        isPrivate: false
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
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl || 'mercado');

    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filterMode, setFilterMode] = useState<'filters' | 'chatbot'>('filters');


    // Sync activeTab with URL search params
    useEffect(() => {
        if (tabFromUrl && ['mercado', 'propuestas', 'innovacion'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        setSearchParams({ tab: value });
    };



    const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    const resetFilters = () => setFilters(initialFilters);

    const handleChatbotFilters = (chatbotFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...chatbotFilters }));
    };

    const activeFilterCount = Object.entries(filters).reduce((acc, [key, value]) => {
        if (key === 'humanIntervention') return value ? acc + 1 : acc;
        if (Array.isArray(value)) return acc + value.length;
        if (typeof value === 'string' && value && value !== 'Cualquiera') return acc + 1;
        return acc;
    }, 0);

    const filteredUseCases = useMemo(() => {
        const searchLower = filters.search.toLowerCase();
        const stackSearch = filters.techStack.toLowerCase();

        return mockUseCases.filter((uc) => {
            if (filters.search) {
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
                if (!uc.techStack.some(t => t.toLowerCase().includes(stackSearch))) return false;
            }
            return true;
        });
    }, [filters]);

    const filteredProposals = useMemo(() => {
        const searchLower = filters.search.toLowerCase();

        return MOCK_PROPOSALS.filter((proposal) => {
            if (filters.search) {
                const matches =
                    proposal.title.toLowerCase().includes(searchLower) ||
                    proposal.providerName.toLowerCase().includes(searchLower) ||
                    proposal.tags.some((t) => t.toLowerCase().includes(searchLower));
                if (!matches) return false;
            }
            return true;
        });
    }, [filters]);

    const filteredRequests = useMemo(() => {
        const searchLower = filters.search.toLowerCase();

        return MOCK_REQUESTS.filter((request) => {
            if (filters.search) {
                const matches =
                    request.title.toLowerCase().includes(searchLower) ||
                    request.description.toLowerCase().includes(searchLower) ||
                    request.sector?.toLowerCase().includes(searchLower);
                if (!matches) return false;
            }
            return true;
        });
    }, [filters]);

    const SidebarContent = () => (
        <div className="space-y-6 pb-20">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-muted/30 rounded-lg border border-white/10">
                <button
                    onClick={() => setFilterMode('filters')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                        filterMode === 'filters'
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filtros
                </button>
                <button
                    onClick={() => setFilterMode('chatbot')}
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-medium transition-all",
                        filterMode === 'chatbot'
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Sparkles className="h-3.5 w-3.5" />
                    Chatbot
                </button>
            </div>

            {filterMode === 'chatbot' ? (
                <MarketplaceChatbot onApplyFilters={handleChatbotFilters} />
            ) : (
                <div className="space-y-8">
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
            )}
        </div>
    );

    return (
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
            <TabsList className="hidden p-1 h-auto bg-white/5 border border-white/10 rounded-lg justify-start gap-1 w-fit">
                <TabsTrigger value="mercado" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Globe className="h-4 w-4" /> <span className="hidden sm:inline">Mercado Global</span>
                </TabsTrigger>
                <TabsTrigger value="propuestas" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Inbox className="h-4 w-4" />
                    <span className="hidden sm:inline">Propuestas Recibidas</span>
                </TabsTrigger>
                <TabsTrigger value="innovacion" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Lightbulb className="h-4 w-4" />
                    <span className="hidden sm:inline">Mis Solicitudes (Innovación)</span>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="mercado" className="mt-0">
                <div className="flex gap-8">
                    <div className="hidden lg:block zoom-fixed-sidebar">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="space-y-6 min-w-0 flex-1">
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

                            </div>
                        </div>
                        {filteredUseCases.length > 0 ? (
                            <div className="zoom-adaptive-grid">
                                {filteredUseCases.map((useCase, index) => {
                                    // Calculate match score based on filters (simulate matching algorithm)
                                    let matchScore = 0;
                                    if (activeFilterCount > 0) {
                                        // Base score
                                        matchScore = 75;
                                        // Add points for sector match
                                        if (filters.sector.length > 0 && filters.sector.some(s => useCase.industry.toLowerCase().includes(s.split(' ')[0].toLowerCase()))) {
                                            matchScore += 10;
                                        }
                                        // Add points for tech stack match
                                        if (filters.techStack && useCase.techStack.some(t => t.toLowerCase().includes(filters.techStack.toLowerCase()))) {
                                            matchScore += 15;
                                        }
                                        // Vary slightly between cards
                                        matchScore = Math.min(98, matchScore + (index % 3) * 2);
                                    }
                                    
                                    return (
                                        <UseCaseCard 
                                            key={useCase.id} 
                                            useCase={useCase} 
                                            matchScore={matchScore > 0 ? matchScore : undefined}
                                            hasFilters={activeFilterCount > 0}
                                        />
                                    );
                                })}
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
                <div className="flex gap-8">
                    <div className="hidden lg:block zoom-fixed-sidebar">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <SidebarContent />
                        </div>
                    </div>
                    <div className="space-y-6 min-w-0 flex-1">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold tracking-tight">Marketplace Privado</h1>
                                <p className="text-muted-foreground mt-1">{filteredProposals.length} propuestas recibidas</p>
                            </div>
                            <div className="flex items-center gap-2">
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
                                    <Input placeholder="Buscar propuesta..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="pl-10 bg-background/50 border-white/10" />
                                </div>
                            </div>
                        </div>
                        {filteredProposals.length > 0 ? (
                            <div className="zoom-adaptive-grid">
                                {filteredProposals.map((proposal) => (
                                    <ClientProposalCardGrid key={proposal.id} proposal={proposal} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed border-white/10">
                                <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                                <h3 className="text-xl font-display font-bold mb-2">No se encontraron propuestas</h3>
                                <p className="text-muted-foreground mb-6">No tienes propuestas recibidas en este momento</p>
                            </div>
                        )}
                    </div>
                </div>
            </TabsContent >



            <TabsContent value="innovacion" className="mt-0">
                <div className="flex gap-8">
                    <div className="hidden lg:block zoom-fixed-sidebar">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <UseCaseCreateSidebar mode="rfp" />
                        </div>
                    </div>
                    <div className="space-y-6 min-w-0 flex-1">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold tracking-tight">RFP - Mis Solicitudes</h1>
                                <p className="text-muted-foreground mt-1">{filteredRequests.length} solicitudes de innovación</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" className="lg:hidden flex-1 gap-2">
                                            <Bot className="h-4 w-4" /> Crear RFP
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-[320px] sm:w-[400px] overflow-y-auto">
                                        <div className="py-6 px-6"><UseCaseCreateSidebar mode="rfp" /></div>
                                    </SheetContent>
                                </Sheet>
                                <div className="relative flex-1 md:w-[300px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Buscar solicitud..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="pl-10 bg-background/50 border-white/10" />
                                </div>
                            </div>
                        </div>
                        {filteredRequests.length > 0 ? (
                            <div className="zoom-adaptive-grid">
                                {filteredRequests.map((request) => (
                                    <ClientRequestCardGrid key={request.id} request={request} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed border-white/10">
                                <Search className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                                <h3 className="text-xl font-display font-bold mb-2">No se encontraron solicitudes</h3>
                                <p className="text-muted-foreground mb-6">No tienes solicitudes activas en este momento</p>
                            </div>
                        )}
                    </div>
                </div>
            </TabsContent>



        </Tabs >
    );
}
