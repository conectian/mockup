import { useState } from 'react';
import { useCreditsStore } from '@/store/useCreditsStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
    Users,
    ShieldCheck,
    CreditCard,
    Building,
    Upload,
    CheckCircle2,
    Plus,
    MoreVertical,
    Download,
    Award
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';

export default function SettingsPage() {
    const { balance, addCredits } = useCreditsStore();
    const [activeTab, setActiveTab] = useState('profile');

    // Mock Data
    const teamMembers = [
        { id: 1, name: 'Carlos López', email: 'carlos@empresa.com', role: 'Admin', status: 'Activo' },
        { id: 2, name: 'Ana Ruiz', email: 'ana@empresa.com', role: 'Sales', status: 'Activo' },
        { id: 3, name: 'Pedro Gomez', email: 'pedro@empresa.com', role: 'Viewer', status: 'Pendiente' },
    ];

    const transactions = [
        { id: 'tx-001', date: '10 Ene 2026', concept: 'Recarga Pack Pro', amount: '150.00€', invoice: 'INV-2026-001' },
        { id: 'tx-002', date: '15 Dic 2025', concept: 'Recarga Pack Starter', amount: '49.00€', invoice: 'INV-2025-156' },
    ];

    const verificationSteps = [
        { id: 1, label: 'Verificar Email Corporativo', completed: true },
        { id: 2, label: 'Completar Perfil de Empresa', completed: true },
        { id: 3, label: 'Subir Documentación Fiscal (CIF)', completed: false },
        { id: 4, label: 'Certificación ISO (Opcional)', completed: false },
    ];

    const handleLevelUp = () => {
        toast.success('Documento subido correctamente', {
            description: 'Nuestro equipo de compliance revisará tu solicitud en 24-48h.'
        });
    };

    const handlePurchase = (plan: string, credits: number) => {
        addCredits(credits);
        toast.success(`¡Has comprado el plan ${plan}!`, {
            description: `Se han añadido ${credits} créditos a tu cuenta.`
        });
    };

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 shrink-0 space-y-2">
                <h1 className="text-2xl font-bold mb-6 px-2">Configuración</h1>

                <nav className="flex flex-col space-y-1">
                    <Button
                        variant={activeTab === 'profile' ? 'secondary' : 'ghost'}
                        className="justify-start gap-2"
                        onClick={() => setActiveTab('profile')}
                    >
                        <Building className="h-4 w-4" />
                        Perfil Empresa
                    </Button>
                    <Button
                        variant={activeTab === 'team' ? 'secondary' : 'ghost'}
                        className="justify-start gap-2"
                        onClick={() => setActiveTab('team')}
                    >
                        <Users className="h-4 w-4" />
                        Equipo
                    </Button>
                    <Button
                        variant={activeTab === 'verification' ? 'secondary' : 'ghost'}
                        className="justify-start gap-2"
                        onClick={() => setActiveTab('verification')}
                    >
                        <ShieldCheck className="h-4 w-4" />
                        Verificación
                    </Button>
                    <Button
                        variant={activeTab === 'billing' ? 'secondary' : 'ghost'}
                        className="justify-start gap-2"
                        onClick={() => setActiveTab('billing')}
                    >
                        <CreditCard className="h-4 w-4" />
                        Facturación y Créditos
                    </Button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">

                    {/* PROFILE TAB */}
                    <TabsContent value="profile" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información de la Empresa</CardTitle>
                                <CardDescription>Actualiza los detalles públicos de tu organización.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                    <Button variant="outline" size="sm">Cambiar Logo</Button>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Nombre de la Empresa</Label>
                                        <Input defaultValue="Acme Corp" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Sitio Web</Label>
                                        <Input defaultValue="https://acmecorp.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Descripción Corta</Label>
                                    <Textarea placeholder="A qué se dedica tu empresa..." rows={3} />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end gap-2">
                                <Button variant="outline">Cancelar</Button>
                                <Button onClick={() => toast.success('Perfil actualizado')} className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">Guardar Cambios</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* TEAM TAB */}
                    <TabsContent value="team" className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Miembros del Equipo</h2>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" /> Invitar Miembro
                            </Button>
                        </div>

                        <Card>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Rol</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teamMembers.map((member) => (
                                        <TableRow key={member.id}>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{member.name}</div>
                                                    <div className="text-sm text-muted-foreground">{member.email}</div>
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
                        </Card>
                    </TabsContent>

                    {/* VERIFICATION TAB */}
                    <TabsContent value="verification" className="space-y-6">
                        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="text-amber-800 dark:text-amber-500 flex items-center gap-2">
                                        <Award className="h-5 w-5" /> Nivel Bronce
                                    </CardTitle>
                                    <CardDescription className="text-amber-700/80">Tu nivel actual de verificación</CardDescription>
                                </div>
                                <div className="text-2xl font-bold text-amber-600">Nivel 1</div>
                            </CardHeader>
                        </Card>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Requisitos para Nivel Plata</CardTitle>
                                    <CardDescription>Completa estos pasos para aumentar tu confianza.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {verificationSteps.map((step) => (
                                        <div key={step.id} className="flex items-center gap-3">
                                            {step.completed ? (
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full border-2 border-muted shrink-0" />
                                            )}
                                            <span className={step.completed ? 'text-muted-foreground line-through' : ''}>
                                                {step.label}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Subir Documentación</CardTitle>
                                    <CardDescription>Sube tus certificados fiscales o ISO.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                                        <p className="text-sm font-medium">Arrastra archivos aquí o haz clic</p>
                                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG hasta 10MB</p>
                                    </div>
                                    <Button className="w-full" onClick={handleLevelUp}>Enviar para Revisión</Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* BILLING TAB */}
                    <TabsContent value="billing" className="space-y-6">
                        <Card className="bg-primary text-primary-foreground overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
                            <CardContent className="p-8 relative">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-medium opacity-90">Saldo Disponible</h2>
                                        <div className="text-5xl font-bold mt-2">{balance} Créditos</div>
                                    </div>
                                    <Button variant="secondary" className="gap-2 font-semibold">
                                        Historial
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div>
                            <h3 className="text-lg font-bold mb-4">Recargar Saldo</h3>
                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Starter */}
                                <Card className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>Pack Starter</CardTitle>
                                        <CardDescription>Para empezar a probar</CardDescription>
                                        <div className="text-3xl font-bold mt-2">49€</div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 50 Créditos</li>
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Soporte Básico</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant="outline" onClick={() => handlePurchase('Starter', 50)}>Comprar</Button>
                                    </CardFooter>
                                </Card>

                                {/* Pro */}
                                <Card className="flex flex-col border-primary shadow-lg relative">
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg font-medium">
                                        Popular
                                    </div>
                                    <CardHeader>
                                        <CardTitle>Pack Pro</CardTitle>
                                        <CardDescription>Para crecimiento activo</CardDescription>
                                        <div className="text-3xl font-bold mt-2">150€</div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 200 Créditos</li>
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Bonus +10%</li>
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Soporte Prioritario</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => handlePurchase('Pro', 200)}>Comprar</Button>
                                    </CardFooter>
                                </Card>

                                {/* Enterprise */}
                                <Card className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle>Enterprise</CardTitle>
                                        <CardDescription>Para grandes volúmenes</CardDescription>
                                        <div className="text-3xl font-bold mt-2">Custom</div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> 1000+ Créditos</li>
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Account Manager</li>
                                            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Facturación mensual</li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" variant="outline">Contactar Ventas</Button>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>Historial de Transacciones</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Concepto</TableHead>
                                            <TableHead>Importe</TableHead>
                                            <TableHead className="text-right">Factura</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.map((tx) => (
                                            <TableRow key={tx.id}>
                                                <TableCell>{tx.date}</TableCell>
                                                <TableCell>{tx.concept}</TableCell>
                                                <TableCell>{tx.amount}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm" className="gap-2">
                                                        <Download className="h-4 w-4" /> PDF
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
