import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowRight, User, Cpu, TrendingUp, MessageSquare, Sparkles, X, Lightbulb, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// --- Interfaces ---
interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    suggestions?: string[];
}

interface AIChatbotModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSearchSuggestion?: (query: string) => void;
}

// --- Data ---
const SUGGESTED_PROMPTS = [
    {
        icon: Cpu,
        title: "Automatización",
        prompt: "Necesito automatizar procesos repetitivos en mi empresa",
        color: "text-blue-400",
        bg: "bg-blue-400/10 border-blue-400/20"
    },
    {
        icon: TrendingUp,
        title: "Analytics & BI",
        prompt: "Busco soluciones de IA para análisis de datos empresariales",
        color: "text-emerald-400",
        bg: "bg-emerald-400/10 border-emerald-400/20"
    },
    {
        icon: MessageSquare,
        title: "Atención al Cliente",
        prompt: "Quiero implementar un chatbot inteligente para atención al cliente",
        color: "text-violet-400",
        bg: "bg-violet-400/10 border-violet-400/20"
    },
];

const MOCK_RESPONSES: Record<string, { content: string; suggestions: string[] }> = {
    "automatiz": {
        content: "Para automatización de procesos, he analizado nuestro marketplace y estas son las mejores opciones para tu caso:\n\n• **RPA GenAI Core** - Automatiza el 85% de tareas repetitivas.\n• **Workflow Orchestrator** - Ideal para logística y operaciones.\n• **Document Intelligence** - Procesa facturas y contratos en segundos.\n\n¿Quieres que filtre los resultados por ROI estimado?",
        suggestions: ["Ver soluciones RPA", "Filtrar por mayor ROI", "Casos de éxito manufactura"]
    },
    "análisis": {
        content: "He encontrado 12 soluciones de Analytics verificadas. Basado en tu perfil, te recomiendo:\n\n• **Predictive Insight Pro** - Dashboards que anticipan tendencias.\n• **DataMining X** - Encuentra patrones ocultos en tus ventas.\n\n¿Te interesa ver una demo de alguna de estas herramientas?",
        suggestions: ["Ver demo Analytics", "Comparar precios", "Consultar con experto"]
    },
    "default": {
        content: "Entendido. Estoy analizando tu solicitud en nuestra base de datos de innovadores...\n\nPuedo ayudarte a encontrar proveedores certificados, calcular presupuestos estimados o redactar un RFP automático.\n\n¿Podrías darme un poco más de contexto sobre tu objetivo?",
        suggestions: ["Crear un RFP con IA", "Buscar proveedores Gold", "Explorar tendencias"]
    }
};

export default function AIChatbotModal({ open, onOpenChange, onSearchSuggestion }: AIChatbotModalProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus input
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
        if (!open) {
            setMessages([]);
            setInput('');
        }
    }, [open]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getAIResponse = (userMessage: string) => {
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('automatiz') || lowerMsg.includes('proceso')) return MOCK_RESPONSES['automatiz'];
        if (lowerMsg.includes('análisis') || lowerMsg.includes('datos')) return MOCK_RESPONSES['análisis'];
        return MOCK_RESPONSES['default'];
    };

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate thinking time with random variance
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        const response = getAIResponse(messageText);
        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            suggestions: response.suggestions
        };

        setIsTyping(false);
        setMessages(prev => [...prev, assistantMessage]);
    };

    const handleSuggestionClick = (suggestion: string) => {
        if (onSearchSuggestion) {
            onSearchSuggestion(suggestion);
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] h-[85vh] max-h-[800px] p-0 border-0 bg-transparent shadow-none overflow-hidden outline-none">

                {/* Main Container with Glassmorphism - Adaptive colors */}
                <div className="relative w-full h-full flex flex-col bg-background/80 backdrop-blur-2xl border border-border rounded-2xl overflow-hidden shadow-2xl shadow-primary/20">

                    {/* Animated Mesh Background */}
                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-violet-600 blur-[120px] animate-pulse" />
                        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-600 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
                    </div>

                    {/* Header - Adaptive */}
                    <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30 backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-black"></span>
                                </span>
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold text-foreground tracking-wide">Conectian AI</h2>
                                <p className="text-xs text-muted-foreground font-medium">Asistente Inteligente • <span className="text-emerald-500 font-bold">Online</span></p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 px-6 py-6 relative z-10" ref={scrollRef}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 mb-4">
                                        <Lightbulb className="h-8 w-8 text-yellow-500" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-foreground">¿Qué desafío resolvemos hoy?</h3>
                                    <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
                                        Soy tu copiloto de innovación. Analizo miles de soluciones para encontrar la perfecta para tu empresa.
                                    </p>
                                </div>

                                <div className="grid gap-3 w-full max-w-md">
                                    {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(prompt.prompt)}
                                            className={cn(
                                                "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 backdrop-blur-sm text-left relative overflow-hidden",
                                                prompt.bg,
                                                "hover:scale-[1.02] hover:shadow-lg hover:border-opacity-50"
                                            )}
                                        >
                                            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center bg-background/50 border border-border shrink-0", prompt.color)}>
                                                <prompt.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <p className={cn("text-sm font-bold mb-0.5 text-foreground")}>{prompt.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1 group-hover:text-foreground/70 transition-colors">{prompt.prompt}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={cn(
                                            "flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                            message.role === 'user' ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20 mt-1">
                                                <Sparkles className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                        <div className={cn(
                                            "max-w-[85%] space-y-3",
                                            message.role === 'user' ? "items-end flex flex-col" : ""
                                        )}>
                                            <div className={cn(
                                                "rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-md backdrop-blur-md border border-border",
                                                message.role === 'user'
                                                    ? "bg-primary text-primary-foreground rounded-tr-none shadow-primary/10"
                                                    : "bg-muted/50 text-foreground rounded-tl-none border-border/50"
                                            )}>
                                                <p className="whitespace-pre-wrap">{message.content}</p>
                                            </div>

                                            {/* Smart Chips */}
                                            {message.suggestions && (
                                                <div className="flex flex-wrap gap-2">
                                                    {message.suggestions.map((suggestion, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border border-border bg-background/50 text-muted-foreground hover:bg-muted hover:text-foreground hover:border-primary/50 transition-all hover:scale-105"
                                                        >
                                                            <Zap className="h-3 w-3 text-yellow-500" />
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        {message.role === 'user' && (
                                            <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-1 border border-border">
                                                <User className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isTyping && (
                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
                                            <Sparkles className="h-4 w-4 text-white animate-pulse" />
                                        </div>
                                        <div className="bg-muted/50 rounded-2xl rounded-tl-none px-5 py-4 border border-border">
                                            <div className="flex gap-1.5">
                                                <span className="h-2 w-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="h-2 w-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="h-2 w-2 rounded-full bg-primary/30 animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        )}
                    </ScrollArea>

                    {/* Input Area - Adaptive */}
                    <div className="p-4 relative z-10 bg-muted/20 border-t border-border backdrop-blur-md">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center gap-3 p-1 rounded-xl bg-background/50 border border-border focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all shadow-inner"
                        >
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 h-12 bg-transparent border-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/50 px-4"
                                disabled={isTyping}
                            />
                            <div className="pr-1">
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "h-10 w-10 rounded-lg transition-all duration-300",
                                        input.trim() ? "premium-gradient text-white shadow-lg shadow-primary/25" : "bg-muted text-muted-foreground/30"
                                    )}
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </form>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-muted-foreground/50">Conectian AI puede cometer errores. Verifica la información.</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
