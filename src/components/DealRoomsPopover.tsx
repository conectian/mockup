import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Handshake } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

const mockDealRooms = [
    {
        id: 1,
        client: 'Ayuntamiento de Madrid',
        project: 'Proyecto SmartCity',
        time: 'Hace 15 min',
        unread: true,
    },
    {
        id: 2,
        client: 'Global Industries',
        project: 'Migración Cloud 2026',
        time: 'Hace 2 horas',
        unread: true,
    }
];

export default function DealRoomsPopover() {
    const [dealRooms] = useState(mockDealRooms);
    const unreadCount = dealRooms.filter((dr) => dr.unread).length;
    const { userType } = useAuthStore();

    const linkTo = userType === 'provider' ? '/provider/deal-rooms?tab=dealrooms' : '/client/deal-rooms?tab=dealrooms';

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-0">
                    <Handshake className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-1 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-background">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 overflow-hidden" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border bg-muted/20">
                    <h4 className="font-semibold text-sm">Nuevas Deal Rooms</h4>
                    <Link to={linkTo} className="text-[11px] text-primary hover:underline font-medium">
                        Ver todas
                    </Link>
                </div>
                <ScrollArea className="max-h-[300px]">
                    <div className="divide-y divide-border">
                        {dealRooms.map((dr) => (
                            <Link
                                to={`/deal-room/${dr.id}`}
                                key={dr.id}
                                className="p-4 hover:bg-muted/50 transition-all flex items-start gap-3 group"
                            >
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Handshake className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm">
                                        Nueva negociación con <span className="font-bold">{dr.client}</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                        Proyecto: {dr.project}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1 italic">
                                        {dr.time}
                                    </p>
                                </div>
                                {dr.unread && (
                                    <div className="h-2 w-2 rounded-full bg-blue-600 shrink-0 mt-1" />
                                )}
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="p-2 border-t border-border text-center bg-muted/5">
                    <Link to={linkTo} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Gestionar todas las salas
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}
