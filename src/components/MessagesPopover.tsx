import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const mockMessages = [
    {
        id: 1,
        sender: 'Juan Pérez',
        preview: '¿Podemos agendar una llamada para revisar la propuesta?',
        time: 'Hace 10 min',
        read: false,
        avatar: 'JP',
        color: 'bg-blue-500',
        dealRoomId: 'dr-001'
    },
    {
        id: 2,
        sender: 'Ana García',
        preview: 'He subido los documentos solicitados al Deal Room.',
        time: 'Hace 1 hora',
        read: false,
        avatar: 'AG',
        color: 'bg-emerald-500',
        dealRoomId: 'dr-002'
    },
    {
        id: 3,
        sender: 'Soporte Conectian',
        preview: 'Tu ticket #1234 ha sido resuelto.',
        time: 'Ayer',
        read: true,
        avatar: 'SC',
        color: 'bg-indigo-500',
        dealRoomId: 'dr-003'
    },
];

export default function MessagesPopover() {
    const [messages, setMessages] = useState(mockMessages);
    const unreadCount = messages.filter((m) => !m.read).length;
    const { userType } = useAuthStore();

    const markAllRead = () => {
        setMessages(messages.map((m) => ({ ...m, read: true })));
    };

    const getLink = (msg: typeof mockMessages[0]) => {
        if (msg.dealRoomId) {
            return `/deal-room/${msg.dealRoomId}?view=chat`;
        }
        return userType === 'provider' ? '/provider/deal-rooms?tab=dealrooms' : '/client/deal-rooms?tab=dealrooms';
    };

    const viewAllLink = userType === 'provider' ? '/provider/deal-rooms?tab=dealrooms' : '/client/deal-rooms?tab=dealrooms';

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground hover:bg-accent">
                    <MessageSquare className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-background">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h4 className="font-semibold">Mensajes</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto py-1"
                            onClick={markAllRead}
                        >
                            Marcar leídos
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {messages.length > 0 ? (
                        <div className="divide-y divide-border">
                            {messages.map((msg) => (
                                <Link
                                    to={getLink(msg)}
                                    key={msg.id}
                                    className={`p-4 hover:bg-muted/50 transition-colors flex gap-3 cursor-pointer ${!msg.read ? 'bg-muted/20' : ''}`}
                                >
                                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${msg.color}`}>
                                        {msg.avatar}
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-sm ${!msg.read ? 'font-medium' : ''}`}>
                                                {msg.sender}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground whitespace-nowrap ml-2">
                                                {msg.time}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {msg.preview}
                                        </p>
                                    </div>
                                    {!msg.read && (
                                        <div className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                                    )}
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No tienes mensajes nuevos</p>
                        </div>
                    )}
                </ScrollArea>
                <div className="p-2 border-t border-border text-center">
                    <Link to={viewAllLink} className="text-xs text-primary hover:underline">
                        Ver todos los mensajes
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}
