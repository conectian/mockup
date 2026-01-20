import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, Bot, Sparkles, FileText, Loader2, User, ArrowRight, ArrowLeft, Video, Wand2, Zap, DollarSign, Database, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    isTyping?: boolean;
};

type UseCaseFormData = {
    // PASO 1: LA SOLUCIÓN
    title: string;
    description: string;
    appType: string;
    sectors: string[];
    clientSize: string[];
    offerFormat: string;
    
    // PASO 2: MODELO DE NEGOCIO
    techModality: string[];
    priceMin: string;
    priceMax: string;
    pricePeriod: string;
    languages: string[];
    
    // PASO 3: EL MOTOR
    aiModel: string;
    humanIntervention: string;
    techStack: string;
    integrations: string;
    integrationTime: string;
    
    // PASO 4: CONFIANZA Y SEGURIDAD
    dataSovereignty: string;
    dataSecurity: string[];
    compliance: string[];
    certifications: string[];
};

interface UseCaseCreateSidebarProps {
    mode?: 'rfp' | 'usecase';
    onSuccess?: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: '1',
        role: 'assistant',
        content: "¡Hola! Soy tu asistente para crear casos de uso. Cuéntame qué solución quieres publicar y te ayudaré a completar todos los campos. Por ejemplo: 'Un chatbot SaaS para atención al cliente en banca'.",
        timestamp: new Date()
    }
];

