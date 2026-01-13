import { mockRFPs } from '@/data/rfp-data';
import { useCreditsStore } from '@/store/useCreditsStore';
import RFPActionCard from '@/components/rfp/RFPActionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Coins, Search, Filter, TrendingUp, Plus } from 'lucide-react';
import { useState } from 'react';

export default function RFPMarketPage() {
    const { balance } = useCreditsStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRFPs = mockRFPs.filter(
        (rfp) =>
            rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Oportunidades</h1>
                    <p className="text-muted-foreground">RFPs activos de empresas buscando soluciones</p>
                </div>

                {/* Credits Balance */}
                <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
                    <CardContent className="py-3 px-4 flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                                <Coins className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <div className="text-xs text-muted-foreground">Tu saldo</div>
                                <div className="text-xl font-bold text-amber-600 dark:text-amber-400">
                                    {balance} Créditos
                                </div>
                            </div>
                        </div>
                        <Button size="sm" variant="outline" className="gap-1">
                            <Plus className="h-4 w-4" />
                            Comprar
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                            <TrendingUp className="h-4 w-4" />
                            <span className="text-sm">RFPs Activos</span>
                        </div>
                        <div className="text-2xl font-bold">{mockRFPs.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">Volumen Total</div>
                        <div className="text-2xl font-bold">€275k - €415k</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground mb-1">Nuevos esta semana</div>
                        <div className="text-2xl font-bold text-emerald-600">+3</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título, industria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2">
                <Badge variant="secondary">{filteredRFPs.length} oportunidades</Badge>
                {searchTerm && (
                    <span className="text-sm text-muted-foreground">
                        para "{searchTerm}"
                    </span>
                )}
            </div>

            {/* RFP Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredRFPs.map((rfp) => (
                    <RFPActionCard key={rfp.id} rfp={rfp} />
                ))}
            </div>

            {filteredRFPs.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No se encontraron oportunidades</h3>
                        <p className="text-muted-foreground">Prueba ajustando los filtros de búsqueda</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
