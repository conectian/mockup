import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ArrowRight, User, Cpu, TrendingUp, MessageSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

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

const SUGGESTED_PROMPTS = [
    {
        icon: Cpu,
        title: "Automatización",
        prompt: "Necesito automatizar procesos repetitivos en mi empresa"
    },
    {
        icon: TrendingUp,
        title: "Analytics & BI",
        prompt: "Busco soluciones de IA para análisis de datos empresariales"
    },
    {
        icon: MessageSquare,
        title: "Atención al Cliente",
        prompt: "Quiero implementar un chatbot inteligente para atención al cliente"
    },
];

const MOCK_RESPONSES: Record<string, { content: string; suggestions: string[] }> = {
    "automatiz": {
        content: "Para automatización de procesos, te recomiendo explorar estas soluciones:\n\n• **RPA con IA** - Automatiza tareas repetitivas con bots inteligentes\n• **Workflows Inteligentes** - Orquestación de procesos empresariales\n• **Procesamiento de documentos** - Extracción automática de datos\n\n¿Te gustaría que busque proveedores especializados en alguna de estas áreas?",
        suggestions: ["RPA con inteligencia artificial", "Automatización de workflows", "Procesamiento de documentos"]
    },
    "análisis": {
        content: "Para análisis de datos empresariales, tenemos varias opciones:\n\n• **Business Intelligence con IA** - Dashboards predictivos\n• **Machine Learning** - Modelos personalizados para tu negocio\n• **Data Mining** - Descubrimiento de patrones ocultos\n\n¿Qué tipo de datos necesitas analizar principalmente?",
        suggestions: ["BI con inteligencia artificial", "Machine Learning empresarial", "Análisis predictivo"]
    },
    "chatbot": {
        content: "Los chatbots son una excelente inversión. Opciones disponibles:\n\n• **Chatbots conversacionales** - IA avanzada con NLP\n• **Asistentes virtuales** - Multicanal (web, WhatsApp, etc.)\n• **Bots especializados** - Ventas, soporte, RRHH\n\nNuestros proveedores Gold tienen las mejores soluciones. ¿Cuál es tu canal principal?",
        suggestions: ["Chatbot para WhatsApp", "Asistente virtual multicanal", "Bot de ventas"]
    },
    "default": {
        content: "Entiendo tu necesidad. Puedo ayudarte a encontrar la solución perfecta.\n\nTe recomiendo filtrar por industria y tecnología en el marketplace para resultados más precisos.\n\n¿Podrías darme más detalles sobre el problema específico que quieres resolver?",
        suggestions: ["Ver todos los casos de uso", "Filtrar por industria", "Ver proveedores Gold"]
    }
};

export default function AIChatbotModal({ open, onOpenChange, onSearchSuggestion }: AIChatbotModalProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (!open) {
            // Reset on close
            setMessages([]);
            setInput('');
        }
    }, [open]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const getAIResponse = (userMessage: string): { content: string; suggestions: string[] } => {
        const lowerMsg = userMessage.toLowerCase();

        if (lowerMsg.includes('automatiz') || lowerMsg.includes('proceso') || lowerMsg.includes('rpa')) {
            return MOCK_RESPONSES['automatiz'];
        }
        if (lowerMsg.includes('análisis') || lowerMsg.includes('datos') || lowerMsg.includes('data') || lowerMsg.includes('bi')) {
            return MOCK_RESPONSES['análisis'];
        }
        if (lowerMsg.includes('chatbot') || lowerMsg.includes('bot') || lowerMsg.includes('atención') || lowerMsg.includes('cliente')) {
            return MOCK_RESPONSES['chatbot'];
        }

        return MOCK_RESPONSES['default'];
    };

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: messageText
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 600));

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

    const handlePromptClick = (prompt: string) => {
        handleSend(prompt);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[520px] h-[75vh] max-h-[640px] p-0 gap-0 overflow-hidden border-border/50 shadow-2xl">
                {/* Header - Clean & Professional */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border/50 bg-muted/30">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-sm font-semibold">Asistente de Búsqueda</h2>
                        <p className="text-xs text-muted-foreground">Encuentra la solución ideal para tu empresa</p>
                    </div>
                </div>

                {/* Chat Area */}
                <ScrollArea className="flex-1 px-5 py-4" ref={scrollRef}>
                    {messages.length === 0 ? (
                        <div className="space-y-6 py-2">
                            {/* Welcome */}
                            <div className="text-center space-y-2 pb-4">
                                <h3 className="text-base font-semibold">¿Qué problema quieres resolver?</h3>
                                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                                    Describe tu necesidad y te ayudaré a encontrar los mejores proveedores.
                                </p>
                            </div>

                            {/* Quick Prompts */}
                            <div className="space-y-2">
                                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handlePromptClick(prompt.prompt)}
                                        className="group w-full flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-muted/50 transition-all text-left"
                                    >
                                        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                                            <prompt.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium">{prompt.title}</p>
                                            <p className="text-xs text-muted-foreground truncate">{prompt.prompt}</p>
                                        </div>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary transition-colors shrink-0" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3",
                                        message.role === 'user' ? "justify-end" : "justify-start"
                                    )}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <Sparkles className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "max-w-[85%] space-y-2",
                                        message.role === 'user' ? "order-1" : ""
                                    )}>
                                        <div className={cn(
                                            "rounded-xl px-3.5 py-2.5 text-sm",
                                            message.role === 'user'
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted/70"
                                        )}>
                                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                                        </div>

                                        {/* Suggestion chips */}
                                        {message.suggestions && message.suggestions.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5">
                                                {message.suggestions.map((suggestion, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                                                    >
                                                        <ArrowRight className="h-3 w-3" />
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="h-7 w-7 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                                            <User className="h-3.5 w-3.5 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Sparkles className="h-3.5 w-3.5 text-primary" />
                                    </div>
                                    <div className="bg-muted/70 rounded-xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </ScrollArea>

                {/* Input Area */}
                <div className="px-5 py-4 border-t border-border/50 bg-muted/20">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2"
                    >
                        <Input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe tu necesidad..."
                            className="flex-1 h-10 bg-background border-border/50 focus-visible:ring-primary/30"
                            disabled={isTyping}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim() || isTyping}
                            className="h-10 w-10 shrink-0"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
