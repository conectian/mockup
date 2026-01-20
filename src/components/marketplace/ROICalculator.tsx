import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
    Calculator,
    TrendingUp,
    DollarSign,
    Clock,
    Sparkles,
    Info,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ROICalculatorProps {
    defaultSavingsPercentage?: number;
    defaultImplementationCost?: number;
    defaultImplementationTime?: number;
}

export default function ROICalculator({
    defaultSavingsPercentage = 25,
    defaultImplementationCost = 50000,
    defaultImplementationTime = 3
}: ROICalculatorProps) {
    // User inputs
    const [currentAnnualCost, setCurrentAnnualCost] = useState<string>('500000');
    const [savingsPercentage, setSavingsPercentage] = useState(defaultSavingsPercentage);
    const [implementationCost, setImplementationCost] = useState(defaultImplementationCost);
    const [implementationTime, setImplementationTime] = useState(defaultImplementationTime);

    // Calculated values
    const [annualSavings, setAnnualSavings] = useState(0);
    const [roi, setROI] = useState(0);
    const [paybackPeriod, setPaybackPeriod] = useState(0);
    const [threeYearValue, setThreeYearValue] = useState(0);

    useEffect(() => {
        const cost = parseFloat(currentAnnualCost) || 0;
        const savings = (cost * savingsPercentage) / 100;
        const calculatedROI = implementationCost > 0
            ? ((savings - implementationCost) / implementationCost) * 100
            : 0;
        const payback = savings > 0 ? implementationCost / savings : 0;
        const threeYear = (savings * 3) - implementationCost;

        setAnnualSavings(savings);
        setROI(calculatedROI);
        setPaybackPeriod(payback);
        setThreeYearValue(threeYear);
    }, [currentAnnualCost, savingsPercentage, implementationCost]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0
        }).format(value);
    };

    const formatNumber = (value: number, decimals: number = 1) => {
        return value.toFixed(decimals);
    };

    return (
        <Card className="border-white/5 overflow-hidden">
            <CardHeader className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">Calculadora de ROI</CardTitle>
                        <CardDescription>Calcula el valor potencial para tu negocio</CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
                {/* Input: Current Annual Cost */}
                <div className="space-y-3">
                    <Label htmlFor="current-cost" className="text-sm font-semibold flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        Coste Anual Actual
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                            id="current-cost"
                            type="number"
                            value={currentAnnualCost}
                            onChange={(e) => setCurrentAnnualCost(e.target.value)}
                            className="pl-8 h-11 bg-muted/30 border-white/10"
                            placeholder="500000"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                        <Info className="h-3 w-3 mt-0.5 shrink-0" />
                        Coste operativo anual relacionado con el problema que resuelve esta solución
                    </p>
                </div>

                {/* Input: Savings Percentage */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            Ahorro Estimado
                        </Label>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                            {savingsPercentage}%
                        </Badge>
                    </div>
                    <Slider
                        value={[savingsPercentage]}
                        onValueChange={(value) => setSavingsPercentage(value[0])}
                        min={5}
                        max={50}
                        step={5}
                        className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>5%</span>
                        <span>50%</span>
                    </div>
                </div>

                {/* Input: Implementation Cost */}
                <div className="space-y-3">
                    <Label htmlFor="impl-cost" className="text-sm font-semibold flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        Coste de Implementación
                    </Label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">€</span>
                        <Input
                            id="impl-cost"
                            type="number"
                            value={implementationCost}
                            onChange={(e) => setImplementationCost(parseFloat(e.target.value) || 0)}
                            className="pl-8 h-11 bg-muted/30 border-white/10"
                        />
                    </div>
                </div>

                {/* Input: Implementation Time */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-sm font-semibold flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            Tiempo de Implementación
                        </Label>
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                            {implementationTime} {implementationTime === 1 ? 'mes' : 'meses'}
                        </Badge>
                    </div>
                    <Slider
                        value={[implementationTime]}
                        onValueChange={(value) => setImplementationTime(value[0])}
                        min={1}
                        max={12}
                        step={1}
                        className="py-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 mes</span>
                        <span>12 meses</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 my-6" />

                {/* Results */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Resultados Proyectados
                    </h4>

                    {/* Annual Savings */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Ahorro Anual</p>
                            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(annualSavings)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-emerald-500" />
                        </div>
                    </div>

                    {/* ROI */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-violet-500/5 border border-violet-500/20">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">ROI (Año 1)</p>
                            <p className={cn(
                                "text-2xl font-bold",
                                roi > 0 ? "text-violet-500" : "text-red-500"
                            )}>
                                {formatNumber(roi, 0)}%
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center">
                            <Calculator className="h-6 w-6 text-violet-500" />
                        </div>
                    </div>

                    {/* Payback Period */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Período de Recuperación</p>
                            <p className="text-2xl font-bold text-blue-500">
                                {formatNumber(paybackPeriod, 1)} {paybackPeriod === 1 ? 'mes' : 'meses'}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Clock className="h-6 w-6 text-blue-500" />
                        </div>
                    </div>

                    {/* 3-Year Value */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Valor a 3 Años</p>
                            <p className="text-2xl font-bold text-indigo-500">{formatCurrency(threeYearValue)}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                            <DollarSign className="h-6 w-6 text-indigo-500" />
                        </div>
                    </div>
                </div>

                {/* Benefits List */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                        Beneficios Incluidos
                    </h4>
                    <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Soporte técnico durante implementación</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Formación del equipo incluida</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">Mantenimiento primer año</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <Button className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20">
                    Solicitar Análisis Personalizado
                </Button>
            </CardContent>
        </Card>
    );
}

