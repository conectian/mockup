import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldX, ArrowLeft } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mb-6 ring-4 ring-red-500/10">
                <ShieldX className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold mb-2">403</h1>
            <h2 className="text-2xl font-semibold mb-4">Acceso Denegado</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                No tienes los permisos necesarios para ver esta página. Si crees que esto es un error, contacta con el administrador.
            </p>
            <Link to="/">
                <Button size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 font-bold">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Inicio
                </Button>
            </Link>
        </div>
    );
}
