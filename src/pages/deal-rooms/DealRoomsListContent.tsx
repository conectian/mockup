import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

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
    XCircle,
    ArrowRight
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
        image: '/cover-fintech.png'
    },
    {
        id: 'dr-002',
        title: 'Automatización de Facturas',
        counterparty: 'AutomateX',
        status: 'pending',
        lastActivity: '1 día',
        messages: 5,
        createdAt: '10 Ene 2026',
        image: '/cover-fintech.png'
    },
    {
        id: 'dr-003',
        title: 'Motor de Recomendación IA',
        counterparty: 'RecoTech Solutions',
        status: 'active',
        lastActivity: '30 min',
        messages: 24,
        createdAt: '8 Ene 2026',
        image: '/cover-ai.png'
    },
    {
        id: 'dr-004',
        title: 'Chatbot Multicanal',
        counterparty: 'BotMaster Pro',
        status: 'closed',
        lastActivity: '5 días',
        messages: 45,
        createdAt: '20 Dic 2025',
        image: '/cover-ai.png'
    },
    {
        id: 'dr-005',
        title: 'Análisis Predictivo de Ventas',
        counterparty: 'PredictAI Labs',
        status: 'pending',
        lastActivity: '3 horas',
        messages: 8,
        createdAt: '12 Ene 2026',
        image: '/cover-retail.png'
    },
];

export default function DealRoomsListContent() {
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
            active: { label: 'Activa', color: 'bg-emerald-500/90 text-white border-emerald-600', dot: 'bg-white' },
            pending: { label: 'Pendiente', color: 'bg-amber-500/90 text-white border-amber-600', dot: 'bg-white animate-pulse' },
            closed: { label: 'Cerrada', color: 'bg-slate-500/90 text-white border-slate-600', dot: 'bg-white' },
        }[status] || { label: status, color: 'bg-muted', dot: 'bg-muted-foreground' };

        return (
            <Badge className={cn("font-bold rounded-full border shadow-sm gap-1.5 backdrop-blur-md", config.color)}>
                <div className={cn("h-1.5 w-1.5 rounded-full", config.dot)} />
                {config.label}
            </Badge>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header with button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-xl font-display font-bold">Negociaciones Activas</h2>
                    <p className="text-sm text-muted-foreground">Gestiona tus Deal Rooms y alianzas estratégicas</p>
                </div>
                <Button className="gap-2 h-11 px-5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-md shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    Nueva Deal Room
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4">
                <Card className="border-0 bg-gradient-to-br from-slate-400/20 via-slate-500/10 to-transparent rounded-md shadow-xl shadow-slate-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Users className="h-10 w-10 md:h-16 md:w-16 text-slate-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 md:mb-2">Total</div>
                        <div className="text-2xl md:text-4xl font-display font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent rounded-md shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle className="h-10 w-10 md:h-16 md:w-16 text-emerald-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/70 mb-1 md:mb-2">Activas</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent rounded-md shadow-xl shadow-amber-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <AlertCircle className="h-10 w-10 md:h-16 md:w-16 text-amber-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400/70 mb-1 md:mb-2">Pendientes</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-amber-700 dark:text-amber-400">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-slate-400/20 via-slate-500/10 to-transparent rounded-md shadow-xl shadow-slate-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <XCircle className="h-10 w-10 md:h-16 md:w-16 text-slate-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 md:mb-2">Cerradas</div>
                        <div className="text-2xl md:text-4xl font-display font-bold">{stats.closed}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título o contraparte..."
                        className="pl-10 h-11 bg-muted/30 border-white/10 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={filterStatus === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterStatus('all')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterStatus === 'all' && "bg-primary shadow-lg shadow-primary/20"
                        )}
                    >
                        Todas
                    </Button>
                    <Button
                        variant={filterStatus === 'active' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterStatus('active')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterStatus === 'active' && "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                        )}
                    >
                        Activas
                    </Button>
                    <Button
                        variant={filterStatus === 'pending' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterStatus('pending')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterStatus === 'pending' && "bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/20"
                        )}
                    >
                        Pendientes
                    </Button>
                    <Button
                        variant={filterStatus === 'closed' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterStatus('closed')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterStatus === 'closed' && "bg-slate-600 hover:bg-slate-700 shadow-lg shadow-slate-500/20"
                        )}
                    >
                        Cerradas
                    </Button>
                </div>
            </div>

            {/* Deal Rooms Table */}
            <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-0">
                    <CardTitle className="text-xl font-display font-bold">Negociaciones</CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                    {/* Desktop Table */}
                    {/* Deal Rooms Grid (Design 1 with Images) */}
                    <div className="zoom-adaptive-grid">
                        {filteredRooms.map((room) => (
                            <Card key={room.id} className="group relative overflow-hidden border-white/5 bg-card/40 hover:bg-card/60 transition-all duration-300 flex flex-col shadow-lg">
                                {/* Image Cover */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    <img
                                        src={room.image}
                                        alt={room.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        {getStatusBadge(room.status)}
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                                            {room.title.charAt(0)}
                                        </div>
                                    </div>
                                </div>

                                <CardHeader className="relative pb-2 pt-4">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors line-clamp-1">
                                                {room.title}
                                            </CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <div className="h-5 w-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold border border-white/5">
                                                    {room.counterparty.charAt(0)}
                                                </div>
                                                {room.counterparty}
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-muted-foreground">
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
                                    </div>
                                </CardHeader>

                                <CardContent className="relative pt-2 flex-1 flex flex-col justify-end">
                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-white/5 border-b mb-4 bg-black/20 rounded-lg px-3 mt-2">
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-bold">Mensajes</p>
                                            <div className="flex items-center gap-2">
                                                <MessageSquare className="h-4 w-4 text-indigo-400" />
                                                <span className="font-bold text-sm">{room.messages}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/60 font-bold">Actividad</p>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-emerald-400" />
                                                <span className="font-bold text-sm">{room.lastActivity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between gap-3 pt-2">
                                        <p className="text-xs text-muted-foreground font-medium opacity-60">{room.createdAt}</p>
                                        <Button size="sm" className="bg-white/5 hover:bg-primary hover:text-white border border-white/10 shadow-sm w-full" asChild>
                                            <Link to={`/deal-room/${room.id}`}>
                                                Abrir Sala <ArrowRight className="ml-2 h-3 w-3" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-sm leading-tight line-clamp-2">{room.title}</h3>
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
    );
}
