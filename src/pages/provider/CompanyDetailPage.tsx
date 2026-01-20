import { useParams, Link, useNavigate } from 'react-router-dom';
import { TARGET_COMPANIES } from '@/data/marketplace-data';
import { mockRFPs } from '@/data/rfp-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Building2, Globe, MapPin, Users, Wallet, Zap, ArrowRight, LayoutDashboard } from 'lucide-react';
import RFPActionCard from '@/components/rfp/RFPActionCard';
import { useState } from 'react';
import SendProposalModal from '@/components/marketplace/SendProposalModal';

export default function CompanyDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);

    const company = TARGET_COMPANIES.find(c => c.id === id);

    if (!company) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <h1 className="text-2xl font-bold">Empresa no encontrada</h1>
                <Button onClick={() => navigate('/provider/marketplace')}>Volver al Marketplace</Button>
            </div>
        );
    }

    // Mocking RFPs for this company. In a real app, we filter by company ID.
    // We'll take the first 3 mock requests and pretend they belong to this company.
    const companyRFPs = mockRFPs.slice(0, company.rfps || 2).map((rfp, index) => ({
        ...rfp,
        // Override with current company details to make it look realistic
        id: `rfp-${company.id}-${index}`,
        clientName: company.name,
        industry: company.industry,
    }));

    const IconComponent = company.icon;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Hero */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
                {/* Background Image with Blur */}
                <div className="absolute inset-0 z-0">
                    <img src={company.image} alt="Background" className="w-full h-full object-cover opacity-60 scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/80" />
                </div>

                <div className="relative z-10 p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-end justify-between">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center w-full md:w-auto">
                        <div className={`h-20 w-20 md:h-32 md:w-32 rounded-2xl flex items-center justify-center text-white shadow-2xl shrink-0 border-4 border-background ${company.color}`}>
                            <IconComponent className="h-10 w-10 md:h-16 md:w-16" />
                        </div>
                        <div className="space-y-2 w-full">
                            <div className="flex flex-wrap gap-2 mb-1">
                                <Badge variant="secondary" className="bg-white/10 backdrop-blur-md border-white/10 text-foreground font-bold text-[10px] md:text-xs">{company.industry}</Badge>
                                {company.tierBadge && (
                                    <Badge variant="outline" className="border-primary/50 text-primary font-bold text-[10px] md:text-xs">{company.tierBadge}</Badge>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-5xl font-display font-bold text-foreground tracking-tight break-words">{company.name}</h1>
                            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm text-muted-foreground font-medium">
                                <div className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 md:h-4 md:w-4" /> España (HQ)</div>
                                <div className="flex items-center gap-1.5 truncate max-w-[150px] md:max-w-none"><Globe className="h-3.5 w-3.5 md:h-4 md:w-4" /> {company.name.toLowerCase().replace(/\s/g, '')}.com</div>
                                <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 md:h-4 md:w-4" /> {company.employees}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full md:w-auto mt-2 md:mt-0">
                        <Link to="/provider/marketplace" className="flex-1 md:flex-none">
                            <Button variant="outline" className="gap-2 font-bold w-full md:w-auto h-11 md:h-10">
                                <ArrowLeft className="h-4 w-4" /> <span className="md:inline">Volver</span>
                            </Button>
                        </Link>
                        <Button onClick={() => setIsProposalModalOpen(true)} className="flex-[2] md:flex-none gap-2 font-bold bg-primary text-primary-foreground hover:bg-primary/90 w-full md:w-auto shadow-xl shadow-primary/20 hover:scale-105 transition-transform h-11 md:h-10">
                            Propuesta <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
                {/* Main Content: Info & RFPs */}
                <div className="space-y-8">
                    {/* Description */}
                    <Card className="border-white/5 bg-card/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                Sobre {company.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                {company.description || `${company.name} es una empresa líder en el sector ${company.industry}. Están enfocados en la transformación digital y buscan partners estratégicos para acelerar sus iniciativas tecnológicas.`}
                            </p>
                            <div className="flex flex-wrap gap-2 pt-2">
                                {company.tech.map(t => (
                                    <Badge key={t} variant="secondary" className="bg-muted/50 hover:bg-muted font-medium">{t}</Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Needs / RFPs */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                            <Zap className="h-6 w-6 text-amber-500" />
                            Necesidades Activas ({companyRFPs.length})
                        </h2>
                        <div className="grid gap-6">
                            {companyRFPs.length > 0 ? (
                                companyRFPs.map(request => (
                                    <RFPActionCard key={request.id} rfp={request} />
                                ))
                            ) : (
                                <div className="p-8 text-center border border-dashed rounded-xl border-white/10 bg-muted/20">
                                    <p className="text-muted-foreground font-medium">No hay RFPs activas en este momento.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Stats & KPIs */}
                <div className="space-y-6">
                    <Card className="border-white/5 overflow-hidden sticky top-24">
                        <CardHeader className="bg-muted/30 pb-4">
                            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Datos Clave</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/5">
                                <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <Wallet className="h-4 w-4" /> Facturación
                                    </div>
                                    <div className="font-bold">{company.revenue}</div>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <Zap className="h-4 w-4" /> Nivel Innovación
                                    </div>
                                    <Badge variant="outline" className={company.innovation === 'ALTO' ? 'text-emerald-500 border-emerald-500/20 bg-emerald-500/10' : 'text-amber-500'}>
                                        {company.innovation}
                                    </Badge>
                                </div>
                                <div className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                        <LayoutDashboard className="h-4 w-4" /> ERP Principal
                                    </div>
                                    <div className="font-bold">{company.tech[0]}</div>
                                </div>
                            </div>
                            <div className="p-4 bg-muted/30 border-t border-white/5">
                                <p className="text-xs text-center text-muted-foreground">
                                    Datos verificados por Conectian
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <SendProposalModal
                companyName={company.name}
                isOpen={isProposalModalOpen}
                onClose={() => setIsProposalModalOpen(false)}
            />
        </div>
    );
}
