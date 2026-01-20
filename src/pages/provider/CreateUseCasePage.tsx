import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  ArrowLeft, Wand2, Video, CheckCircle2, ShieldCheck,
  Zap, DollarSign, Database, Bot, Send, User, Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { DotLottiePlayer } from '@dotlottie/react-player';

const ROBOT_ANIMATION = "https://assets-v2.lottiefiles.com/a/b80c8f58-1166-11ee-bad3-8fb1e44c9ce0/TolqgF3Tqs.lottie";

type FormData = {
  // Step 1: Solutions
  title: string;
  description: string;
  appType: string;
  sectors: string[];
  clientSize: string[];
  offerFormat: string;

  // Step 2: Business Model
  techModality: string[];
  priceMin: string;
  priceMax: string;
  pricePeriod: string;
  languages: string[];

  // Step 3: The Engine
  aiModel: string;
  humanIntervention: number;
  techStack: string;
  integrations: string;
  integrationTime: string;

  // Step 4: Trust & Security
  dataSovereignty: string;
  dataSecurity: string[];
  compliance: string[];
  certifications: string[];
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
};

const initialFormData: FormData = {
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
  humanIntervention: 50,
  techStack: '',
  integrations: '',
  integrationTime: '<1-week',

  dataSovereignty: 'eu',
  dataSecurity: [],
  compliance: [],
  certifications: [],
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "¡Hola! Soy tu asistente de creación. Cuéntame, ¿qué solución necesitas? (Ej: 'Un chatbot para atención al cliente', 'Un sistema de visión para retail'...).",
    timestamp: new Date()
  }
];

