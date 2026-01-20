import { useCreditsStore } from '@/store/useCreditsStore';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Unlock, Coins, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UnlockLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    rfpId: string;
    rfpTitle: string;
    cost: number;
    onUnlocked: () => void;
}

export default function UnlockLeadModal({
    isOpen,
    onClose,
    rfpId,
    rfpTitle,
    cost,
    onUnlocked,
}: UnlockLeadModalProps) {
    const { balance, spendCredits } = useCreditsStore();
    const canAfford = balance >= cost;
    const finalBalance = balance - cost;

    const handleConfirm = () => {
        if (!canAfford) {
            toast.error('Créditos insuficientes', {
                description: 'Necesitas comprar más créditos para desbloquear esta oportunidad.',
            });
            return;
        }

        const success = spendCredits(cost, rfpId);
        if (success) {
            toast.success('¡Oportunidad desbloqueada!', {
                description: 'Ahora puedes ver los datos de contacto y enviar tu propuesta.',
            });
            onUnlocked();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Unlock className="h-5 w-5 text-primary" />
                        Desbloquear Oportunidad
                    </DialogTitle>
                    <DialogDescription>
                        Vas a desbloquear el contacto de este RFP para poder enviar tu propuesta.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="bg-muted/50 rounded-md p-4">
                        <div className="text-sm text-muted-foreground mb-1">Oportunidad</div>
                        <div className="font-medium">{rfpTitle}</div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Tu saldo actual</span>
                            <div className="flex items-center gap-1 font-medium">
                                <Coins className="h-4 w-4 text-amber-500" />
                                {balance} Créditos
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-red-500">
                            <span className="text-sm">Coste de desbloqueo</span>
                            <span className="font-medium">-{cost} Créditos</span>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Saldo final</span>
                            <div className={`flex items-center gap-1 font-bold ${canAfford ? 'text-emerald-600' : 'text-red-500'}`}>
                                <Coins className="h-4 w-4" />
                                {finalBalance} Créditos
                            </div>
                        </div>
                    </div>

                    {!canAfford && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-md text-red-600 dark:text-red-400">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <strong>Saldo insuficiente.</strong> Necesitas {cost - balance} créditos más para desbloquear esta oportunidad.
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!canAfford}
                        className="h-auto py-2 px-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/90 whitespace-normal leading-tight"
                    >
                        <Unlock className="h-4 w-4 shrink-0" />
                        <span>Confirmar y Desbloquear</span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
