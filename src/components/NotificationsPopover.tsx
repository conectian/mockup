import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Check, Coins, FileText } from 'lucide-react';
import { useState } from 'react';

const mockNotifications = [
    {
        id: 1,
        title: 'Nueva propuesta recibida',
        desc: 'FinanceBot AI ha enviado una propuesta para "Automatización ERP"',
        time: 'Hace 5 min',
        read: false,
        icon: FileText,
        color: 'text-blue-500',
    },
    {
        id: 2,
        title: 'Saldo de créditos bajo',
        desc: 'Te quedan menos de 20 créditos. Recarga para no perder oportunidades.',
        time: 'Hace 2 horas',
        read: false,
        icon: Coins,
        color: 'text-amber-500',
    },
    {
        id: 3,
        title: 'Cuenta verificada',
        desc: 'Conectian Admin ha verificado tu documentación fiscal.',
        time: 'Ayer',
        read: true,
        icon: Check,
        color: 'text-emerald-500',
    },
];

export default function NotificationsPopover() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-background" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="font-semibold">Notificaciones</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto py-1"
                            onClick={markAllRead}
                        >
                            Marcar leídas
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                        <div className="divide-y">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 hover:bg-muted/50 transition-colors flex gap-3 ${!notification.read ? 'bg-muted/20' : ''}`}
                                >
                                    <div className={`mt-1 ${notification.color}`}>
                                        <notification.icon className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                                            {notification.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {notification.desc}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground pt-1">
                                            {notification.time}
                                        </p>
                                    </div>
                                    {!notification.read && (
                                        <div className="mt-2 h-2 w-2 rounded-full bg-blue-600 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No tienes notificaciones</p>
                        </div>
                    )}
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
