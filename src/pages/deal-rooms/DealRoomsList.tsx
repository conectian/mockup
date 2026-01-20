import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Plus,
    MessageSquare,
    Clock,
    FolderOpen,
    Search,
    MoreHorizontal,
    Eye,
    Archive,
    Trash2,
    Users,
    CheckCircle,
    AlertCircle,
    XCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const mockDealRooms = [
    {
        id: 'dr-001',
        title: 'Integración Sistema de Pagos',
        counterparty: 'DataFlow AI',
        status: 'active',
        lastActivity: '2 horas',
        messages: 12,
        createdAt: '15 Ene 2026',
    },
    {
        id: 'dr-002',
        title: 'Automatización de Facturas',
        counterparty: 'AutomateX',
        status: 'pending',
        lastActivity: '1 día',
        messages: 5,
        createdAt: '10 Ene 2026',
    },
    {
        id: 'dr-003',
        title: 'Motor de Recomendación IA',
        counterparty: 'RecoTech Solutions',
        status: 'active',
        lastActivity: '30 min',
        messages: 24,
        createdAt: '8 Ene 2026',
    },
    {
        id: 'dr-004',
        title: 'Chatbot Multicanal',
        counterparty: 'BotMaster Pro',
        status: 'closed',
        lastActivity: '5 días',
        messages: 45,
        createdAt: '20 Dic 2025',
    },
    {
        id: 'dr-005',
        title: 'Análisis Predictivo de Ventas',
        counterparty: 'PredictAI Labs',
        status: 'pending',
        lastActivity: '3 horas',
        messages: 8,
        createdAt: '12 Ene 2026',
    },
];

