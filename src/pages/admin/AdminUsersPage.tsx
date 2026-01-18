import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
import { cn } from '@/lib/utils';

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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Gestión de Usuarios</h1>
                    <p className="text-muted-foreground text-lg">Administra empresas registradas en la plataforma</p>
                </div>
                <Button className="gap-2 h-12 px-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-bold rounded-md shadow-lg shadow-violet-500/20">
                    <UserPlus className="h-5 w-5" />
                    Invitar Usuario
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                <Card className="border-0 bg-gradient-to-br from-slate-400/20 via-slate-500/10 to-transparent rounded-md shadow-xl shadow-slate-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Users className="h-12 w-12 md:h-16 md:w-16 text-slate-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-1 md:mb-2">Total</div>
                        <div className="text-2xl md:text-4xl font-display font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent rounded-md shadow-xl shadow-emerald-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle className="h-12 w-12 md:h-16 md:w-16 text-emerald-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400/70 mb-1 md:mb-2">Activos</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-400">{stats.active}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent rounded-md shadow-xl shadow-amber-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Clock className="h-12 w-12 md:h-16 md:w-16 text-amber-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400/70 mb-1 md:mb-2">Pendientes</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-amber-700 dark:text-amber-400">{stats.pending}</div>
                    </CardContent>
                </Card>
                <Card className="border-0 bg-gradient-to-br from-red-400/20 via-red-500/10 to-transparent rounded-md shadow-xl shadow-red-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Ban className="h-12 w-12 md:h-16 md:w-16 text-red-500" />
                    </div>
                    <CardContent className="p-4 md:pt-6">
                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400/70 mb-1 md:mb-2">Bloqueados</div>
                        <div className="text-2xl md:text-4xl font-display font-bold text-red-700 dark:text-red-400">{stats.blocked}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar empresa o email..."
                        className="pl-10 h-11 bg-muted/30 border-white/10 rounded-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={filterType === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('all')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterType === 'all' && "bg-primary shadow-lg shadow-primary/20"
                        )}
                    >
                        Todos
                    </Button>
                    <Button
                        variant={filterType === 'Client' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('Client')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterType === 'Client' && "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                        )}
                    >
                        Clientes
                    </Button>
                    <Button
                        variant={filterType === 'Provider' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilterType('Provider')}
                        className={cn(
                            "h-11 px-4 rounded-md font-bold",
                            filterType === 'Provider' && "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20"
                        )}
                    >
                        Proveedores
                    </Button>
                </div>
            </div>

            {/* Users Table */}
            <Card className="border-white/5 rounded-md shadow-sm overflow-hidden">
                <CardHeader className="px-8 pt-8 pb-0">
                    <CardTitle className="text-xl font-display font-bold">Usuarios Registrados</CardTitle>
                </CardHeader>
                <CardContent className="p-0 md:mt-6">
                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/5">
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pl-8">Empresa</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Email</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Tipo</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Estado</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Nivel</TableHead>
                                    <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground/60">Registro</TableHead>
                                    <TableHead className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground/60 pr-8">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id} className="border-white/5 hover:bg-muted/30 transition-colors">
                                        <TableCell className="pl-8">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                                    <AvatarFallback className={cn(
                                                        "text-sm font-bold rounded-md",
                                                        user.type === 'Provider' ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white" : "bg-gradient-to-br from-blue-400 to-indigo-500 text-white"
                                                    )}>
                                                        {user.company.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-bold">{user.company}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={cn(
                                                "font-bold rounded-full border-0",
                                                user.type === 'Provider' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                            )}>
                                                {user.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={cn(
                                                "font-bold rounded-full border-0 gap-1.5",
                                                user.status === 'Activo' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                                user.status === 'Bloqueado' && "bg-red-500/10 text-red-600 dark:text-red-400",
                                                user.status === 'Pendiente' && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                            )}>
                                                <div className={cn(
                                                    "h-1.5 w-1.5 rounded-full",
                                                    user.status === 'Activo' && "bg-emerald-500",
                                                    user.status === 'Bloqueado' && "bg-red-500",
                                                    user.status === 'Pendiente' && "bg-amber-500 animate-pulse"
                                                )} />
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.tier !== 'N/A' && (
                                                <div className="flex items-center gap-1.5 text-sm font-bold">
                                                    {user.tier === 'Gold' && <span className="text-amber-500">●</span>}
                                                    {user.tier === 'Silver' && <span className="text-slate-400">●</span>}
                                                    {user.tier === 'Bronze' && <span className="text-orange-600">●</span>}
                                                    {user.tier}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground text-sm">{user.joinedAt}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="glass-card">
                                                    <DropdownMenuLabel className="font-display">Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleAction('Ver perfil', user.company)} className="cursor-pointer">
                                                        Ver Perfil Completo
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleAction('Email enviado', user.company)} className="cursor-pointer">
                                                        <Mail className="mr-2 h-4 w-4" /> Enviar Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/5" />
                                                    {user.status === 'Pendiente' && (
                                                        <DropdownMenuItem onClick={() => handleAction('Aprobado', user.company)} className="cursor-pointer">
                                                            <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" /> Aprobar
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem className="text-red-500 cursor-pointer" onClick={() => handleAction('Suspendido', user.company)}>
                                                        <Ban className="mr-2 h-4 w-4" /> Suspender Cuenta
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile List View */}
                    <div className="md:hidden divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <div key={user.id} className="p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 rounded-md shadow-sm">
                                            <AvatarFallback className={cn(
                                                "text-sm font-bold rounded-md",
                                                user.type === 'Provider' ? "bg-gradient-to-br from-emerald-400 to-teal-500 text-white" : "bg-gradient-to-br from-blue-400 to-indigo-500 text-white"
                                            )}>
                                                {user.company.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-bold">{user.company}</div>
                                            <div className="text-xs text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/5">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass-card">
                                            <DropdownMenuItem onClick={() => handleAction('Ver perfil', user.company)}>Ver Perfil</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleAction('Email enviado', user.company)}>Enviar Email</DropdownMenuItem>
                                            {user.status === 'Pendiente' && (
                                                <DropdownMenuItem onClick={() => handleAction('Aprobado', user.company)} className="text-emerald-500">Aprobar</DropdownMenuItem>
                                            )}
                                            <DropdownMenuItem className="text-red-500" onClick={() => handleAction('Suspendido', user.company)}>Suspender</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline" className={cn(
                                        "font-bold rounded-full border-0",
                                        user.type === 'Provider' ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                    )}>
                                        {user.type}
                                    </Badge>
                                    <Badge className={cn(
                                        "font-bold rounded-full border-0 gap-1.5",
                                        user.status === 'Activo' && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                                        user.status === 'Bloqueado' && "bg-red-500/10 text-red-600 dark:text-red-400",
                                        user.status === 'Pendiente' && "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                    )}>
                                        <div className={cn(
                                            "h-1.5 w-1.5 rounded-full",
                                            user.status === 'Activo' && "bg-emerald-500",
                                            user.status === 'Bloqueado' && "bg-red-500",
                                            user.status === 'Pendiente' && "bg-amber-500 animate-pulse"
                                        )} />
                                        {user.status}
                                    </Badge>
                                    {user.tier !== 'N/A' && (
                                        <Badge variant="secondary" className="font-bold rounded-full border-0">
                                            {user.tier}
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">
                                    Registrado: {user.joinedAt}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredUsers.length === 0 && (
                        <div className="text-center py-16">
                            <Users className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
                            <h3 className="text-lg font-display font-bold mb-2">No se encontraron usuarios</h3>
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
