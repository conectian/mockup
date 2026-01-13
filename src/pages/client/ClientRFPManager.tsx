import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
}
    from '@/components/ui/select';
import {
    Plus,
    FileText,
    Calendar,
    Eye,
    MessageSquare,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';
import MagicWriter from '@/components/MagicWriter';

// Mock client RFPs
const clientRFPs = [
    {
        id: 'c-rfp-001',
        title: 'Sistema de gestión de inventario',
        status: 'activo',
        proposals: 5,
        views: 23,
        deadline: '15 Feb 2026',
        postedAt: 'Hace 3 días',
    },
    {
        id: 'c-rfp-002',
        title: 'Automatización de facturación',
        status: 'activo',
        proposals: 3,
        views: 18,
        deadline: '28 Feb 2026',
        postedAt: 'Hace 1 semana',
    },
];

export default function ClientRFPManager() {
    const [sheetOpen, setSheetOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        deadline: '',
    });

    const handleSubmit = () => {
        if (!formData.title || !formData.description || !formData.budget) {
            toast.error('Por favor, completa todos los campos requeridos');
            return;
        }

        toast.success('¡RFP publicado!', {
            description: 'Tu necesidad ya está visible para los proveedores.',
        });

        setSheetOpen(false);
        setFormData({ title: '', description: '', budget: '', deadline: '' });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Mis Necesidades</h1>
                    <p className="text-muted-foreground">Gestiona tus RFPs y recibe propuestas de proveedores</p>
                </div>

                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                            <Plus className="h-5 w-5" />
                            Publicar Nueva Necesidad
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                        <SheetHeader className="pb-6 border-b">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <SheetTitle className="text-xl">Nueva Necesidad</SheetTitle>
                                    <SheetDescription>
                                        Los proveedores podrán enviarte propuestas
                                    </SheetDescription>
                                </div>
                            </div>
                        </SheetHeader>

                        <div className="py-6 px-4 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-semibold">
                                    Título breve <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Ej: Buscamos ERP para gestión de almacén"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="h-11"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="description" className="text-sm font-semibold">
                                        Descripción del problema <span className="text-destructive">*</span>
                                    </Label>
                                    <MagicWriter
                                        context="rfp"
                                        onSuggest={(text) => setFormData({ ...formData, description: text })}
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Describe en detalle qué problema quieres resolver, qué requisitos tienes y qué resultados esperas..."
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="resize-none"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Cuanto más detallado, mejores propuestas recibirás
                                </p>
                            </div>

                            {/* Budget & Deadline Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="budget" className="text-sm font-semibold">
                                        Presupuesto <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.budget}
                                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                    >
                                        <SelectTrigger id="budget" className="h-11">
                                            <SelectValue placeholder="Selecciona..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="10k-25k">10k - 25k €</SelectItem>
                                            <SelectItem value="25k-50k">25k - 50k €</SelectItem>
                                            <SelectItem value="50k-100k">50k - 100k €</SelectItem>
                                            <SelectItem value="100k+">+100k €</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="deadline" className="text-sm font-semibold">
                                        Fecha límite
                                    </Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            {/* Info Banner */}
                            <div className="p-4 rounded-md bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                    <span className="font-semibold">💡 Consejo:</span> Los RFPs con presupuesto definido reciben un 40% más de propuestas.
                                </p>
                            </div>
                        </div>

                        <SheetFooter className="pt-4 border-t gap-3">
                            <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1">
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                            >
                                Publicar RFP
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">RFPs Activos</span>
                        </div>
                        <div className="text-2xl font-bold">{clientRFPs.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">Propuestas Recibidas</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">
                            {clientRFPs.reduce((sum, rfp) => sum + rfp.proposals, 0)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm">Vistas Totales</span>
                        </div>
                        <div className="text-2xl font-bold">
                            {clientRFPs.reduce((sum, rfp) => sum + rfp.views, 0)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* RFP List */}
            <Card>
                <CardHeader>
                    <CardTitle>Mis RFPs Publicados</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {clientRFPs.map((rfp) => (
                        <div
                            key={rfp.id}
                            className="flex items-center justify-between p-4 bg-muted/50 rounded-md hover:bg-muted transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium">{rfp.title}</h3>
                                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
                                        {rfp.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {rfp.postedAt}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Hasta {rfp.deadline}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-primary">{rfp.proposals}</div>
                                    <div className="text-xs text-muted-foreground">propuestas</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-semibold">{rfp.views}</div>
                                    <div className="text-xs text-muted-foreground">vistas</div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Ver Propuestas
                                </Button>
                            </div>
                        </div>
                    ))}

                    {clientRFPs.length === 0 && (
                        <div className="text-center py-12">
                            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No tienes RFPs publicados</h3>
                            <p className="text-muted-foreground mb-4">
                                Publica tu primera necesidad y recibe propuestas de proveedores verificados.
                            </p>
                            <Button onClick={() => setSheetOpen(true)}>
                                <Plus className="mr-2 h-4 w-4" />
                                Publicar Primera Necesidad
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
