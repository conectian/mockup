import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/common/PageHeader';
import StatsCard from '@/components/common/StatsCard';
import StatusBadge, { type StatusType } from '@/components/common/StatusBadge';
import CompanyAvatar from '@/components/common/CompanyAvatar';
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

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Activa';
            case 'pending': return 'Pendiente';
            case 'closed': return 'Cerrada';
            default: return status;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <PageHeader
                title="Deal Rooms"
                description="Gestiona tus negociaciones y alianzas estratégicas"
            >
                <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-bold rounded-md shadow-lg shadow-violet-500/20">
                    <Plus className="h-5 w-5" />
                    Nueva Deal Room
                </Button>
            </PageHeader>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4">
                <StatsCard
                    title="Total"
                    value={stats.total}
                    icon={Users}
                    gradient="from-slate-400/20 via-slate-500/10 to-transparent"
                    iconColor="text-slate-500"
                    titleColor="text-muted-foreground/60"
                    shadowColor="shadow-slate-500/5"
                    valueClassName="text-2xl md:text-4xl"
                />
                <StatsCard
                    title="Activas"
                    value={stats.active}
                    icon={CheckCircle}
                    gradient="from-emerald-400/20 via-emerald-500/10 to-transparent"
                    iconColor="text-emerald-500"
                    titleColor="text-emerald-600 dark:text-emerald-400/70"
                    textColor="text-emerald-700 dark:text-emerald-400"
                    shadowColor="shadow-emerald-500/5"
                    valueClassName="text-2xl md:text-4xl"
                />
                <StatsCard
                    title="Pendientes"
                    value={stats.pending}
                    icon={AlertCircle}
                    gradient="from-amber-400/20 via-amber-500/10 to-transparent"
                    iconColor="text-amber-500"
                    titleColor="text-amber-600 dark:text-amber-400/70"
                    textColor="text-amber-700 dark:text-amber-400"
                    shadowColor="shadow-amber-500/5"
                    valueClassName="text-2xl md:text-4xl"
                />
                <StatsCard
                    title="Cerradas"
                    value={stats.closed}
                    icon={XCircle}
                    gradient="from-slate-400/20 via-slate-500/10 to-transparent"
                    iconColor="text-slate-500"
                    titleColor="text-muted-foreground/60"
                    shadowColor="shadow-slate-500/5"
                    valueClassName="text-2xl md:text-4xl"
                />
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
                                                <CompanyAvatar alt={room.title} variant="brand" />
                                                <span className="font-bold group-hover:text-primary transition-colors">{room.title}</span>
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <CompanyAvatar alt={room.counterparty} size="sm" variant="neutral" className="h-6 w-6 text-[10px]" fallbackClassName="text-[10px]" />
                                                <span className="text-muted-foreground">{room.counterparty}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge status={room.status as StatusType}>
                                                {getStatusLabel(room.status)}
                                            </StatusBadge>
                                        </TableCell>
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
                                        <CompanyAvatar alt={room.title} variant="brand" />
                                        <div>
                                            <h3 className="font-bold text-sm leading-tight">{room.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <CompanyAvatar alt={room.counterparty} size="sm" variant="neutral" className="h-5 w-5" />
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
                                    <StatusBadge status={room.status as StatusType}>
                                        {getStatusLabel(room.status)}
                                    </StatusBadge>
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
