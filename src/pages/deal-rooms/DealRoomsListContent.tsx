import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Plus,
    MessageSquare,
    Clock,
    FolderOpen,
    Search,
    ArrowRight
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
        createdAt: '15 Ene 2026',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
        id: 'dr-002',
        title: 'Automatización de Facturas',
        counterparty: 'AutomateX',
        status: 'pending',
        lastActivity: '1 día',
        messages: 5,
        createdAt: '10 Ene 2026',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
    },
    {
        id: 'dr-003',
        title: 'Motor de Recomendación IA',
        counterparty: 'RecoTech Solutions',
        status: 'active',
        lastActivity: '30 min',
        messages: 24,
        createdAt: '8 Ene 2026',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
        id: 'dr-004',
        title: 'Chatbot Multicanal',
        counterparty: 'BotMaster Pro',
        status: 'closed',
        lastActivity: '5 días',
        messages: 45,
        createdAt: '20 Dic 2025',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
        id: 'dr-005',
        title: 'Análisis Predictivo de Ventas',
        counterparty: 'PredictAI Labs',
        status: 'pending',
        lastActivity: '3 horas',
        messages: 8,
        createdAt: '12 Ene 2026',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80'
    },
];

export default function DealRoomsListContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'closed'>('all');

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
            {/* Header with Search and Filters on Right */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <Button className="gap-2 h-11 px-5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    Nueva Deal Room
                </Button>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar negociación..."
                            className="pl-10 h-10 bg-white/5 border-white/10 rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: 'Todas', count: stats.total },
                            { key: 'active', label: 'Activas', count: stats.active, activeClass: 'bg-emerald-600 hover:bg-emerald-700' },
                            { key: 'pending', label: 'Pendientes', count: stats.pending, activeClass: 'bg-amber-600 hover:bg-amber-700' },
                            { key: 'closed', label: 'Cerradas', count: stats.closed, activeClass: 'bg-slate-600 hover:bg-slate-700' },
                        ].map(filter => (
                            <Button
                                key={filter.key}
                                variant={filterStatus === filter.key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setFilterStatus(filter.key as any)}
                                className={cn(
                                    "h-10 px-3 rounded-xl font-medium text-xs",
                                    filterStatus === filter.key && (filter.activeClass || "bg-primary")
                                )}
                            >
                                {filter.label}
                                <Badge variant="secondary" className="ml-1.5 h-5 w-5 p-0 flex items-center justify-center text-[10px] rounded-full">
                                    {filter.count}
                                </Badge>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Deal Rooms Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredRooms.map((room) => (
                    <Link
                        key={room.id}
                        to={`/deal-room/${room.id}`}
                        className="group block"
                    >
                        <Card className="relative overflow-hidden border-white/10 bg-gradient-to-br from-white/5 to-transparent hover:from-white/10 hover:border-white/20 transition-all duration-300 h-full">
                            {/* Status Badge */}
                            <div className="absolute top-3 right-3 z-10">
                                {getStatusBadge(room.status)}
                            </div>

                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center text-lg font-bold text-primary border border-primary/20 shrink-0">
                                        {room.title.charAt(0)}
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1">
                                        <CardTitle className="text-base font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                            {room.title}
                                        </CardTitle>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-4">
                                {/* Counterparty */}
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6">
                                        <AvatarFallback className="bg-white/10 text-[10px] font-bold border border-white/10">
                                            {room.counterparty.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm text-muted-foreground">{room.counterparty}</span>
                                </div>

                                {/* Metrics Row */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <MessageSquare className="h-3.5 w-3.5 text-primary/60" />
                                            <span className="font-medium">{room.messages}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-emerald-500/60" />
                                            <span className="font-medium">{room.lastActivity}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {filteredRooms.length === 0 && (
                <div className="text-center py-16 col-span-full">
                    <FolderOpen className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-display font-bold mb-2">No se encontraron Deal Rooms</h3>
                    <p className="text-muted-foreground">
                        Prueba ajustando los filtros de búsqueda
                    </p>
                </div>
            )}
        </div>
    );
}
