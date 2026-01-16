import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuthStore } from '@/store/useAuthStore';
import {
    Mail,
    Phone,
    Globe,
    MapPin,
    Calendar,
    Shield,
    Edit3,
    Camera,
    CheckCircle2,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProfilePage() {
    const { userType } = useAuthStore();

    const handleSave = () => {
        toast.success('Perfil actualizado correctamente');
    };

    // Mock profile data
    const profile = {
        company: userType === 'provider' ? 'TechSolutions AI' : userType === 'client' ? 'Global Industries' : 'Conectian Admin',
        email: userType === 'provider' ? 'contact@techsolutions.ai' : userType === 'client' ? 'procurement@globalind.com' : 'admin@conectian.com',
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Mi Perfil</h1>
                    <p className="text-muted-foreground text-lg">Gestiona la información de tu cuenta</p>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium bg-muted/50 px-3 py-1.5 rounded-full border border-white/5">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Último acceso: hoy</span>
                </div>
            </div>

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
                        <Avatar className="h-24 w-24 mx-auto rounded-md shadow-xl border-4 border-background">
                            <AvatarFallback className={cn(
                                "text-2xl font-bold rounded-md",
                                userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500 text-white",
                                userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500 text-white",
                                userType === 'admin' && "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                            )}>
                                {profile.company.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="mt-4 space-y-2">
                            <h2 className="text-xl font-display font-bold">{profile.company}</h2>
                            <div className="flex items-center justify-center gap-2">
                                <Badge className={cn(
                                    "font-bold rounded-full border-0",
                                    userType === 'provider' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                    userType === 'client' && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                                    userType === 'admin' && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                )}>
                                    {userType === 'provider' ? 'Proveedor' : userType === 'client' ? 'Cliente' : 'Administrador'}
                                </Badge>
                                {profile.verified && (
                                    <Badge className="gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold rounded-full border-0">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Verificado
                                    </Badge>
                                )}
                            </div>
                            {profile.tier && (
                                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold rounded-full border-0">
                                    ● {profile.tier} Partner
                                </Badge>
                            )}
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
                                <Globe className="h-4 w-4" />
                                <span>{profile.website}</span>
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
                                    Editar Información
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">Actualiza los datos de tu empresa</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Nombre de Empresa</Label>
                                <Input
                                    id="company"
                                    defaultValue={profile.company}
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
                            <div className="space-y-2">
                                <Label htmlFor="website" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Sitio Web</Label>
                                <Input
                                    id="website"
                                    defaultValue={profile.website}
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
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="description" className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Descripción</Label>
                                <Textarea
                                    id="description"
                                    defaultValue={profile.description}
                                    rows={4}
                                    className="bg-muted/30 border-white/10 rounded-md resize-none"
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
                                className="h-11 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-bold rounded-md shadow-lg shadow-violet-500/20"
                            >
                                Guardar Cambios
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Account Security */}
            <Card className="border-white/5 rounded-md shadow-sm">
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
    );
}
