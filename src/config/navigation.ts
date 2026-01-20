import {
  Store,
  FolderKanban,
  LayoutDashboard,
  Users,
  FileText,
  Banknote,
  Settings,
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
    name: "Marketplace",
    href: "/provider/marketplace",
    icon: Store,
    description: "Empresas, Casos de Uso y RFIP",
  },
  {
    name: "Deal Rooms",
    href: "/provider/deal-rooms",
    icon: FolderKanban,
    description: "Dashboard y Negociaciones",
  },
];

export const MENU_CLIENT: MenuItem[] = [
  {
    name: "Marketplace",
    href: "/client/marketplace",
    icon: Store,
    description: "Buscar soluciones",
  },
  {
    name: "Deal Rooms",
    href: "/client/deal-rooms",
    icon: FolderKanban,
    description: "Dashboard y Negociaciones",
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
    name: "Contenido",
    href: "/admin/content",
    icon: FileText,
    description: "Gestión de contenido",
  },
  {
    name: "Finanzas",
    href: "/admin/finances",
    icon: Banknote,
    description: "Métricas financieras",
  },
  {
    name: "Configuración",
    href: "/admin/settings",
    icon: Settings,
    description: "Ajustes de plataforma",
  },
];
