import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot, Sparkles, Cpu, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import type { FilterState } from '@/pages/marketplace/MarketplacePage';

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
    appliedFilters?: Partial<FilterState>;
}

interface MarketplaceChatbotProps {
    onApplyFilters: (filters: Partial<FilterState>) => void;
}

// --- Data ---
const SUGGESTED_PROMPTS = [
    {
        icon: Cpu,
        title: "Automatización",
        prompt: "Busco soluciones de automatización",
        color: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
    },
    {
        icon: TrendingUp,
        title: "Fintech",
        prompt: "Muéstrame soluciones Fintech",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700"
    },
];

const MOCK_RESPONSES: Record<string, { content: string; suggestions: string[]; recommendedCases?: RecommendedCase[]; filters?: Partial<FilterState> }> = {
    "automatiz": {
        content: "He aplicado filtros para mostrarte las mejores soluciones de **Automatización**.",
        suggestions: ["Ver más soluciones RPA", "Filtrar por mayor ROI"],
        filters: { search: 'Automatización' }
    },
    "fintech": {
        content: "Aquí tienes soluciones destacadas en el sector **Fintech & Banca**.",
        suggestions: ["Ver demo Analytics", "Comparar precios"],
        filters: { sector: ['Fintech & Banca'] }
    },
    "default": {
        content: "Entendido. Estoy analizando tu solicitud...",
        suggestions: ["Crear un RFP con IA", "Buscar proveedores Gold"]
    }
};

export default function MarketplaceChatbot({ onApplyFilters }: MarketplaceChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getAIResponse = (userMessage: string) => {
        const lowerMsg = userMessage.toLowerCase();
        if (lowerMsg.includes('automatiz') || lowerMsg.includes('proceso')) return MOCK_RESPONSES['automatiz'];
        if (lowerMsg.includes('fintech') || lowerMsg.includes('banca')) return MOCK_RESPONSES['fintech'];
        return MOCK_RESPONSES['default'];
    };

    const handleSend = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = getAIResponse(messageText);
        
        if (response.filters) {
            onApplyFilters(response.filters);
        }

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

    return (
        <div className="flex flex-col h-[calc(100vh-12rem)] bg-muted/10 rounded-lg border border-white/5 overflow-hidden">
            {/* Header */}
            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span className="font-bold text-sm">AI Assistant</span>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4" ref={scrollRef}>
                {messages.length === 0 ? (
                    <div className="text-center py-8 space-y-4">
                        <div className="inline-flex p-3 rounded-full bg-indigo-500/10 mb-2">
                            <Bot className="h-6 w-6 text-indigo-400" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            ¿Qué estás buscando hoy? Puedo ayudarte a filtrar soluciones.
                        </p>
                        <div className="grid gap-2">
                            {SUGGESTED_PROMPTS.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(prompt.prompt)}
                                    className="text-xs text-left p-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
                                >
                                    {prompt.prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex gap-2",
                                message.role === 'user' ? "justify-end" : "justify-start"
                            )}
                        >
                            {message.role === 'assistant' && (
                                <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                    <Bot className="h-3.5 w-3.5 text-white" />
                                </div>
                            )}
                            <div className={cn(
                                "max-w-[85%] rounded-lg px-3 py-2 text-xs",
                                message.role === 'user'
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white/10 text-foreground"
                            )}>
                                <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                        </div>
                    ))
                )}
                {isTyping && (
                    <div className="flex gap-2">
                         <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
                            <Bot className="h-3.5 w-3.5 text-white animate-pulse" />
                        </div>
                        <div className="bg-white/10 rounded-lg px-3 py-2">
                            <div className="flex gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-white/5">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex gap-2"
                >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe..."
                        className="h-8 text-xs bg-black/20 border-white/10"
                        disabled={isTyping}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isTyping}
                        className="h-8 w-8 shrink-0"
                    >
                        <Send className="h-3 w-3" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
