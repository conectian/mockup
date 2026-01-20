import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Settings,
    Bell,
    Shield,
    CreditCard,
    Blocks,
    Mail,
    Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const settingsTabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'integrations', label: 'Integraciones', icon: Blocks },
    { id: 'email', label: 'Email Templates', icon: Mail },
];

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success('Configuración guardada correctamente');
        }, 1000);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Configuración</h1>
                    <p className="text-muted-foreground text-lg">Ajustes generales de la plataforma y sistema</p>
                </div>
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? <span className="animate-spin">⏳</span> : <Save className="h-4 w-4" />}
                    Guardar Cambios
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Settings Sidebar */}
                <Card className="lg:w-64 h-fit border-white/5 p-2">
                    <nav className="space-y-1">
                        {settingsTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                                    activeTab === tab.id
                                        ? "bg-blue-600/10 text-blue-500"
                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                )}
                            >
                                <tab.icon className="h-4 w-4" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* General Tab */}
                    {activeTab === 'general' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Información de la Plataforma</CardTitle>
                                    <CardDescription>Detalles principales visibles para los usuarios.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="platformName">Nombre de la Plataforma</Label>
                                            <Input id="platformName" defaultValue="Conectian AI Marketplace" className="bg-white/5 border-white/10" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="supportEmail">Email de Soporte</Label>
                                            <Input id="supportEmail" defaultValue="support@conectian.com" className="bg-white/5 border-white/10" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="seoDesc">Descripción SEO</Label>
                                        <Textarea
                                            id="seoDesc"
                                            className="bg-white/5 border-white/10 min-h-[80px]"
                                            defaultValue="La plataforma líder para conectar empresas con soluciones de Inteligencia Artificial."
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Localización y Región</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Idioma por Defecto</Label>
                                        <Select defaultValue="es">
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Seleccionar idioma" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="es">Español</SelectItem>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="pt">Português</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Zona Horaria</Label>
                                        <Select defaultValue="madrid">
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Seleccionar zona horaria" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="madrid">Europe/Madrid (GMT+1)</SelectItem>
                                                <SelectItem value="london">Europe/London (GMT+0)</SelectItem>
                                                <SelectItem value="ny">America/New_York (GMT-5)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Moneda Principal</Label>
                                        <Select defaultValue="eur">
                                            <SelectTrigger className="bg-white/5 border-white/10">
                                                <SelectValue placeholder="Seleccionar moneda" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="eur">EUR (€)</SelectItem>
                                                <SelectItem value="usd">USD ($)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Security Tab (using Feature Flags visual for now as placeholder for security toggles) */}
                    {activeTab === 'security' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Seguridad y Acceso</CardTitle>
                                    <CardDescription>Configura las políticas de acceso y seguridad.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Autenticación de Dos Factores (2FA)</Label>
                                            <p className="text-sm text-muted-foreground">Forzar 2FA para todos los usuarios administradores</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Registro de Usuarios</Label>
                                            <p className="text-sm text-muted-foreground">Permitir registro público de nuevos usuarios</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">SSO (Single Sign-On)</Label>
                                            <p className="text-sm text-muted-foreground">Habilitar inicio de sesión con Google/Microsoft</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Mantenimiento</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-amber-500">Modo Mantenimiento</Label>
                                            <p className="text-sm text-muted-foreground">Desactivar acceso a la plataforma para usuarios no administradores</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Notifications Tab */}
                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Notificaciones de Sistema</CardTitle>
                                    <CardDescription>Configura cuándo y cómo se envían las notificaciones a los usuarios.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Nuevas Propuestas</Label>
                                            <p className="text-sm text-muted-foreground">Notificar a clientes cuando reciban nuevas propuestas</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Nuevos Leads</Label>
                                            <p className="text-sm text-muted-foreground">Notificar a proveedores cuando haya nuevos leads disponibles</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Mensajes de Deal Rooms</Label>
                                            <p className="text-sm text-muted-foreground">Notificar cuando haya nuevos mensajes en Deal Rooms activos</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Actualizaciones de Documentos</Label>
                                            <p className="text-sm text-muted-foreground">Notificar cuando se suban nuevos documentos o cambien de estado</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Notificaciones por Email</CardTitle>
                                    <CardDescription>Controla qué notificaciones se envían también por email.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Resumen Diario</Label>
                                            <p className="text-sm text-muted-foreground">Enviar resumen diario de actividad a las 9:00 AM</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Alertas Importantes</Label>
                                            <p className="text-sm text-muted-foreground">Enviar email para notificaciones críticas y urgentes</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Boletín Semanal</Label>
                                            <p className="text-sm text-muted-foreground">Enviar resumen semanal los lunes con estadísticas</p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Canales de Notificación</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Tiempo de Retención (días)</Label>
                                        <Input
                                            type="number"
                                            defaultValue="30"
                                            className="bg-white/5 border-white/10 max-w-[200px]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Las notificaciones se eliminarán automáticamente después de este periodo
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Payments Tab */}
                    {activeTab === 'payments' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Pasarela de Pagos</CardTitle>
                                    <CardDescription>Configura la integración con proveedores de pago.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Stripe</Label>
                                            <p className="text-sm text-muted-foreground">Procesamiento de pagos con tarjeta</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stripe API Key</Label>
                                        <Input
                                            type="password"
                                            defaultValue="sk_live_••••••••••••••••"
                                            className="bg-white/5 border-white/10 font-mono text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Stripe Webhook Secret</Label>
                                        <Input
                                            type="password"
                                            defaultValue="whsec_••••••••••••••••"
                                            className="bg-white/5 border-white/10 font-mono text-sm"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Comisiones y Tarifas</CardTitle>
                                    <CardDescription>Define la estructura de comisiones de la plataforma.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Comisión Proveedor (%)</Label>
                                            <Input
                                                type="number"
                                                defaultValue="15"
                                                className="bg-white/5 border-white/10"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Porcentaje que cobra la plataforma por venta
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Tarifa Unlock Lead (€)</Label>
                                            <Input
                                                type="number"
                                                defaultValue="50"
                                                className="bg-white/5 border-white/10"
                                            />
                                            <p className="text-xs text-muted-foreground">
                                                Coste por desbloquear información de un lead
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Umbral de Pago Mínimo (€)</Label>
                                        <Input
                                            type="number"
                                            defaultValue="100"
                                            className="bg-white/5 border-white/10 max-w-[200px]"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Monto mínimo para procesar un pago a proveedores
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Facturación Automática</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Generar Facturas Automáticamente</Label>
                                            <p className="text-sm text-muted-foreground">Crear y enviar facturas al completar transacciones</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Prefijo de Factura</Label>
                                        <Input
                                            defaultValue="CNT-"
                                            className="bg-white/5 border-white/10 max-w-[200px]"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Integrations Tab */}
                    {activeTab === 'integrations' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Integraciones CRM</CardTitle>
                                    <CardDescription>Conecta con sistemas CRM externos.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-blue-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">SF</span>
                                            </div>
                                            <div>
                                                <Label className="text-base">Salesforce</Label>
                                                <p className="text-sm text-muted-foreground">Sincronizar leads y deals con Salesforce</p>
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-orange-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">HS</span>
                                            </div>
                                            <div>
                                                <Label className="text-base">HubSpot</Label>
                                                <p className="text-sm text-muted-foreground">Integración con HubSpot CRM</p>
                                            </div>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">APIs y Webhooks</CardTitle>
                                    <CardDescription>Configura integraciones personalizadas.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Webhook URL para Eventos</Label>
                                        <Input
                                            placeholder="https://api.tudominio.com/webhook"
                                            className="bg-white/5 border-white/10 font-mono text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            Enviaremos notificaciones de eventos importantes a esta URL
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">API Pública Habilitada</Label>
                                            <p className="text-sm text-muted-foreground">Permitir acceso a la API REST de la plataforma</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Integraciones de Comunicación</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-purple-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">SL</span>
                                            </div>
                                            <div>
                                                <Label className="text-base">Slack</Label>
                                                <p className="text-sm text-muted-foreground">Notificaciones y alertas en Slack</p>
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-white/5 rounded-lg">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-emerald-600 flex items-center justify-center">
                                                <span className="text-white font-bold text-lg">TW</span>
                                            </div>
                                            <div>
                                                <Label className="text-base">Twilio</Label>
                                                <p className="text-sm text-muted-foreground">SMS y notificaciones por WhatsApp</p>
                                            </div>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Email Templates Tab */}
                    {activeTab === 'email' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Configuración SMTP</CardTitle>
                                    <CardDescription>Configura el servidor de correo saliente.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Host SMTP</Label>
                                            <Input
                                                defaultValue="smtp.gmail.com"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Puerto</Label>
                                            <Input
                                                type="number"
                                                defaultValue="587"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Usuario</Label>
                                            <Input
                                                defaultValue="noreply@conectian.com"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Contraseña</Label>
                                            <Input
                                                type="password"
                                                defaultValue="••••••••"
                                                className="bg-white/5 border-white/10"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Plantillas de Email</CardTitle>
                                    <CardDescription>Personaliza los emails automáticos de la plataforma.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="p-4 border border-white/5 rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base">Email de Bienvenida</Label>
                                                    <p className="text-sm text-muted-foreground">Enviado al registrarse un nuevo usuario</p>
                                                </div>
                                                <Button variant="outline" size="sm">Editar</Button>
                                            </div>
                                        </div>
                                        <div className="p-4 border border-white/5 rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base">Nueva Propuesta</Label>
                                                    <p className="text-sm text-muted-foreground">Notifica a clientes sobre propuestas recibidas</p>
                                                </div>
                                                <Button variant="outline" size="sm">Editar</Button>
                                            </div>
                                        </div>
                                        <div className="p-4 border border-white/5 rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base">Nuevo Lead</Label>
                                                    <p className="text-sm text-muted-foreground">Alerta a proveedores sobre leads disponibles</p>
                                                </div>
                                                <Button variant="outline" size="sm">Editar</Button>
                                            </div>
                                        </div>
                                        <div className="p-4 border border-white/5 rounded-lg space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <Label className="text-base">Recuperación de Contraseña</Label>
                                                    <p className="text-sm text-muted-foreground">Email para restablecer contraseña</p>
                                                </div>
                                                <Button variant="outline" size="sm">Editar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-white/5">
                                <CardHeader>
                                    <CardTitle className="text-lg font-display font-bold">Firma de Email</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Nombre del Remitente</Label>
                                        <Input
                                            defaultValue="Equipo Conectian"
                                            className="bg-white/5 border-white/10"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Firma</Label>
                                        <Textarea
                                            className="bg-white/5 border-white/10 min-h-[100px]"
                                            defaultValue="Saludos,&#10;El equipo de Conectian&#10;&#10;conectian.com"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
