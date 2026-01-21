import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Bell,
    CheckCircle,
    AlertCircle,
    Info,
    Sparkles,
    Check,
    Trash2,
    Settings,
    Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type NotificationType = 'success' | 'warning' | 'info' | 'update';

interface Notification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    date: string;
    read: boolean;
    link?: string;
}

const allNotifications: Notification[] = [
    {
        id: 1,
        type: 'success',
        title: 'Nueva propuesta aceptada',
        message: 'Tu propuesta para "Automatización IA" ha sido aceptada por TechCorp. El Deal Room está ahora disponible.',
        time: 'Hace 5 min',
        date: 'Hoy',
        read: false,
        link: '/deal-room/dr-001'
    },
    {
        id: 3,
        type: 'info',
        title: 'Nuevo lead disponible',
        message: 'Un cliente Fortune 500 busca soluciones de "Blockchain para Supply Chain". Presupuesto: €150k+',
        time: 'Hace 1 hora',
        date: 'Hoy',
        read: false,
        link: '/provider/marketplace?tab=rfip'
    },
    {
        id: 4,
        type: 'warning',
        title: 'Pago pendiente',
        message: 'Tienes una factura pendiente de €1,200 correspondiente a la comisión del Deal Room DR-003.',
        time: 'Hace 2 horas',
        date: 'Hoy',
        read: true,
        link: '/provider/payments'
    },
    {
        id: 5,
        type: 'success',
        title: 'Verificación completada',
        message: 'Tu cuenta ha sido verificada exitosamente. Ahora tienes acceso completo a todas las funcionalidades.',
        time: '10:30',
        date: 'Ayer',
        read: true,
        link: '/provider/profile'
    },
    {
        id: 6,
        type: 'update',
        title: 'Mensaje nuevo en Deal Room',
        message: 'María González te ha enviado un mensaje en el Deal Room "Proyecto Analytics".',
        time: '15:45',
        date: 'Ayer',
        read: true,
        link: '/deal-room/dr-004?view=chat'
    },
    {
        id: 7,
        type: 'info',
        title: 'Nuevo caso de uso destacado',
        message: 'Tu caso de uso "IA Predictiva" ha sido seleccionado como destacado del mes.',
        time: '09:20',
        date: '2 días',
        read: true,
    },
    {
        id: 8,
        type: 'success',
        title: 'Deal Room cerrado exitosamente',
        message: 'El Deal Room #DR-005 se ha cerrado exitosamente. ¡Felicitaciones!',
        time: '14:15',
        date: '3 días',
        read: true,
        link: '/deal-room/dr-005'
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

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(allNotifications);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        toast.success('Todas las notificaciones marcadas como leídas');
    };

    const markAsRead = (id: number) => {
        setNotifications(notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const deleteNotification = (id: number) => {
        setNotifications(notifications.filter((n) => n.id !== id));
        toast.success('Notificación eliminada');
    };

    const deleteAll = () => {
        setNotifications([]);
        toast.success('Todas las notificaciones eliminadas');
    };

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter((n) => !n.read)
        : notifications;

    // Group notifications by date
    const groupedNotifications = filteredNotifications.reduce((groups, notification) => {
        const date = notification.date;
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(notification);
        return groups;
    }, {} as Record<string, Notification[]>);

    return (
        <div className="space-y-6 pb-20 md:pb-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight">Notificaciones</h1>
                    <p className="text-muted-foreground mt-1">
                        Mantente al día con todas tus actualizaciones
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={markAllRead}
                        disabled={unreadCount === 0}
                    >
                        <Check className="h-4 w-4" />
                        Marcar todas como leídas
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0"
                    >
                        <Settings className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-white/5">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-2xl font-bold">{notifications.length}</p>
                            </div>
                            <Bell className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">No leídas</p>
                                <p className="text-2xl font-bold text-primary">{unreadCount}</p>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bell className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Esta semana</p>
                                <p className="text-2xl font-bold">{notifications.length}</p>
                            </div>
                            <Sparkles className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-white/5">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Importantes</p>
                                <p className="text-2xl font-bold">
                                    {notifications.filter(n => n.type === 'warning' || n.type === 'success').length}
                                </p>
                            </div>
                            <AlertCircle className="h-8 w-8 text-muted-foreground/30" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs and Content */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'all' | 'unread')}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <TabsList className="p-1 h-auto bg-white/5 border border-white/10 rounded-lg">
                        <TabsTrigger
                            value="all"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            Todas
                            <Badge variant="secondary" className="bg-white/10 text-xs">
                                {notifications.length}
                            </Badge>
                        </TabsTrigger>
                        <TabsTrigger
                            value="unread"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            No leídas
                            {unreadCount > 0 && (
                                <Badge className="bg-primary text-xs">
                                    {unreadCount}
                                </Badge>
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {notifications.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                            onClick={deleteAll}
                        >
                            <Trash2 className="h-4 w-4" />
                            Eliminar todas
                        </Button>
                    )}
                </div>

                <TabsContent value={activeTab} className="mt-0">
                    <Card className="border-white/5">
                        <CardContent className="p-0">
                            {Object.keys(groupedNotifications).length > 0 ? (
                                <div>
                                    {Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
                                        <div key={date} className="border-b border-white/5 last:border-0">
                                            <div className="px-6 py-3 bg-muted/20 border-b border-white/5">
                                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                                    {date}
                                                </h3>
                                            </div>
                                            <div className="divide-y divide-white/5">
                                                {dateNotifications.map((notification) => {
                                                    const config = notificationConfig[notification.type];
                                                    const Icon = config.icon;

                                                    const content = (
                                                        <div
                                                            className={cn(
                                                                "p-6 hover:bg-muted/20 transition-colors flex gap-4 group",
                                                                !notification.read && "bg-muted/10"
                                                            )}
                                                        >
                                                            <div className={cn(
                                                                "h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border",
                                                                config.bg,
                                                                config.border
                                                            )}>
                                                                <Icon className={cn("h-5 w-5", config.color)} />
                                                            </div>
                                                            <div className="flex-1 space-y-2 min-w-0">
                                                                <div className="flex items-start justify-between gap-4">
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className={cn(
                                                                            "text-base leading-tight mb-1",
                                                                            !notification.read && "font-bold"
                                                                        )}>
                                                                            {notification.title}
                                                                        </h4>
                                                                        <p className="text-sm text-muted-foreground">
                                                                            {notification.message}
                                                                        </p>
                                                                    </div>
                                                                    {!notification.read && (
                                                                        <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                                                    )}
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs text-muted-foreground/70 font-medium">
                                                                        {notification.time}
                                                                    </span>
                                                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        {!notification.read && (
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="h-8 gap-1.5 text-xs"
                                                                                onClick={(e) => {
                                                                                    e.preventDefault();
                                                                                    markAsRead(notification.id);
                                                                                }}
                                                                            >
                                                                                <Check className="h-3 w-3" />
                                                                                Marcar como leída
                                                                            </Button>
                                                                        )}
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                deleteNotification(notification.id);
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-3 w-3" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );

                                                    return notification.link ? (
                                                        <Link
                                                            to={notification.link}
                                                            key={notification.id}
                                                            onClick={() => markAsRead(notification.id)}
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
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-16 text-center">
                                    <div className="inline-flex p-4 rounded-full bg-muted/20 mb-4">
                                        <Bell className="h-12 w-12 text-muted-foreground/30" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">No hay notificaciones</h3>
                                    <p className="text-muted-foreground">
                                        {activeTab === 'unread'
                                            ? 'No tienes notificaciones sin leer'
                                            : 'Todas tus notificaciones aparecerán aquí'}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