export default function CreateUseCasePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isRFP = location.pathname.includes('/client/');

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  // Auto-save mock
  const storageKey = isRFP ? 'create_rfp_draft' : 'create_use_case_draft';
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(formData));
  }, [formData, storageKey]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Solo hacer scroll dentro del contenedor del chat, no de toda la página
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof FormData, item: string) => {
    setFormData(prev => {
      const current = prev[field] as string[];
      if (current.includes(item)) {
        return { ...prev, [field]: current.filter(i => i !== item) };
      } else {
        return { ...prev, [field]: [...current, item] };
      }
    });
  };

  // --- AI Chat Logic (Mock) ---
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
      processAIResponse(userMsg.content);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const processAIResponse = (text: string) => {
    const lowerText = text.toLowerCase();
    let responseText = "";
    const updates: Partial<FormData> = {};

    // Detectar tipo de aplicación
    if (lowerText.includes('chatbot') || lowerText.includes('asistente') || lowerText.includes('chat') || lowerText.includes('atención')) {
      updates.appType = 'chatbot';
      updates.humanIntervention = 30;
      updates.title = "Chatbot de Atención al Cliente 24/7";
      updates.description = "Solución de atención automatizada con IA conversacional para resolver consultas de clientes de forma instantánea, reduciendo tiempos de espera y mejorando la satisfacción.";
      updates.offerFormat = 'SaaS';
      updates.techModality = ['SaaS Cloud'];
      updates.languages = ['Español', 'Inglés'];
      responseText += "He detectado que buscas un **Chatbot de Atención al Cliente**. He rellenado los detalles básicos. ";
    }
    if (lowerText.includes('visión') || lowerText.includes('detección') || lowerText.includes('cámara') || lowerText.includes('imagen')) {
      updates.appType = 'vision';
      updates.humanIntervention = 10;
      updates.title = "Sistema de Visión Artificial para Control de Calidad";
      updates.description = "Solución de detección de defectos en tiempo real mediante cámaras y modelos de deep learning, optimizando la línea de producción.";
      updates.offerFormat = 'Servicios';
      updates.techModality = ['On-premise', 'Híbrido'];
      responseText += "Parece que necesitas **Visión Artificial**. He configurado los campos principales. ";
    }
    if (lowerText.includes('rpa') || lowerText.includes('automatización') || lowerText.includes('automatizar')) {
      updates.appType = 'automation';
      updates.humanIntervention = 50;
      updates.title = "Automatización Inteligente de Procesos (RPA+IA)";
      updates.description = "Automatización de tareas repetitivas combinando RPA con modelos de IA para procesar documentos, emails y datos de forma autónoma.";
      updates.offerFormat = 'Servicios';
      updates.techStack = 'UiPath, Python, Azure';
      responseText += "Perfecto, he configurado una solución de **Automatización RPA+IA**. ";
    }

    // Detectar sector
    if (lowerText.includes('banca') || lowerText.includes('banco') || lowerText.includes('fintech') || lowerText.includes('financ')) {
      updates.sectors = ['Banca'];
      updates.compliance = ['GDPR (Europa)', 'SOC2'];
      updates.dataSecurity = ['Encriptación en reposo', 'Encriptación en tránsito', 'SSO'];
      updates.priceMin = '15000';
      updates.priceMax = '50000';
      responseText += "Lo he categorizado en el sector **Banca/Fintech** con compliance apropiado. ";
    }
    if (lowerText.includes('retail') || lowerText.includes('tienda') || lowerText.includes('comercio')) {
      updates.sectors = ['Retail'];
      updates.clientSize = ['Pyme', 'Corporate/Enterprise'];
      updates.priceMin = '5000';
      updates.priceMax = '25000';
      responseText += "Configurado para el sector **Retail**. ";
    }
    if (lowerText.includes('salud') || lowerText.includes('hospital') || lowerText.includes('médic') || lowerText.includes('clinic')) {
      updates.sectors = ['Salud'];
      updates.compliance = ['GDPR (Europa)', 'HIPAA (Salud)'];
      updates.dataSecurity = ['Encriptación en reposo', 'Encriptación en tránsito', 'Anonimización'];
      updates.certifications = ['ISO 27001', 'ISO 9001'];
      responseText += "Configurado para **Salud** con compliance HIPAA y certificaciones. ";
    }
    if (lowerText.includes('industria') || lowerText.includes('fábrica') || lowerText.includes('manufactura') || lowerText.includes('producción')) {
      updates.sectors = ['Industria'];
      updates.techModality = ['On-premise'];
      updates.integrations = 'SAP, ERP, MES, SCADA';
      updates.integrationTime = '1-3-months';
      responseText += "Configurado para **Industria/Manufactura** con integraciones típicas. ";
    }

    // Detectar tecnologías
    if (lowerText.includes('python') || lowerText.includes('tensorflow') || lowerText.includes('pytorch')) {
      updates.techStack = 'Python, TensorFlow, PyTorch';
      updates.aiModel = 'open';
      responseText += "He anotado el stack tecnológico **Python/ML**. ";
    }
    if (lowerText.includes('azure') || lowerText.includes('microsoft')) {
      updates.techStack = (updates.techStack || formData.techStack) + ', Azure Cognitive Services';
      updates.dataSovereignty = 'eu';
      responseText += "Añadido **Azure** al stack. ";
    }
    if (lowerText.includes('aws') || lowerText.includes('amazon')) {
      updates.techStack = (updates.techStack || formData.techStack) + ', AWS SageMaker';
      responseText += "Añadido **AWS** al stack. ";
    }
    if (lowerText.includes('sap') || lowerText.includes('salesforce') || lowerText.includes('erp')) {
      updates.integrations = 'SAP, Salesforce, HubSpot';
      responseText += "He configurado integraciones con **SAP/Salesforce**. ";
    }

    // Detectar certificaciones
    if (lowerText.includes('iso') || lowerText.includes('certificad')) {
      updates.certifications = ['ISO 27001', 'ISO 9001'];
      responseText += "He añadido certificaciones **ISO**. ";
    }
    if (lowerText.includes('gdpr') || lowerText.includes('rgpd') || lowerText.includes('protección de datos')) {
      updates.compliance = [...(updates.compliance || []), 'GDPR (Europa)'];
      updates.dataSecurity = ['Encriptación en reposo', 'Encriptación en tránsito'];
      responseText += "Configurado cumplimiento **GDPR**. ";
    }

    // Detectar precios
    if (lowerText.includes('precio') || lowerText.includes('euros') || lowerText.includes('€') || lowerText.includes('coste')) {
      const numbers = text.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        updates.priceMin = numbers[0];
        if (numbers.length > 1) updates.priceMax = numbers[1];
        responseText += `He anotado el rango de precios: **${updates.priceMin}€**${updates.priceMax ? ` - ${updates.priceMax}€` : ''}. `;
      }
    }

    // Detectar tamaño de cliente
    if (lowerText.includes('startup') || lowerText.includes('pequeñ')) {
      updates.clientSize = ['Startup', 'Pyme'];
      responseText += "Orientado a **Startups y Pymes**. ";
    }
    if (lowerText.includes('enterprise') || lowerText.includes('corporat') || lowerText.includes('grande')) {
      updates.clientSize = ['Corporate/Enterprise'];
      responseText += "Orientado a **grandes empresas**. ";
    }

    if (Object.keys(updates).length > 0) {
      setFormData(prev => ({ ...prev, ...updates }));
      responseText += "\n\n¿Hay algo más que quieras ajustar? Puedo modificar precios, tecnologías, certificaciones...";
    } else {
      responseText = "Entendido. Cuéntame más sobre:\n• **Tipo de solución** (chatbot, visión, automatización...)\n• **Sector** (banca, retail, salud, industria...)\n• **Tecnologías** (Python, Azure, SAP...)\n• **Presupuesto** aproximado";
    }

    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'assistant',
      content: responseText,
      timestamp: new Date()
    }]);
  };

  const handleGenerateVideo = () => {
    setIsGeneratingVideo(true);
    setTimeout(() => {
      setIsGeneratingVideo(false);
      toast.success("Video Generado con IA", { description: "Se ha añadido un video explicativo." });
    }, 2500);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem(storageKey);
      toast.success(isRFP ? "Solicitud RFP Creada" : "Caso de Uso Creado", {
        description: isRFP ? "Tu solicitud se ha publicado en el marketplace." : "El caso de uso se ha publicado correctamente."
      });
      navigate(isRFP ? '/client/marketplace?tab=innovacion' : '/provider/marketplace');
    }, 1500);
  };

  return (
    <div className="h-full overflow-hidden flex flex-col">
      {/* Top Navigation */}
      <div className="shrink-0 border-b border-white/10 bg-background/50 backdrop-blur-sm px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">{isRFP ? "Nueva Solicitud (RFP)" : "Nuevo Caso de Uso"}</h1>
            <p className="text-sm text-muted-foreground">{isRFP ? "Describe tu necesidad y la IA te ayudará a estructurarla." : "Crea tu producto con ayuda de IA."}</p>
          </div>
        </div>
      </div>

      {/* Main Content - Fixed Left + Scrollable Right */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex gap-6 p-4 md:p-6">

          {/* LEFT: AI Copilot - FIXED in viewport */}
          <div className="w-[380px] shrink-0 hidden lg:block h-full">
            <Card className="flex flex-col h-full border-primary/20 shadow-xl overflow-hidden bg-gradient-to-b from-background to-muted/10">
              <CardHeader className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20 overflow-hidden">
                    <DotLottiePlayer
                      src={ROBOT_ANIMATION}
                      autoplay
                      loop
                      className="w-14 h-14 scale-150"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base">Tu Copiloto IA</CardTitle>
                    <CardDescription className="text-xs">
                      Describe tu {isRFP ? "necesidad" : "producto"} y rellenaré el formulario por ti
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Messages List */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden">
                        <DotLottiePlayer
                          src={ROBOT_ANIMATION}
                          autoplay
                          loop
                          className="w-12 h-12 scale-150"
                        />
                      </div>
                    )}
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-white/5 border border-white/10 rounded-bl-sm'
                      }`}>
                      {msg.content.split('**').map((part, i) => (
                        i % 2 === 1 ? <span key={i} className="font-bold text-primary">{part}</span> : part
                      ))}
                    </div>
                    {msg.role === 'user' && (
                      <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden">
                      <DotLottiePlayer
                        src={ROBOT_ANIMATION}
                        autoplay
                        loop
                        className="w-12 h-12 scale-150"
                      />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 shrink-0">
                <div className="relative flex items-center gap-2">
                  <Input
                    placeholder="Ej: Necesito un chatbot para..."
                    className="pr-12 py-6 bg-white/5 border-white/10 focus-visible:ring-primary"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={isTyping}
                  />
                  <Button
                    size="icon"
                    className="absolute right-1.5 h-9 w-9"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                  >
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT: Form - SCROLLABLE */}
          <div className="flex-1 min-w-0 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <div className="space-y-6 pb-6">

              {/* STEP 1: SOLUCIÓN */}
              <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-primary" /> {isRFP ? "Detalles de la Necesidad" : "Identidad del Producto"}
                  </CardTitle>
                  <CardDescription>{isRFP ? "Define qué solución buscas y para quién." : "Define qué es tu solución y a quién va dirigida."}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="title">{isRFP ? "Título de la Solicitud" : "Título de la Solución"} <span className="text-red-500">*</span></Label>
                    <Input
                      id="title"
                      placeholder={isRFP ? "Ej: Busco un Chatbot de Atención al Cliente" : "Ej: Chatbot de Atención al Cliente 24/7"}
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="description">Descripción Corta <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="description"
                      placeholder={isRFP ? "Describe qué problema necesitas resolver..." : "Describe brevemente el valor que aporta..."}
                      className="min-h-[100px]"
                      value={formData.description}
                      onChange={(e) => updateField('description', e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Tipo de Aplicación <span className="text-red-500">*</span></Label>
                      <Select value={formData.appType} onValueChange={(v) => updateField('appType', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chatbot">Chatbot / Asistente</SelectItem>
                          <SelectItem value="vision">Visión Artificial</SelectItem>
                          <SelectItem value="automation">Automatización (RPA)</SelectItem>
                          <SelectItem value="prediction">Predicción / Analytics</SelectItem>
                          <SelectItem value="content">Generación de Contenido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Formato de la Oferta</Label>
                      <div className="flex flex-wrap gap-2">
                        {['SaaS', 'Servicios', 'Formación'].map((type) => (
                          <Badge
                            key={type}
                            variant={formData.offerFormat === type ? "default" : "outline"}
                            className="cursor-pointer text-sm py-1 px-3 hover:bg-primary/90"
                            onClick={() => updateField('offerFormat', type)}
                          >
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Sector / Industria <span className="text-xs text-muted-foreground">(¿A qué verticales se dirige principalmente?)</span></Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Retail', 'Banca', 'Salud', 'Legal', 'Industria', 'Seguros', 'Marketing', 'Transversal/Todos'].map(sector => (
                        <div key={sector} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`sector-${sector}`}
                            checked={formData.sectors.includes(sector)}
                            onCheckedChange={() => toggleArrayItem('sectors', sector)}
                          />
                          <label htmlFor={`sector-${sector}`} className="text-sm cursor-pointer w-full">{sector}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Tamaño del Cliente Ideal <span className="text-xs text-muted-foreground">(¿Para qué tamaño de empresa está optimizado?)</span></Label>
                    <div className="flex flex-wrap gap-3">
                      {['Startup', 'Pyme', 'Corporate/Enterprise'].map(size => (
                        <div key={size} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`size-${size}`}
                            checked={formData.clientSize.includes(size)}
                            onCheckedChange={() => toggleArrayItem('clientSize', size)}
                          />
                          <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">{size}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 2: MODELO DE NEGOCIO */}
              <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-primary" /> Modelo de Negocio
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-3">
                    <Label>Modalidad Técnica</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {['SaaS Cloud', 'On-premise', 'Híbrido'].map(modality => (
                        <div key={modality} className="flex items-center space-x-2 border rounded-lg p-3 w-full hover:bg-muted/50">
                          <Checkbox
                            id={`mod-${modality}`}
                            checked={formData.techModality.includes(modality)}
                            onCheckedChange={() => toggleArrayItem('techModality', modality)}
                          />
                          <label htmlFor={`mod-${modality}`} className="font-medium cursor-pointer flex-1">{modality}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Rango de Precios <span className="text-xs text-muted-foreground">(Opcional pero recomendado para SEO)</span></Label>
                    <p className="text-xs text-muted-foreground mb-2">Coste estimado anual</p>
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                        <Input
                          placeholder="Min"
                          className="pl-8"
                          type="number"
                          value={formData.priceMin}
                          onChange={(e) => updateField('priceMin', e.target.value)}
                        />
                      </div>
                      <span className="text-muted-foreground">-</span>
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-2.5 text-muted-foreground">€</span>
                        <Input
                          placeholder="Max"
                          className="pl-8"
                          type="number"
                          value={formData.priceMax}
                          onChange={(e) => updateField('priceMax', e.target.value)}
                        />
                      </div>
                      <Select value={formData.pricePeriod} onValueChange={(v) => updateField('pricePeriod', v)}>
                        <SelectTrigger className="w-[140px]">
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
                    <Label>Idiomas Soportados <span className="text-xs text-muted-foreground">(¿En qué idiomas dais soporte e interfaz?)</span></Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano', 'Portugués', 'Catalán', 'Euskera'].map(lang => (
                        <div key={lang} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`lang-${lang}`}
                            checked={formData.languages.includes(lang)}
                            onCheckedChange={() => toggleArrayItem('languages', lang)}
                          />
                          <label htmlFor={`lang-${lang}`} className="text-sm cursor-pointer w-full">{lang}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* STEP 3: THE MOTOR */}
              <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Database className="h-5 w-5 text-primary" /> Detalles Técnicos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <Label>Tipo de IA (Modelo)</Label>
                      <RadioGroup value={formData.aiModel} onValueChange={(v) => updateField('aiModel', v)}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="open" id="r1" />
                          <Label htmlFor="r1" className="font-normal">Open Source (Abierta)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="prop" id="r2" />
                          <Label htmlFor="r2" className="font-normal">Propietaria/Cerrada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="r3" />
                          <Label htmlFor="r3" className="font-normal">Híbrida</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label>Nivel de Intervención Humana</Label>
                      <RadioGroup value={formData.humanIntervention.toString()} onValueChange={(v) => updateField('humanIntervention', parseInt(v))}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="h1" />
                          <Label htmlFor="h1" className="font-normal">100% Automático</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="50" id="h2" />
                          <Label htmlFor="h2" className="font-normal">Human-in-the-loop (Supervisado)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="100" id="h3" />
                          <Label htmlFor="h3" className="font-normal">Copiloto (Asiste al humano)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Stack Tecnológico / Compatibilidad <span className="text-xs text-muted-foreground">(¿Qué tecnologías usa o requiere?)</span></Label>
                    <Input
                      placeholder="Ej: Python, Azure, AWS, TensorFlow (separados por comas)"
                      value={formData.techStack}
                      onChange={(e) => updateField('techStack', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Separa las tecnologías con comas</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Integraciones Nativas <span className="text-xs text-muted-foreground">(¿Con qué se conecta 'out of the box'?)</span></Label>
                    <Input
                      placeholder="Ej: Salesforce, SAP, HubSpot, Slack (separados por comas)"
                      value={formData.integrations}
                      onChange={(e) => updateField('integrations', e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Separa las integraciones con comas</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Tiempo de Integración estimado</Label>
                    <Select value={formData.integrationTime} onValueChange={(v) => updateField('integrationTime', v)}>
                      <SelectTrigger>
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

              {/* STEP 4: CONFIANZA Y SEGURIDAD */}
              <Card className="border-t-4 border-t-primary shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShieldCheck className="h-5 w-5 text-primary" /> Confianza y Seguridad
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-3">
                    <Label>Ubicación / Soberanía del Dato <span className="text-xs text-muted-foreground">(¿Dónde se alojan los datos?)</span></Label>
                    <Select value={formData.dataSovereignty} onValueChange={(v) => updateField('dataSovereignty', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona ubicación" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eu">Unión Europea (Frankfurt/Dublín)</SelectItem>
                        <SelectItem value="usa">EEUU</SelectItem>
                        <SelectItem value="onprem">On-premise del cliente</SelectItem>
                        <SelectItem value="global">Global / Distribuido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Seguridad de Datos</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Encriptación en reposo', 'Encriptación en tránsito', 'SSO', 'Anonimización'].map(sec => (
                        <div key={sec} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`sec-${sec}`}
                            checked={formData.dataSecurity.includes(sec)}
                            onCheckedChange={() => toggleArrayItem('dataSecurity', sec)}
                          />
                          <label htmlFor={`sec-${sec}`} className="text-sm cursor-pointer w-full">{sec}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Regulación (Compliance)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['GDPR (Europa)', 'AI Act', 'HIPAA (Salud)', 'SOC2'].map(comp => (
                        <div key={comp} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`comp-${comp}`}
                            checked={formData.compliance.includes(comp)}
                            onCheckedChange={() => toggleArrayItem('compliance', comp)}
                          />
                          <label htmlFor={`comp-${comp}`} className="text-sm cursor-pointer w-full">{comp}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Certificaciones</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['ISO 27001', 'Esquema Nacional de Seguridad (ENS)', 'ISO 9001', 'ISO 14001', 'CMMI', 'ITIL'].map(cert => (
                        <div key={cert} className="flex items-center space-x-2 border rounded-md p-2 hover:bg-muted/50 transition-colors">
                          <Checkbox
                            id={`cert-${cert}`}
                            checked={formData.certifications.includes(cert)}
                            onCheckedChange={() => toggleArrayItem('certifications', cert)}
                          />
                          <label htmlFor={`cert-${cert}`} className="text-sm cursor-pointer w-full text-xs">{cert}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-muted/30 p-6 rounded-lg border flex flex-col items-center justify-center text-center gap-4 mt-6">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg">Potencia tu venta con Video</h3>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Genera automáticamente un video explicativo de 30 segundos basado en los datos.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="gap-2 border-primary/50 hover:bg-primary/5"
                      onClick={handleGenerateVideo}
                      disabled={isGeneratingVideo}
                    >
                      {isGeneratingVideo ? (
                        <>Generando guión y video...</>
                      ) : (
                        <><Wand2 className="h-4 w-4" /> Generar Video con IA</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 border-t border-white/10 -mx-2 px-2">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base"
                >
                  {loading ? "Publicando..." : (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> {isRFP ? "Publicar Solicitud" : "Publicar Caso de Uso"}</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Chat Sheet */}
      <Sheet open={mobileChatOpen} onOpenChange={setMobileChatOpen}>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="lg:hidden fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90"
          >
            <Bot className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-3xl">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20 overflow-hidden">
                  <DotLottiePlayer
                    src={ROBOT_ANIMATION}
                    autoplay
                    loop
                    className="w-14 h-14 scale-150"
                  />
                </div>
                <div>
                  <SheetTitle className="text-left">Tu Copiloto IA</SheetTitle>
                  <p className="text-xs text-muted-foreground">Describe tu {isRFP ? "necesidad" : "producto"}</p>
                </div>
              </div>
            </SheetHeader>

            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden">
                      <DotLottiePlayer
                        src={ROBOT_ANIMATION}
                        autoplay
                        loop
                        className="w-12 h-12 scale-150"
                      />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-white/5 border border-white/10 rounded-bl-sm'
                    }`}>
                    {msg.content.split('**').map((part, i) => (
                      i % 2 === 1 ? <span key={i} className="font-bold text-primary">{part}</span> : part
                    ))}
                  </div>
                  {msg.role === 'user' && (
                    <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden">
                    <DotLottiePlayer
                      src={ROBOT_ANIMATION}
                      autoplay
                      loop
                      className="w-12 h-12 scale-150"
                    />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 shrink-0">
              <div className="relative flex items-center gap-2">
                <Input
                  placeholder="Ej: Necesito un chatbot para banca..."
                  className="pr-12 py-6 bg-white/5 border-white/10"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  className="absolute right-1.5 h-9 w-9"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
