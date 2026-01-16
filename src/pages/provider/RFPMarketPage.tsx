import { mockRFPs } from '@/data/rfp-data';
import RFPActionCard from '@/components/rfp/RFPActionCard';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { MultiSelect } from '@/components/ui/multi-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function RFPMarketPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        industries: [] as string[],
        budgetRange: '',
        status: [] as string[]
    });

    const filteredRFPs = mockRFPs.filter(
        (rfp) =>
            rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfp.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const SidebarContent = () => (
        <div className="space-y-8">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filtros
            </h3>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Industria</Label>
                <MultiSelect
                    options={['Retail', 'Fintech', 'Health', 'Logistics', 'Manuf.']}
                    selected={filters.industries}
                    onChange={(val) => setFilters({ ...filters, industries: val })}
                    placeholder="Seleccionar..."
                />
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Presupuesto</Label>
                <Select value={filters.budgetRange} onValueChange={(v) => setFilters({ ...filters, budgetRange: v })}>
                    <SelectTrigger className="w-full bg-muted/30 border-white/10">
                        <SelectValue placeholder="Cualquiera" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="low">{'< 50k'}</SelectItem>
                        <SelectItem value="mid">{'50k - 150k'}</SelectItem>
                        <SelectItem value="high">{'> 150k'}</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/80">Estado</Label>
                <div className="space-y-2">
                    {['Urgent', 'New', 'Closing Soon'].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                            <input type="checkbox" id={`rfp_${status}`} className="rounded border-white/10 bg-white/5 text-primary focus:ring-primary" />
                            <Label htmlFor={`rfp_${status}`} className="text-sm font-normal cursor-pointer">{status}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block">
                <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <SidebarContent />
                </div>
            </div>

            <div className="space-y-6">
                {/* Search & Filters Header */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold tracking-tight">Oportunidades de Negocio</h1>
                        <p className="text-muted-foreground">Encuentra nuevas demandas de innovación</p>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                        <div className="relative flex-1 sm:w-[280px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título, industria..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-white/50 dark:bg-white/5 border-white/10 h-10"
                            />
                        </div>
                        <Button variant="outline" className="lg:hidden gap-2 border-white/10 hover:bg-white/5">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Results Info */}
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
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </div>
    );
}
