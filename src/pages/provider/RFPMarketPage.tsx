import { mockRFPs } from '@/data/rfp-data';

import RFPActionCard from '@/components/rfp/RFPActionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function RFPMarketPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRFPs = mockRFPs.filter(
        (rfp) =>
            rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar por título, industria..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white/50 dark:bg-white/5 border-white/10 h-10"
                    />
                </div>
                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                    <Filter className="h-4 w-4" />
                    Filtros
                </Button>
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-2">
                <Badge className="bg-primary/10 text-primary border-0 text-sm px-3 h-6">
                    {filteredRFPs.length} oportunidades
                </Badge>
                {searchTerm && (
                    <span className="text-sm text-muted-foreground">
                        para "{searchTerm}"
                    </span>
                )}
            </div>

            {/* RFP Cards Grid */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredRFPs.map((rfp) => (
                    <RFPActionCard key={rfp.id} rfp={rfp} />
                ))}
            </div>

            {filteredRFPs.length === 0 && (
                <Card className="glass-card border-white/10">
                    <CardContent className="py-12 text-center">
                        <Search className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-semibold mb-2 text-[#243A57] dark:text-white">No se encontraron oportunidades</h3>
                        <p className="text-muted-foreground">Prueba ajustando los filtros de búsqueda</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
