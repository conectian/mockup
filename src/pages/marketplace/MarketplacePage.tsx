import { useState, useMemo } from 'react';
import { mockUseCases, MOCK_REQUESTS } from '@/data/marketplace-data';
import UseCaseCard from '@/components/marketplace/UseCaseCard';
import { type Proposal } from '@/components/marketplace/ClientProposalCard';
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
import { Search, X, SlidersHorizontal, Sparkles, Filter, Globe, Inbox, Lightbulb, MoreHorizontal, Ban, Eye, FileText, Lock, MessageSquare } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
                </TabsTrigger>
                <TabsTrigger value="innovacion" className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium">
                    <Lightbulb className="h-4 w-4" />
                    <span className="hidden sm:inline">Mis Solicitudes (Innovación)</span>
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
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                    <Button onClick={() => setChatbotOpen(true)} className="relative gap-2 premium-gradient shadow-xl shadow-violet-500/30 text-white hover:opacity-90 border border-white/10 h-10 px-6 font-bold tracking-wide overflow-hidden">
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
                                        <Sparkles className="h-4 w-4 animate-pulse" />
                                        <span className="hidden sm:inline">IA Assistant</span>
                                    </Button>
                                </div>
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

                        <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                            <CardHeader className="px-8 pt-8 pb-0">
                                <CardTitle className="text-xl font-display font-bold">Propuestas Recibidas</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-6">
                                {/* Desktop Table */}
                                <div className="hidden md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-white/5">
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pl-8">Propuesta</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Proveedor</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Ahorro Est.</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Etiquetas</TableHead>
                                                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pr-8">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {MOCK_PROPOSALS.map((proposal) => (
                                                <TableRow key={proposal.id} className="border-white/5 hover:bg-muted/30 transition-colors">
                                                    <TableCell className="pl-8">
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                                                                <FileText className="h-5 w-5" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold line-clamp-1 max-w-[200px]">{proposal.title}</div>
                                                                {proposal.isPrivate && (
                                                                    <div className="flex items-center gap-1.5 mt-0.5 text-xs text-indigo-400 font-medium">
                                                                        <Lock className="h-3 w-3" /> Privada
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium text-sm text-muted-foreground">{proposal.providerName}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
                                                            {proposal.savingEstimation}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-wrap gap-1">
                                                            {proposal.tags.slice(0, 2).map((tag) => (
                                                                <Badge key={tag} variant="secondary" className="text-[10px] h-5 px-1.5 font-medium bg-white/5 hover:bg-white/10 text-muted-foreground">
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right pr-8">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                            <Button size="sm" className="h-8 px-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors">
                                                                <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                                                Chat
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Mobile List View */}
                                <div className="md:hidden space-y-4 p-4">
                                    {MOCK_PROPOSALS.map((proposal) => (
                                        <div key={proposal.id} className="bg-white/5 rounded-lg border border-white/5 p-4 space-y-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 shrink-0">
                                                        <FileText className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-sm leading-tight line-clamp-2">{proposal.title}</h3>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs text-muted-foreground">{proposal.providerName}</span>
                                                            {proposal.isPrivate && (
                                                                <Badge variant="outline" className="h-4 px-1 text-[9px] border-indigo-500/30 text-indigo-400 bg-indigo-500/5">
                                                                    <Lock className="h-2 w-2 mr-0.5" /> PRIVADA
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-bold">
                                                    Ahorro: {proposal.savingEstimation}
                                                </Badge>
                                                <div className="flex items-center gap-2">
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button size="sm" className="h-8 px-3 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-xs font-bold">
                                                        <MessageSquare className="h-3.5 w-3.5 mr-1.5" />
                                                        Chat
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div >
                </div >
            </TabsContent >

            <TabsContent value="innovacion" className="mt-0">
                <div className="grid lg:grid-cols-[280px_1fr] gap-8">
                    <div className="hidden lg:block">
                        <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            <RequestsSidebar />
                        </div>
                    </div>
                    <div className="space-y-6">

                        <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                            <CardHeader className="px-8 pt-8 pb-0">
                                <CardTitle className="text-xl font-display font-bold">Mis Solicitudes</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-6">
                                {/* Desktop Table */}
                                <div className="hidden md:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-white/5">
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pl-8">Título</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Estado</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Fecha Pub.</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Presupuesto</TableHead>
                                                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Respuestas</TableHead>
                                                <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pr-8">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {MOCK_REQUESTS.map((request) => (
                                                <TableRow key={request.id} className="border-white/5 hover:bg-muted/30 transition-colors">
                                                    <TableCell className="pl-8">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                                                <AvatarFallback className="bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white font-bold rounded-md">
                                                                    {request.title.charAt(0)}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span className="font-bold line-clamp-1 max-w-[200px]">{request.title}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge className={cn(
                                                            "font-bold rounded-full border-0 gap-1.5",
                                                            request.status === 'Active' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                                            request.status === 'Closed' && "bg-slate-500/10 text-slate-600 dark:text-slate-400",
                                                        )}>
                                                            <div className={cn(
                                                                "h-1.5 w-1.5 rounded-full",
                                                                request.status === 'Active' ? "bg-emerald-500" : "bg-slate-500"
                                                            )} />
                                                            {request.status === 'Active' ? 'Activo' : 'Cerrado'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-muted-foreground text-sm">{request.createdAt}</TableCell>
                                                    <TableCell className="font-medium text-sm">{request.budgetRange}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Inbox className="h-4 w-4 text-muted-foreground" />
                                                            <span className="font-medium">{request.responsesCount}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right pr-8">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5">
                                                                    <span className="sr-only">Open menu</span>
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="glass-card">
                                                                <DropdownMenuLabel className="font-display">Acciones</DropdownMenuLabel>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <Eye className="mr-2 h-4 w-4" /> Ver Detalles
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem className="cursor-pointer">
                                                                    <FileText className="mr-2 h-4 w-4" /> Editar
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-white/5" />
                                                                <DropdownMenuItem className="text-red-500 cursor-pointer">
                                                                    <Ban className="mr-2 h-4 w-4" /> Cerrar Solicitud
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Mobile List View */}
                                <div className="md:hidden space-y-4 p-4">
                                    {MOCK_REQUESTS.map((request) => (
                                        <div key={request.id} className="bg-white/5 rounded-lg border border-white/5 p-4 space-y-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10 rounded-md shadow-sm shrink-0">
                                                        <AvatarFallback className="bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white font-bold rounded-md">
                                                            {request.title.charAt(0)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h3 className="font-bold text-sm leading-tight line-clamp-2">{request.title}</h3>
                                                        <div className="text-xs text-muted-foreground mt-1">{request.createdAt}</div>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0 -mr-2 text-muted-foreground shrink-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="glass-card">
                                                        <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                                                        <DropdownMenuItem>Editar</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-500">Cerrar Solicitud</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                                <Badge className={cn(
                                                    "font-bold rounded-full border-0 gap-1.5",
                                                    request.status === 'Active' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                                    request.status === 'Closed' && "bg-slate-500/10 text-slate-600 dark:text-slate-400",
                                                )}>
                                                    <div className={cn(
                                                        "h-1.5 w-1.5 rounded-full",
                                                        request.status === 'Active' ? "bg-emerald-500" : "bg-slate-500"
                                                    )} />
                                                    {request.status === 'Active' ? 'Activo' : 'Cerrado'}
                                                </Badge>
                                                <div className="flex items-center gap-4 text-xs font-medium">
                                                    <span>{request.budgetRange}</span>
                                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                                        <Inbox className="h-3.5 w-3.5" />
                                                        <span>{request.responsesCount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>

            <AIChatbotModal open={chatbotOpen} onOpenChange={setChatbotOpen} onSearchSuggestion={handleChatbotSuggestion} />
        </Tabs >
    );
}
