import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import UseCaseCreateSidebar from '@/components/marketplace/UseCaseCreateSidebar';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    FileText,
    Sparkles,
    Upload,
    Building2,
    Filter
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { MultiSelect } from '@/components/ui/multi-select';
import { mockUseCases } from '@/data/marketplace-data';
import { toast } from 'sonner';

// Filter mock data to simulate "my" use cases
const initialUseCases = mockUseCases.slice(0, 6);

type UseCase = {
    id: string;
    title: string;
    description: string;
    industry: string;
    roi: string;
    image: string;
    status?: string;
};

export default function ProviderCatalogPage() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases.map(uc => ({
        id: uc.id,
        title: uc.title,
        description: uc.description,
        industry: uc.industry,
        roi: uc.roi,
        image: uc.image,
        status: 'Publicado'
    })));
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [currentUseCase, setCurrentUseCase] = useState<UseCase | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        industry: '',
        roi: '',
    });

    // Filters state
    const [filters, setFilters] = useState({
        industries: [] as string[],
        status: ['Publicado'] as string[]
    });

    const toggleStatus = (status: string) => {
        setFilters(prev => {
            const newStatus = prev.status.includes(status)
                ? prev.status.filter(s => s !== status)
                : [...prev.status, status];
            return { ...prev, status: newStatus };
        });
    };

    const handleCreate = () => {
        if (!formData.title || !formData.description || !formData.industry) {
            toast.error('Completa todos los campos requeridos');
            return;
        }
        const newUseCase: UseCase = {
            id: `uc-${Date.now()}`,
            title: formData.title,
            description: formData.description,
            industry: formData.industry,
            roi: formData.roi || '+20% Eficiencia',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            status: 'Publicado'
        };
        setUseCases([...useCases, newUseCase]);
        setIsCreateOpen(false);
        setFormData({ title: '', description: '', industry: '', roi: '' });
        toast.success('Caso de uso creado', {
            description: 'Tu nuevo caso ya está visible en el marketplace.'
        });
    };

    const handleEdit = () => {
        if (!currentUseCase) return;
        setUseCases(useCases.map(uc =>
            uc.id === currentUseCase.id
                ? { ...uc, ...formData }
                : uc
        ));
        setIsEditOpen(false);
        setCurrentUseCase(null);
        toast.success('Caso de uso actualizado');
    };

    const handleDelete = (id: string) => {
        setUseCases(useCases.filter(uc => uc.id !== id));
        toast.success('Caso de uso eliminado');
    };

    const openEdit = (useCase: UseCase) => {
        setCurrentUseCase(useCase);
        setFormData({
            title: useCase.title,
            description: useCase.description,
            industry: useCase.industry,
            roi: useCase.roi
        });
        setIsEditOpen(true);
    };

    const filteredUseCases = useCases.filter(uc => {
        const matchesSearch = uc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            uc.industry.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(uc.industry);
        const matchesStatus = filters.status.length === 0 || (uc.status && filters.status.includes(uc.status));

        return matchesSearch && matchesIndustry && matchesStatus;
    });

    const SidebarContent = () => (
        <div className="space-y-8">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtros
            </h3>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Estado</Label>
                <div className="space-y-2">
                    {['Publicado', 'Borrador', 'Archivado'].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={`uc_${status}`}
                                className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                                checked={filters.status.includes(status)}
                                onChange={() => toggleStatus(status)}
                            />
                            <Label htmlFor={`uc_${status}`} className="text-sm font-normal cursor-pointer">{status}</Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Industria</Label>
                <MultiSelect
                    options={['Retail', 'Fintech', 'Healthcare', 'Logistics', 'Insurance']}
                    selected={filters.industries}
                    onChange={(val) => setFilters({ ...filters, industries: val })}
                    placeholder="Seleccionar..."
                />
            </div>
        </div>
    );

    return (
        <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block zoom-fixed-sidebar">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <UseCaseCreateSidebar mode="usecase" onSuccess={() => {
                        toast.success("Caso de uso creado", { description: "El caso de uso se ha añadido a tu catálogo." });
                        // Refresh the list or navigate
                    }} />
                </div>
            </div>

            <div className="space-y-6 flex-1 min-w-0">
                {/* Header / Actions bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Mi Catálogo</h2>
                        <p className="text-muted-foreground">Gestiona los casos de uso visibles para clientes</p>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar en mi catálogo..."
                                className="pl-10 bg-white/50 dark:bg-white/5 border-white/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 h-10"
                            onClick={() => navigate('/provider/marketplace/create')}
                        >
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Nuevo Caso</span>
                        </Button>
                    </div>
                </div>

                {/* Top Filters Bar */}
                <div className="flex flex-wrap items-center gap-4 py-4 border-y border-white/5 bg-white/5 rounded-lg px-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Filter className="h-4 w-4" />
                        <span className="text-sm font-medium">Filtros:</span>
                    </div>

                    <div className="w-[200px]">
                        <MultiSelect
                            options={['Retail', 'Fintech', 'Healthcare', 'Logistics', 'Insurance']}
                            selected={filters.industries}
                            onChange={(val) => setFilters({ ...filters, industries: val })}
                            placeholder="Industria..."
                        />
                    </div>

                    <div className="h-6 w-px bg-white/10 mx-2 hidden sm:block" />

                    <div className="flex flex-wrap items-center gap-4">
                        {['Publicado', 'Borrador', 'Archivado'].map(status => (
                            <div key={`top-${status}`} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id={`uc_top_${status}`}
                                    className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                                    checked={filters.status.includes(status)}
                                    onChange={() => toggleStatus(status)}
                                />
                                <Label htmlFor={`uc_top_${status}`} className="text-sm font-normal cursor-pointer select-none">
                                    {status}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Grid display */}
                <div className="zoom-adaptive-grid">
                    {filteredUseCases.map((useCase) => (
                        <Card key={useCase.id} className="glass-card group hover:border-primary/30 transition-all overflow-hidden border-white/10 flex flex-col h-full bg-white/5 backdrop-blur-sm">
                            <div className="aspect-[16/9] overflow-hidden relative">
                                <img
                                    src={useCase.image}
                                    alt={useCase.title}
                                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="secondary" size="icon" className="h-8 w-8 bg-black/40 hover:bg-black/60 backdrop-blur-md border-white/10 text-white">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass-card">
                                            <DropdownMenuItem onClick={() => openEdit(useCase)}>
                                                <Edit className="mr-2 h-4 w-4" /> Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => toast.info('Vista previa del caso')}>
                                                <Eye className="mr-2 h-4 w-4" /> Ver en Marketplace
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                onClick={() => handleDelete(useCase.id)}
                                            >
                                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="absolute bottom-2 left-2">
                                    <Badge className="bg-emerald-500/90 text-white border-0 backdrop-blur-sm">
                                        Publicado
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-5 flex flex-col flex-1 space-y-4">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 mb-1 flex items-center gap-1.5">
                                        <Building2 className="h-3 w-3" /> {useCase.industry}
                                    </div>
                                    <h3 className="font-bold text-lg text-foreground leading-tight mb-2">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {useCase.description}
                                    </p>
                                </div>

                                <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-bold block">KPI Principal</span>
                                            <span className="text-sm font-bold text-primary">
                                                {useCase.roi}
                                            </span>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="sm" className="h-9 text-xs gap-1.5 hover:bg-primary/10 text-primary font-semibold">
                                        Ver detalles
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {filteredUseCases.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-xl font-bold text-[#243A57] dark:text-white mb-2">No se encontraron casos</h3>
                            <p className="text-muted-foreground mb-6">Prueba a buscar con otros términos o añade uno nuevo.</p>
                            <Button onClick={() => navigate('/provider/marketplace/create')} className="bg-primary text-primary-foreground hover:bg-primary/90">
                                <Plus className="mr-2 h-4 w-4" />
                                Añadir mi primer caso
                            </Button>
                        </div>
                    )}
                </div>

                {/* Create/Edit Dialogs */}
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogContent className="sm:max-w-xl glass-card border-white/20">
                        <DialogHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Sparkles className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <DialogTitle className="text-[#243A57] dark:text-white">Nuevo Caso de Uso</DialogTitle>
                                    <DialogDescription>Añade una nueva solución a tu catálogo público</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                                <Upload className="h-8 w-8 mx-auto text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                                <p className="text-sm font-medium">Arrastra una imagen o haz clic</p>
                                <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 5MB</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título del caso *</Label>
                                    <Input
                                        placeholder="Ej: Optimización de procesos con IA"
                                        className="bg-white/5 border-white/10"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industria *</Label>
                                    <Select
                                        value={formData.industry}
                                        onValueChange={(v) => setFormData({ ...formData, industry: v })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10">
                                            <SelectValue placeholder="Seleccionar..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Fintech">Fintech</SelectItem>
                                            <SelectItem value="Retail">Retail</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Logistics">Logistics</SelectItem>
                                            <SelectItem value="Insurance">Insurance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">KPI Principal</Label>
                                    <Input
                                        placeholder="+25% Eficiencia"
                                        className="bg-white/5 border-white/10"
                                        value={formData.roi}
                                        onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                                    />
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descripción *</Label>
                                    <Textarea
                                        placeholder="Describe el problema que resuelves..."
                                        className="bg-white/5 border-white/10 resize-none"
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleCreate}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
                            >
                                Publicar Caso
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-xl glass-card border-white/20">
                        <DialogHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                                    <Edit className="h-5 w-5 text-blue-500" />
                                </div>
                                <div>
                                    <DialogTitle className="text-[#243A57] dark:text-white">Editar Caso de Uso</DialogTitle>
                                    <DialogDescription>Actualiza los detalles de tu solución</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Título del caso *</Label>
                                    <Input
                                        className="bg-white/5 border-white/10"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Industria *</Label>
                                    <Select
                                        value={formData.industry}
                                        onValueChange={(v) => setFormData({ ...formData, industry: v })}
                                    >
                                        <SelectTrigger className="bg-white/5 border-white/10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Fintech">Fintech</SelectItem>
                                            <SelectItem value="Retail">Retail</SelectItem>
                                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                                            <SelectItem value="Logistics">Logistics</SelectItem>
                                            <SelectItem value="Insurance">Insurance</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">KPI Principal</Label>
                                    <Input
                                        className="bg-white/5 border-white/10"
                                        value={formData.roi}
                                        onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                                    />
                                </div>

                                <div className="col-span-2 space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Descripción *</Label>
                                    <Textarea
                                        className="bg-white/5 border-white/10 resize-none"
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={() => setIsEditOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleEdit}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                            >
                                Guardar Cambios
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