export default function UseCaseCreateSidebar({ mode = 'rfp', onSuccess }: UseCaseCreateSidebarProps) {
    const [viewMode, setViewMode] = useState<'chat' | 'form'>('chat');
    const [step, setStep] = useState(1);
    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    
    const [formData, setFormData] = useState<UseCaseFormData>({
        title: '',
        description: '',
        appType: '',
        sectors: [],
        clientSize: [],
        offerFormat: '',
        techModality: [],
        priceMin: '',
        priceMax: '',
        pricePeriod: 'year',
        languages: [],
        aiModel: 'hybrid',
        humanIntervention: '50',
        techStack: '',
        integrations: '',
        integrationTime: '<1-week',
        dataSovereignty: 'eu',
        dataSecurity: [],
        compliance: [],
        certifications: [],
    });

    const storageKey = mode === 'rfp' ? 'rfp_draft' : 'usecase_draft';

    // Auto-save
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setFormData(parsed.formData || formData);
                setStep(parsed.step || 1);
            } catch (e) {
                // ignore
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify({ formData, step }));
    }, [formData, step, storageKey]);

    useEffect(() => {
        if (viewMode === 'chat') {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, viewMode]);

    const updateField = (field: keyof UseCaseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleArrayItem = (field: keyof UseCaseFormData, item: string) => {
        setFormData(prev => {
            const current = prev[field] as string[];
            if (current.includes(item)) {
                return { ...prev, [field]: current.filter(i => i !== item) };
            } else {
                return { ...prev, [field]: [...current, item] };
            }
        });
    };

    const nextStep = () => {
        if (step < 4) {
            setStep(step + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const processAIResponse = (text: string) => {
        const lowerText = text.toLowerCase();
        let responseText = "";
        const updates: Partial<UseCaseFormData> = {};

        if (lowerText.includes('chatbot') || lowerText.includes('asistente') || lowerText.includes('chat')) {
            updates.appType = 'chatbot';
            updates.humanIntervention = '50';
            if (!formData.title) updates.title = mode === 'rfp' ? "Chatbot de Atención al Cliente" : "Chatbot Inteligente para Empresas";
            responseText += "He detectado que es un **Chatbot**. ";
        }
        if (lowerText.includes('visión') || lowerText.includes('detección') || lowerText.includes('cámara')) {
            updates.appType = 'vision';
            updates.humanIntervention = '0';
            responseText += "Parece ser una solución de **Visión Artificial**. ";
        }
        if (lowerText.includes('banca') || lowerText.includes('fintech')) {
            updates.sectors = [...(formData.sectors || []), 'Banca'];
            responseText += "Lo he categorizado en el sector **Banca**. ";
        }
        if (lowerText.includes('retail') || lowerText.includes('tienda')) {
            updates.sectors = [...(formData.sectors || []), 'Retail'];
            responseText += "Interesante para **Retail**. ";
        }
        if (lowerText.includes('precio') || lowerText.includes('euros') || lowerText.includes('€')) {
            const numbers = text.match(/\d+/g);
            if (numbers && numbers.length > 0) {
                updates.priceMin = numbers[0];
                if (numbers.length > 1) updates.priceMax = numbers[1];
                responseText += `He anotado el rango de precios: **${updates.priceMin}€**${updates.priceMax ? ` - ${updates.priceMax}€` : ''}. `;
            }
        }

        if (Object.keys(updates).length > 0) {
            setFormData(prev => ({ ...prev, ...updates }));
            responseText += "He actualizado el formulario. ¿Qué más me puedes contar? (ej: tecnologías, certificaciones, integraciones...)";
        } else {
            responseText = "Entendido. Sigue contándome detalles como el **precio**, las **tecnologías** que usa o si tiene alguna **certificación** específica.";
        }

        return responseText;
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const response = processAIResponse(userMsg.content);
            setMessages(prev => [...prev, {
                id: Date.now().toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            }]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000);
    };

    const handleGenerateVideo = () => {
        setIsGeneratingVideo(true);
        setTimeout(() => {
            setIsGeneratingVideo(false);
            toast.success("Video Generado con IA", { description: "Se ha añadido un video explicativo." });
        }, 2500);
    };

    const handleSubmit = () => {
        if (!formData.title || !formData.description || formData.sectors.length === 0 || formData.techModality.length === 0) {
            toast.error("Completa los campos obligatorios", { description: "Título, descripción, sector y modalidad son requeridos" });
            return;
        }
        toast.success(mode === 'rfp' ? "Solicitud creada" : "Caso de uso creado", { 
            description: mode === 'rfp' ? "Tu RFP ha sido publicado correctamente" : "Tu caso de uso ha sido publicado correctamente" 
        });
        localStorage.removeItem(storageKey);
        if (onSuccess) onSuccess();
        // Reset form
        setFormData({
            title: '',
            description: '',
            appType: '',
            sectors: [],
            clientSize: [],
            offerFormat: '',
            techModality: [],
            priceMin: '',
            priceMax: '',
            pricePeriod: 'year',
            languages: [],
            aiModel: 'hybrid',
            humanIntervention: '50',
            techStack: '',
            integrations: '',
            integrationTime: '<1-week',
            dataSovereignty: 'eu',
            dataSecurity: [],
            compliance: [],
            certifications: [],
        });
        setStep(1);
        setMessages(INITIAL_MESSAGES);
    };

    const renderStepIndicator = () => (
        <div className="mb-6">
            <div className="flex justify-between text-xs font-medium mb-2 text-muted-foreground">
                <span className={cn(step >= 1 && "text-primary font-bold")}>1. La Solución</span>
                <span className={cn(step >= 2 && "text-primary font-bold")}>2. Modelo Negocio</span>
                <span className={cn(step >= 3 && "text-primary font-bold")}>3. Tecnología</span>
                <span className={cn(step >= 4 && "text-primary font-bold")}>4. Seguridad</span>
            </div>
            <Progress value={step * 25} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2 text-center">Paso {step} de 4</p>
        </div>
    );

    return (
        <div className="space-y-4">
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted/30">
                    <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <Bot className="h-4 w-4" /> Chatbot
                    </TabsTrigger>
                    <TabsTrigger value="form" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        <FileText className="h-4 w-4" /> Formulario
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="mt-4">
                    <div className="flex flex-col h-[calc(100vh-16rem)] bg-muted/10 rounded-lg border border-white/5 overflow-hidden">
                        <div className="p-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-indigo-400" />
                            <span className="font-bold text-sm">Asistente IA</span>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3 space-y-4" ref={messagesEndRef}>
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex gap-2", msg.role === 'user' ? "justify-end" : "justify-start")}>
                                    {msg.role === 'assistant' && (
                                        <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <Bot className="h-3.5 w-3.5 text-white" />
                                        </div>
                                    )}
                                    <div className={cn(
                                        "max-w-[85%] rounded-lg px-3 py-2 text-xs",
                                        msg.role === 'user'
                                            ? "bg-indigo-600 text-white"
                                            : "bg-white/10 text-foreground"
                                    )}>
                                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                            <User className="h-3.5 w-3.5" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-2 justify-start">
                                    <div className="h-6 w-6 rounded-md bg-indigo-600 flex items-center justify-center shrink-0">
                                        <Bot className="h-3.5 w-3.5 text-white animate-pulse" />
                                    </div>
                                    <div className="bg-white/10 rounded-lg px-3 py-2 flex gap-1">
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-3 border-t border-white/5 bg-white/5">
                            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Describe tu solución..."
                                    className="h-8 text-xs bg-black/20 border-white/10"
                                    disabled={isTyping}
                                />
                                <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping} className="h-8 w-8 shrink-0">
                                    {isTyping ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                                </Button>
                            </form>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="form" className="mt-4">
                    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-16rem)] pr-2 pb-4">
                        {renderStepIndicator()}

                        {/* PASO 1: LA SOLUCIÓN */}
                        {step === 1 && (
                            <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <Zap className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">PASO 1: LA SOLUCIÓN</CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">Define qué es tu solución y a quién va dirigida</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-5">

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Título <span className="text-red-500">*</span></Label>
                                    <Input
                                        placeholder="Ej: Chatbot de Atención al Cliente 24/7"
                                        value={formData.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                        className="h-11 bg-background/50 border-white/10 focus:border-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Descripción <span className="text-red-500">*</span></Label>
                                    <Textarea
                                        placeholder="Describe brevemente el valor que aporta..."
                                        value={formData.description}
                                        onChange={(e) => updateField('description', e.target.value)}
                                        className="min-h-[100px] bg-background/50 border-white/10 focus:border-primary/50 resize-none"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Tipo de Aplicación</Label>
                                    <Select value={formData.appType} onValueChange={(v) => updateField('appType', v)}>
                                        <SelectTrigger className="h-11 bg-background/50 border-white/10 focus:border-primary/50">
                                            <SelectValue placeholder="Selecciona tipo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="chatbot">Chatbot</SelectItem>
                                            <SelectItem value="vision">Visión Artificial</SelectItem>
                                            <SelectItem value="automation">Automatización</SelectItem>
                                            <SelectItem value="prediction">Predicción</SelectItem>
                                            <SelectItem value="content">Generación de Contenido</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Sector / Industria <span className="text-red-500">*</span></Label>
                                    <p className="text-xs text-muted-foreground">¿A qué verticales se dirige principalmente?</p>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {['Retail', 'Banca', 'Salud', 'Legal', 'Industria', 'Transversal/Todos'].map(sector => (
                                            <div key={sector} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.sectors.includes(sector)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('sectors', sector)}>
                                                <Checkbox
                                                    id={`sector-${sector}`}
                                                    checked={formData.sectors.includes(sector)}
                                                    onCheckedChange={() => toggleArrayItem('sectors', sector)}
                                                />
                                                <label htmlFor={`sector-${sector}`} className="text-xs font-medium cursor-pointer flex-1">{sector}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Tamaño del Cliente Ideal</Label>
                                    <p className="text-xs text-muted-foreground">¿Para qué tamaño de empresa está optimizado?</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['Startup', 'Pyme', 'Corporate/Enterprise'].map(size => (
                                            <div key={size} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.clientSize.includes(size)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('clientSize', size)}>
                                                <Checkbox
                                                    id={`size-${size}`}
                                                    checked={formData.clientSize.includes(size)}
                                                    onCheckedChange={() => toggleArrayItem('clientSize', size)}
                                                />
                                                <label htmlFor={`size-${size}`} className="text-xs font-medium cursor-pointer">{size}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Formato de la Oferta</Label>
                                    <div className="flex flex-wrap gap-2.5">
                                        {['Software (SaaS)', 'Consultoría/Servicios', 'Formación'].map(format => (
                                            <Badge
                                                key={format}
                                                variant={formData.offerFormat === format ? "default" : "outline"}
                                                className={cn(
                                                    "cursor-pointer px-3 py-1.5 text-xs font-medium transition-all",
                                                    formData.offerFormat === format
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-background/30 border-white/10 hover:bg-primary/10 hover:border-primary/30"
                                                )}
                                                onClick={() => updateField('offerFormat', format)}
                                            >
                                                {format}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* PASO 2: MODELO DE NEGOCIO */}
                        {step === 2 && (
                            <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <DollarSign className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">PASO 2: MODELO DE NEGOCIO</CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">Define precios y modalidades de entrega</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-5">

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Modalidad Técnica <span className="text-red-500">*</span></Label>
                                    <p className="text-xs text-muted-foreground">¿Cómo se entrega la solución?</p>
                                    <div className="flex flex-col gap-2.5">
                                        {['SaaS (Nube)', 'On-premise (Local)', 'Híbrido'].map(modality => (
                                            <div key={modality} className={cn(
                                                "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                                formData.techModality.includes(modality)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('techModality', modality)}>
                                                <Checkbox
                                                    id={`mod-${modality}`}
                                                    checked={formData.techModality.includes(modality)}
                                                    onCheckedChange={() => toggleArrayItem('techModality', modality)}
                                                />
                                                <label htmlFor={`mod-${modality}`} className="text-sm cursor-pointer flex-1 font-medium">{modality}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Rango de Precios</Label>
                                    <p className="text-xs text-muted-foreground">Opcional pero recomendado para SEO - Coste estimado anual</p>
                                    <div className="flex items-center gap-2.5">
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                                            <Input
                                                placeholder="Min"
                                                type="number"
                                                value={formData.priceMin}
                                                onChange={(e) => updateField('priceMin', e.target.value)}
                                                className="pl-8 h-11 bg-background/50 border-white/10 focus:border-primary/50"
                                            />
                                        </div>
                                        <span className="text-muted-foreground font-medium">-</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
                                            <Input
                                                placeholder="Max"
                                                type="number"
                                                value={formData.priceMax}
                                                onChange={(e) => updateField('priceMax', e.target.value)}
                                                className="pl-8 h-11 bg-background/50 border-white/10 focus:border-primary/50"
                                            />
                                        </div>
                                        <Select value={formData.pricePeriod} onValueChange={(v) => updateField('pricePeriod', v)}>
                                            <SelectTrigger className="w-[110px] h-11 bg-background/50 border-white/10 focus:border-primary/50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="month">/ mes</SelectItem>
                                                <SelectItem value="year">/ año</SelectItem>
                                                <SelectItem value="project">/ proyecto</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Idiomas Soportados</Label>
                                    <p className="text-xs text-muted-foreground">¿En qué idiomas dais soporte e interfaz?</p>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués'].map(lang => (
                                            <div key={lang} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.languages.includes(lang)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('languages', lang)}>
                                                <Checkbox
                                                    id={`lang-${lang}`}
                                                    checked={formData.languages.includes(lang)}
                                                    onCheckedChange={() => toggleArrayItem('languages', lang)}
                                                />
                                                <label htmlFor={`lang-${lang}`} className="text-xs font-medium cursor-pointer flex-1">{lang}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* PASO 3: EL MOTOR */}
                        {step === 3 && (
                            <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <Database className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">PASO 3: EL MOTOR</CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">Detalles técnicos para el CTO del cliente</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-5">

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Tipo de IA (Modelo)</Label>
                                    <RadioGroup value={formData.aiModel} onValueChange={(v) => updateField('aiModel', v)}>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.aiModel === 'open' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('aiModel', 'open')}>
                                            <RadioGroupItem value="open" id="ai-open" />
                                            <Label htmlFor="ai-open" className="font-medium text-sm cursor-pointer flex-1">Open Source (Abierta)</Label>
                                        </div>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.aiModel === 'prop' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('aiModel', 'prop')}>
                                            <RadioGroupItem value="prop" id="ai-prop" />
                                            <Label htmlFor="ai-prop" className="font-medium text-sm cursor-pointer flex-1">Propietaria/Cerrada</Label>
                                        </div>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.aiModel === 'hybrid' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('aiModel', 'hybrid')}>
                                            <RadioGroupItem value="hybrid" id="ai-hybrid" />
                                            <Label htmlFor="ai-hybrid" className="font-medium text-sm cursor-pointer flex-1">Híbrida</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Nivel de Intervención Humana</Label>
                                    <RadioGroup value={formData.humanIntervention} onValueChange={(v) => updateField('humanIntervention', v)}>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.humanIntervention === '0' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('humanIntervention', '0')}>
                                            <RadioGroupItem value="0" id="hi-auto" />
                                            <Label htmlFor="hi-auto" className="font-medium text-sm cursor-pointer flex-1">100% Automático</Label>
                                        </div>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.humanIntervention === '50' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('humanIntervention', '50')}>
                                            <RadioGroupItem value="50" id="hi-supervised" />
                                            <Label htmlFor="hi-supervised" className="font-medium text-sm cursor-pointer flex-1">Human-in-the-loop (Supervisado)</Label>
                                        </div>
                                        <div className={cn(
                                            "flex items-center space-x-3 border rounded-lg p-3.5 transition-all cursor-pointer",
                                            formData.humanIntervention === '100' ? "bg-primary/10 border-primary/30 shadow-sm" : "bg-background/30 border-white/10 hover:bg-muted/30"
                                        )} onClick={() => updateField('humanIntervention', '100')}>
                                            <RadioGroupItem value="100" id="hi-copilot" />
                                            <Label htmlFor="hi-copilot" className="font-medium text-sm cursor-pointer flex-1">Copiloto (Asiste al humano)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Stack Tecnológico / Compatibilidad</Label>
                                    <p className="text-xs text-muted-foreground">¿Qué tecnologías usa o requiere?</p>
                                    <Input
                                        placeholder="Ej: Python, Azure, AWS, TensorFlow (separados por comas)"
                                        value={formData.techStack}
                                        onChange={(e) => updateField('techStack', e.target.value)}
                                        className="h-11 bg-background/50 border-white/10 focus:border-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Integraciones Nativas</Label>
                                    <p className="text-xs text-muted-foreground">¿Con qué se conecta 'out of the box'?</p>
                                    <Input
                                        placeholder="Ej: Salesforce, SAP, HubSpot, Slack (separados por comas)"
                                        value={formData.integrations}
                                        onChange={(e) => updateField('integrations', e.target.value)}
                                        className="h-11 bg-background/50 border-white/10 focus:border-primary/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Tiempo de Integración estimado</Label>
                                    <Select value={formData.integrationTime} onValueChange={(v) => updateField('integrationTime', v)}>
                                        <SelectTrigger className="h-11 bg-background/50 border-white/10 focus:border-primary/50">
                                            <SelectValue placeholder="Selecciona tiempo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="<1-week">&lt; 1 semana</SelectItem>
                                            <SelectItem value="1-3-months">1-3 meses</SelectItem>
                                            <SelectItem value=">3-months">&gt; 3 meses</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* PASO 4: CONFIANZA Y SEGURIDAD */}
                        {step === 4 && (
                            <Card className="border-primary/20 bg-primary/5 animate-in fade-in slide-in-from-right-4 duration-300">
                                <CardHeader className="pb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <ShieldCheck className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">PASO 4: CONFIANZA Y SEGURIDAD</CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">Superar las barreras de Compliance y Legal</p>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-5">

                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Ubicación / Soberanía del Dato</Label>
                                    <p className="text-xs text-muted-foreground">¿Dónde se alojan los datos?</p>
                                    <Select value={formData.dataSovereignty} onValueChange={(v) => updateField('dataSovereignty', v)}>
                                        <SelectTrigger className="h-11 bg-background/50 border-white/10 focus:border-primary/50">
                                            <SelectValue placeholder="Selecciona ubicación" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="eu">Unión Europea (Frankfurt/Dublín)</SelectItem>
                                            <SelectItem value="usa">EEUU</SelectItem>
                                            <SelectItem value="onprem">On-premise del cliente</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Seguridad de Datos</Label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {['Encriptación en reposo', 'Encriptación en tránsito', 'SSO', 'Anonimización'].map(sec => (
                                            <div key={sec} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.dataSecurity.includes(sec)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('dataSecurity', sec)}>
                                                <Checkbox
                                                    id={`sec-${sec}`}
                                                    checked={formData.dataSecurity.includes(sec)}
                                                    onCheckedChange={() => toggleArrayItem('dataSecurity', sec)}
                                                />
                                                <label htmlFor={`sec-${sec}`} className="text-xs font-medium cursor-pointer flex-1">{sec}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Regulación (Compliance)</Label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {['GDPR (Europa)', 'AI Act', 'HIPAA (Salud)', 'SOC2'].map(comp => (
                                            <div key={comp} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.compliance.includes(comp)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('compliance', comp)}>
                                                <Checkbox
                                                    id={`comp-${comp}`}
                                                    checked={formData.compliance.includes(comp)}
                                                    onCheckedChange={() => toggleArrayItem('compliance', comp)}
                                                />
                                                <label htmlFor={`comp-${comp}`} className="text-xs font-medium cursor-pointer flex-1">{comp}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-sm font-semibold">Certificaciones</Label>
                                    <div className="grid grid-cols-2 gap-2.5">
                                        {['ISO 27001', 'Esquema Nacional de Seguridad (ENS)', 'ISO 9001', 'ISO 14001', 'CMMI', 'ITIL'].map(cert => (
                                            <div key={cert} className={cn(
                                                "flex items-center space-x-2 border rounded-lg p-2.5 transition-all cursor-pointer",
                                                formData.certifications.includes(cert)
                                                    ? "bg-primary/10 border-primary/30 shadow-sm"
                                                    : "bg-background/30 border-white/10 hover:bg-muted/30 hover:border-white/20"
                                            )} onClick={() => toggleArrayItem('certifications', cert)}>
                                                <Checkbox
                                                    id={`cert-${cert}`}
                                                    checked={formData.certifications.includes(cert)}
                                                    onCheckedChange={() => toggleArrayItem('certifications', cert)}
                                                />
                                                <label htmlFor={`cert-${cert}`} className="text-xs font-medium cursor-pointer flex-1">{cert}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-primary/10 to-indigo-500/10 p-5 rounded-xl border border-primary/20 flex flex-col items-center justify-center text-center gap-4 mt-4">
                                    <div className="h-14 w-14 bg-primary/20 rounded-full flex items-center justify-center">
                                        <Video className="h-7 w-7 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="font-bold text-base">Potencia tu venta con Video</h3>
                                        <p className="text-xs text-muted-foreground max-w-xs">
                                            Genera automáticamente un video explicativo de 30 segundos basado en los datos.
                                        </p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="gap-2 border-primary/50 hover:bg-primary/10 hover:border-primary font-semibold"
                                        onClick={handleGenerateVideo}
                                        disabled={isGeneratingVideo}
                                    >
                                        {isGeneratingVideo ? (
                                            <><Loader2 className="h-4 w-4 animate-spin" /> Generando guión y video...</>
                                        ) : (
                                            <><Wand2 className="h-4 w-4" /> Generar Video con IA</>
                                        )}
                                    </Button>
                                </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-6 sticky bottom-0 bg-background/80 backdrop-blur-sm p-3 border rounded-xl shadow-lg">
                            <Button
                                variant="outline"
                                onClick={prevStep}
                                disabled={step === 1}
                                className="w-28"
                            >
                                <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                            </Button>

                            {step < 4 ? (
                                <Button onClick={nextStep} className="w-28 bg-primary/90 hover:bg-primary">
                                    Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handleSubmit} className="w-36 bg-green-600 hover:bg-green-700">
                                    {mode === 'rfp' ? 'Crear Solicitud' : 'Publicar Caso'}
                                </Button>
                            )}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

