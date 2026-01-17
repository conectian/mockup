import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';
import { mockUseCases } from '@/data/marketplace-data';
import { Send, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SendProposalModalProps {
    companyName: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function SendProposalModal({
    companyName,
    isOpen,
    onClose,
}: SendProposalModalProps) {
    const [selectedUseCases, setSelectedUseCases] = useState<string[]>([]);

    // Simulate "my" use cases provided by this vendor
    const myUseCases = mockUseCases.slice(0, 5);

    const toggleUseCase = (id: string) => {
        if (selectedUseCases.includes(id)) {
            setSelectedUseCases(selectedUseCases.filter(uid => uid !== id));
        } else {
            setSelectedUseCases([...selectedUseCases, id]);
        }
    };

    const handleSend = () => {
        if (selectedUseCases.length === 0) return;

        toast.success('Propuesta enviada con éxito', {
            description: `Hemos enviado ${selectedUseCases.length} casos de uso a ${companyName}. Te notificaremos cuando los revisen.`
        });
        onClose();
        setSelectedUseCases([]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg card border-white/20">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Send className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <DialogTitle className="text-[#243A57] dark:text-white">Enviar Propuesta</DialogTitle>
                            <DialogDescription>
                                Selecciona tus casos de uso para presentar a <span className="font-bold text-foreground">{companyName}</span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-4">
                        <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mis Casos de Uso Disponibles</Label>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 -mr-2 custom-scrollbar">
                            {myUseCases.map((uc) => {
                                const isSelected = selectedUseCases.includes(uc.id);
                                return (
                                    <div
                                        key={uc.id}
                                        className={cn(
                                            "flex items-start space-x-4 p-4 rounded-xl border transition-all cursor-pointer group",
                                            isSelected
                                                ? "bg-primary/5 border-primary shadow-[0_0_15px_-5px_rgba(var(--primary),0.3)]"
                                                : "bg-card border-border hover:border-primary/50 hover:bg-accent/50"
                                        )}
                                        onClick={() => toggleUseCase(uc.id)}
                                    >
                                        <div className={cn(
                                            "mt-1 h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                                            isSelected
                                                ? "bg-primary border-primary text-primary-foreground"
                                                : "border-muted-foreground/30 group-hover:border-primary/70"
                                        )}>
                                            {isSelected && <Check className="h-3.5 w-3.5" />}
                                        </div>
                                        <div className="grid gap-1.5 leading-none">
                                            <label
                                                className={cn(
                                                    "text-sm font-bold cursor-pointer transition-colors",
                                                    isSelected ? "text-primary" : "text-foreground"
                                                )}
                                            >
                                                {uc.title}
                                            </label>
                                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                                {uc.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSend}
                        className="premium-gradient gap-2 disabled:opacity-50"
                        disabled={selectedUseCases.length === 0}
                    >
                        <Send className="h-4 w-4" /> Enviar Propuesta
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
