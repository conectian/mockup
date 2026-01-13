import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Star, ArrowRight } from 'lucide-react';

const mockProviders = [
    { id: 1, name: 'DataFlow AI', category: 'Inteligencia Artificial', rating: 4.8, cases: 12 },
    { id: 2, name: 'SecureChain', category: 'Blockchain', rating: 4.5, cases: 8 },
    { id: 3, name: 'AutomateX', category: 'Automatización', rating: 4.9, cases: 15 },
    { id: 4, name: 'LegalBot', category: 'Legaltech', rating: 4.6, cases: 6 },
];

export default function ClientMarketplace() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Explorar Marketplace</h1>
                <p className="text-muted-foreground">Descubre proveedores y soluciones innovadoras.</p>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar proveedores, tecnologías..." className="pl-10" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                </Button>
            </div>

            {/* Provider Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockProviders.map((provider) => (
                    <Card key={provider.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                                    {provider.name.charAt(0)}
                                </div>
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="text-sm font-medium">{provider.rating}</span>
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg mb-1">{provider.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{provider.category}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">{provider.cases} casos de uso</span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
