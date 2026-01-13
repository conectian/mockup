import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center mb-6 ring-4 ring-violet-500/10">
                <Compass className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
                Lo sentimos, la página que estás buscando no existe o ha sido movida a otro lugar del universo Conectian.
            </p>
            <Link to="/">
                <Button size="lg" className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                    <ArrowLeft className="h-4 w-4" />
                    Volver al Inicio
                </Button>
            </Link>
        </div>
    );
}
