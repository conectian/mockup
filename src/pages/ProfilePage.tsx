import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/useAuthStore';
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
    Building,
    Trophy,
    Users,
    Plus,
    MoreVertical,
    Star,
    Award,
    Target,
    Zap,
    Gift,
    Bell,
    FileText,
    Coins,
    ChevronRight,
    Check,
    Share2,
    Copy,
    ExternalLink
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { userType } = useAuthStore();
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl || 'profile');

    // Sync activeTab with URL search params
    useEffect(() => {
        if (tabFromUrl && ['profile', 'company', 'badges', 'notifications'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);

    const handleSave = () => {
        toast.success('Perfil actualizado correctamente');
    };

    // Mock Notification Data
    const initialNotifications = [
        {
            id: 1,
            title: 'Nueva propuesta recibida',
            desc: 'FinanceBot AI ha enviado una propuesta para "Automatización ERP"',
            time: 'Hace 5 min',
            read: false,
            icon: FileText,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            link: '/deal-room/1',
            type: 'proposal'
        },
        {
            id: 2,
            title: 'Saldo de créditos bajo',
            desc: 'Te quedan menos de 20 créditos. Recarga para no perder oportunidades.',
            time: 'Hace 2 horas',
            read: false,
            icon: Coins,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            link: '/provider/payments',
            type: 'credits'
        },
        {
            id: 3,
            title: 'Cuenta verificada',
            desc: 'Conectian Admin ha verificado tu documentación fiscal.',
            time: 'Ayer',
            read: true,
            icon: Check,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            link: '/provider/profile?tab=profile',
            type: 'system'
        },
        {
            id: 4,
            title: 'Reunión Programada',
            desc: 'El cliente ha aceptado la reunión para el Lunes a las 10:00 AM.',
            time: 'Hace 2 días',
            read: true,
            icon: FileText,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            link: '/deal-room/2',
            type: 'meeting'
        },
        {
            id: 5,
            title: 'Contrato firmado',
            desc: 'Se ha firmado el contrato para el proyecto de Migración Cloud.',
            time: 'Hace 3 días',
            read: true,
            icon: FileText,
            color: 'text-green-500',
            bg: 'bg-green-500/10',
            link: '/deal-room/3',
            type: 'contract'
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

    // Mock profile data
    const profile = {
        name: userType === 'provider' ? 'Carlos Martínez' : userType === 'client' ? 'María López' : 'Admin User',
        role: userType === 'provider' ? 'CEO & Founder' : userType === 'client' ? 'Head of Innovation' : 'System Admin',
        company: userType === 'provider' ? 'TechSolutions AI' : userType === 'client' ? 'Global Industries' : 'Conectian Admin',
        email: userType === 'provider' ? 'carlos@techsolutions.ai' : userType === 'client' ? 'maria@globalind.com' : 'admin@conectian.com',
        phone: '+34 612 345 678',
        website: userType === 'provider' ? 'www.techsolutions.ai' : 'www.globalindustries.com',
        location: 'Madrid, España',
        joinedAt: 'Enero 2026',
        description: userType === 'provider'
            ? 'Somos una empresa líder en soluciones de inteligencia artificial para el sector empresarial. Especializados en automatización de procesos, análisis predictivo y chatbots inteligentes.'
            : 'Compañía multinacional del sector industrial con más de 50 años de experiencia. Buscamos constantemente innovar en nuestros procesos de producción.',
        verified: true,
        tier: userType === 'provider' ? 'Gold' : null,
    };

    // Mock team data
    const teamMembers = [
        { id: 1, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Admin', status: 'Activo', avatar: 'C' },
        { id: 2, name: 'Ana Ruiz', email: 'ana@empresa.com', role: 'Sales', status: 'Activo', avatar: 'A' },
        { id: 3, name: 'Pedro Gomez', email: 'pedro@empresa.com', role: 'Viewer', status: 'Pendiente', avatar: 'P' },
    ];

    // Mock badges data
    const badges = [
        { id: 1, name: 'Early Adopter', description: 'Uno de los primeros en unirse', icon: Star, color: 'text-amber-400', earned: true },
        { id: 2, name: 'Deal Closer', description: 'Cerrar tu primer deal', icon: Target, color: 'text-emerald-400', earned: true },
        { id: 3, name: 'Networker Pro', description: '10+ conexiones activas', icon: Users, color: 'text-blue-400', earned: true },
        { id: 4, name: 'Top Performer', description: 'Top 10% de la plataforma', icon: Trophy, color: 'text-violet-400', earned: false },
        { id: 5, name: 'Innovation Leader', description: '5+ casos de uso publicados', icon: Zap, color: 'text-cyan-400', earned: false },
        { id: 6, name: 'Premium Partner', description: 'Alcanzar nivel Gold', icon: Award, color: 'text-amber-500', earned: userType === 'provider' },
    ];

    const rewards = [
        { id: 1, name: 'Descuento 20% próxima comisión', expires: '31 Ene 2026', claimed: false },
        { id: 2, name: 'Destacar perfil 7 días', expires: '15 Feb 2026', claimed: false },
        { id: 3, name: '50 créditos bonus', expires: 'Canjeado', claimed: true },
    ];

    return (
        <div className="space-y-6">
            {/* Header with Tabs */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Mi Cuenta</h1>
                        <p className="text-muted-foreground text-lg mt-1">Gestiona tu perfil, empresa y recompensas</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Último acceso: hoy</span>
                    </div>
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
                            value="company"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <Building className="h-4 w-4" />
                            <span className="hidden sm:inline">Mi Empresa</span>
                        </TabsTrigger>
                        <TabsTrigger
                            value="badges"
                            className="gap-2 px-4 md:px-6 h-10 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md font-medium"
                        >
                            <Trophy className="h-4 w-4" />
                            <span className="hidden sm:inline">Badges y Recompensas</span>
                            <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center bg-primary/20 text-primary text-xs rounded-full border-0">
                                {badges.filter(b => b.earned).length}
                            </Badge>
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
                                <div className={cn(
                                    "h-24 relative",
                                    userType === 'provider' && "bg-gradient-to-r from-emerald-500 to-teal-600",
                                    userType === 'client' && "bg-gradient-to-r from-blue-500 to-indigo-600",
                                    userType === 'admin' && "bg-gradient-to-r from-amber-500 to-orange-600"
                                )}>
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
                                        <AvatarFallback className={cn(
                                            "text-2xl font-bold rounded-full",
                                            userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
                                            userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500 text-white",
                                            userType === 'admin' && "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                                        )}>
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
                                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Nombre Completo</Label>
                                            <Input
                                                id="name"
                                                defaultValue={profile.name}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="role" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Cargo</Label>
                                            <Input
                                                id="role"
                                                defaultValue={profile.role}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                defaultValue={profile.email}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Teléfono</Label>
                                            <Input
                                                id="phone"
                                                defaultValue={profile.phone}
                                                className="h-11 bg-muted/30 border-white/10 rounded-md"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="location" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Ubicación</Label>
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
                                            className="h-11 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-md shadow-lg shadow-primary/20"
                                        >
                                            Guardar Cambios
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Account Security */}
                            <Card className="lg:col-span-3 border-white/5 rounded-md shadow-sm">
                                <CardHeader className="px-8 pt-8">
                                    <CardTitle className="text-xl font-display font-bold flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        Seguridad de la Cuenta
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">Contraseña</h4>
                                                    <p className="text-sm text-muted-foreground">Última actualización hace 30 días</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="font-bold rounded-md border-white/10">
                                                    Cambiar
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="p-4 rounded-md bg-muted/30 border border-white/5">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold">Autenticación 2FA</h4>
                                                    <p className="text-sm text-muted-foreground">Añade una capa extra de seguridad</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="font-bold rounded-md border-white/10">
                                                    Activar
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Mi Empresa Tab */}
                    <TabsContent value="company" className="mt-6 space-y-6">
                        {/* Company Info */}
                        <Card className="border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="h-5 w-5 text-primary" />
                                    Información de la Empresa
                                </CardTitle>
                                <CardDescription>Actualiza los detalles públicos de tu organización.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20 rounded-md">
                                        <AvatarFallback className={cn(
                                            "text-2xl font-bold rounded-md",
                                            userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
                                            userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500 text-white"
                                        )}>
                                            {profile.company.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm">Cambiar Logo</Button>
                                        <p className="text-xs text-muted-foreground">JPG, PNG hasta 2MB</p>
                                    </div>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Nombre de la Empresa</Label>
                                        <Input defaultValue={profile.company} className="bg-muted/30 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Sitio Web</Label>
                                        <Input defaultValue={profile.website} className="bg-muted/30 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Corporativo</Label>
                                        <Input defaultValue={profile.email} className="bg-muted/30 border-white/10" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Teléfono</Label>
                                        <Input defaultValue={profile.phone} className="bg-muted/30 border-white/10" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Descripción</Label>
                                        <Textarea defaultValue={profile.description} rows={4} className="bg-muted/30 border-white/10" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end gap-2 border-t border-white/5 pt-6">
                                <Button variant="outline">Cancelar</Button>
                                <Button onClick={() => toast.success('Empresa actualizada')}>Guardar Cambios</Button>
                            </CardFooter>
                        </Card>

                        {/* Referral Program */}
                        <Card className="overflow-hidden">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="flex items-center gap-2">
                                            <Gift className="h-5 w-5 text-indigo-500" />
                                            Programa de Referidos
                                        </CardTitle>
                                        <CardDescription>Invita a otras empresas a Conectian y obtén beneficios exclusivos en vuestro plan.</CardDescription>
                                    </div>
                                    <Badge variant="outline" className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20">
                                        15% Descuento por referido
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="flex-1 space-y-2">
                                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tu Enlace Personalizado</Label>
                                        <div className="relative group">
                                            <Input
                                                value={`https://conectian.com/join?ref=${profile.company.toLowerCase().replace(/\s+/g, '-')}`}
                                                readOnly
                                                className="h-12 bg-muted/40 border-white/10 pr-12 font-mono text-sm focus-visible:ring-indigo-500/50"
                                            />
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="absolute right-1 top-1 h-10 w-10 hover:bg-indigo-500/10 text-muted-foreground hover:text-indigo-500 transition-colors"
                                                onClick={() => {
                                                    const link = `https://conectian.com/join?ref=${profile.company.toLowerCase().replace(/\s+/g, '-')}`;
                                                    navigator.clipboard.writeText(link);
                                                    toast.success("Enlace de referido copiado");
                                                }}
                                            >
                                                <Copy className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <Button variant="outline" className="h-12 px-6 gap-2 border-white/10 hover:bg-white/5">
                                            <Share2 className="h-4 w-4" />
                                            Compartir
                                        </Button>
                                        <Button className="h-12 px-6 gap-2 text-white shadow-lg border-0">
                                            <ExternalLink className="h-4 w-4" />
                                            Ver Estadísticas
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Team Members */}
                        <Card className="border-white/5">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-primary" />
                                            Miembros del Equipo
                                        </CardTitle>
                                        <CardDescription>Gestiona quién tiene acceso a la cuenta de tu empresa.</CardDescription>
                                    </div>
                                    <Button size="sm" className="gap-2">
                                        <Plus className="h-4 w-4" /> Invitar
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Miembro</TableHead>
                                            <TableHead>Rol</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teamMembers.map((member) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                                                                {member.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium">{member.name}</div>
                                                            <div className="text-sm text-muted-foreground">{member.email}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{member.role}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={member.status === 'Activo' ? 'default' : 'secondary'}>
                                                        {member.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Badges y Recompensas Tab */}
                    <TabsContent value="badges" className="mt-6 space-y-6">
                        {/* Stats */}
                        <div className="grid sm:grid-cols-3 gap-4">
                            <Card className="p-5 border-border bg-gradient-to-br from-amber-500/10 to-amber-600/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                        <Trophy className="h-6 w-6 text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{badges.filter(b => b.earned).length}</p>
                                        <p className="text-sm text-muted-foreground">Badges Obtenidos</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-5 border-border bg-gradient-to-br from-violet-500/10 to-violet-600/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                        <Gift className="h-6 w-6 text-violet-400" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">{rewards.filter(r => !r.claimed).length}</p>
                                        <p className="text-sm text-muted-foreground">Recompensas Disponibles</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-5 border-border bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                        <Star className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">850</p>
                                        <p className="text-sm text-muted-foreground">Puntos Totales</p>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Badges Grid */}
                        <Card className="border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5 text-primary" />
                                    Mis Badges
                                </CardTitle>
                                <CardDescription>Consigue badges completando logros en la plataforma.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {badges.map((badge) => {
                                        const Icon = badge.icon;
                                        return (
                                            <div
                                                key={badge.id}
                                                className={cn(
                                                    "p-4 rounded-lg border transition-all",
                                                    badge.earned
                                                        ? "border-white/10 bg-muted/30"
                                                        : "border-dashed border-white/5 opacity-50"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={cn(
                                                        "h-12 w-12 rounded-lg flex items-center justify-center",
                                                        badge.earned ? "bg-white/10" : "bg-muted"
                                                    )}>
                                                        <Icon className={cn("h-6 w-6", badge.earned ? badge.color : "text-muted-foreground")} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-semibold">{badge.name}</h4>
                                                            {badge.earned && (
                                                                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rewards */}
                        <Card className="border-white/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Gift className="h-5 w-5 text-primary" />
                                    Recompensas Disponibles
                                </CardTitle>
                                <CardDescription>Canjea tus puntos por beneficios exclusivos.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {rewards.map((reward) => (
                                        <div
                                            key={reward.id}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-lg border",
                                                reward.claimed ? "border-white/5 opacity-50" : "border-white/10 bg-muted/30"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Gift className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <p className="font-medium">{reward.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {reward.claimed ? 'Canjeado' : `Expira: ${reward.expires}`}
                                                    </p>
                                                </div>
                                            </div>
                                            {!reward.claimed && (
                                                <Button size="sm" onClick={() => toast.success('Recompensa canjeada')}>
                                                    Canjear
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
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
                                    <CardDescription>Mantente al día con las últimas novedades.</CardDescription>
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
