import { create } from "zustand";

export type DealPhase =
  | "descubrimiento"
  | "propuesta"
  | "legal"
  | "firma"
  | "kickoff";
export type DealHealth = "bueno" | "riesgo";

export interface DealMilestone {
  id: string;
  name: string;
  percentage: number;
  amount: number;
  status: "pendiente" | "en_escrow" | "pagado" | "liberado";
}

export interface DealDocument {
  id: string;
  name: string;
  type: "propuesta" | "contrato" | "nda" | "otro";
  version: string;
  uploadedBy: "provider" | "client";
  uploadedAt: string;
  approved: boolean;
}

export interface ChatMessage {
  id: string;
  type: "user" | "system";
  sender?: string;
  senderRole?: "provider" | "client";
  content: string;
  timestamp: string;
  systemType?: "info" | "success" | "warning";
}

export interface DealParticipant {
  id: string;
  name: string;
  role: string;
  company: "provider" | "client";
  avatar?: string;
}

interface DealState {
  // Deal info
  dealId: string;
  dealTitle: string;
  providerName: string;
  clientName: string;

  // Status
  currentPhase: DealPhase;
  dealHealth: DealHealth;
  escrowBalance: number;

  // Compliance
  providerVerified: boolean;
  ndaSigned: boolean;
  proposalApproved: boolean;

  // Data
  milestones: DealMilestone[];
  documents: DealDocument[];
  messages: ChatMessage[];
  participants: DealParticipant[];

  // Actions
  setPhase: (phase: DealPhase) => void;
  approveDocument: (docId: string) => void;
  approveProposal: () => void;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
}

export const useDealStore = create<DealState>((set) => ({
  // Deal info
  dealId: "dr-001",
  dealTitle: "Automatización de Conciliación Bancaria",
  providerName: "FinanceBot AI",
  clientName: "Banco Nacional",

  // Status
  currentPhase: "propuesta",
  dealHealth: "bueno",
  escrowBalance: 15000,

  // Compliance
  providerVerified: true,
  ndaSigned: true,
  proposalApproved: false,

  // Mock data
  milestones: [
    {
      id: "m1",
      name: "Anticipo / Setup",
      percentage: 30,
      amount: 15000,
      status: "pagado",
    },
    {
      id: "m2",
      name: "Desarrollo Sprint 1",
      percentage: 35,
      amount: 17500,
      status: "en_escrow",
    },
    {
      id: "m3",
      name: "Entrega Final",
      percentage: 35,
      amount: 17500,
      status: "pendiente",
    },
  ],

  documents: [
    {
      id: "d1",
      name: "NDA_Conectian.pdf",
      type: "nda",
      version: "1.0",
      uploadedBy: "provider",
      uploadedAt: "10 Ene 2026",
      approved: true,
    },
    {
      id: "d2",
      name: "Propuesta_Tecnica_v2.pdf",
      type: "propuesta",
      version: "2.0",
      uploadedBy: "provider",
      uploadedAt: "11 Ene 2026",
      approved: false,
    },
    {
      id: "d3",
      name: "Ficha_Tecnica.pdf",
      type: "otro",
      version: "1.0",
      uploadedBy: "provider",
      uploadedAt: "11 Ene 2026",
      approved: true,
    },
    {
      id: "d4",
      name: "Contrato_MSA.pdf",
      type: "contrato",
      version: "1.0",
      uploadedBy: "provider",
      uploadedAt: "12 Ene 2026",
      approved: false,
    },
  ],

  messages: [
    {
      id: "msg1",
      type: "system",
      content: "Deal Room creado",
      timestamp: "10 Ene 10:30",
      systemType: "info",
    },
    {
      id: "msg2",
      type: "user",
      sender: "María García",
      senderRole: "client",
      content:
        "Hola! Estamos muy interesados en su solución. ¿Podemos agendar una demo esta semana?",
      timestamp: "10 Ene 10:35",
    },
    {
      id: "msg3",
      type: "user",
      sender: "Carlos López",
      senderRole: "provider",
      content:
        "Claro! Les propongo el jueves a las 11:00. Les envío el enlace.",
      timestamp: "10 Ene 11:00",
    },
    {
      id: "msg4",
      type: "system",
      content: 'Proveedor ha subido "NDA_Conectian.pdf"',
      timestamp: "10 Ene 14:00",
      systemType: "info",
    },
    {
      id: "msg5",
      type: "system",
      content: "Cliente ha firmado el NDA",
      timestamp: "10 Ene 15:30",
      systemType: "success",
    },
    {
      id: "msg6",
      type: "user",
      sender: "María García",
      senderRole: "client",
      content: "La demo fue excelente. ¿Pueden enviarnos una propuesta formal?",
      timestamp: "11 Ene 09:00",
    },
    {
      id: "msg7",
      type: "system",
      content: 'Proveedor ha subido "Propuesta_Tecnica_v2.pdf"',
      timestamp: "11 Ene 16:00",
      systemType: "info",
    },
    {
      id: "msg8",
      type: "user",
      sender: "Carlos López",
      senderRole: "provider",
      content:
        "Les he enviado la propuesta técnica actualizada. Incluye los cambios que comentamos.",
      timestamp: "11 Ene 16:05",
    },
  ],

  participants: [
    {
      id: "p1",
      name: "María García",
      role: "Directora de Innovación",
      company: "client",
    },
    { id: "p2", name: "Juan Martínez", role: "CTO", company: "client" },
    {
      id: "p3",
      name: "Carlos López",
      role: "Account Manager",
      company: "provider",
    },
    { id: "p4", name: "Ana Ruiz", role: "Tech Lead", company: "provider" },
  ],

  // Actions
  setPhase: (phase) => set({ currentPhase: phase }),

  approveDocument: (docId) =>
    set((state) => ({
      documents: state.documents.map((doc) =>
        doc.id === docId ? { ...doc, approved: true } : doc
      ),
    })),

  approveProposal: () =>
    set({
      proposalApproved: true,
      currentPhase: "legal",
    }),

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ],
    })),
}));
