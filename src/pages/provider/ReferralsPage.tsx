import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Users,
    Euro,
    Copy,
    Check,
    Linkedin,
    Twitter,
    MessageCircle,
    TrendingUp,
    Gift,
    Handshake
} from 'lucide-react';

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
