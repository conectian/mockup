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
    Clock,
    ArrowRight,
    Sparkles,
    Briefcase
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

    const stats = {
        active: clientRFPs.length,
        proposals: clientRFPs.reduce((sum, rfp) => sum + rfp.proposals, 0),
        views: clientRFPs.reduce((sum, rfp) => sum + rfp.views, 0),
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Mis Necesidades</h1>
                    <p className="text-muted-foreground text-lg">Gestiona tus RFPs y recibe propuestas</p>
                </div>

                <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                    <SheetTrigger asChild>
                        <Button className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-md shadow-lg shadow-primary/20 gap-2">
                            <Plus className="h-5 w-5" />
                            Publicar Nueva Necesidad
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-lg overflow-y-auto glass-card border-l border-white/10">
                        <SheetHeader className="pb-6 border-b border-white/5">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <SheetTitle className="text-xl font-display font-bold">Nueva Necesidad</SheetTitle>
                                    <SheetDescription>
                                        Describe tu problema para recibir propuestas
                                    </SheetDescription>
                                </div>
                            </div>
                        </SheetHeader>

                        <div className="py-6 px-1 space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                                    Título breve <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Ej: Buscamos ERP para gestión de almacén"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="h-11 bg-muted/30 border-white/10 rounded-md"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                                        Descripción del problema <span className="text-destructive">*</span>
                                    </Label>
                                    <MagicWriter
                                        context="rfp"
                                        onSuggest={(text) => setFormData({ ...formData, description: text })}
                                    />
                                </div>
                                <Textarea
                                    id="description"
                                    placeholder="Describe en detalle qué problema quieres resolver..."
                                    rows={6}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="resize-none bg-muted/30 border-white/10 rounded-md"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Cuanto más detallado, mejores propuestas recibirás
                                </p>
                            </div>

                            {/* Budget & Deadline Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                                        Presupuesto <span className="text-destructive">*</span>
                                    </Label>
                                    <Select
                                        value={formData.budget}
                                        onValueChange={(value) => setFormData({ ...formData, budget: value })}
                                    >
                                        <SelectTrigger id="budget" className="h-11 bg-muted/30 border-white/10 rounded-md">
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
                                    <Label htmlFor="deadline" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">
                                        Fecha límite
                                    </Label>
                                    <Input
                                        id="deadline"
                                        type="date"
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="h-11 bg-muted/30 border-white/10 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Info Banner */}
                            <div className="p-4 rounded-md bg-primary/5 border border-primary/10">
                                <p className="text-sm text-blue-600 dark:text-blue-300 flex items-start gap-2">
                                    <Sparkles className="h-4 w-4 shrink-0 mt-0.5" />
                                    <span><span className="font-bold">Consejo:</span> Los RFPs con presupuesto definido reciben un 40% más de propuestas cualificadas.</span>
                                </p>
                            </div>
                        </div>

                        <SheetFooter className="pt-4 border-t border-white/5 gap-3">
                            <Button variant="outline" onClick={() => setSheetOpen(false)} className="flex-1 h-11 border-white/10">
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                className="flex-1 h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
                            >
                                Publicar RFP
                            </Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
                <Card className="border-0 bg-muted/50 rounded-md shadow-xl shadow-slate-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <FileText className="h-12 w-12 md:h-20 md:w-20 text-slate-500" />
                    </div>
                    <CardContent className="p-4 md:p-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-muted-foreground/60 mb-1 md:mb-2">RFPs Activos</div>
                        <div className="text-2xl md:text-5xl font-display font-bold">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-primary/10 rounded-md shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <MessageSquare className="h-12 w-12 md:h-20 md:w-20 text-emerald-500" />
                    </div>
                    <CardContent className="p-4 md:p-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-emerald-600 dark:text-emerald-400/70 mb-1 md:mb-2">Propuestas</div>
                        <div className="text-2xl md:text-5xl font-display font-bold text-emerald-700 dark:text-emerald-400">{stats.proposals}</div>
                    </CardContent>
                </Card>
                <Card className="col-span-2 lg:col-span-1 border-0 bg-[#243A57]/10 rounded-md shadow-xl shadow-blue-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Eye className="h-12 w-12 md:h-20 md:w-20 text-blue-500" />
                    </div>
                    <CardContent className="p-4 md:p-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-blue-600 dark:text-blue-400/70 mb-1 md:mb-2">Vistas Totales</div>
                        <div className="text-2xl md:text-5xl font-display font-bold text-blue-700 dark:text-blue-400">{stats.views}</div>
                    </CardContent>
                </Card>
            </div>

            {/* RFP List */}
            <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                <CardHeader className="px-4 sm:px-8 pt-6 sm:pt-8">
                    <CardTitle className="text-lg sm:text-xl font-display font-bold flex items-center gap-2">
                        <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        Mis RFPs Publicados
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8 space-y-4">
                    {clientRFPs.map((rfp) => (
                        <div
                            key={rfp.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/30 border border-white/5 rounded-md hover:bg-muted/50 hover:border-white/10 transition-all cursor-pointer group gap-4"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                                    <h3 className="font-bold text-base sm:text-lg group-hover:text-primary transition-colors truncate">{rfp.title}</h3>
                                    <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border-0 gap-1.5 rounded-full px-2.5 text-[10px] sm:text-xs shrink-0">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        {rfp.status}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground/70">
                                    <span className="flex items-center gap-1.5">
                                        <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        {rfp.postedAt}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                        {rfp.deadline}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
                                <div className="flex gap-6 sm:gap-8">
                                    <div className="text-center">
                                        <div className="text-lg sm:text-xl font-bold text-primary">{rfp.proposals}</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">propuestas</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-base sm:text-lg font-bold">{rfp.views}</div>
                                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">vistas</div>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="font-bold border-white/10 hover:bg-white/5 gap-1.5 sm:gap-2 group/btn text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4">
                                    <span className="hidden xs:inline">Ver</span> Propuestas
                                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {clientRFPs.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="h-16 w-16 mx-auto text-muted-foreground/30 mb-6" />
                            <h3 className="text-xl font-display font-bold mb-2">No tienes RFPs publicados</h3>
                            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                Publica tu primera necesidad y recibe propuestas de proveedores verificados en menos de 48h.
                            </p>
                            <Button onClick={() => setSheetOpen(true)} className="h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-md shadow-lg shadow-primary/20">
                                <Plus className="mr-2 h-5 w-5" />
                                Publicar Primera Necesidad
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
