import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from '@/components/ui/sheet';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    FileText,
    Search,
    Plus,
    Video,
    BookOpen,
    Eye,
    Edit,
    Trash,
    Calendar,
    CheckCircle,
    Clock,
    X
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const mockContent = [
    { 
        id: 1, 
        title: 'Cómo implementar IA en procesos de RRHH', 
        slug: '/blog/ia-rrhh-implementation',
        type: 'Artículo', 
        author: 'Ana García', 
        date: '12 Ene 2026', 
        status: 'Publicado', 
        views: 1250 
    },
    { 
        id: 2, 
        title: 'Guía completa de Machine Learning para CEOs', 
        slug: '/guides/ml-for-ceos',
        type: 'Guía', 
        author: 'Carlos Ruiz', 
        date: '10 Ene 2026', 
        status: 'Publicado', 
        views: 3400 
    },
    { 
        id: 3, 
        title: 'Entrevista con CTO de TechGlobal', 
        slug: '/videos/interview-techglobal',
        type: 'Video', 
        author: 'Laura M.', 
        date: '08 Ene 2026', 
        status: 'En Revisión', 
        views: 0 
    },
    { 
        id: 4, 
        title: 'Tendencias de IA para 2026', 
        slug: '/blog/ai-trends-2026',
        type: 'Artículo', 
        author: 'Ana García', 
        date: '05 Ene 2026', 
        status: 'Borrador', 
        views: 0 
    },
    { 
        id: 5, 
        title: 'Automatización de Facturación con IA', 
        slug: '/guides/invoice-automation',
        type: 'Guía', 
        author: 'Pedro S.', 
        date: '03 Ene 2026', 
        status: 'Publicado', 
        views: 890 
    },
];

const contentStats = {
    published: 124,
    pending: 8,
    views: '45.2k'
};

