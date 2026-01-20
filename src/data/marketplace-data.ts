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

export interface InnovationRequest {
  id: string;
  title: string;
  description: string;
  sector: string;
  createdAt: string;
  status: "Active" | "Closed" | "Draft";
  budgetRange: string;
  responsesCount: number;
}

export const MOCK_REQUESTS: InnovationRequest[] = [
  {
    id: "1",
    title: "Sistema de Detección de Anomalías en Producción",
    description:
      "Buscamos una solución de visión artificial para detectar defectos en línea de montaje.",
    sector: "Manufactura",
    createdAt: "2025-10-15",
    status: "Active",
    budgetRange: "50k - 100k",
    responsesCount: 5,
  },
  {
    id: "2",
    title: "Motor de Recomendación para E-commerce",
    description:
      "Necesitamos mejorar el cross-selling en nuestra tienda online usando ML.",
    sector: "Retail",
    createdAt: "2025-09-20",
    status: "Closed",
    budgetRange: "20k - 50k",
    responsesCount: 12,
  },
  {
    id: "3",
    title: "Automatización de Reportes Financieros",
    description:
      "Unificación de datos de múltiples ERPs para reportes automáticos en tiempo real.",
    sector: "Finanzas",
    createdAt: "2025-11-01",
    status: "Active",
    budgetRange: "30k - 60k",
    responsesCount: 8,
  },
  {
    id: "4",
    title: "Sistema de Visión por Computador para Control de Calidad",
    description:
      "Implementación de IA en cámaras de seguridad para control de EPIs.",
    sector: "Seguridad",
    createdAt: "2025-10-28",
    status: "Active",
    budgetRange: "80k - 150k",
    responsesCount: 3,
  },
  {
    id: "5",
    title: "Chatbot Multiidioma para Atención al Cliente",
    description: "Soporte 24/7 en 6 idiomas para nuestro mercado europeo.",
    sector: "Retail",
    createdAt: "2025-09-05",
    status: "Closed",
    budgetRange: "40k - 80k",
    responsesCount: 15,
  },
  {
    id: "6",
    title: "Optimización de Rutas Logísticas con IA",
    description:
      "Algoritmo para reducir la huella de carbono y tiempos de entrega de última milla.",
    sector: "Logística",
    createdAt: "2025-11-10",
    status: "Active",
    budgetRange: "60k - 120k",
    responsesCount: 6,
  },
];

import {
  Building2,
  Zap,
  Cpu,
  Landmark,
  ShoppingCart,
  Truck,
  Heart,
  Radio,
  Factory,
  Leaf,
  Car,
  type LucideIcon,
} from "lucide-react";

export interface Company {
  id: string;
  name: string;
  industry: string;
  tier: string;
  tierBadge: string;
  innovation: string;
  cloud: string;
  revenue: string;
  employees: string;
  sector: string;
  tech: string[];
  rfps: number;
  color: string;
  icon: LucideIcon;
  image: string;
  description?: string;
}

