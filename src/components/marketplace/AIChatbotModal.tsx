import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, ArrowRight, User, Cpu, TrendingUp, MessageSquare, Bot, X, Lightbulb, Zap, Star, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

// --- Interfaces ---
interface RecommendedCase {
    id: string;
    title: string;
    provider: string;
    category: string;
    rating: number;
    description: string;
}

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    suggestions?: string[];
    recommendedCases?: RecommendedCase[];
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
        color: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
    },
    {
        icon: TrendingUp,
        title: "Analytics & BI",
        prompt: "Busco soluciones de IA para análisis de datos empresariales",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700"
    },
    {
        icon: MessageSquare,
        title: "Atención al Cliente",
        prompt: "Quiero implementar un chatbot inteligente para atención al cliente",
        color: "text-blue-600 dark:text-blue-400",
        bg: "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700"
    },
];

const MOCK_RESPONSES: Record<string, { content: string; suggestions: string[]; recommendedCases?: RecommendedCase[] }> = {
    "automatiz": {
        content: "He analizado nuestro marketplace y estas son las **mejores opciones** para automatización de procesos:\n\n- **RPA GenAI Core** - Automatiza el 85% de tareas repetitivas\n- **Workflow Orchestrator** - Ideal para logística y operaciones\n- **Document Intelligence** - Procesa facturas y contratos en segundos\n\n¿Te interesa ver más detalles de alguna solución?",
        suggestions: ["Ver más soluciones RPA", "Filtrar por mayor ROI", "Casos de éxito"],
        recommendedCases: [
            {
                id: "1",
                title: "RPA GenAI Core",
                provider: "AutomateAI Solutions",
                category: "Automatización",
                rating: 4.9,
                description: "Automatiza hasta el 85% de procesos repetitivos con IA generativa."
            }
        ]
    },
    "análisis": {
        content: "He encontrado **12 soluciones de Analytics** verificadas. Basado en tu perfil, te recomiendo:\n\n- **Predictive Insight Pro** - Dashboards que anticipan tendencias\n- **DataMining X** - Encuentra patrones ocultos en tus ventas\n\n¿Te interesa ver una demo de alguna de estas herramientas?",
        suggestions: ["Ver demo Analytics", "Comparar precios", "Consultar con experto"],
        recommendedCases: [
            {
                id: "2",
                title: "Predictive Insight Pro",
                provider: "DataVision Inc.",
                category: "Analytics & BI",
                rating: 4.8,
                description: "Dashboards predictivos con IA que anticipan tendencias de negocio."
            }
        ]
    },
    "chatbot": {
        content: "Para **atención al cliente con IA**, tengo varias opciones destacadas:\n\n- **ConversaBot Pro** - Chatbot multiidioma con NLP avanzado\n- **SupportGenius** - Automatiza el 70% de tickets de soporte\n\nEstas soluciones pueden reducir tus tiempos de respuesta en un **60%**.",
        suggestions: ["Ver demo chatbot", "Casos de éxito retail", "Integración con CRM"],
        recommendedCases: [
            {
                id: "3",
                title: "ConversaBot Pro",
                provider: "DialogTech",
                category: "Atención al Cliente",
                rating: 4.7,
                description: "Chatbot empresarial multiidioma con procesamiento de lenguaje natural avanzado."
            }
        ]
    },
    "default": {
        content: "Entendido. Estoy analizando tu solicitud en nuestra base de datos de innovadores...\n\nPuedo ayudarte a:\n- **Encontrar proveedores** certificados\n- **Calcular presupuestos** estimados\n- **Redactar un RFP** automático\n\n¿Podrías darme un poco más de contexto sobre tu objetivo?",
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
        if (lowerMsg.includes('análisis') || lowerMsg.includes('datos') || lowerMsg.includes('analytics')) return MOCK_RESPONSES['análisis'];
        if (lowerMsg.includes('chatbot') || lowerMsg.includes('atención') || lowerMsg.includes('cliente')) return MOCK_RESPONSES['chatbot'];
        return MOCK_RESPONSES['default'];
    };

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

        const response = getAIResponse(messageText);
        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            suggestions: response.suggestions,
            recommendedCases: response.recommendedCases
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
            <DialogContent showCloseButton={false} className="sm:max-w-[700px] h-[85vh] max-h-[800px] p-0 border-0 bg-transparent shadow-none overflow-hidden outline-none">

                <div className="relative w-full h-full flex flex-col bg-background border border-border rounded-2xl overflow-hidden shadow-2xl">

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-border bg-card">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-md">
                                    <Bot className="h-5 w-5 text-white" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-card"></span>
                                </span>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">Conectian AI</h2>
                                <p className="text-xs text-muted-foreground">Asistente Inteligente • <span className="text-emerald-600 dark:text-emerald-400 font-medium">Online</span></p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="rounded-full hover:bg-muted text-muted-foreground hover:text-foreground">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Chat Area */}
                    <ScrollArea className="flex-1 px-5 py-6 relative z-10 bg-muted/30" ref={scrollRef}>
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="text-center space-y-3">
                                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-4">
                                        <Lightbulb className="h-8 w-8 text-amber-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">¿Qué desafío resolvemos hoy?</h3>
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
                                                "group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left",
                                                prompt.bg,
                                                "hover:shadow-md active:scale-[0.99]"
                                            )}
                                        >
                                            <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center bg-white dark:bg-slate-800 border border-border shrink-0", prompt.color)}>
                                                <prompt.icon className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-foreground">{prompt.title}</p>
                                                <p className="text-xs text-muted-foreground line-clamp-1">{prompt.prompt}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
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
                                            "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                                            message.role === 'user' ? "justify-end" : "justify-start"
                                        )}
                                    >
                                        {message.role === 'assistant' && (
                                            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0 mt-1">
                                                <Bot className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                        <div className={cn(
                                            "max-w-[85%] space-y-3",
                                            message.role === 'user' ? "items-end flex flex-col" : ""
                                        )}>
                                            <div className={cn(
                                                "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                                                message.role === 'user'
                                                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                    : "bg-card text-foreground rounded-tl-sm border border-border shadow-sm"
                                            )}>
                                                {message.role === 'assistant' ? (
                                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                                        <ReactMarkdown
                                                            components={{
                                                                p: ({ children }) => <p className="my-1.5">{children}</p>,
                                                                ul: ({ children }) => <ul className="my-2 pl-4 list-disc">{children}</ul>,
                                                                li: ({ children }) => <li className="my-0.5">{children}</li>,
                                                                strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>
                                                            }}
                                                        >
                                                            {message.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                ) : (
                                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                                )}
                                            </div>

                                            {/* Recommended Case Card */}
                                            {message.recommendedCases && message.recommendedCases.length > 0 && (
                                                <div className="w-full space-y-2">
                                                    <p className="text-xs font-medium text-muted-foreground px-1">Solución recomendada:</p>
                                                    {message.recommendedCases.map((useCase) => (
                                                        <Card key={useCase.id} className="p-4 border-border hover:border-primary/40 transition-colors cursor-pointer group">
                                                            <div className="flex items-start gap-3">
                                                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                                                    {useCase.title.charAt(0)}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-start justify-between gap-2">
                                                                        <div>
                                                                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{useCase.title}</h4>
                                                                            <p className="text-xs text-muted-foreground">{useCase.provider}</p>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 shrink-0">
                                                                            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                                                                            <span className="text-xs font-medium">{useCase.rating}</span>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{useCase.description}</p>
                                                                    <div className="flex items-center gap-2 mt-2">
                                                                        <Badge variant="outline" className="text-[10px] px-2 py-0">{useCase.category}</Badge>
                                                                        <Button size="sm" variant="ghost" className="h-6 text-xs text-primary hover:text-primary px-2 ml-auto">
                                                                            Ver solución <ExternalLink className="h-3 w-3 ml-1" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Smart Chips */}
                                            {message.suggestions && (
                                                <div className="flex flex-wrap gap-2">
                                                    {message.suggestions.map((suggestion, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => handleSuggestionClick(suggestion)}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-card text-foreground hover:bg-muted hover:border-primary/50 transition-all"
                                                        >
                                                            <Zap className="h-3 w-3 text-amber-500" />
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
                                    <div className="flex gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                                            <Bot className="h-4 w-4 text-white animate-pulse" />
                                        </div>
                                        <div className="bg-card rounded-2xl rounded-tl-sm px-4 py-3 border border-border shadow-sm">
                                            <div className="flex gap-1.5">
                                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        )}
                    </ScrollArea>

                    {/* Input Area */}
                    <div className="p-4 relative z-10 bg-card border-t border-border">
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="relative flex items-center gap-2 p-1 rounded-xl bg-muted/50 border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all"
                        >
                            <Input
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Escribe tu consulta..."
                                className="flex-1 h-11 bg-transparent border-none focus-visible:ring-0 text-foreground placeholder:text-muted-foreground/60 px-4"
                                disabled={isTyping}
                            />
                            <div className="pr-1">
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!input.trim() || isTyping}
                                    className={cn(
                                        "h-9 w-9 rounded-lg transition-all",
                                        input.trim() ? "bg-primary hover:bg-primary/90 text-white shadow-md" : "bg-muted text-muted-foreground/40"
                                    )}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-muted-foreground/60">Conectian AI puede cometer errores. Verifica la información.</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
