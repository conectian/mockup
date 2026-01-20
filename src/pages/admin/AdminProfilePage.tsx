import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Edit3,
    Camera,
    CheckCircle2,
    Clock,
    User,
    Settings,
    Key,
    Activity,
    Bell,
    FileText,
    Coins,
    Check,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminProfilePage() {
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl || 'profile');

    // Sync activeTab with URL search params
    useEffect(() => {
        if (tabFromUrl && ['profile', 'security', 'activity', 'notifications'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);

    const handleSave = () => {
        toast.success('Perfil actualizado correctamente');
    };

    // Mock admin profile data
    const profile = {
        name: 'Admin User',
        role: 'System Administrator',
        company: 'Conectian Admin',
        email: 'admin@conectian.com',
        phone: '+34 600 123 456',
        location: 'Madrid, España',
        joinedAt: 'Enero 2026',
        verified: true,
    };

    // Admin stats
    const adminStats = [
        { label: 'Total Usuarios', value: '1,247', change: '+12%', color: 'text-blue-500' },
        { label: 'Deal Rooms Activos', value: '89', change: '+5%', color: 'text-emerald-500' },
        { label: 'Transacciones Hoy', value: '€24,500', change: '+18%', color: 'text-amber-500' },
        { label: 'Incidencias Abiertas', value: '3', change: '-2', color: 'text-red-500' },
    ];

    // Mock Notification Data
    const initialNotifications = [
        {
            id: 1,
            title: 'Nueva solicitud de verificación',
            desc: 'TechSolutions AI ha solicitado verificación de cuenta',
            time: 'Hace 10 min',
            read: false,
            icon: FileText,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            link: '/admin/users',
            type: 'verification'
        },
        {
            id: 2,
            title: 'Transacción sospechosa detectada',
            desc: 'Se ha detectado actividad inusual en la cuenta #1247',
            time: 'Hace 1 hora',
            read: false,
            icon: Coins,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            link: '/admin/monitoring',
            type: 'security'
        },
        {
            id: 3,
            title: 'Actualización del sistema completada',
            desc: 'La versión 2.4.1 se ha instalado correctamente',
            time: 'Hace 3 horas',
            read: true,
            icon: Check,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            link: '/admin/settings',
            type: 'system'
        },
        {
            id: 4,
            title: 'Nuevo contenido para revisar',
            desc: '5 casos de uso pendientes de aprobación',
            time: 'Ayer',
            read: true,
            icon: FileText,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            link: '/admin/content',
            type: 'content'
        },
        {
            id: 5,
            title: 'Reporte mensual disponible',
            desc: 'El reporte financiero de Enero está listo',
            time: 'Hace 2 días',
            read: true,
            icon: FileText,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            link: '/admin/finances',
            type: 'report'
        }
    ];

    const [notifications, setNotifications] = useState(initialNotifications);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        toast.success('Todas las notificaciones marcadas como leídas');
    };

    const handleNotificationClick = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
                            Panel de Administración
                        </h1>
                        <p className="text-muted-foreground text-lg mt-1">
                            Gestiona tu perfil y configuraciones de administrador
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Último acceso: hoy</span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {adminStats.map((stat, index) => (
                        <Card key={index} className="border-white/5">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={cn(
                                            'ml-2',
                                            stat.change.startsWith('+')
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : 'bg-red-500/10 text-red-500'
                                        )}
                                    >
                                        {stat.change}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="p-1 h-auto bg-white/5 border border-white/10 rounded-lg justify-start gap-1 w-fit">
                        <TabsTrigger
                            value="profile"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">Mi Perfil</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="security"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <Shield className="h-4 w-4" />
                            <span className="hidden sm:inline">Seguridad</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="activity"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <Activity className="h-4 w-4" />
                            <span className="hidden sm:inline">Actividad</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <Bell className="h-4 w-4" />
                            <span className="hidden sm:inline">Notificaciones</span>
                            {notifications.some(n => !n.read) && (
                                <Badge className="ml-1 h-2 w-2 p-0 rounded-full bg-red-500 border-0" />
                            )}
                        </TabsTrigger>
                    </TabsList>

                    {/* Mi Perfil Tab */}
                    <TabsContent value="profile" className="mt-6">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Profile Card */}
                            <Card className="lg:col-span-1 border-white/5 rounded-md shadow-sm overflow-hidden">
                                <div className="h-24 relative bg-gradient-to-r from-amber-500 to-orange-600">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="absolute top-2 right-2 h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
                                    >
                                        <Camera className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardContent className="pt-0 -mt-12 text-center">
                                    <Avatar className="h-24 w-24 mx-auto rounded-full shadow-xl border-4 border-background">
                                        <AvatarFallback className="text-2xl font-bold rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                                            {profile.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="mt-4 space-y-2">
                                        <h2 className="text-xl font-display font-bold">{profile.name}</h2>
                                        <p className="text-sm text-muted-foreground">{profile.role}</p>
                                        <div className="flex items-center justify-center gap-2">
                                            {profile.verified && (
                                                <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-full border-0">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    Verificado
                                                </Badge>
                                            )}
                                            <Badge className="gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-full border-0">
                                                <Shield className="h-3 w-3" />
                                                Admin
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="mt-6 space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <span>{profile.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{profile.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>{profile.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Miembro desde {profile.joinedAt}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Edit Form */}
                            <Card className="lg:col-span-2 border-white/5 rounded-md shadow-sm">
                                <CardHeader className="px-8 pt-8">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
                                                <Edit3 className="h-5 w-5 text-primary" />
                                                Editar Información Personal
                                            </CardTitle>
                                            <CardDescription>Actualiza tus datos de contacto</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-8 pb-8 space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60"
                                            >
                                                Nombre Completo
                                            </Label>
                                            <Input
                                                id="name"
                                                defaultValue={profile.name}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="role"
                                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60"
                                            >
                                                Cargo
                                            </Label>
                                            <Input
                                                id="role"
                                                defaultValue={profile.role}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={profile.email}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="phone"
                                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60"
                                            >
                                                Teléfono
                                            </Label>
                                            <Input
                                                id="phone"
                                                defaultValue={profile.phone}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label
                                                htmlFor="location"
                                                className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60"
                                            >
                                                Ubicación
                                            </Label>
                                            <Input
                                                id="location"
                                                defaultValue={profile.location}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Shield className="h-4 w-4 text-emerald-500" />
                                            <span>Tu información está protegida</span>
                                        </div>
                                        <Button
                                            onClick={handleSave}
                                            className="h-11 px-8 premium-gradient hover:opacity-90 font-bold rounded-md shadow-lg shadow-indigo-500/20 text-white"
                                        >
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Security Tab */}
                    <TabsContent value="security" className="mt-6">
                        <div className="grid gap-6">
                            {/* Account Security */}
                            <Card className="border-white/5 rounded-md shadow-sm">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Seguridad de la Cuenta
                                    </CardTitle>
                                    <CardDescription>
                                        Gestiona la seguridad y accesos de tu cuenta de administrador
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">Contraseña</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Última actualización hace 30 días
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="font-bold rounded-md border-white/10"
                                                >
                                                    Cambiar
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">Autenticación 2FA</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Añade una capa extra de seguridad
                                                    </p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="font-bold rounded-md border-white/10"
                                                >
                                                    Activar
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">API Keys</h4>
                                                    <p className="text-sm text-muted-foreground">Gestiona claves de API</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="font-bold rounded-md border-white/10"
                                                >
                                                    <Key className="h-4 w-4 mr-2" />
                                                    Ver
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">Sesiones Activas</h4>
                                                    <p className="text-sm text-muted-foreground">3 dispositivos conectados</p>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="font-bold rounded-md border-white/10"
                                                >
                                                    Gestionar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Admin Permissions */}
                            <Card className="border-white/5 rounded-md shadow-sm">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
                                        <Settings className="h-5 w-5 text-primary" />
                                        Permisos de Administrador
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Gestión de Usuarios', enabled: true },
                                            { name: 'Gestión de Contenido', enabled: true },
                                            { name: 'Gestión Financiera', enabled: true },
                                            { name: 'Configuración del Sistema', enabled: true },
                                            { name: 'Monitoreo de Plataforma', enabled: true },
                                        ].map((permission, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between p-4 rounded-md bg-muted/30 border border-white/5"
                                            >
                                                <span className="font-medium">{permission.name}</span>
                                                <Badge
                                                    variant={permission.enabled ? 'default' : 'secondary'}
                                                    className={
                                                        permission.enabled
                                                            ? 'bg-emerald-500/10 text-emerald-500'
                                                            : ''
                                                    }
                                                >
                                                    {permission.enabled ? 'Activo' : 'Inactivo'}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Activity Tab */}
                    <TabsContent value="activity" className="mt-6">
                        <Card className="border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    Actividad Reciente
                                </CardTitle>
                                <CardDescription>Registro de acciones realizadas en la plataforma</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        {
                                            action: 'Actualización de usuario',
                                            desc: 'Verificaste la cuenta de TechSolutions AI',
                                            time: 'Hace 2 horas',
                                            type: 'user',
                                        },
                                        {
                                            action: 'Configuración modificada',
                                            desc: 'Actualizaste las tasas de comisión',
                                            time: 'Hace 5 horas',
                                            type: 'settings',
                                        },
                                        {
                                            action: 'Contenido revisado',
                                            desc: 'Aprobaste 3 nuevos casos de uso',
                                            time: 'Ayer',
                                            type: 'content',
                                        },
                                        {
                                            action: 'Reporte generado',
                                            desc: 'Descargaste el reporte financiero mensual',
                                            time: 'Hace 2 días',
                                            type: 'report',
                                        },
                                        {
                                            action: 'Usuario suspendido',
                                            desc: 'Suspendiste temporalmente la cuenta de Example Corp',
                                            time: 'Hace 3 días',
                                            type: 'user',
                                        },
                                    ].map((activity, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 p-4 rounded-md bg-muted/30 border border-white/5"
                                        >
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Activity className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-semibold">{activity.action}</h4>
                                                <p className="text-sm text-muted-foreground">{activity.desc}</p>
                                                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="justify-center border-t border-white/5">
                                <Button variant="outline">Ver Historial Completo</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="mt-6">
                        <Card className="border-white/5">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Bell className="h-5 w-5 text-primary" />
                                        Mis Notificaciones
                                    </CardTitle>
                                    <CardDescription>Mantente al día con las alertas del sistema.</CardDescription>
                                </div>
                                {notifications.some(n => !n.read) && (
                                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                                        Marcar todas como leídas
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-white/5">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div 
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification.id)}
                                                className={cn(
                                                    "p-4 md:p-6 flex items-start gap-4 transition-colors cursor-pointer hover:bg-white/5",
                                                    !notification.read ? "bg-primary/5" : ""
                                                )}
                                            >
                                                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", notification.bg, notification.color)}>
                                                    <notification.icon className="h-5 w-5" />
                                                </div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div>
                                                            <h4 className={cn("text-sm font-semibold", !notification.read ? "text-foreground" : "text-muted-foreground")}>
                                                                {notification.title}
                                                                {!notification.read && (
                                                                    <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-500 border-none h-5 px-1.5 text-[10px]">
                                                                        NUEVA
                                                                    </Badge>
                                                                )}
                                                            </h4>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {notification.desc}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                                {notification.time}
                                                            </span>
                                                            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-12 text-center">
                                            <Bell className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                                            <h3 className="text-lg font-medium">No tienes notificaciones</h3>
                                            <p className="text-muted-foreground mt-2">Te avisaremos cuando haya novedades importantes.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

