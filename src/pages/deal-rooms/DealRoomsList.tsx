import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, Clock, FolderOpen } from 'lucide-react';
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
    },
    {
        id: 'dr-002',
        title: 'Automatización de Facturas',
        counterparty: 'AutomateX',
        status: 'pending',
        lastActivity: '1 día',
        messages: 5,
    },
];

export default function DealRoomsList() {
    return (
        <div className="space-y-10">
            {/* Header Section with Mesh Gradient */}
            <Card className="border-0 mesh-gradient text-white overflow-hidden relative rounded-md shadow-2xl shadow-indigo-500/20">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <CardContent className="py-12 px-8 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight leading-tight">
                                Tus Negociaciones
                            </h1>
                            <p className="text-white/80 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                                Gestiona tus alianzas estratégicas y Deal Rooms activos en un solo lugar.
                            </p>
                        </div>
                        <Button className="bg-white text-indigo-600 hover:bg-white/90 gap-3 shadow-xl shadow-black/20 px-8 py-7 text-lg font-bold rounded-md transition-all hover:scale-105 active:scale-95 shrink-0">
                            <Plus className="h-6 w-6" />
                            Nueva Deal Room
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex items-center justify-between px-2 mb-2">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground/70">Salas Activas</h2>
                    <span className="text-xs font-bold text-muted-foreground/50">{mockDealRooms.length} Negociaciones</span>
                </div>

                {mockDealRooms.map((room) => (
                    <Link key={room.id} to={`/deal-room/${room.id}`} className="block group">
                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-white/5 bg-card/40 backdrop-blur-sm relative overflow-hidden rounded-md hover:border-primary/20">
                            <CardHeader className="pb-4 pt-6 px-8">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="text-xl font-display font-bold group-hover:text-primary transition-colors tracking-tight">
                                            {room.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                            <div className="h-5 w-5 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">
                                                {room.counterparty.charAt(0)}
                                            </div>
                                            con <span className="text-foreground/80 font-bold">{room.counterparty}</span>
                                        </div>
                                    </div>
                                    <Badge className={cn(
                                        "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border-0 shadow-lg",
                                        room.status === 'active'
                                            ? "bg-emerald-500/10 text-emerald-500 shadow-emerald-500/10"
                                            : "bg-amber-500/10 text-amber-500 shadow-amber-500/10"
                                    )}>
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full mr-2 animate-pulse",
                                            room.status === 'active' ? "bg-emerald-500" : "bg-amber-500"
                                        )} />
                                        {room.status === 'active' ? 'Activa' : 'Pendiente'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pb-8 px-8">
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 font-medium text-muted-foreground/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                                        <MessageSquare className="h-4 w-4 text-primary/70" />
                                        <span className="text-foreground/90 font-bold">{room.messages}</span> mensajes
                                    </div>
                                    <div className="flex items-center gap-2 font-medium text-muted-foreground/80 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                                        <Clock className="h-4 w-4 text-primary/70" />
                                        Última actividad: <span className="text-foreground/90 font-bold">{room.lastActivity}</span>
                                    </div>
                                    <div className="ml-auto flex items-center gap-2 text-primary font-bold transition-all group-hover:translate-x-1">
                                        Entrar a la sala
                                        <Plus className="h-4 w-4 rotate-45" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {mockDealRooms.length === 0 && (
                <Card className="border-dashed border-2 border-white/10 bg-transparent rounded-md">
                    <CardContent className="py-24 text-center space-y-4">
                        <div className="h-20 w-20 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FolderOpen className="h-10 w-10 text-muted-foreground/40" />
                        </div>
                        <h3 className="text-2xl font-display font-bold">No hay negociaciones activas</h3>
                        <p className="text-muted-foreground max-w-xs mx-auto">
                            Comienza una nueva negociación directa o responde a un RFP para abrir una Deal Room.
                        </p>
                        <Button className="mt-8 rounded-md h-14 px-8 font-bold text-lg bg-primary shadow-xl shadow-primary/20">
                            Crear primera Deal Room
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