export default function DealRoomsList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'closed'>('all');

    const handleAction = (action: string, room: string) => {
        toast.success(`${action} ejecutado para "${room}"`);
    };

    const filteredRooms = mockDealRooms.filter(room => {
        const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || room.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: mockDealRooms.length,
        active: mockDealRooms.filter(r => r.status === 'active').length,
        pending: mockDealRooms.filter(r => r.status === 'pending').length,
        closed: mockDealRooms.filter(r => r.status === 'closed').length,
    };

    const getStatusBadge = (status: string) => {
        const config = {
            active: { label: 'Activa', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
            pending: { label: 'Pendiente', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', dot: 'bg-amber-500 animate-pulse' },
            closed: { label: 'Cerrada', color: 'bg-slate-500/10 text-slate-600 dark:text-slate-400', dot: 'bg-slate-500' },
        }[status] || { label: status, color: 'bg-muted', dot: 'bg-muted-foreground' };

        return (
            <Badge className={cn("font-bold rounded-full border-0 gap-1.5", config.color)}>
                <div className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                {config.label}
            </Badge>
        );
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Deal Rooms</h1>
                    <p className="text-muted-foreground text-lg">Gestiona tus negociaciones y alianzas estratégicas</p>
                </div>
                <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-bold rounded-md shadow-lg shadow-violet-500/20">
                    <Plus className="h-5 w-5" />
                    Nueva Deal Room
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar - Filters */}
                <div className="space-y-6 lg:sticky lg:top-24 h-fit">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Búsqueda</h3>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar..."
                                className="pl-10 bg-muted/30 border-white/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Estado</h3>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setFilterStatus('all')}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    filterStatus === 'all'
                                        ? "bg-primary/10 border-primary/50 text-foreground shadow-sm"
                                        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-md transition-colors", filterStatus === 'all' ? "bg-primary text-primary-foreground" : "bg-white/5")}>
                                        <Users className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium opacity-70">Total</div>
                                        <div className="font-bold text-sm">Todas</div>
                                    </div>
                                </div>
                                <div className="text-xl font-display font-bold">{stats.total}</div>
                            </button>

                            <button
                                onClick={() => setFilterStatus('active')}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    filterStatus === 'active'
                                        ? "bg-emerald-500/10 border-emerald-500/50 text-foreground shadow-sm"
                                        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-md transition-colors", filterStatus === 'active' ? "bg-emerald-500 text-white" : "bg-white/5")}>
                                        <CheckCircle className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium opacity-70 text-emerald-500">Activas</div>
                                        <div className="font-bold text-sm">En curso</div>
                                    </div>
                                </div>
                                <div className={cn("text-xl font-display font-bold", filterStatus === 'active' ? "text-emerald-500" : "")}>{stats.active}</div>
                            </button>

                            <button
                                onClick={() => setFilterStatus('pending')}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    filterStatus === 'pending'
                                        ? "bg-amber-500/10 border-amber-500/50 text-foreground shadow-sm"
                                        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-md transition-colors", filterStatus === 'pending' ? "bg-amber-500 text-white" : "bg-white/5")}>
                                        <AlertCircle className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium opacity-70 text-amber-500">Pendientes</div>
                                        <div className="font-bold text-sm">Acción req.</div>
                                    </div>
                                </div>
                                <div className={cn("text-xl font-display font-bold", filterStatus === 'pending' ? "text-amber-500" : "")}>{stats.pending}</div>
                            </button>

                            <button
                                onClick={() => setFilterStatus('closed')}
                                className={cn(
                                    "flex items-center justify-between p-3 rounded-lg border transition-all text-left",
                                    filterStatus === 'closed'
                                        ? "bg-slate-500/10 border-slate-500/50 text-foreground shadow-sm"
                                        : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-md transition-colors", filterStatus === 'closed' ? "bg-slate-500 text-white" : "bg-white/5")}>
                                        <XCircle className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium opacity-70 text-slate-500">Cerradas</div>
                                        <div className="font-bold text-sm">Histórico</div>
                                    </div>
                                </div>
                                <div className={cn("text-xl font-display font-bold", filterStatus === 'closed' ? "text-slate-500" : "")}>{stats.closed}</div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content - Table */}
                <div className="lg:col-span-3">
                    <Card className="border-white/5 rounded-md shadow-sm overflow-hidden min-h-[500px]">
                        <CardHeader className="px-8 pt-8 pb-0">
                            <CardTitle className="text-xl font-display font-bold">Negociaciones</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-6">
                            {/* Desktop Table */}
                            <div className="hidden md:block">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-white/5">
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pl-8">Deal Room</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Contraparte</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Estado</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Mensajes</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Última Actividad</TableHead>
                                            <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Creado</TableHead>
                                            <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pr-8">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredRooms.map((room) => (
                                            <TableRow key={room.id} className="border-white/5 hover:bg-muted/30 transition-colors">
                                                <TableCell className="pl-8">
                                                    <Link to={`/deal-room/${room.id}`} className="flex items-center gap-3 group">
                                                        <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                                            <AvatarFallback className="bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold rounded-md">
                                                                {room.title.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-bold group-hover:text-primary transition-colors">{room.title}</span>
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                                                            {room.counterparty.charAt(0)}
                                                        </div>
                                                        <span className="text-muted-foreground">{room.counterparty}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{getStatusBadge(room.status)}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                                        <span className="font-medium">{room.messages}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                        <Clock className="h-4 w-4" />
                                                        <span>{room.lastActivity}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground text-sm">{room.createdAt}</TableCell>
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
                                                            <DropdownMenuItem asChild className="cursor-pointer">
                                                                <Link to={`/deal-room/${room.id}`}>
                                                                    <Eye className="mr-2 h-4 w-4" /> Entrar a la sala
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleAction('Archivado', room.title)} className="cursor-pointer">
                                                                <Archive className="mr-2 h-4 w-4" /> Archivar
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator className="bg-white/5" />
                                                            <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleAction('Eliminado', room.title)}>
                                                                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
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
                                {filteredRooms.map((room) => (
                                    <div key={room.id} className="bg-white/5 rounded-lg border border-white/5 p-4 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <Link to={`/deal-room/${room.id}`} className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                                    <AvatarFallback className="bg-gradient-to-br from-violet-400 to-indigo-500 text-white font-bold rounded-md">
                                                        {room.title.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-bold text-sm leading-tight">{room.title}</h3>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                                                            {room.counterparty.charAt(0)}
                                                        </div>
                                                        <span className="text-xs text-muted-foreground">{room.counterparty}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 -mr-2 text-muted-foreground">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="glass-card">
                                                    <DropdownMenuItem asChild>
                                                        <Link to={`/deal-room/${room.id}`}>Entrar a la sala</Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onSelect={() => handleAction('Archivado', room.title)}>Archivar</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-500" onSelect={() => handleAction('Eliminado', room.title)}>Eliminar</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-white/5 pt-3">
                                            {getStatusBadge(room.status)}
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <MessageSquare className="h-3.5 w-3.5" />
                                                    <span>{room.messages}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    <span>{room.lastActivity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {filteredRooms.length === 0 && (
                                <div className="text-center py-16">
                                    <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                                    <h3 className="text-lg font-display font-bold mb-2">No se encontraron Deal Rooms</h3>
                                    <p className="text-muted-foreground">
                                        Prueba ajustando los filtros de búsqueda
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

