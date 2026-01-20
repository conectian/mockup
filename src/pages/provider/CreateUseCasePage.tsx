import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
    ArrowLeft, ArrowRight, Wand2, Video, CheckCircle2, ShieldCheck, 
    Zap, DollarSign, Database, Bot, Send, Sparkles, User, Loader2, FileText 
} from 'lucide-react';
import { toast } from 'sonner';

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
  humanIntervention: number; // 0 = 100% Auto, 50 = Supervisado, 100 = Copiloto
  techStack: string; // Comma separated
  integrations: string; // Comma separated
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
  humanIntervention: 50, // Default to supervisado
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
        content: "¡Hola! Soy tu asistente de creación de productos. Cuéntame, ¿qué herramienta o solución quieres publicar hoy? (Ej: 'Un chatbot para banca', 'Un modelo de visión para retail'...).",
        timestamp: new Date()
    }
];

export default function CreateUseCasePage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'wizard' | 'chat'>('chat'); // Default to Chat
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-save mock
  useEffect(() => {
    const saved = localStorage.getItem('create_use_case_draft');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
        // toast.info("Borrador recuperado", { description: "Se han cargado los datos de tu última sesión." });
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('create_use_case_draft', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
      // Scroll to bottom of chat
      if (mode === 'chat') {
          messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [messages, mode]);

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

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

      // Simulate AI processing time
      setTimeout(() => {
         processAIResponse(userMsg.content);
         setIsTyping(false);
      }, 1500 + Math.random() * 1000);
  };

  const processAIResponse = (text: string) => {
      const lowerText = text.toLowerCase();
      let responseText = "";
      
      // Simple keyword matching Mock Logic
      const updates: Partial<FormData> = {};

      if (lowerText.includes('chatbot') || lowerText.includes('asistente') || lowerText.includes('chat')) {
          updates.appType = 'chatbot';
          updates.humanIntervention = 30;
          if (!formData.title) updates.title = "Asistente Virtual Inteligente";
          responseText += "He detectado que es un **Chatbot**. ";
      }
      if (lowerText.includes('visión') || lowerText.includes('detección') || lowerText.includes('cámara')) {
          updates.appType = 'vision';
          updates.humanIntervention = 10;
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
           // extract numbers mock
           const numbers = text.match(/\d+/g);
           if (numbers && numbers.length > 0) {
               updates.priceMin = numbers[0];
               if (numbers.length > 1) updates.priceMax = numbers[1];
               responseText += `He anotado el rango de precios: **${updates.priceMin}€**${updates.priceMax ? ` - ${updates.priceMax}€` : ''}. `;
           }
      }

      // Apply updates
      if (Object.keys(updates).length > 0) {
          setFormData(prev => ({ ...prev, ...updates }));
          responseText += "He actualizado el formulario con estos datos. ¿Qué más me puedes contar? (ej: tecnologías, certificaciones...)";
      } else {
          responseText = "Entendido. Sigue contándome detalles como el **precio**, las **tecnologías** que usa o si tiene alguna **certificación** específica.";
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
      toast.success("Video Generado con IA", { description: "Se ha añadido un video explicativo a tu caso de uso." });
    }, 2500);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Submit logic here
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem('create_use_case_draft');
      toast.success("Caso de Uso Creado", { description: "El caso de uso se ha publicado correctamente." });
      navigate('/provider/marketplace');
    }, 1500);
  };

  // Helper renderers for steps
  const renderStepIndicator = () => (
    <div className="mb-8 hidden md:block">
      <div className="flex justify-between text-sm font-medium mb-2 text-muted-foreground">
        <span className={step >= 1 ? "text-primary transition-all duration-300" : ""}>1. La Solución</span>
        <span className={step >= 2 ? "text-primary transition-all duration-300" : ""}>2. Modelo Negocio</span>
        <span className={step >= 3 ? "text-primary transition-all duration-300" : ""}>3. Tecnología</span>
        <span className={step >= 4 ? "text-primary transition-all duration-300" : ""}>4. Seguridad</span>
      </div>
      <Progress value={step * 25} className="h-2" />
    </div>
  );

  return (
    <div className="container max-w-6xl py-6 md:py-10 pb-20">
      
      {/* Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Nuevo Caso de Uso</h1>
            <p className="text-sm md:text-base text-muted-foreground">Crea tu producto con ayuda de IA o manualmente.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-muted/30 p-1 rounded-lg border">
              <Tabs value={mode} onValueChange={(v) => setMode(v as any)} className="w-[300px]">
                  <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <Bot className="h-4 w-4" /> Asistente IA
                      </TabsTrigger>
                      <TabsTrigger value="wizard" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                          <FileText className="h-4 w-4" /> Formulario
                      </TabsTrigger>
                  </TabsList>
              </Tabs>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
          
          {/* LEFT: FORM PREVIEW / WIZARD */}
          <div className={`lg:col-span-2 ${mode === 'chat' ? 'hidden lg:block opacity-80 pointer-events-none scale-95 origin-top-left transition-all' : 'block'}`}>
            {/* Show standard wizard when in wizard mode, or a preview when in chat mode */}
             <div className="overflow-y-auto h-full pr-2 space-y-6">
                {renderStepIndicator()}
                
                 {/* STEP 1: SOLUCIÓN */}
        {(step === 1 || mode === 'chat') && (
          <Card className={`border-t-4 border-t-primary shadow-lg ${mode === 'chat' ? 'mb-4' : ''}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5 text-primary" /> Identidad del Producto
              </CardTitle>
              {mode !== 'chat' && <CardDescription>Define qué es tu solución y a quién va dirigida.</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="title">Título de la Solución <span className="text-red-500">*</span></Label>
                <Input 
                  id="title" 
                  placeholder="Ej: Chatbot de Atención al Cliente 24/7" 
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="description">Descripción Corta <span className="text-red-500">*</span></Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe brevemente el valor que aporta..." 
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
        )}

        {/* STEP 2: MODELO DE NEGOCIO */}
        {(step === 2 || mode === 'chat') && (
          <Card className={`border-t-4 border-t-primary shadow-lg ${mode === 'chat' ? 'mb-4' : ''}`}>
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
        )}

        {/* STEP 3: THE MOTOR */}
        {(step === 3 || mode === 'chat') && (
           <Card className={`border-t-4 border-t-primary shadow-lg ${mode === 'chat' ? 'mb-4' : ''}`}>
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
        )}

        {/* STEP 4: CONFIANZA Y SEGURIDAD */}
        {(step === 4 || mode === 'chat') && (
          <Card className={`border-t-4 border-t-primary shadow-lg ${mode === 'chat' ? 'mb-4' : ''}`}>
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
        )}

        {/* Navigation Buttons (Wizard Mode) */}
        {mode === 'wizard' && (
          <div className="flex justify-between mt-8 sticky bottom-4 bg-background/80 backdrop-blur-sm p-4 border rounded-xl shadow-2xl">
            <Button 
              variant="outline" 
              onClick={prevStep} 
              disabled={step === 1}
              className="w-32"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            
            {step < 4 ? (
              <Button onClick={nextStep} className="w-32 bg-primary/90 hover:bg-primary">
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={loading} className="w-40 bg-green-600 hover:bg-green-700 text-white">
                {loading ? "Publicando..." : (
                  <><CheckCircle2 className="mr-2 h-4 w-4" /> Publicar Caso</>
                )}
              </Button>
            )}
          </div>
        )}
             </div>
          </div>

          {/* RIGHT: CHAT INTERFACE / FORM PREVIEW (Mobile) */}
          <div className={`lg:col-span-1 h-full flex flex-col ${mode === 'wizard' ? 'hidden lg:flex' : 'flex bg-background fixed inset-0 z-50 lg:static lg:bg-transparent lg:z-auto'}`}>
              {/* Mobile Chat Header */}
              <div className="lg:hidden p-4 border-b flex items-center justify-between">
                  <h2 className="font-bold flex items-center gap-2"><Bot className="h-5 w-5 text-primary"/> Asistente IA</h2>
                  <Button variant="ghost" size="sm" onClick={() => setMode('wizard')}>Cerrar</Button>
              </div>

              {/* Chat Container */}
              <Card className="flex flex-col h-full border-primary/20 shadow-xl overflow-hidden">
                  <CardHeader className="bg-primary/5 pb-4">
                      <CardTitle className="text-base flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" /> Tu copiloto
                      </CardTitle>
                      <CardDescription className="text-xs">
                          Describe tu producto y rellenaré el formulario por ti.
                      </CardDescription>
                  </CardHeader>
                  
                  {/* Messages List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
                      {messages.map((msg) => (
                          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                              {msg.role === 'assistant' && (
                                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                      <Bot className="h-4 w-4 text-primary" />
                                  </div>
                              )}
                              <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                  msg.role === 'user' 
                                  ? 'bg-primary text-primary-foreground rounded-tr-none' 
                                  : 'bg-white dark:bg-zinc-800 border shadow-sm rounded-tl-none'
                              }`}>
                                  {msg.content.split('**').map((part, i) => (
                                    i % 2 === 1 ? <span key={i} className="font-bold text-amber-500">{part}</span> : part
                                  ))}
                              </div>
                              {msg.role === 'user' && (
                                  <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                                      <User className="h-4 w-4" />
                                  </div>
                              )}
                          </div>
                      ))}
                      {isTyping && (
                          <div className="flex gap-3 justify-start">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                  <Bot className="h-4 w-4 text-primary" />
                              </div>
                              <div className="bg-white dark:bg-zinc-800 border shadow-sm rounded-2xl rounded-tl-none px-4 py-3 flex gap-1">
                                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}/>
                                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}/>
                                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}/>
                              </div>
                          </div>
                      )}
                      <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 bg-background border-t">
                      <div className="relative flex items-center">
                          <Input 
                              placeholder="Ej: Es un SaaS para logística..." 
                              className="pr-12 py-6 bg-muted/30 border-muted-foreground/20 focus-visible:ring-primary"
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
                              {isTyping ? <Loader2 className="h-4 w-4 animate-spin"/> : <Send className="h-4 w-4" />}
                          </Button>
                      </div>
                      <div className="flex justify-center mt-3">
                         {/* Action Buttons for Chat Mode */}
                         <Button 
                            variant="default" 
                            size="sm"
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={handleSubmit}
                         >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Finalizar y Publicar
                         </Button>
                      </div>
                  </div>
              </Card>
          </div>
      </div>
    </div>
  );
}
