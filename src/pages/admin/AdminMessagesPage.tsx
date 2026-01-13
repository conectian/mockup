import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
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
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Mensajes</h1>
                <p className="text-muted-foreground">Monitorea conversaciones en Deal Rooms activas</p>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-sm">Conversaciones</span>
                        </div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <CheckCheck className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm">Activas Hoy</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">Sin Leer</span>
                        </div>
                        <div className="text-2xl font-bold text-amber-600">{stats.unread}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Buscar conversaciones..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Conversations List */}
            <Card>
                <CardHeader>
                    <CardTitle>Conversaciones Recientes</CardTitle>
                    <CardDescription>Haz clic en una conversación para ver el historial</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {filteredConversations.map((conv) => (
                        <div
                            key={conv.id}
                            className="flex items-center gap-4 p-4 rounded-md hover:bg-muted/50 transition-colors cursor-pointer border"
                            onClick={() => setSelectedConversation(conv)}
                        >
                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold shrink-0">
                                {conv.participants[0].charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm">
                                        {conv.participants[0]}
                                    </span>
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    <span className="font-semibold text-sm">
                                        {conv.participants[1]}
                                    </span>
                                    <Badge variant="outline" className="text-xs ml-auto">
                                        {conv.dealRoom}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {conv.time}
                                </div>
                                {conv.unread > 0 && (
                                    <Badge className="mt-1 bg-primary">{conv.unread}</Badge>
                                )}
                            </div>
                        </div>
                    ))}

                    {filteredConversations.length === 0 && (
                        <div className="text-center py-12">
                            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No hay conversaciones</h3>
                            <p className="text-muted-foreground">
                                No se encontraron mensajes con ese criterio
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Conversation Detail Sheet */}
            <Sheet open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
                <SheetContent className="w-full sm:max-w-lg">
                    {selectedConversation && (
                        <>
                            <SheetHeader className="pb-4 border-b">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                                        {selectedConversation.participants[0].charAt(0)}
                                    </div>
                                    <div>
                                        <SheetTitle className="text-lg">
                                            {selectedConversation.participants.join(' ↔ ')}
                                        </SheetTitle>
                                        <SheetDescription>
                                            {selectedConversation.dealRoom}
                                        </SheetDescription>
                                    </div>
                                </div>
                            </SheetHeader>

                            <ScrollArea className="h-[calc(100vh-280px)] py-4">
                                <div className="space-y-4">
                                    {selectedConversation.messages.map((msg, i) => (
                                        <div
                                            key={i}
                                            className={`flex flex-col ${msg.from === selectedConversation.participants[0] ? 'items-start' : 'items-end'}`}
                                        >
                                            <div className="text-xs text-muted-foreground mb-1">
                                                {msg.from} · {msg.time}
                                            </div>
                                            <div
                                                className={`max-w-[80%] p-3 rounded-md ${msg.from === selectedConversation.participants[0]
                                                    ? 'bg-muted rounded-bl-none'
                                                    : 'bg-primary text-primary-foreground rounded-br-none'
                                                    }`}
                                            >
                                                <p className="text-sm">{msg.text}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="pt-4 border-t">
                                <div className="flex gap-2">
                                    <Textarea
                                        placeholder="Enviar mensaje como moderador..."
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        rows={2}
                                        className="resize-none"
                                    />
                                    <Button
                                        onClick={handleSendReply}
                                        className="shrink-0 bg-gradient-to-r from-violet-600 to-indigo-600"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    Los mensajes de moderador aparecerán marcados en la conversación
                                </p>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
