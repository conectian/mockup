import { useState } from 'react';
import { useDealStore } from '@/store/useDealStore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Send,
    MessageSquare,
    Paperclip,
    Calendar,
    CheckSquare,
    Info,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DealChat() {
    const { messages, addMessage } = useDealStore();
    const [inputValue, setInputValue] = useState('');

    const handleSend = () => {
        if (!inputValue.trim()) return;

        addMessage({
            type: 'user',
            sender: 'Tú',
            senderRole: 'client',
            content: inputValue,
        });

        setInputValue('');
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Chat Header - Glassmorphism */}
            <div className="px-6 py-4 border-b border-white/5 bg-card/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-lg leading-none mb-1">Conversación</h2>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{messages.length} mensajes en total</p>
                    </div>
                </div>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-3 py-1 font-bold text-[10px] tracking-wider uppercase">
                    Sesión Encriptada
                </Badge>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 px-6">
                <div className="py-8 space-y-8 max-w-4xl mx-auto">
                    {messages.map((msg: any) => (
                        <div key={msg.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {msg.type === 'system' ? (
                                <div className="flex justify-center my-4">
                                    <div className={cn(
                                        'flex items-center gap-3 px-6 py-2 rounded-md border backdrop-blur-sm text-xs font-bold tracking-tight shadow-lg shadow-black/5',
                                        msg.systemType === 'success' && 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
                                        msg.systemType === 'warning' && 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
                                        msg.systemType === 'info' && 'bg-slate-500/10 border-slate-500/20 text-slate-500'
                                    )}>
                                        {msg.systemType === 'success' && <CheckCircle2 className="h-3.5 w-3.5" />}
                                        {msg.systemType === 'warning' && <AlertCircle className="h-3.5 w-3.5" />}
                                        {msg.systemType === 'info' && <Info className="h-3.5 w-3.5" />}
                                        {msg.content}
                                        <span className="text-[10px] opacity-40 font-medium ml-4">{msg.timestamp}</span>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className={cn(
                                        'flex flex-col',
                                        msg.senderRole === 'client' ? 'items-end' : 'items-start'
                                    )}
                                >
                                    <div className="flex items-center gap-2 mb-2 px-1">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground/60">{msg.sender}</span>
                                        <span className="text-[10px] font-medium text-muted-foreground/40">{msg.timestamp}</span>
                                    </div>
                                    <div
                                        className={cn(
                                            'max-w-[85%] md:max-w-[70%] px-5 py-3.5 shadow-2xl relative',
                                            msg.senderRole === 'client'
                                                ? 'bg-gradient-to-br from-primary to-indigo-600 text-primary-foreground rounded-md rounded-tr-none shadow-primary/20'
                                                : 'bg-card/80 backdrop-blur-md border border-white/10 rounded-md rounded-tl-none shadow-black/5'
                                        )}
                                    >
                                        <p className="text-sm md:text-base leading-relaxed font-medium">{msg.content}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Input Area - Glassmorphism HUD */}
            <div className="p-6 pb-8 border-t border-white/5 bg-background/80 backdrop-blur-xl sticky bottom-0">
                <div className="max-w-4xl mx-auto space-y-4">
                    {/* Floating Action Bar */}
                    <div className="flex flex-wrap gap-2 px-1">
                        <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold rounded-md bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                            <CheckSquare className="h-3.5 w-3.5 text-primary" />
                            Solicitar Aprobación
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold rounded-md bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                            <Paperclip className="h-3.5 w-3.5 text-primary" />
                            Subir Archivo
                        </Button>
                        <Button variant="outline" size="sm" className="h-9 gap-2 text-xs font-bold rounded-md bg-white/5 border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all">
                            <Calendar className="h-3.5 w-3.5 text-primary" />
                            Agendar Demo
                        </Button>
                    </div>

                    {/* Message Composer */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-indigo-600/20 to-primary/20 rounded-md blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-3 p-2 bg-card border border-white/10 rounded-md shadow-2xl focus-within:border-primary/40 transition-all">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground/40 font-bold ml-1">
                                C
                            </div>
                            <textarea
                                placeholder="Escribe tu mensaje aquí..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                className="flex-1 min-h-[48px] max-h-32 py-3 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm font-medium placeholder:text-muted-foreground/40 resize-none"
                            />
                            <Button
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                className="h-12 w-12 shrink-0 rounded-md bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100"
                            >
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground/40 font-bold uppercase tracking-widest pt-2">
                        Pulsa Enter para enviar • Shift+Enter para nueva línea
                    </p>
                </div>
            </div>
        </div>
    );
}
