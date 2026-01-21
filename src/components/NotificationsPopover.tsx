import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

type NotificationType = 'success' | 'warning' | 'info' | 'update';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    link?: string;
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'success',
        title: 'Nueva propuesta aceptada',
        message: 'Tu propuesta para "Automatización IA" ha sido aceptada',
        time: 'Hace 5 min',
        read: false,
        link: '/deal-room/dr-001'
    },
    {
        id: 3,
        type: 'info',
        title: 'Nuevo lead disponible',
        message: 'Un cliente busca soluciones de "Blockchain para Supply Chain"',
        time: 'Hace 1 hora',
        read: false,
        link: '/provider/marketplace?tab=rfip'
    },
    {
        id: 4,
        type: 'warning',
        title: 'Pago pendiente',
        message: 'Tienes una factura pendiente de €1,200',
        time: 'Hace 2 horas',
        read: true,
        link: '/provider/payments'
    },
    {
        id: 5,
        type: 'success',
        title: 'Verificación completada',
        message: 'Tu cuenta ha sido verificada exitosamente',
        time: 'Ayer',
        read: true,
        link: '/provider/profile'
    },
];

const notificationConfig = {
    success: {
        icon: CheckCircle,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20'
    },
    warning: {
        icon: AlertCircle,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/20'
    },
    info: {
        icon: Info,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/20'
    },
    update: {
        icon: Sparkles,
        color: 'text-violet-500',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/20'
    }
};

export default function NotificationsPopover() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const unreadCount = notifications.filter((n) => !n.read).length;
    const { userType } = useAuthStore();

    const markAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const viewAllLink = userType === 'provider'
        ? '/provider/notifications'
        : userType === 'client'
            ? '/client/notifications'
            : '/admin/notifications';

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background animate-pulse">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0" align="end">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h4 className="font-semibold text-base">Notificaciones</h4>
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-auto py-1 hover:bg-primary/10"
                            onClick={markAllRead}
                        >
                            Marcar todas como leídas
                        </Button>
                    )}
                </div>
                <ScrollArea className="h-[400px]">
                    {notifications.length > 0 ? (
                        <div className="divide-y divide-border">
                            {notifications.map((notification) => {
                                const config = notificationConfig[notification.type];
                                const Icon = config.icon;
                                const content = (
                                    <div
                                        className={cn(
                                            "p-4 hover:bg-muted/50 transition-colors flex gap-3 cursor-pointer",
                                            !notification.read && "bg-muted/20"
                                        )}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className={cn(
                                            "h-9 w-9 rounded-lg flex items-center justify-center shrink-0 border",
                                            config.bg,
                                            config.border
                                        )}>
                                            <Icon className={cn("h-4 w-4", config.color)} />
                                        </div>
                                        <div className="space-y-1 flex-1 overflow-hidden">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={cn(
                                                    "text-sm leading-tight",
                                                    !notification.read && "font-semibold"
                                                )}>
                                                    {notification.title}
                                                </p>
                                                {!notification.read && (
                                                    <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <span className="text-[10px] text-muted-foreground/70 font-medium">
                                                {notification.time}
                                            </span>
                                        </div>
                                    </div>
                                );

                                return notification.link ? (
                                    <Link
                                        to={notification.link}
                                        key={notification.id}
                                    >
                                        {content}
                                    </Link>
                                ) : (
                                    <div key={notification.id}>
                                        {content}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground">
                            <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">No tienes notificaciones nuevas</p>
                        </div>
                    )}
                </ScrollArea>
                <div className="p-3 border-t border-border text-center bg-muted/20">
                    <Link
                        to={viewAllLink}
                        className="text-xs text-primary hover:underline font-medium"
                    >
                        Ver todas las notificaciones
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    );
}

