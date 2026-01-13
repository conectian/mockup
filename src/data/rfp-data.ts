export interface RFP {
  id: string;
  title: string;
  description: string;
  clientName: string;
  clientEmail: string;
  industry: string;
  budget: string;
  budgetLevel: "low" | "medium" | "high";
  deadline: string;
  postedAt: string;
  isLocked: boolean;
  cost: number;
  applicants: number;
}

export const mockRFPs: RFP[] = [
  {
    id: "rfp-001",
    title: "Buscamos ERP para logística y almacén",
    description:
      "Necesitamos implementar un sistema ERP que integre gestión de almacén, rutas de distribución y control de inventario en tiempo real. Actualmente usamos hojas de cálculo y queremos digitalizar completamente el proceso.",
    clientName: "Logistics Pro S.L.",
    clientEmail: "compras@logisticspro.es",
    industry: "Logística",
    budget: "50k - 80k €",
    budgetLevel: "high",
    deadline: "28 Feb 2026",
    postedAt: "Hace 2 días",
    isLocked: true,
    cost: 25,
    applicants: 4,
  },
  {
    id: "rfp-002",
    title: "Automatización de atención al cliente con IA",
    description:
      "Queremos implementar un chatbot con inteligencia artificial que pueda resolver el 70% de las consultas de primer nivel. Debe integrarse con nuestro CRM Salesforce y sistema de tickets.",
    clientName: "Retail Master",
    clientEmail: "innovacion@retailmaster.com",
    industry: "Retail",
    budget: "30k - 50k €",
    budgetLevel: "medium",
    deadline: "15 Mar 2026",
    postedAt: "Hace 3 días",
    isLocked: true,
    cost: 20,
    applicants: 7,
  },
  {
    id: "rfp-003",
    title: "Sistema de firma digital y gestión documental",
    description:
      "Buscamos una solución de firma electrónica avanzada con validez legal y un gestor documental para digitalizar todos nuestros contratos y expedientes de clientes.",
    clientName: "Bufete Pérez & Asociados",
    clientEmail: "admin@perezasociados.law",
    industry: "Legal",
    budget: "15k - 25k €",
    budgetLevel: "low",
    deadline: "10 Feb 2026",
    postedAt: "Hace 1 semana",
    isLocked: true,
    cost: 15,
    applicants: 12,
  },
  {
    id: "rfp-004",
    title: "Plataforma de telemedicina y citas online",
    description:
      "Necesitamos desarrollar una plataforma completa de telemedicina que incluya videoconsultas, gestión de citas, historiales médicos electrónicos y pasarela de pago integrada.",
    clientName: "Clínica Salud Plus",
    clientEmail: "direccion@saludplus.es",
    industry: "Salud",
    budget: "80k - 120k €",
    budgetLevel: "high",
    deadline: "30 Abr 2026",
    postedAt: "Hace 5 días",
    isLocked: true,
    cost: 35,
    applicants: 3,
  },
  {
    id: "rfp-005",
    title: "Dashboard de Business Intelligence",
    description:
      "Queremos un dashboard de BI que consolide datos de ventas, marketing y operaciones. Debe conectarse a SAP, Google Analytics y nuestras bases de datos internas.",
    clientName: "Industrial Corp",
    clientEmail: "cto@industrialcorp.com",
    industry: "Manufactura",
    budget: "40k - 60k €",
    budgetLevel: "medium",
    deadline: "20 Mar 2026",
    postedAt: "Hace 4 días",
    isLocked: true,
    cost: 22,
    applicants: 5,
  },
];
