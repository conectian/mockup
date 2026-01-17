import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Building2 } from 'lucide-react';
import { mockUseCases } from '@/data/marketplace-data';
import { Link } from 'react-router-dom';

// Get unique providers from mock data as "Favorites"
const favoriteProviders = Array.from(new Set(mockUseCases.map(u => u.providerName)))
    .map(name => {
        const useCase = mockUseCases.find(u => u.providerName === name);
        return {
            name,
            tier: useCase?.providerTier,
            image: useCase?.image,
            industry: useCase?.industry
        };
    }).slice(0, 4);

export default function ClientFavoritesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Proveedores Favoritos</h1>
                <p className="text-muted-foreground">Tus partners tecnológicos de confianza</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {favoriteProviders.map((provider, i) => (
                    <Card key={i} className="hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="h-14 w-14 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                                    {provider.name.charAt(0)}
                                </div>
                                <Button variant="ghost" size="icon" className="text-yellow-400 hover:text-yellow-500">
                                    <Star className="h-5 w-5 fill-current" />
                                </Button>
                            </div>

                            <h3 className="font-bold text-lg mb-1">{provider.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Building2 className="h-4 w-4" />
                                {provider.industry}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t">
                                <span className={`text-xs px-2 py-1 rounded-full border ${provider.tier === 'Gold' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                    provider.tier === 'Silver' ? 'bg-slate-50 text-slate-700 border-slate-200' :
                                        'bg-orange-50 text-orange-700 border-orange-200'
                                    }`}>
                                    {provider.tier} Partner
                                </span>
                                <Link to="/client/deal-rooms">
                                    <Button size="sm" variant="ghost" className="gap-1 h-8">
                                        Contactar <ArrowRight className="h-3 w-3" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
