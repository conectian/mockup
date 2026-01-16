import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MessageSquare, Plus } from 'lucide-react';

export default function ClientRequestDetail() {
    const { id } = useParams();

    return (
        <div className="max-w-5xl mx-auto space-y-8 p-6">
            <Link to="/client/marketplace">
                <Button variant="ghost" className="gap-2 pl-0 hover:pl-2 transition-all">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Marketplace
                </Button>
            </Link>

            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20">Solicitud Activa</Badge>
                        <span className="text-muted-foreground text-sm">ID: {id}</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Solicitud de Innovación #{id}</h1>
                    <p className="text-muted-foreground mt-2">Gestión de respuestas y detalles del reto.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Nueva Actualización
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="col-span-2 p-8 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4 bg-muted/10 h-64">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">Respuestas de Proveedores</h3>
                        <p className="text-muted-foreground">
                            Lista de soluciones propuestas por proveedores verificados.
                        </p>
                    </div>
                </Card>

                <Card className="p-6 space-y-4 h-fit">
                    <h3 className="font-bold border-b border-border pb-2">Estadísticas</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Vistas:</span>
                            <span className="font-medium">1,204</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Respuestas:</span>
                            <span className="font-medium">12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Días activo:</span>
                            <span className="font-medium">15</span>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
