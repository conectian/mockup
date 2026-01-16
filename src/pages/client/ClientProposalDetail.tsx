import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle, FileText, Download } from 'lucide-react';

export default function ClientProposalDetail() {
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
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">Propuesta Recibida</Badge>
                        <span className="text-muted-foreground text-sm">ID: {id}</span>
                    </div>
                    <h1 className="text-3xl font-display font-bold text-foreground">Propuesta Detallada #{id}</h1>
                    <p className="text-muted-foreground mt-2">Detalles completos de la propuesta técnica y económica.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Descargar PDF
                    </Button>
                    <Button className="gap-2">
                        <CheckCircle className="h-4 w-4" /> Aceptar Propuesta
                    </Button>
                </div>
            </div>

            <Card className="p-12 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4 bg-muted/10">
                <div className="bg-primary/10 p-4 rounded-full">
                    <FileText className="h-10 w-10 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Contenido de la Propuesta</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Aquí se mostraría el desglose completo de la propuesta, incluyendo alcance, costes, cronograma y términos legales.
                    </p>
                </div>
            </Card>
        </div>
    );
}
