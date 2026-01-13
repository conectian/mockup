import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, MessageSquare } from 'lucide-react';

interface ContactProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    providerName: string;
    useCaseTitle: string;
}

export default function ContactProviderModal({
    isOpen,
    onClose,
    providerName,
    useCaseTitle,
}: ContactProviderModalProps) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!message.trim()) {
            toast.error('Por favor, describe tu necesidad');
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success('¡Deal Room creado!', {
            description: 'El proveedor ha sido notificado y responderá en breve.',
        });

        setIsSubmitting(false);
        onClose();
        setMessage('');

        // Navigate to the new deal room
        navigate('/deal-room/dr-new-001');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Iniciar Conversación
                    </DialogTitle>
                    <DialogDescription>
                        Conecta con <span className="font-semibold">{providerName}</span> sobre{' '}
                        <span className="font-semibold">"{useCaseTitle}"</span>
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="message">Describe brevemente tu necesidad</Label>
                        <Textarea
                            id="message"
                            placeholder="Hola, estamos interesados en implementar esta solución para nuestra empresa. Nos gustaría conocer más sobre los tiempos de implementación y costes..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            className="resize-none"
                        />
                    </div>

                    <div className="bg-muted/50 rounded-md p-3 text-sm text-muted-foreground">
                        <p>
                            💡 <strong>Tip:</strong> Cuanta más información proporciones, mejor podrá el proveedor preparar una propuesta ajustada a tus necesidades.
                        </p>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creando Deal Room...
                            </>
                        ) : (
                            'Enviar y Abrir Deal Room'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
