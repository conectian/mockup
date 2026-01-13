import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, Users, TrendingUp } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6">
                        <Zap className="h-4 w-4" />
                        El ecosistema de innovación B2B
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                        Conecta con el
                        <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent"> futuro </span>
                        de tu empresa
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Conectian es el marketplace donde startups innovadoras y empresas líderes se encuentran para transformar ideas en soluciones reales.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/auth/role-selection">
                            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 gap-2">
                                Comenzar ahora
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                        </Link>
                        <Button size="lg" variant="outline">
                            Ver demo
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 border-t bg-muted/30">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">¿Por qué Conectian?</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-4">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Conexiones Estratégicas</h3>
                            <p className="text-muted-foreground text-sm">
                                Encuentra los partners tecnológicos perfectos para acelerar tu transformación digital.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                                <Shield className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Deal Rooms Seguras</h3>
                            <p className="text-muted-foreground text-sm">
                                Negocia y colabora en espacios privados con toda la documentación y comunicación centralizada.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Métricas de Impacto</h3>
                            <p className="text-muted-foreground text-sm">
                                Mide el ROI de cada colaboración y demuestra el valor de la innovación abierta.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
