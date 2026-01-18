import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    MessageSquare,
    Search,
    Send,
    Clock,
    CheckCheck,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const conversations = [
    {
        id: 1,
        participants: ['Logistics Pro', 'FinanceBot AI'],
        lastMessage: 'Perfecto, agendamos la demo para el jueves entonces.',
        time: 'Hace 5 min',
        unread: 2,
        status: 'active',
        dealRoom: 'Deal #1234',
        messages: [
            { from: 'Logistics Pro', text: 'Buenos días, ¿tienen disponibilidad para una demo esta semana?', time: '10:30' },
            { from: 'FinanceBot AI', text: '¡Hola! Sí, podemos agendar para jueves o viernes. ¿Qué os viene mejor?', time: '10:35' },
            { from: 'Logistics Pro', text: 'Perfecto, agendamos la demo para el jueves entonces.', time: '10:40' },
        ]
    },
    {
        id: 2,
        participants: ['Retail Master', 'TechSolutions Inc'],
        lastMessage: 'Necesitamos revisar el contrato antes de firmar...',
        time: 'Hace 15 min',
        unread: 0,
        status: 'active',
        dealRoom: 'Deal #1198',
        messages: [
            { from: 'Retail Master', text: 'Hemos recibido el contrato, gracias.', time: '09:15' },
            { from: 'TechSolutions Inc', text: 'Perfecto. ¿Tenéis alguna duda sobre las condiciones?', time: '09:20' },
            { from: 'Retail Master', text: 'Necesitamos revisar el contrato antes de firmar...', time: '09:45' },
        ]
    },
    {
        id: 3,
        participants: ['Startup Nova', 'DataSecure Ltd'],
        lastMessage: '¿Podéis enviar el certificado ISO actualizado?',
        time: 'Hace 1h',
        unread: 1,
        status: 'pending',
        dealRoom: 'Deal #1156',
        messages: [
            { from: 'Startup Nova', text: 'Estamos interesados en la solución de seguridad avanzada.', time: '08:00' },
            { from: 'DataSecure Ltd', text: 'Genial, os adjunto la documentación técnica.', time: '08:30' },
            { from: 'Startup Nova', text: '¿Podéis enviar el certificado ISO actualizado?', time: '09:00' },
        ]
    },
    {
        id: 4,
        participants: ['Global Trade SA', 'InnovateTech'],
        lastMessage: 'Confirmado, el presupuesto está aprobado por dirección.',
        time: 'Hace 3h',
        unread: 0,
        status: 'active',
        dealRoom: 'Deal #1089',
        messages: [
            { from: 'InnovateTech', text: 'Os enviamos el presupuesto actualizado con el descuento.', time: '06:00' },
            { from: 'Global Trade SA', text: 'Confirmado, el presupuesto está aprobado por dirección.', time: '07:30' },
        ]
    },
];

