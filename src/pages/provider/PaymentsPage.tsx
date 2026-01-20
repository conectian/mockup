import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    CreditCard,
    Euro,
    TrendingUp,
    Download,
    Calendar,
    CheckCircle,
    Clock,
    ArrowUpRight,
    ArrowDownLeft,
    Wallet,
    FileText,
    Plus
} from 'lucide-react';

const TRANSACTIONS = [
    {
        id: 1,
        type: 'income',
        description: 'Pago por Deal Room - Proyecto IA Repsol',
        amount: 5000,
        status: 'completed',
        date: '2025-01-15',
        reference: 'PAY-2025-001',
    },
    {
        id: 2,
        type: 'income',
        description: 'Comisión de referido - TechPartner Solutions',
        amount: 250,
        status: 'completed',
        date: '2025-01-12',
        reference: 'REF-2025-042',
    },
    {
        id: 3,
        type: 'income',
        description: 'Hito completado - Sprint 2 Mercadona',
        amount: 15000,
        status: 'pending',
        date: '2025-01-10',
        reference: 'MIL-2025-003',
    },
    {
        id: 4,
        type: 'expense',
        description: 'Comisión plataforma - Enero 2025',
        amount: 150,
        status: 'completed',
        date: '2025-01-01',
        reference: 'FEE-2025-001',
    },
    {
        id: 5,
        type: 'income',
        description: 'Pago anticipado - Proyecto HP Enterprise',
        amount: 8500,
        status: 'completed',
        date: '2024-12-28',
        reference: 'PAY-2024-089',
    },
];

const PAYMENT_METHODS = [
    {
        id: 1,
        type: 'bank',
        name: 'Cuenta Principal',
        details: 'ES91 2100 **** **** **** 1234',
        isDefault: true,
    },
    {
        id: 2,
        type: 'card',
        name: 'Visa Business',
        details: '**** **** **** 4532',
        isDefault: false,
    },
];

export default function PaymentsPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight">Pagos & Facturación</h1>
                    <p className="text-muted-foreground">Gestiona tus pagos, transacciones y métodos de pago.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" />
                        Exportar
                    </Button>
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Solicitar Pago
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 border-border">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Wallet className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Balance Disponible</p>
                            <p className="text-2xl font-bold">€28,750</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border-border">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Pendiente de Cobro</p>
                            <p className="text-2xl font-bold">€15,000</p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border-border">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                            <Euro className="h-6 w-6 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Ingresos (Enero)</p>
                            <p className="text-2xl font-bold">€28,750</p>
                            <p className="text-xs text-emerald-400 flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" /> +18% vs mes anterior
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border-border">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Facturas Emitidas</p>
                            <p className="text-2xl font-bold">12</p>
                            <p className="text-xs text-muted-foreground">Este mes</p>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Transactions */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Últimas Transacciones</h2>
                        <Button variant="ghost" size="sm">Ver todas</Button>
                    </div>

                    <Card className="border-border divide-y divide-border">
                        {TRANSACTIONS.map((tx) => (
                            <div key={tx.id} className="p-4 hover:bg-muted/20 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.type === 'income'
                                            ? 'bg-emerald-500/20'
                                            : 'bg-red-500/20'
                                        }`}>
                                        {tx.type === 'income' ? (
                                            <ArrowDownLeft className="h-5 w-5 text-emerald-400" />
                                        ) : (
                                            <ArrowUpRight className="h-5 w-5 text-red-400" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{tx.description}</p>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span>{tx.date}</span>
                                            <span>•</span>
                                            <span className="font-mono">{tx.reference}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                                            }`}>
                                            {tx.type === 'income' ? '+' : '-'}€{tx.amount.toLocaleString()}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={
                                                tx.status === 'completed'
                                                    ? 'border-emerald-500 text-emerald-400'
                                                    : 'border-amber-500 text-amber-400'
                                            }
                                        >
                                            {tx.status === 'completed' ? (
                                                <><CheckCircle className="h-3 w-3 mr-1" /> Completado</>
                                            ) : (
                                                <><Clock className="h-3 w-3 mr-1" /> Pendiente</>
                                            )}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Card>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">Métodos de Pago</h2>
                        <Button variant="ghost" size="sm" className="gap-1">
                            <Plus className="h-4 w-4" /> Añadir
                        </Button>
                    </div>

                    <div className="space-y-3">
                        {PAYMENT_METHODS.map((method) => (
                            <Card key={method.id} className={`p-4 border-border ${method.isDefault ? 'ring-1 ring-primary/30' : ''}`}>
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium">{method.name}</p>
                                            {method.isDefault && (
                                                <Badge className="bg-primary/20 text-primary border-0 text-xs">
                                                    Principal
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground font-mono">{method.details}</p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Next Payout */}
                    <Card className="p-5 border-border bg-gradient-to-br from-primary/5 to-transparent">
                        <h3 className="font-semibold mb-3">Próximo Pago Programado</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Fecha</span>
                                <span className="font-medium">31 Enero 2025</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Monto</span>
                                <span className="font-bold text-lg text-primary">€28,750</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">Destino</span>
                                <span className="font-medium">ES91 **** 1234</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
