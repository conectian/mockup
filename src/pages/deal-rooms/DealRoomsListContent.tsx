import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
    Plus,
    MessageSquare,
    Clock,
    FolderOpen,
    Search,
    ArrowRight,
    FileText,
    TrendingUp
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
        value: '€24.000',
        createdAt: '15 Ene 2026',
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
        value: '€12.500',
        createdAt: '10 Ene 2026',
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
        value: '€45.000',
        createdAt: '8 Ene 2026',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
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
        value: '€18.000',
        createdAt: '20 Dic 2025',
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
        value: '€32.000',
        createdAt: '12 Ene 2026',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
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

    const getStatusConfig = (status: string) => {
        return {
            active: { label: 'Activa', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
            pending: { label: 'Pendiente', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
            closed: { label: 'Cerrada', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20', dot: 'bg-slate-500' },
        }[status] || { label: status, color: 'text-muted-foreground', bg: 'bg-muted', border: 'border-border', dot: 'bg-muted-foreground' };
    };

    return (
        <div className="space-y-6">
            {/* Header with Search and Filters */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <Button className="gap-2 h-10 px-5 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-lg shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    Nueva Deal Room
                </Button>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Buscar negociación..."
                            className="pl-10 h-10 bg-white/5 border-white/10 rounded-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-1.5 p-1 bg-muted/30 rounded-lg border border-white/5">
                        {[
                            { key: 'all', label: 'Todas', count: stats.total },
                            { key: 'active', label: 'Activas', count: stats.active },
                            { key: 'pending', label: 'Pendientes', count: stats.pending },
                            { key: 'closed', label: 'Cerradas', count: stats.closed },
                        ].map(filter => (
                            <Button
                                key={filter.key}
                                variant="ghost"
                                size="sm"
                                onClick={() => setFilterStatus(filter.key as any)}
                                className={cn(
                                    "h-8 px-3 rounded-md font-medium text-xs transition-all",
                                    filterStatus === filter.key
                                        ? "bg-background shadow-sm text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {filter.label}
                                <span className="ml-1.5 text-[10px] opacity-60">({filter.count})</span>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="zoom-adaptive-grid">
                {filteredRooms.map((room) => {
                    const statusConfig = getStatusConfig(room.status);
                    return (
                        <Card key={room.id} className="py-0 overflow-hidden group cursor-pointer border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-xl">
                            {/* Image */}
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <img
                                    src={room.image}
                                    alt={room.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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
                                    <div className="bg-white/90 dark:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg">
                                        <span className="text-sm font-bold text-primary">{room.value}</span>
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
                                <h3 className="text-lg font-display font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
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
                                    <Progress value={room.progress} className="h-1.5" />
                                </div>

                                {/* Next Step */}
                                <p className="text-xs text-muted-foreground mb-4">
                                    <span className="font-medium">Próximo:</span> {room.nextStep}
                                </p>

                                {/* Stats Row */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MessageSquare className="h-3.5 w-3.5" />
                                            <span className="text-xs font-medium">{room.messages}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <FileText className="h-3.5 w-3.5" />
                                            <span className="text-xs font-medium">{room.documents}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span className="text-xs font-medium">{room.lastActivity}</span>
                                        </div>
                                    </div>
                                    <Link to={`/deal-room/${room.id}`}>
                                        <Button variant="ghost" size="sm" className="h-8 px-3 rounded-lg gap-1.5 font-bold text-xs group/btn">
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

            {filteredRooms.length === 0 && (
                <div className="text-center py-16">
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

