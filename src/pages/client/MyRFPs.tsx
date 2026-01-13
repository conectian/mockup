import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Clock } from 'lucide-react';

const mockRFPs = [
    {
        id: 'rfp-001',
        title: 'Solución de automatización de procesos',
        status: 'open',
        responses: 8,
        deadline: '15 Ene 2026',
    },
    {
        id: 'rfp-002',
        title: 'Integración con sistemas legacy',
        status: 'closed',
        responses: 12,
        deadline: '10 Ene 2026',
    },
];

export default function MyRFPs() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Mis Necesidades</h1>
                    <p className="text-muted-foreground">Gestiona tus publicaciones de RFP.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Nueva Necesidad
                </Button>
            </div>

            <div className="space-y-4">
                {mockRFPs.map((rfp) => (
                    <Card key={rfp.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <CardTitle className="text-lg">{rfp.title}</CardTitle>
                                <Badge variant={rfp.status === 'open' ? 'default' : 'secondary'}>
                                    {rfp.status === 'open' ? 'Abierta' : 'Cerrada'}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {rfp.responses} respuestas
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        Fecha límite: {rfp.deadline}
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">Ver detalles</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
