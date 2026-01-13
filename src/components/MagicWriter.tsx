import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface MagicWriterProps {
    onSuggest: (text: string) => void;
    context: 'rfp' | 'chat';
    isWriting?: boolean;
}

const suggestions = {
    rfp: "Buscamos una solución integral para la digitalización de nuestro inventario y logística. Actualmente gestionamos el stock mediante hojas de cálculo desconectadas, lo que provoca errores de conteo y roturas de stock frecuentes. Necesitamos un sistema que se integre con SAP, permita escaneo de códigos QR en tiempo real y ofrezca un dashboard de control de mermas. El objetivo es reducir las discrepancias de inventario en un 40% durante el primer año.",
    chat: "Hola equipo, adjunto la propuesta revisada según los términos discutidos en la última reunión. Hemos ajustado el alcance de la Fase 2 para alinearnos con vuestro presupuesto, manteniendo los entregables clave de seguridad y compliance. Quedo a la espera de vuestro feedback para proceder con la firma del contrato.",
};

export default function MagicWriter({ onSuggest, context, isWriting = false }: MagicWriterProps) {
    const [thinking, setThinking] = useState(false);

    const handleMagic = async () => {
        setThinking(true);

        // Simulate AI thinking time
        await new Promise(resolve => setTimeout(resolve, 1500));

        setThinking(false);
        onSuggest(suggestions[context]);
        toast.success('Texto generado con Conectian Brain AI');
    };

    return (
        <div className="flex items-center gap-2 mb-2">
            <Button
                variant="outline"
                size="sm"
                onClick={handleMagic}
                disabled={thinking || isWriting}
                className={cn(
                    "gap-2 bg-gradient-to-r hover:text-white transition-all border-violet-200 dark:border-violet-800",
                    thinking
                        ? "from-violet-100 to-fuchsia-100 dark:from-violet-900/50 dark:to-fuchsia-900/50"
                        : "hover:from-violet-500 hover:to-fuchsia-500 text-violet-600 dark:text-violet-400"
                )}
            >
                {thinking ? (
                    <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Pensando...
                    </>
                ) : (
                    <>
                        <Sparkles className="h-3 w-3" />
                        Generar con IA
                    </>
                )}
            </Button>

            {thinking && (
                <span className="text-xs text-muted-foreground animate-pulse">
                    Analizando contexto...
                </span>
            )}
        </div>
    );
}