export default function AdminContentPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContent, setSelectedContent] = useState<typeof mockContent[0] | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const handleEdit = (content: typeof mockContent[0]) => {
        setSelectedContent(content);
        setEditMode(true);
        setSheetOpen(true);
    };

    const handleCreate = () => {
        setSelectedContent(null);
        setEditMode(true);
        setSheetOpen(true);
    };

    const handleView = (content: typeof mockContent[0]) => {
        setSelectedContent(content);
        setEditMode(false);
        setSheetOpen(true);
    };

    const handleApprove = (content: typeof mockContent[0]) => {
        toast.success(`"${content.title}" ha sido aprobado y publicado`);
    };

    const handleReject = (content: typeof mockContent[0]) => {
        toast.error(`"${content.title}" ha sido rechazado`);
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'Artículo': return FileText;
            case 'Video': return Video;
            case 'Guía': return BookOpen;
            default: return FileText;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Publicado': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'En Revisión': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'Borrador': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Gestión de Contenido</h1>
                    <p className="text-muted-foreground text-lg">Administra los recursos, artículos y guías de la plataforma</p>
                </div>
                <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 font-bold rounded-md shadow-lg shadow-blue-500/20" onClick={handleCreate}>
                    <Plus className="h-5 w-5" />
                    Nuevo Contenido
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-transparent">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <FileText className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold font-display">{contentStats.published}</p>
                            <p className="text-sm text-muted-foreground">Artículos Publicados</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-amber-500/10 to-transparent">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                            <Clock className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold font-display">{contentStats.pending}</p>
                            <p className="text-sm text-muted-foreground">Pendientes de Revisión</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-transparent">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                            <Eye className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold font-display">{contentStats.views}</p>
                            <p className="text-sm text-muted-foreground">Vistas Totales</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Content Table */}
            <Card className="border-white/5 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex flex-col md:flex-row gap-4 justify-between bg-muted/20">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Buscar contenido..." 
                            className="pl-10 bg-background border-white/10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[150px] bg-background border-white/10">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los tipos</SelectItem>
                                <SelectItem value="article">Artículos</SelectItem>
                                <SelectItem value="guide">Guías</SelectItem>
                                <SelectItem value="video">Videos</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-[150px] bg-background border-white/10">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="published">Publicados</SelectItem>
                                <SelectItem value="draft">Borradores</SelectItem>
                                <SelectItem value="pending">En Revisión</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow className="border-white/5">
                            <TableHead className="font-bold text-xs uppercase tracking-wider pl-6">Título</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider">Tipo</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider">Autor</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider">Fecha</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider">Estado</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-center">Vistas</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-wider text-right pr-6">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockContent.map((item) => {
                            const Icon = getTypeIcon(item.type);
                            return (
                                <TableRow 
                                    key={item.id} 
                                    className="border-white/5 hover:bg-muted/30 cursor-pointer group transition-colors"
                                    onClick={() => handleView(item)}
                                >
                                    <TableCell className="pl-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-base group-hover:text-primary transition-colors">{item.title}</span>
                                            <span className="text-xs text-muted-foreground">{item.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="flex w-fit items-center gap-1 font-normal bg-background/50">
                                            <Icon className="h-3 w-3" />
                                            {item.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                                    {item.author.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-sm font-medium">{item.author}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {item.date}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={cn("rounded-full font-bold border", getStatusColor(item.status))}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center font-mono text-sm">
                                        {item.views > 0 ? item.views.toLocaleString() : '-'}
                                    </TableCell>
                                    <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-end gap-1">
                                            {item.status === 'En Revisión' ? (
                                                <>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 px-3 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 gap-1.5 font-semibold" 
                                                        onClick={() => handleApprove(item)}
                                                    >
                                                        <CheckCircle className="h-4 w-4" />
                                                        Aprobar
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        className="h-8 px-3 text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1.5 font-semibold" 
                                                        onClick={() => handleReject(item)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                        Rechazar
                                                    </Button>
                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={() => handleView(item)}>
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-500" onClick={() => handleEdit(item)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                                                        <Trash className="h-4 w-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>

            {/* Edit/Create/View Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-[600px] sm:w-[800px] overflow-y-auto">
                    <SheetHeader className="pb-6 border-b border-border">
                        <SheetTitle className="text-2xl font-display font-bold">
                            {editMode ? (selectedContent ? 'Editar Contenido' : 'Crear Nuevo Contenido') : 'Detalles del Contenido'}
                        </SheetTitle>
                        <SheetDescription>
                            {editMode ? 'Complete la información para publicar.' : 'Vista previa y metadatos del contenido.'}
                        </SheetDescription>
                    </SheetHeader>
                    
                    <div className="space-y-6 mt-6">
                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-2 space-y-4">
                                <div className="space-y-2">
                                    <Label>Título Principal</Label>
                                    <Input 
                                        defaultValue={selectedContent?.title || ''} 
                                        readOnly={!editMode}
                                        className={cn(!editMode && "bg-muted border-transparent")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug (URL)</Label>
                                    <Input 
                                        defaultValue={selectedContent?.slug || ''} 
                                        readOnly={!editMode}
                                        className={cn("font-mono text-sm", !editMode && "bg-muted border-transparent")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Contenido / Resumen</Label>
                                    <Textarea 
                                        className={cn("min-h-[200px]", !editMode && "bg-muted border-transparent")} 
                                        placeholder="Escribe el contenido aquí..."
                                        readOnly={!editMode}
                                        defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...`}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Estado</Label>
                                    <Select defaultValue={selectedContent?.status || 'Borrador'} disabled={!editMode}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Publicado">Publicado</SelectItem>
                                            <SelectItem value="Borrador">Borrador</SelectItem>
                                            <SelectItem value="En Revisión">En Revisión</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Tipo de Contenido</Label>
                                    <Select defaultValue={selectedContent?.type || 'Artículo'} disabled={!editMode}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Artículo">Artículo</SelectItem>
                                            <SelectItem value="Video">Video</SelectItem>
                                            <SelectItem value="Guía">Guía</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Autor</Label>
                                    <div className="flex items-center gap-2 p-2 border rounded-md bg-muted/20">
                                        <Avatar className="h-6 w-6">
                                            <AvatarFallback className="text-[10px]">AG</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{selectedContent?.author || 'Admin User'}</span>
                                    </div>
                                </div>

                                {!editMode && (
                                    <Card className="bg-muted/20 border-0 p-4">
                                        <h4 className="font-semibold mb-2 text-sm">Estadísticas</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Vistas</span>
                                                <span className="font-mono">{selectedContent?.views}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">CTR</span>
                                                <span className="font-mono">4.5%</span>
                                            </div>
                                        </div>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>

                    <SheetFooter className="mt-8 pt-6 border-t border-border">
                        {editMode ? (
                            <div className="flex gap-2 w-full justify-end">
                                <Button variant="outline" onClick={() => setSheetOpen(false)}>Cancelar</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {toast.success('Contenido guardado'); setSheetOpen(false);}}>Guardar Cambios</Button>
                            </div>
                        ) : selectedContent?.status === 'En Revisión' ? (
                            <div className="flex gap-2 w-full justify-between">
                                <Button variant="outline" onClick={() => setSheetOpen(false)}>Cerrar</Button>
                                <div className="flex gap-2">
                                    <Button 
                                        variant="outline" 
                                        className="text-red-500 border-red-500/50 hover:bg-red-500/10 hover:text-red-600 gap-2" 
                                        onClick={() => {handleReject(selectedContent); setSheetOpen(false);}}
                                    >
                                        <X className="h-4 w-4" />
                                        Rechazar
                                    </Button>
                                    <Button 
                                        className="bg-emerald-600 hover:bg-emerald-700 gap-2" 
                                        onClick={() => {handleApprove(selectedContent); setSheetOpen(false);}}
                                    >
                                        <CheckCircle className="h-4 w-4" />
                                        Aprobar y Publicar
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full justify-end">
                                <Button variant="outline" onClick={() => setSheetOpen(false)}>Cerrar</Button>
                                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setEditMode(true)}>Editar Contenido</Button>
                            </div>
                        )}
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    );
}
