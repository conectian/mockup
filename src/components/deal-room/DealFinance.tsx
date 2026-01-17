import { useDealStore } from '@/store/useDealStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

export default function DealFinance() {
    const { milestones, escrowBalance } = useDealStore();

    const totalAmount = milestones.reduce((sum, m) => sum + m.amount, 0);
    const paidAmount = milestones
        .filter((m) => m.status === 'pagado' || m.status === 'liberado')
        .reduce((sum, m) => sum + m.amount, 0);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pagado':
                return <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">Pagado</Badge>;
            case 'en_escrow':
                return <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">En Escrow</Badge>;
            case 'liberado':
                return <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-400">Liberado</Badge>;
            default:
                return <Badge variant="secondary">Pendiente</Badge>;
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
            <div>
                <h2 className="text-lg md:text-xl font-bold">Business Case & Pagos</h2>
                <p className="text-sm md:text-base text-muted-foreground">Gestión financiera del proyecto</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-3 md:gap-4 grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs md:text-sm">Total Proyecto</span>
                        </div>
                        <div className="text-lg md:text-2xl font-bold">${totalAmount.toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                            <Target className="h-4 w-4" />
                            <span className="text-xs md:text-sm">En Escrow</span>
                        </div>
                        <div className="text-lg md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                            ${escrowBalance.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800">
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-xs md:text-sm">Pagado</span>
                        </div>
                        <div className="text-lg md:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                            ${paidAmount.toLocaleString()}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs md:text-sm">Pendiente</span>
                        </div>
                        <div className="text-lg md:text-2xl font-bold">
                            ${(totalAmount - paidAmount - escrowBalance).toLocaleString()}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Milestones - Mobile Cards */}
            <div className="md:hidden space-y-3">
                <h3 className="text-sm font-bold text-muted-foreground px-1">Hitos de Pago</h3>
                {milestones.map((milestone) => (
                    <Card key={milestone.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm truncate">{milestone.name}</div>
                                    <div className="text-xs text-muted-foreground">{milestone.percentage}% del proyecto</div>
                                </div>
                                {getStatusBadge(milestone.status)}
                            </div>
                            <div className="text-lg font-bold">${milestone.amount.toLocaleString()}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Milestones Table - Desktop */}
            <Card className="hidden md:block">
                <CardHeader>
                    <CardTitle>Hitos de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hito</TableHead>
                                <TableHead className="text-center">%</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {milestones.map((milestone) => (
                                <TableRow key={milestone.id}>
                                    <TableCell className="font-medium">{milestone.name}</TableCell>
                                    <TableCell className="text-center">{milestone.percentage}%</TableCell>
                                    <TableCell className="text-right">${milestone.amount.toLocaleString()}</TableCell>
                                    <TableCell className="text-right">{getStatusBadge(milestone.status)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* ROI Calculator */}
            <Card className="border-2 border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                <CardHeader className="pb-2 md:pb-6">
                    <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-base md:text-lg">
                        <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                        Calculadora de ROI
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        <div className="flex sm:block items-center justify-between">
                            <div className="text-xs md:text-sm text-muted-foreground mb-0 sm:mb-1">Inversión Total</div>
                            <div className="text-lg md:text-2xl font-bold">${totalAmount.toLocaleString()}</div>
                        </div>
                        <div className="flex sm:block items-center justify-between">
                            <div className="text-xs md:text-sm text-muted-foreground mb-0 sm:mb-1">Ahorro Proyectado (Año 1)</div>
                            <div className="text-lg md:text-2xl font-bold text-emerald-600">$120,000</div>
                        </div>
                        <div className="flex sm:block items-center justify-between">
                            <div className="text-xs md:text-sm text-muted-foreground mb-0 sm:mb-1">ROI Estimado</div>
                            <div className="text-lg md:text-2xl font-bold text-emerald-600">240%</div>
                        </div>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground mt-4">
                        * Estimaciones basadas en casos similares. El ROI real puede variar según la implementación.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
