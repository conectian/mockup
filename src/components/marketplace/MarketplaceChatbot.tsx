import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, User, ArrowRight, Zap, TrendingUp, Layers, Database, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FilterState } from '@/pages/marketplace/MarketplacePage';
import { DotLottiePlayer } from '@dotlottie/react-player';

const ROBOT_ANIMATION = "https://assets-v2.lottiefiles.com/a/b80c8f58-1166-11ee-bad3-8fb1e44c9ce0/TolqgF3Tqs.lottie";

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    time: string;
}

interface MarketplaceChatbotProps {
    onApplyFilters: (filters: Partial<FilterState>) => void;
}

const QUICK_PROMPTS = [
    { text: "Automatización de procesos", icon: Zap },
    { text: "Soluciones Fintech", icon: TrendingUp },
    { text: "Proyectos con ROI rápido", icon: Layers },
    { text: "Integraciones SAP", icon: Database },
];

const MOCK_RESPONSES: Record<string, { content: string; filters?: Partial<FilterState> }> = {
    "automatiz": {
        content: "He encontrado **12 soluciones de automatización** que coinciden con tu búsqueda. He actualizado los filtros para mostrarte las más relevantes.",
        filters: { search: 'Automatización' }
    },
    "fintech": {
        content: "Perfecto. He filtrado **8 proveedores especializados** en el sector Fintech & Banca. Todos verificados y con casos de éxito documentados.",
        filters: { sector: ['Fintech & Banca'] }
    },
    "roi": {
        content: "Mostrando proyectos con **ROI demostrado en menos de 3 meses**. Estos casos incluyen métricas de impacto verificadas.",
        filters: { search: 'ROI rápido' }
    },
    "sap": {
        content: "He encontrado soluciones con **integración nativa SAP**. Incluyen conectores certificados y documentación técnica completa.",
        filters: { search: 'SAP' }
    },
    "default": {
        content: "Entendido. He actualizado los filtros según tu búsqueda. ¿Necesitas que refine más los resultados?"
    }
};

function getTime() {
    return new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export default function MarketplaceChatbot({ onApplyFilters }: MarketplaceChatbotProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getResponse = (msg: string) => {
        const lower = msg.toLowerCase();
        if (lower.includes('automatiz') || lower.includes('rpa') || lower.includes('proceso')) return MOCK_RESPONSES['automatiz'];
        if (lower.includes('fintech') || lower.includes('banca')) return MOCK_RESPONSES['fintech'];
        if (lower.includes('roi') || lower.includes('rápido')) return MOCK_RESPONSES['roi'];
        if (lower.includes('sap') || lower.includes('integra')) return MOCK_RESPONSES['sap'];
        return MOCK_RESPONSES['default'];
    };

    const handleSend = async (text?: string) => {
        const msg = text || input.trim();
        if (!msg) return;

        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'user',
            content: msg,
            time: getTime()
        }]);
        setInput('');
        setIsTyping(true);

        await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));

        const response = getResponse(msg);
        if (response.filters) onApplyFilters(response.filters);

        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            time: getTime()
        }]);
        setIsTyping(false);
    };

    // Auto-resize textarea
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
        }
    }, [input]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Parse markdown-like bold text
    const renderContent = (content: string) => {
        const parts = content.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-primary">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="flex flex-col flex-1 h-full rounded-xl overflow-hidden border border-white/10 bg-gradient-to-b from-background to-muted/20">
            {/* Header */}
            <div className="shrink-0 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Sparkles className="h-4.5 w-4.5 text-white" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold tracking-tight">Asistente IA</h3>
                        <p className="text-xs text-muted-foreground">Búsqueda inteligente de soluciones</p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto py-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent px-4"
            >
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col">
                        {/* Welcome message */}
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center space-y-4 px-2 max-w-[240px]">
                                <div className="h-28 w-28 mx-auto flex items-center justify-center overflow-hidden px-1">
                                    <DotLottiePlayer
                                        src={ROBOT_ANIMATION}
                                        autoplay
                                        loop
                                        className="w-full h-full scale-125 translate-y-2"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <h4 className="text-sm font-medium">¿Qué solución buscas?</h4>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        Describe tu necesidad o selecciona una opción para comenzar
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Quick prompts */}
                        <div className="space-y-2 mt-auto pb-1">
                            {QUICK_PROMPTS.map((prompt, i) => {
                                const Icon = prompt.icon;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(prompt.text)}
                                        className="group w-full flex items-center gap-3 text-left text-sm px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200 border border-white/5 hover:border-white/15"
                                    >
                                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <Icon className="h-4 w-4 text-primary" />
                                        </div>
                                        <span className="flex-1 text-foreground/80 group-hover:text-foreground transition-colors">
                                            {prompt.text}
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.map((m, index) => (
                            <div
                                key={m.id}
                                className={cn(
                                    "flex gap-2.5 animate-in slide-in-from-bottom-2 duration-300",
                                    m.role === 'user' ? "justify-end" : "justify-start"
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {m.role === 'assistant' && (
                                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 self-end border border-primary/20 overflow-hidden">
                                        <DotLottiePlayer
                                            src={ROBOT_ANIMATION}
                                            autoplay
                                            loop
                                            className="w-12 h-12 scale-150"
                                        />
                                    </div>
                                )}
                                <div
                                    className={cn(
                                        "max-w-[82%] px-3.5 py-2.5 text-sm leading-relaxed",
                                        m.role === 'user'
                                            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl rounded-br-md shadow-lg shadow-primary/20"
                                            : "bg-white/5 border border-white/10 rounded-2xl rounded-bl-md backdrop-blur-sm"
                                    )}
                                >
                                    <p className="whitespace-pre-wrap">{renderContent(m.content)}</p>
                                    <p className={cn(
                                        "text-[10px] mt-1.5 text-right font-medium",
                                        m.role === 'user' ? "text-primary-foreground/60" : "text-muted-foreground/60"
                                    )}>
                                        {m.time}
                                    </p>
                                </div>
                                {m.role === 'user' && (
                                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shrink-0 self-end shadow-lg shadow-primary/20">
                                        <User className="h-4 w-4 text-primary-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex gap-2.5 justify-start animate-in slide-in-from-bottom-2 duration-300">
                                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 self-end border border-primary/20 overflow-hidden">
                                    <DotLottiePlayer
                                        src={ROBOT_ANIMATION}
                                        autoplay
                                        loop
                                        className="w-12 h-12 scale-150"
                                    />
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-md px-4 py-3 backdrop-blur-sm">
                                    <div className="flex gap-1.5">
                                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
                                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Input Area */}
            <div className="shrink-0 border-t border-white/10 bg-gradient-to-r from-muted/30 via-background to-muted/30 p-3">
                <div className="flex gap-2 items-center">
                    <div className="flex-1 relative">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe qué solución necesitas..."
                            rows={1}
                            className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] max-h-[120px] transition-all duration-200 overflow-y-hidden"
                            disabled={isTyping}
                        />
                    </div>
                    <Button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isTyping}
                        size="icon"
                        className="h-[44px] w-[44px] rounded-xl shrink-0 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/20 transition-all duration-200 disabled:opacity-40 disabled:shadow-none"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <p className="text-[10px] text-muted-foreground/50 text-center mt-2">
                    Pulsa Enter para enviar • Shift + Enter para salto de línea
                </p>
            </div>
        </div>
    );
}
