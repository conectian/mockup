import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, FileText, Sparkles, Upload } from 'lucide-react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { mockUseCases } from '@/data/marketplace-data';
import { toast } from 'sonner';

// Filter mock data to simulate "my" use cases
const initialUseCases = mockUseCases.slice(0, 3);

type UseCase = {
    id: string;
    title: string;
    description: string;
    industry: string;
    roi: string;
    image: string;
};

export default function ProviderCatalogPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases.map(uc => ({
        id: uc.id,
        title: uc.title,
        description: uc.description,
        industry: uc.industry,
        roi: uc.roi,
        image: uc.image
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
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop'
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

    const filteredUseCases = useCases.filter(uc =>
        uc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        uc.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Mis Casos de Uso</h1>
                    <p className="text-muted-foreground">Gestiona el catálogo de soluciones que ofreces al mercado</p>
                </div>
                <Button
                    className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    onClick={() => {
                        setFormData({ title: '', description: '', industry: '', roi: '' });
                        setIsCreateOpen(true);
                    }}
                >
                    <Plus className="h-4 w-4" />
                    Nuevo Caso de Uso
                </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar en mi catálogo..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Catalog Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Industria</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">KPI Principal</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUseCases.map((useCase) => (
                                <TableRow key={useCase.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                                                <img
                                                    src={useCase.image}
                                                    alt={useCase.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold">{useCase.title}</div>
                                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {useCase.description}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{useCase.industry}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400">
                                            Publicado
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {useCase.roi}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => openEdit(useCase)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => toast.info('Vista previa del caso')}>
                                                    <Eye className="mr-2 h-4 w-4" /> Ver en Marketplace
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={() => handleDelete(useCase.id)}
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredUseCases.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No tienes casos publicados</h3>
                            <p className="text-muted-foreground mb-4">
                                Comienza a añadir valor a la plataforma subiendo tu primer caso de éxito.
                            </p>
                            <Button onClick={() => setIsCreateOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Crear primer Caso
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle>Nuevo Caso de Uso</DialogTitle>
                                <DialogDescription>Añade una nueva solución a tu catálogo</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Image Upload */}
                        <div className="border-2 border-dashed rounded-md p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer group">
                            <Upload className="h-8 w-8 mx-auto text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                            <p className="text-sm font-medium">Arrastra una imagen o haz clic</p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG hasta 5MB</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label>Título del caso *</Label>
                                <Input
                                    placeholder="Ej: Optimización de procesos con IA"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Industria *</Label>
                                <Select
                                    value={formData.industry}
                                    onValueChange={(v) => setFormData({ ...formData, industry: v })}
                                >
                                    <SelectTrigger>
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
                                <Label>KPI Principal</Label>
                                <Input
                                    placeholder="+25% Eficiencia"
                                    value={formData.roi}
                                    onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Descripción *</Label>
                                <Textarea
                                    placeholder="Describe el problema que resuelves y los resultados conseguidos..."
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleCreate}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        >
                            Publicar Caso
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-xl">
                    <DialogHeader>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Edit className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <DialogTitle>Editar Caso de Uso</DialogTitle>
                                <DialogDescription>Actualiza los detalles de tu solución</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 space-y-2">
                                <Label>Título del caso *</Label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Industria *</Label>
                                <Select
                                    value={formData.industry}
                                    onValueChange={(v) => setFormData({ ...formData, industry: v })}
                                >
                                    <SelectTrigger>
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
                                <Label>KPI Principal</Label>
                                <Input
                                    value={formData.roi}
                                    onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <Label>Descripción *</Label>
                                <Textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleEdit}
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                        >
                            Guardar Cambios
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
