import {
  LayoutDashboard,
  Briefcase,
  Search,
  FileText,
  Users,
  MessageSquare,
  BarChart3,
  Heart,
  FolderKanban,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const MENU_PROVIDER: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard/provider",
    icon: LayoutDashboard,
    description: "Resumen general",
  },
  {
    name: "Mis Casos de Uso",
    href: "/provider/catalog",
    icon: Briefcase,
    description: "Gestión de catálogo",
  },
  {
    name: "Oportunidades",
    href: "/provider/opportunities",
    icon: FileText,
    description: "RFPs disponibles",
  },
  {
    name: "Deal Rooms",
    href: "/deal-rooms",
    icon: FolderKanban,
    description: "Negociaciones activas",
  },
  {
    name: "Analytics",
    href: "/provider/analytics",
    icon: BarChart3,
    description: "Vistas de perfil",
  },
];

export const MENU_CLIENT: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard/client",
    icon: LayoutDashboard,
    description: "Tu resumen",
  },
  {
    name: "Explorar",
    href: "/marketplace",
    icon: Search,
    description: "Buscar soluciones",
  },
  {
    name: "Mis Necesidades",
    href: "/client/rfps",
    icon: FileText,
    description: "Tus publicaciones",
  },
  {
    name: "Deal Rooms",
    href: "/deal-rooms",
    icon: FolderKanban,
    description: "Negociaciones activas",
  },
  {
    name: "Favoritos",
    href: "/client/favorites",
    icon: Heart,
    description: "Proveedores guardados",
  },
];

export const MENU_ADMIN: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    description: "Panel de control",
  },
  {
    name: "Usuarios",
    href: "/admin/users",
    icon: Users,
    description: "Gestión de usuarios",
  },
  {
    name: "Mensajes",
    href: "/admin/messages",
    icon: MessageSquare,
    description: "Soporte",
  },
];
