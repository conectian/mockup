import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Users,
    Handshake,
    Euro,
    Copy,
    Check,
    ArrowRight,
    Linkedin,
    Twitter,
    MessageCircle,
    TrendingUp,
    Gift,
    Star
} from 'lucide-react';

const NETWORKING_OPPORTUNITIES = [
    {
        id: 1,
        type: 'Colaboración',
        company: 'Robotics Corp',
        verified: true,
        title: 'Proyecto de Visión Artificial',
        description: 'Empresa de robótica busca partner especializado en Computer Vision para proyecto industrial.',
        tags: ['Computer Vision', 'Deep Learning', 'Python'],
        budget: '€40K - €60K',
        daysAgo: 2,
    },
    {
        id: 2,
        type: 'Joint Venture',
        company: 'FinTech Global',
        verified: true,
        title: 'Expansión a Mercado LATAM',
        description: 'Consultora busca socio tecnológico para implementar soluciones de IA en banca latinoamericana.',
        tags: ['FinTech', 'Banking', 'AI'],
        budget: '€100K+',
        daysAgo: 5,
        featured: true,
    },
    {
        id: 3,
        type: 'Referido',
        company: 'Data Solutions',
        verified: true,
        title: 'Cliente Enterprise busca NLP',
        description: 'Tenemos un cliente grande que necesita procesamiento de lenguaje natural. Buscamos experto.',
        tags: ['NLP', 'Transformers', 'LLMs'],
        budget: '€50K - €90K',
        daysAgo: 7,
    },
];

export default function ReferralsPage() {
    const [copied, setCopied] = useState(false);
    const referralLink = 'https://conectian.com/partner/techsolutions-ai';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
                <Card className="p-5 border-border bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">24</p>
                            <p className="text-sm text-muted-foreground">Partners Activos</p>
                            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3" /> +12% este mes
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border-border bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Handshake className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">8</p>
                            <p className="text-sm text-muted-foreground">Deals Compartidos</p>
                            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3" /> +3 últimos 7 días
                            </p>
                        </div>
                    </div>
                </Card>

                <Card className="p-5 border-border bg-primary/5">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
                            <Euro className="h-6 w-6 text-violet-400" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">€1,250</p>
                            <p className="text-sm text-muted-foreground">Comisiones Generadas</p>
                            <p className="text-xs text-emerald-400 flex items-center gap-1 mt-1">
                                <TrendingUp className="h-3 w-3" /> +€250 este semana
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Networking Opportunities */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        Oportunidades de Networking
                    </h2>
                    <Badge variant="outline" className="text-primary border-primary">
                        3 disponibles
                    </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {NETWORKING_OPPORTUNITIES.map((opp) => (
                        <Card
                            key={opp.id}
                            className={`p-5 border-border hover:border-primary/30 transition-all ${opp.featured ? 'ring-1 ring-emerald-500/30' : ''
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Badge
                                    className={
                                        opp.type === 'Colaboración'
                                            ? 'bg-blue-500/20 text-blue-400 border-0'
                                            : opp.type === 'Joint Venture'
                                                ? 'bg-emerald-500/20 text-emerald-400 border-0'
                                                : 'bg-violet-500/20 text-violet-400 border-0'
                                    }
                                >
                                    {opp.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">Hace {opp.daysAgo} días</span>
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    {opp.company.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-semibold">{opp.company}</p>
                                    {opp.verified && (
                                        <p className="text-xs text-emerald-400 flex items-center gap-1">
                                            <Check className="h-3 w-3" /> Verificado
                                        </p>
                                    )}
                                </div>
                            </div>

                            <h3 className="font-semibold mb-2">{opp.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{opp.description}</p>

                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {opp.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-primary">{opp.budget}</span>
                                <Button size="sm" className="gap-2">
                                    Conectar <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Referral Invite Section */}
            <Card className="p-6 border-border bg-primary/5">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Gift className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-display font-bold">Invita a Otros Proveedores</h2>
                                <p className="text-sm text-muted-foreground">
                                    Gana comisiones recurrentes por cada proveedor que se una a la plataforma a través de tu enlace de referido.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-6 mb-6">
                            <div className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span>5% comisión recurrente</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span>Bonos por hitos alcanzados</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Check className="h-4 w-4 text-emerald-400" />
                                <span>Acceso a programa VIP</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 relative">
                                <Input
                                    value={referralLink}
                                    readOnly
                                    className="pr-24 bg-background/50 border-white/10 font-mono text-sm"
                                />
                                <Button
                                    size="sm"
                                    onClick={handleCopy}
                                    className="absolute right-1 top-1/2 -translate-y-1/2 gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" /> Copiado
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" /> Copiar
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            <span className="text-sm text-muted-foreground">Compartir en:</span>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Linkedin className="h-4 w-4" /> LinkedIn
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Twitter className="h-4 w-4" /> Twitter
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <MessageCircle className="h-4 w-4" /> WhatsApp
                            </Button>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center justify-center">
                        <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-16 w-16 text-primary/60" />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
