import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, FolderKanban, Search, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock recommended use cases
const mockRecommendations = [
    {
        id: 1,
        title: 'Automatización de Facturas con IA',
        provider: 'DataFlow AI',
        category: 'Fintech',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=200&fit=crop',
    },
    {
        id: 2,
        title: 'Chatbot de Soporte 24/7',
        provider: 'BotMaster',
        category: 'Customer Service',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=200&fit=crop',
    },
    {
        id: 3,
        title: 'Analytics Predictivo de Ventas',
        provider: 'InsightPro',
        category: 'Analytics',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
    },
];

export default function ClientHome() {
    const companyName = 'Acme Corp'; // Mock company name

    return (
        <div className="space-y-10">
            {/* Hero Banner */}
            <Card className="border-0 mesh-gradient text-white overflow-hidden relative rounded-md shadow-2xl shadow-indigo-500/20">
                <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                <CardContent className="py-12 px-8 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                        <div className="max-w-xl">
                            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight leading-tight">
                                Hola, {companyName} <span className="inline-block animate-bounce-slow">👋</span>
                            </h1>
                            <p className="text-white/80 text-lg md:text-xl font-medium max-w-md leading-relaxed">
                                ¿Qué desafío de innovación resolvemos hoy para tu empresa?
                            </p>
                        </div>
                        <Link to="/marketplace" className="shrink-0">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-white/90 gap-3 shadow-xl shadow-black/20 px-8 py-7 text-lg font-bold rounded-md transition-all hover:scale-105 active:scale-95">
                                <Search className="h-6 w-6" />
                                Explorar Soluciones
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Status Cards */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-white/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText className="h-24 w-24 -mr-8 -mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">Mis RFPs Activos</CardTitle>
                        <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                            <FileText className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-display font-bold text-foreground">2</div>
                                <p className="text-sm font-medium text-muted-foreground mt-1 text-balance">Solicitudes de propuesta publicadas</p>
                            </div>
                            <Link to="/client/rfps">
                                <Button variant="ghost" size="sm" className="rounded-md gap-2 font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    Ver todas
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-white/5 relative overflow-hidden rounded-md">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FolderKanban className="h-24 w-24 -mr-8 -mt-8" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground/70">Deal Rooms Abiertos</CardTitle>
                        <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-500">
                            <FolderKanban className="h-5 w-5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-5xl font-display font-bold text-foreground">1</div>
                                <p className="text-sm font-medium text-muted-foreground mt-1 text-balance">Negociación técnica en curso</p>
                            </div>
                            <Link to="/deal-rooms">
                                <Button variant="ghost" size="sm" className="rounded-md gap-2 font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    Ir a salas
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recommendations */}
            <div className="pt-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-violet-500">
                            <Sparkles className="h-5 w-5 fill-current" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em]">IA Recomendaciones</span>
                        </div>
                        <h2 className="text-3xl font-display font-bold tracking-tight">Seleccionado para ti</h2>
                    </div>
                    <Link to="/marketplace">
                        <Button variant="outline" className="rounded-md border-white/10 hover:bg-white/5 font-bold gap-2">
                            Ver catálogo completo
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {mockRecommendations.map((item) => (
                        <Card key={item.id} className="py-0 overflow-hidden group cursor-pointer border-white/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-md">
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <Badge className="bg-white/20 backdrop-blur-md text-white border-white/20 hover:bg-white/30">
                                        Explorar detalles
                                    </Badge>
                                </div>
                                <Badge className="absolute top-4 left-4 glass-card text-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                                    {item.category}
                                </Badge>
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                                    {item.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                                        {item.provider.charAt(0)}
                                    </div>
                                    <p className="text-sm font-medium text-muted-foreground/80">{item.provider}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
