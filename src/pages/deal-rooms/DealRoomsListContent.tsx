import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { MultiSelect } from '@/components/ui/multi-select';
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
import {
    Plus,
    MessageSquare,
    Clock,
    FolderOpen,
    Search,
    ArrowRight,
    FileText,
    TrendingUp,
    Filter,
    SlidersHorizontal,
    X
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';


const mockDealRooms = [
    {
        id: 'dr-001',
        title: 'Integración Sistema de Pagos',
        counterparty: 'DataFlow AI',
        status: 'active',
        lastActivity: '2 horas',
        messages: 12,
        documents: 8,
        progress: 65,
        nextStep: 'Revisión técnica',
        value: 24000,
        createdAt: '2026-01-15',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    },
    {
        id: 'dr-002',
        title: 'Automatización de Facturas',
        counterparty: 'AutomateX',
        status: 'pending',
        lastActivity: '1 día',
        messages: 5,
        documents: 3,
        progress: 25,
        nextStep: 'Esperando propuesta',
        value: 12500,
        createdAt: '2026-01-10',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
    },
    {
        id: 'dr-003',
        title: 'Motor de Recomendación IA',
        counterparty: 'RecoTech Solutions',
        status: 'active',
        lastActivity: '30 min',
        messages: 24,
        documents: 15,
        progress: 80,
        nextStep: 'Firma de contrato',
        value: 45000,
        createdAt: '2026-01-08',
        image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&h=500&fit=crop',
    },
    {
        id: 'dr-004',
        title: 'Chatbot Multicanal',
        counterparty: 'BotMaster Pro',
        status: 'closed',
        lastActivity: '5 días',
        messages: 45,
        documents: 22,
        progress: 100,
        nextStep: 'Completado',
        value: 18000,
        createdAt: '2025-12-20',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
    },
    {
        id: 'dr-005',
        title: 'Análisis Predictivo de Ventas',
        counterparty: 'PredictAI Labs',
        status: 'pending',
        lastActivity: '3 horas',
        messages: 8,
        documents: 4,
        progress: 40,
        nextStep: 'Demo programada',
        value: 32000,
        createdAt: '2026-01-12',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
    },
];

interface FilterState {
    search: string;
    status: string[];
    counterparty: string[];
    minProgress: string;
    maxProgress: string;
    minValue: string;
    maxValue: string;
}

const initialFilters: FilterState = {
    search: '',
    status: [],
    counterparty: [],
    minProgress: '',
    maxProgress: '',
    minValue: '',
    maxValue: '',
};

const STATUS_OPTIONS = ['active', 'pending', 'closed'];

export default function DealRoomsListContent() {
    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [sortBy, setSortBy] = useState<string>('recent');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Get unique counterparties for filter
    const counterparties = useMemo(() =>
        Array.from(new Set(mockDealRooms.map(r => r.counterparty))),
        []
    );

    const toggleArrayItem = <T extends string>(array: T[], item: T): T[] => {
        return array.includes(item)
            ? array.filter((i) => i !== item)
            : [...array, item];
    };

    const resetFilters = () => setFilters(initialFilters);

    const activeFilterCount = Object.values(filters).reduce((acc, value) => {
        if (Array.isArray(value)) return acc + value.length;
        if (typeof value === 'string' && value) return acc + 1;
        return acc;
    }, 0);

    const filteredRooms = useMemo(() => {
        const searchLower = filters.search.toLowerCase();

        const filtered = mockDealRooms.filter(room => {
            // Search
            if (filters.search) {
                const matchesSearch =
                    room.title.toLowerCase().includes(searchLower) ||
                    room.counterparty.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // Status
            if (filters.status.length > 0 && !filters.status.includes(room.status)) {
                return false;
            }

            // Counterparty
            if (filters.counterparty.length > 0 && !filters.counterparty.includes(room.counterparty)) {
                return false;
            }

            // Progress
            if (filters.minProgress && room.progress < parseInt(filters.minProgress)) return false;
            if (filters.maxProgress && room.progress > parseInt(filters.maxProgress)) return false;

            // Value
            if (filters.minValue && room.value < parseInt(filters.minValue)) return false;
            if (filters.maxValue && room.value > parseInt(filters.maxValue)) return false;

            return true;
        });

        // Sorting
        return [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'value-desc':
                    return b.value - a.value;
                case 'value-asc':
                    return a.value - b.value;
                case 'progress-desc':
                    return b.progress - a.progress;
                case 'recent':
                default:
                    // Simple string comparison for dates in this mock, ideally parse to Date
                    return b.createdAt.localeCompare(a.createdAt);
            }
        });
    }, [filters, sortBy]);

    const getStatusConfig = (status: string) => {
        return {
            active: { label: 'Activa', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
            pending: { label: 'Pendiente', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
            closed: { label: 'Cerrada', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', dot: 'bg-slate-500' },
        }[status] || { label: status, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', dot: 'bg-muted-foreground' };
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="space-y-8 px-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-display font-bold flex items-center gap-2">
                        <Filter className="h-4 w-4" /> Filtros
                    </h3>
                    {activeFilterCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={resetFilters}
                            className="h-8 w-fit text-xs text-muted-foreground hover:text-destructive px-2"
                        >
                            <X className="h-3 w-3 mr-1" />
                            Limpiar
                        </Button>
                    )}
                </div>

                {/* Status */}
                <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Estado</Label>
                    <div className="space-y-2">
                        {STATUS_OPTIONS.map(status => (
                            <div key={status} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`status_${status}`}
                                    checked={filters.status.includes(status)}
                                    onChange={() => setFilters({
                                        ...filters,
                                        status: toggleArrayItem(filters.status, status)
                                    })}
                                    className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                                />
                                <Label htmlFor={`status_${status}`} className="text-sm font-normal cursor-pointer select-none capitalize">
                                    {getStatusConfig(status).label}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Counterparty */}
                <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Contraparte</Label>
                    <MultiSelect
                        options={counterparties}
                        selected={filters.counterparty}
                        onChange={(selected) => setFilters({ ...filters, counterparty: selected })}
                        placeholder="Seleccionar empresa..."
                    />
                </div>

                {/* Progress */}
                <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Progreso (%)</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="0"
                            min="0"
                            max="100"
                            className="bg-muted/30 border-white/10 h-9"
                            value={filters.minProgress}
                            onChange={(e) => setFilters({ ...filters, minProgress: e.target.value })}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                            type="number"
                            placeholder="100"
                            min="0"
                            max="100"
                            className="bg-muted/30 border-white/10 h-9"
                            value={filters.maxProgress}
                            onChange={(e) => setFilters({ ...filters, maxProgress: e.target.value })}
                        />
                    </div>
                </div>

                {/* Value */}
                <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Valor (€)</Label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            className="bg-muted/30 border-white/10 h-9"
                            value={filters.minValue}
                            onChange={(e) => setFilters({ ...filters, minValue: e.target.value })}
                        />
                        <span className="text-muted-foreground">-</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            className="bg-muted/30 border-white/10 h-9"
                            value={filters.maxValue}
                            onChange={(e) => setFilters({ ...filters, maxValue: e.target.value })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-[calc(100vh-14rem)] flex gap-6">
            {/* Sidebar - Fixed, hidden on mobile */}
            <div className="hidden lg:flex lg:flex-col w-[280px] shrink-0 border-r border-white/10 h-full pr-6">
                <SidebarContent />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
                {/* Header - Fixed */}
                <div className="shrink-0 p-4 md:p-6 pb-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-display font-bold tracking-tight">Deal Rooms</h1>
                            <p className="text-muted-foreground mt-1">{filteredRooms.length} negociaciones activas</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="outline" className="lg:hidden w-auto gap-2 px-3">
                                        <SlidersHorizontal className="h-4 w-4" />
                                        <span className="hidden sm:inline">Filtros</span>
                                        {activeFilterCount > 0 && <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary text-xs">{activeFilterCount}</Badge>}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-[300px] !p-0 !gap-0">
                                    <div className="flex-1 flex flex-col h-full overflow-hidden">
                                        <SidebarContent />
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20 whitespace-nowrap hidden md:flex">
                                <Plus className="h-4 w-4" />
                                <span className="hidden sm:inline">Nueva Deal Room</span>
                            </Button>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[160px] bg-background/50 border-white/10 h-10">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="recent">Más Recientes</SelectItem>
                                    <SelectItem value="value-desc">Mayor Valor</SelectItem>
                                    <SelectItem value="value-asc">Menor Valor</SelectItem>
                                    <SelectItem value="progress-desc">Mayor Progreso</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="relative flex-1 md:w-[260px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Buscar negociación..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    className="pl-10 bg-background/50 border-white/10 h-10"
                                />
                            </div>

                            {/* Mobile New Button - Visible only on small screens */}
                            <Button size="icon" className="md:hidden bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg shadow-lg shadow-primary/20">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    {filteredRooms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredRooms.map((room) => {
                                const statusConfig = getStatusConfig(room.status);
                                return (
                                    <Card key={room.id} className="py-0 overflow-hidden group cursor-pointer border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-xl bg-card/40 backdrop-blur-sm">
                                        {/* Image */}
                                        <div className="aspect-[16/10] relative overflow-hidden">
                                            <img
                                                src={room.image}
                                                alt={room.title}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            {/* Status Badge */}
                                            <Badge className={cn(
                                                "absolute top-4 right-4 border-0 px-3 py-1 text-[10px] font-bold tracking-tight rounded-full backdrop-blur-md flex items-center gap-1.5",
                                                statusConfig.bg, statusConfig.color
                                            )}>
                                                <div className={cn("h-1.5 w-1.5 rounded-full", statusConfig.dot)} />
                                                {statusConfig.label}
                                            </Badge>

                                            {/* Value Badge */}
                                            <div className="absolute bottom-4 left-4">
                                                <div className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg">
                                                    <span className="text-sm font-bold text-white">€{room.value.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5">
                                            {/* Provider */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <Avatar className="h-6 w-6 rounded-md">
                                                    <AvatarFallback className={cn(
                                                        "rounded-md text-[10px] font-bold",
                                                        statusConfig.bg, statusConfig.color
                                                    )}>
                                                        {room.counterparty.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-xs font-medium text-muted-foreground">{room.counterparty}</span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                                                {room.title}
                                            </h3>

                                            {/* Progress */}
                                            <div className="mb-4">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Progreso</span>
                                                    <div className="flex items-center gap-1">
                                                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                                                        <span className="text-xs font-bold">{room.progress}%</span>
                                                    </div>
                                                </div>
                                                <Progress value={room.progress} className="h-1.5 bg-white/5" indicatorClassName={statusConfig.bg.replace('/10', '')} />
                                            </div>

                                            {/* Next Step */}
                                            <div className="flex items-start gap-2 mb-4 h-10">
                                                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0 animate-pulse" />
                                                <p className="text-xs text-muted-foreground line-clamp-2">
                                                    <span className="font-medium text-foreground">Próximo:</span> {room.nextStep}
                                                </p>
                                            </div>

                                            {/* Stats Row */}
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 text-muted-foreground" title="Mensajes">
                                                        <MessageSquare className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-medium">{room.messages}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground" title="Documentos">
                                                        <FileText className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-medium">{room.documents}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground" title="Última actividad">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-medium">{room.lastActivity}</span>
                                                    </div>
                                                </div>
                                                <Link to={`/deal-room/${room.id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg gap-1.5 font-bold text-xs group/btn hover:bg-primary/10 hover:text-primary">
                                                        Ver
                                                        <ArrowRight className="h-3.5 w-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-muted/5 rounded-xl border border-dashed border-white/10 m-2">
                            <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-display font-bold mb-2">No se encontraron Deal Rooms</h3>
                            <p className="text-muted-foreground mb-6">
                                Prueba ajustando los filtros de búsqueda o crea una nueva sala
                            </p>
                            <Button variant="outline" onClick={resetFilters}>Limpiar Filtros</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