export const TARGET_COMPANIES: Company[] = [
  {
    id: "1",
    name: "MERCADONA",
    industry: "Retail",
    tier: "Fortune 100",
    tierBadge: "Seeking Innovation Partner",
    innovation: "ALTO",
    cloud: "Azure",
    revenue: ">€25B",
    employees: "90,000+",
    sector: "Retail",
    tech: ["SAP", "Azure", "Microsoft"],
    rfps: 3,
    color: "bg-emerald-500",
    icon: ShoppingCart,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=500&fit=crop",
    description:
      "Mercadona es la compañía líder en España de supermercados físicos y online. Con un modelo de negocio centrado en la excelencia, buscamos innovar constantemente en la cadena de suministro, la experiencia del cliente y la sostenibilidad. Nuestro objetivo es ser líderes en transformación digital en el sector retail.",
  },
  {
    id: "2",
    name: "HP Enterprise",
    industry: "Tecnología",
    tier: "Fortune 100",
    tierBadge: "Seeking Innovation Partner",
    innovation: "ALTO",
    cloud: "Azure",
    revenue: ">$3B USD",
    employees: "30,000+",
    sector: "Tecnología",
    tech: ["SAP", "Microsoft", "Azure"],
    rfps: 5,
    color: "bg-amber-500",
    icon: Cpu,
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
    description:
      "Hewlett Packard Enterprise es una empresa global de plataforma como servicio desde el borde hasta la nube que ayuda a las organizaciones a acelerar los resultados al desbloquear el valor de todos sus datos, en cualquier lugar.",
  },
  {
    id: "3",
    name: "Banco Santander",
    industry: "Banca",
    tier: "Fortune 100",
    tierBadge: "",
    innovation: "ALTO",
    cloud: "Azure",
    revenue: ">€50B",
    employees: "200,000+",
    sector: "Banca",
    tech: ["SAP", "Azure", "Salesforce"],
    rfps: 2,
    color: "bg-red-500",
    icon: Landmark,
    image:
      "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800&h=500&fit=crop",
    description:
      "Banco Santander es uno de los mayores bancos del mundo por capitalización bursátil. Estamos inmersos en una profunda transformación digital para ofrecer los mejores servicios financieros a nuestros clientes a través de canales innovadores.",
  },
  {
    id: "4",
    name: "TalentFlow HR",
    industry: "HR",
    tier: "Innovation Leader",
    tierBadge: "HR Tech Pioneer",
    innovation: "ALTO",
    cloud: "AWS",
    revenue: "€500M-1B",
    employees: "5,000+",
    sector: "HR",
    tech: ["Salesforce", "AWS"],
    rfps: 1,
    color: "bg-indigo-500",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
    description:
      "Líderes en soluciones de RRHH y gestión del talento. Buscamos tecnologías disruptivas para mejorar la experiencia del empleado y optimizar los procesos de reclutamiento.",
  },
  {
    id: "5",
    name: "TechCorp Solutions",
    industry: "Tecnología",
    tier: "Enterprise",
    tierBadge: "AI First",
    innovation: "MEDIO",
    cloud: "Google Cloud",
    revenue: "€1B-5B",
    employees: "10,000+",
    sector: "Tecnología",
    tech: ["Google Cloud", "Salesforce"],
    rfps: 0,
    color: "bg-teal-500",
    icon: Zap,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
  },
  {
    id: "6",
    name: "LogiTech Global",
    industry: "Logística",
    tier: "Fortune 500",
    tierBadge: "Supply Chain Expert",
    innovation: "ALTO",
    cloud: "AWS",
    revenue: "€5B-10B",
    employees: "25,000+",
    sector: "Logística",
    tech: ["SAP", "AWS", "Oracle"],
    rfps: 4,
    color: "bg-cyan-500",
    icon: Truck,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
  },
  {
    id: "7",
    name: "Telefónica",
    industry: "Telecomunicaciones",
    tier: "Fortune 100",
    tierBadge: "Strategic Partner",
    innovation: "ALTO",
    cloud: "Azure",
    revenue: ">€40B",
    employees: "100,000+",
    sector: "Telecomunicaciones",
    tech: ["SAP", "Azure", "Oracle", "AWS"],
    rfps: 7,
    color: "bg-blue-600",
    icon: Radio,
    image:
      "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&h=500&fit=crop",
  },
  {
    id: "8",
    name: "Repsol",
    industry: "Energía",
    tier: "Fortune 500",
    tierBadge: "Green Transition",
    innovation: "ALTO",
    cloud: "AWS",
    revenue: ">€60B",
    employees: "24,000+",
    sector: "Energía",
    tech: ["SAP", "AWS", "Microsoft"],
    rfps: 3,
    color: "bg-orange-500",
    icon: Leaf,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop",
  },
  {
    id: "9",
    name: "SEAT / Cupra",
    industry: "Automoción",
    tier: "Enterprise",
    tierBadge: "Innovation Partner",
    innovation: "ALTO",
    cloud: "AWS",
    revenue: ">€10B",
    employees: "15,000+",
    sector: "Automoción",
    tech: ["SAP", "AWS", "Salesforce"],
    rfps: 2,
    color: "bg-rose-500",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=500&fit=crop",
  },
  {
    id: "10",
    name: "Mapfre",
    industry: "Seguros",
    tier: "Fortune 500",
    tierBadge: "InsurTech Ready",
    innovation: "MEDIO",
    cloud: "Azure",
    revenue: ">€25B",
    employees: "30,000+",
    sector: "Seguros",
    tech: ["SAP", "Microsoft", "Salesforce"],
    rfps: 1,
    color: "bg-red-600",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
  },
  {
    id: "11",
    name: "Inditex",
    industry: "Retail",
    tier: "Fortune 100",
    tierBadge: "Global Leader",
    innovation: "ALTO",
    cloud: "Google Cloud",
    revenue: ">€30B",
    employees: "160,000+",
    sector: "Retail",
    tech: ["Google Cloud", "SAP", "Microsoft"],
    rfps: 6,
    color: "bg-slate-700",
    icon: ShoppingCart,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop",
  },
  {
    id: "12",
    name: "Acciona",
    industry: "Infraestructura",
    tier: "Enterprise",
    tierBadge: "Sustainable",
    innovation: "ALTO",
    cloud: "AWS",
    revenue: ">€8B",
    employees: "40,000+",
    sector: "Infraestructura",
    tech: ["SAP", "AWS", "Oracle"],
    rfps: 2,
    color: "bg-lime-600",
    icon: Factory,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop",
  },
];
