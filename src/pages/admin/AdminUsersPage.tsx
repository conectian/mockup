import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    Users,
    MoreHorizontal,
    Search,
    UserPlus,
    Mail,
    Ban,
    CheckCircle,
    Clock
} from 'lucide-react';
import { toast } from 'sonner';

const allUsers = [
    { id: 1, company: 'Logistics Pro', email: 'admin@logisticspro.com', type: 'Client', status: 'Activo', tier: 'N/A', verified: true, joinedAt: '15 Ene 2026' },
    { id: 2, company: 'FinanceBot AI', email: 'contact@financebot.ai', type: 'Provider', status: 'Activo', tier: 'Gold', verified: true, joinedAt: '10 Ene 2026' },
    { id: 3, company: 'Retail Master', email: 'info@retailmaster.es', type: 'Client', status: 'Activo', tier: 'N/A', verified: true, joinedAt: '8 Ene 2026' },
    { id: 4, company: 'TechSolutions Inc', email: 'hello@techsol.com', type: 'Provider', status: 'Bloqueado', tier: 'Bronze', verified: false, joinedAt: '5 Ene 2026' },
    { id: 5, company: 'Startup Nova', email: 'founders@nova.io', type: 'Provider', status: 'Pendiente', tier: 'Silver', verified: false, joinedAt: '3 Ene 2026' },
    { id: 6, company: 'DataSecure Ltd', email: 'security@datasecure.uk', type: 'Provider', status: 'Activo', tier: 'Gold', verified: true, joinedAt: '1 Ene 2026' },
    { id: 7, company: 'Global Trade SA', email: 'ops@globaltrade.es', type: 'Client', status: 'Activo', tier: 'N/A', verified: true, joinedAt: '28 Dic 2025' },
    { id: 8, company: 'InnovateTech', email: 'team@innovatetech.dev', type: 'Provider', status: 'Pendiente', tier: 'Bronze', verified: false, joinedAt: '26 Dic 2025' },
];

export default function AdminUsersPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'Client' | 'Provider'>('all');

    const handleAction = (action: string, user: string) => {
        toast.success(`${action} ejecutado para ${user}`);
    };

    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || user.type === filterType;
        return matchesSearch && matchesType;
    });

    const stats = {
        total: allUsers.length,
        active: allUsers.filter(u => u.status === 'Activo').length,
        pending: allUsers.filter(u => u.status === 'Pendiente').length,
        blocked: allUsers.filter(u => u.status === 'Bloqueado').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-muted-foreground">Administra empresas registradas en la plataforma</p>
                </div>
                <Button className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600">
                    <UserPlus className="h-4 w-4" />
                    Invitar Usuario
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">Total</span>
                        </div>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm">Activos</span>
                        </div>
                        <div className="text-2xl font-bold text-emerald-600">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span className="text-sm">Pendientes</span>
                        </div>
                        <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Ban className="h-4 w-4 text-red-500" />
                            <span className="text-sm">Bloqueados</span>
                        </div>
                        <div className="text-2xl font-bold text-red-600">{stats.blocked}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar empresa o email..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filterType === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('all')}
                    >
                        Todos
                    </Button>
                    <Button
                        variant={filterType === 'Client' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('Client')}
                    >
                        Clientes
                    </Button>
                    <Button
                        variant={filterType === 'Provider' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('Provider')}
                    >
                        Proveedores
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Empresa</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Nivel</TableHead>
                                <TableHead>Registro</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                                {user.company.charAt(0)}
                                            </div>
                                            {user.company}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{user.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.status === 'Activo' ? 'default' : user.status === 'Bloqueado' ? 'destructive' : 'secondary'}
                                        >
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {user.tier !== 'N/A' && (
                                            <div className="flex items-center gap-1 text-sm">
                                                {user.tier === 'Gold' && <span className="text-amber-500">●</span>}
                                                {user.tier === 'Silver' && <span className="text-slate-400">●</span>}
                                                {user.tier === 'Bronze' && <span className="text-orange-600">●</span>}
                                                {user.tier}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">{user.joinedAt}</TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleAction('Ver perfil', user.company)}>
                                                    Ver Perfil Completo
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleAction('Email enviado', user.company)}>
                                                    <Mail className="mr-2 h-4 w-4" /> Enviar Email
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {user.status === 'Pendiente' && (
                                                    <DropdownMenuItem onClick={() => handleAction('Aprobado', user.company)}>
                                                        <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Aprobar
                                                    </DropdownMenuItem>
                                                )}
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleAction('Suspendido', user.company)}>
                                                    <Ban className="mr-2 h-4 w-4" /> Suspender Cuenta
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No se encontraron usuarios</h3>
                            <p className="text-muted-foreground">
                                Prueba ajustando los filtros de búsqueda
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