export default function AdminMessagesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConversation, setSelectedConversation] = useState<typeof conversations[0] | null>(null);
    const [replyText, setReplyText] = useState('');

    const filteredConversations = conversations.filter(conv =>
        conv.participants.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
        conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendReply = () => {
        if (!replyText.trim()) return;
        toast.success('Mensaje enviado como moderador');
        setReplyText('');
    };

    const stats = {
        total: conversations.length,
        active: conversations.filter(c => c.status === 'active').length,
        unread: conversations.reduce((sum, c) => sum + c.unread, 0),
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Mensajes</h1>
                    <p className="text-muted-foreground text-lg">Monitorea conversaciones en Deal Rooms activas</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Última actualización: ahora</span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                <Card className="border-0 bg-gradient-to-br from-violet-400/20 via-violet-500/10 to-transparent rounded-md shadow-xl shadow-violet-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <MessageSquare className="h-12 w-12 md:h-16 md:w-16 text-violet-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400/70 mb-1 md:mb-2">Conversaciones</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-violet-700 dark:text-violet-400">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent rounded-md shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <CheckCheck className="h-12 w-12 md:h-16 md:w-16 text-emerald-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/70 mb-1 md:mb-2">Activas Hoy</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent rounded-md shadow-xl shadow-amber-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <AlertCircle className="h-12 w-12 md:h-16 md:w-16 text-amber-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400/70 mb-1 md:mb-2">Sin Leer</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-amber-700 dark:text-amber-400">{stats.unread}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar conversaciones..."
                    className="pl-10 h-11 bg-muted/30 border-white/10 rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Conversations List */}
            <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                <CardHeader className="px-8 pt-8">
                    <div className="space-y-1">
                        <CardTitle className="text-xl font-display font-bold">Conversaciones Recientes</CardTitle>
                        <p className="text-sm text-muted-foreground">Haz clic en una conversación para ver el historial</p>
                    </div>
                </CardHeader>
                <CardContent className="px-8 pb-8 space-y-2">
                    {filteredConversations.map((conv) => (
                        <div
                            key={conv.id}
                            className="flex items-start gap-3 md:gap-4 p-4 rounded-md hover:bg-muted/30 transition-all duration-200 cursor-pointer border border-transparent hover:border-white/5 group"
                            onClick={() => setSelectedConversation(conv)}
                        >
                            <Avatar className="h-10 w-10 md:h-12 md:w-12 rounded-md shadow-sm shrink-0 mt-1 md:mt-0">
                                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-bold rounded-md">
                                    {conv.participants[0].charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <span className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                                            {conv.participants[0]}
                                        </span>
                                        <ArrowRight className="h-3 w-3 text-muted-foreground/40 shrink-0" />
                                        <span className="font-bold text-sm truncate group-hover:text-primary transition-colors">
                                            {conv.participants[1]}
                                        </span>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] md:text-xs bg-white/5 border-white/10 font-bold w-fit">
                                        {conv.dealRoom}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>

                                {/* Mobile-only time and unread info */}
                                <div className="flex items-center justify-between mt-2 md:hidden">
                                    <div className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {conv.time}
                                    </div>
                                    {conv.unread > 0 && (
                                        <Badge className="bg-primary hover:bg-primary font-bold rounded-full px-2 h-5 min-w-[20px] text-[10px] flex items-center justify-center">
                                            {conv.unread}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Desktop-only info and arrow */}
                            <div className="hidden md:flex flex-col items-end shrink-0 gap-1.5 ml-2">
                                <div className="text-xs text-muted-foreground/60 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {conv.time}
                                </div>
                                {conv.unread > 0 && (
                                    <Badge className="bg-primary hover:bg-primary font-bold rounded-full px-2 h-5 min-w-[20px] flex items-center justify-center">
                                        {conv.unread}
                                    </Badge>
                                )}
                            </div>
                            <ArrowRight className="hidden md:block h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-3" />
                        </div>
                    ))}

                    {filteredConversations.length === 0 && (
                        <div className="text-center py-16">
                            <MessageSquare className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-display font-bold mb-2">No hay conversaciones</h3>
                            <p className="text-muted-foreground">
                                No se encontraron mensajes con ese criterio
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Conversation Detail Sheet */}
            <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
                <SheetContent className="w-full sm:max-w-lg glass-card p-0 flex flex-col border-white/10 shadow-2xl">
                    {selectedConversation && (
                        <>
                            <div className="p-6 border-b border-white/5 bg-muted/20 backdrop-blur-md">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 rounded-md shadow-lg ring-2 ring-white/5">
                                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-white font-bold rounded-md">
                                            {selectedConversation.participants[0].charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <SheetTitle className="text-xl font-display font-bold truncate leading-tight">
                                            {selectedConversation.participants.join(' ↔ ')}
                                        </SheetTitle>
                                        <SheetDescription className="text-primary font-bold text-xs mt-0.5">
                                            {selectedConversation.dealRoom}
                                        </SheetDescription>
                                    </div>
                                </div>
                            </div>

                            <ScrollArea className="flex-1 px-6 bg-slate-50/50 dark:bg-slate-950/20">
                                <div className="py-8 space-y-6">
                                    {selectedConversation.messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "flex flex-col max-w-[85%]",
                                                msg.from === selectedConversation.participants[0] ? 'items-start' : 'items-end ml-auto'
                                            )}
                                        >
                                            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/40 mb-1.5 px-1">
                                                {msg.from} · {msg.time}
                                            </div>
                                            <div
                                                className={cn(
                                                    "p-3.5 rounded-md shadow-sm border transition-shadow",
                                                    msg.from === selectedConversation.participants[0]
                                                        ? 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-white/5 rounded-bl-none text-zinc-800 dark:text-zinc-200'
                                                        : 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-violet-500/20 rounded-br-none shadow-lg shadow-violet-500/20'
                                                )}
                                            >
                                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="p-6 bg-muted/30 border-t border-white/5 backdrop-blur-sm">
                                <div className="flex gap-3">
                                    <Textarea
                                        placeholder="Enviar mensaje como moderador..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={2}
                                        className="resize-none bg-background/50 border-white/10 rounded-md focus:ring-primary/20 transition-all text-sm"
                                    />
                                    <Button
                                        onClick={handleSendReply}
                                        className="shrink-0 h-12 w-12 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-violet-500/20"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 mt-3 text-muted-foreground/60">
                                    <AlertCircle className="h-3 w-3" />
                                    <p className="text-[10px] font-medium tracking-wide">
                                        LOS MENSAJES DE MODERADOR SE MARCARÁN COMO OFICIALES
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
