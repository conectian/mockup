import {
  Store,
  FileText,
  Users,
  MessageSquare,
  FolderKanban,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface MenuItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

export const MENU_PROVIDER: MenuItem[] = [
  /* {
    name: "Dashboard",
    href: "/provider/dashboard",
    icon: LayoutDashboard,
    description: "Vista general",
  }, */
  {
    name: "Marketplace",
    href: "/provider/marketplace",
    icon: Store,
    description: "Empresas, Casos de Uso y Demandas",
  },
  {
    name: "Leads",
    href: "/provider/leads",
    icon: Users,
    description: "Prospectos y ventas",
  },
  /* {
    name: "Analytics",
    href: "/provider/analytics",
    icon: BarChart3,
    description: "Métricas y rendimiento",
  }, */
  {
    name: "Deal Rooms",
    href: "/provider/deal-rooms",
    icon: FolderKanban,
    description: "Negociaciones activas",
  },
];

export const MENU_CLIENT: MenuItem[] = [
  /* {
    name: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
    description: "Vista general",
  }, */
  {
    name: "Marketplace",
    href: "/client/marketplace",
    icon: Store,
    description: "Buscar soluciones",
  },
  {
    name: "Mis Necesidades",
    href: "/client/rfps",
    icon: FileText,
    description: "Tus publicaciones",
  },
  /*  {
    name: "Favoritos",
    href: "/client/favorites",
    icon: Heart,
    description: "Soluciones guardadas",
  }, */
  {
    name: "Deal Rooms",
    href: "/client/deal-rooms",
    icon: FolderKanban,
    description: "Negociaciones activas",
  },
];

export const MENU_ADMIN: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    description: "Vista general",
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
