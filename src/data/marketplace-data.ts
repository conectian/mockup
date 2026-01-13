export type ProviderTier = "Gold" | "Silver" | "Bronze";

export interface UseCase {
  id: string;
  title: string;
  providerName: string;
  providerTier: ProviderTier;
  description: string;
  industry: string;
  techStack: string[];
  roi: string;
  image: string;
}

export const INDUSTRIES = [
  "Fintech",
  "Retail",
  "Salud",
  "Seguros",
  "Logística",
  "Legal",
  "RRHH",
  "Energía",
] as const;

export const TECHNOLOGIES = [
  "Python",
  "React",
  "Node.js",
  "AWS",
  "Azure",
  "TensorFlow",
  "Kubernetes",
  "Blockchain",
  "NLP",
  "Computer Vision",
] as const;

export const mockUseCases: UseCase[] = [
  {
    id: "uc-001",
    title: "Automatización de Conciliación Bancaria",
    providerName: "FinanceBot AI",
    providerTier: "Gold",
    description:
      "Sistema inteligente que automatiza la conciliación de movimientos bancarios con asientos contables, reduciendo errores humanos y tiempo de procesamiento en más del 80%.",
    industry: "Fintech",
    techStack: ["Python", "TensorFlow", "AWS"],
    roi: "30% ahorro en tiempo",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    id: "uc-002",
    title: "Chatbot de Atención al Cliente 24/7",
    providerName: "BotMaster Pro",
    providerTier: "Gold",
    description:
      "Asistente virtual con NLP avanzado que resuelve el 70% de consultas sin intervención humana. Integración con WhatsApp, Web y Apps móviles.",
    industry: "Retail",
    techStack: ["Node.js", "NLP", "Azure"],
    roi: "€50k/año ahorro",
    image:
      "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop",
  },
  {
    id: "uc-003",
    title: "Predicción de Demanda con ML",
    providerName: "DataFlow Analytics",
    providerTier: "Silver",
    description:
      "Modelo de machine learning que predice la demanda de productos con 95% de precisión, optimizando inventarios y reduciendo costes de almacenamiento.",
    industry: "Retail",
    techStack: ["Python", "TensorFlow", "Kubernetes"],
    roi: "25% reducción stock",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: "uc-004",
    title: "Sistema de Detección de Fraude",
    providerName: "SecureChain",
    providerTier: "Gold",
    description:
      "Plataforma en tiempo real que detecta transacciones fraudulentas usando blockchain y AI, con menos del 0.1% de falsos positivos.",
    industry: "Fintech",
    techStack: ["Blockchain", "Python", "AWS"],
    roi: "€200k fraude evitado",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  },
  {
    id: "uc-005",
    title: "Diagnóstico Médico por Imagen",
    providerName: "HealthVision AI",
    providerTier: "Silver",
    description:
      "Algoritmo de computer vision que asiste a radiólogos en la detección temprana de anomalías en radiografías y TACs con 98% de sensibilidad.",
    industry: "Salud",
    techStack: ["Python", "Computer Vision", "Azure"],
    roi: "40% más diagnósticos",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
  },
  {
    id: "uc-006",
    title: "Optimización de Rutas Logísticas",
    providerName: "LogiRoute",
    providerTier: "Bronze",
    description:
      "Algoritmo de optimización que reduce costes de transporte y emisiones CO2 mediante rutas inteligentes y consolidación de cargas.",
    industry: "Logística",
    techStack: ["Python", "React", "AWS"],
    roi: "20% menos combustible",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
  },
  {
    id: "uc-007",
    title: "Automatización de Contratos Legales",
    providerName: "LegalBot",
    providerTier: "Silver",
    description:
      "Plataforma de generación y revisión automática de contratos usando NLP, reduciendo tiempos de redacción legal en un 60%.",
    industry: "Legal",
    techStack: ["Node.js", "NLP", "Kubernetes"],
    roi: "60% menos tiempo",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
  },
  {
    id: "uc-008",
    title: "Análisis de Sentimiento de Empleados",
    providerName: "PeopleInsight",
    providerTier: "Bronze",
    description:
      "Herramienta que analiza comunicaciones internas y encuestas para medir el clima laboral y predecir rotación de personal.",
    industry: "RRHH",
    techStack: ["Python", "NLP", "Azure"],
    roi: "15% menos rotación",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  },
];
