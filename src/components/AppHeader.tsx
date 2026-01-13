import { useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronRight, User, Settings, LogOut } from 'lucide-react';
import NotificationsPopover from './NotificationsPopover';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
    onMenuClick: () => void;
}

// Simple breadcrumb generator from pathname
function getBreadcrumbs(pathname: string): { name: string; href: string }[] {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: { name: string; href: string }[] = [];

    const nameMap: Record<string, string> = {
        dashboard: 'Dashboard',
        provider: 'Proveedor',
        client: 'Cliente',
        admin: 'Admin',
        marketplace: 'Marketplace',
        'deal-rooms': 'Deal Rooms',
        onboarding: 'Onboarding',
        catalog: 'Catálogo',
        opportunities: 'Oportunidades',
        analytics: 'Analytics',
        rfps: 'RFPs',
        favorites: 'Favoritos',
        settings: 'Configuración',
    };

    let currentPath = '';
    for (const segment of segments) {
        currentPath += `/${segment}`;
        breadcrumbs.push({
            name: nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
            href: currentPath,
        });
    }

    return breadcrumbs;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
    const location = useLocation();
    const { logout, userType } = useAuthStore();
    const breadcrumbs = getBreadcrumbs(location.pathname);

    return (
        <header className="h-16 border-b border-white/5 bg-background/60 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
            {/* Left: Mobile menu + Breadcrumbs */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden text-muted-foreground hover:text-foreground">
                    <Menu className="h-5 w-5" />
                </Button>

                <nav className="hidden sm:flex items-center text-sm font-medium">
                    <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                        Inicio
                    </Link>
                    {breadcrumbs.map((crumb, index) => (
                        <div key={crumb.href} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/40" />
                            {index === breadcrumbs.length - 1 ? (
                                <span className="text-foreground font-semibold">{crumb.name}</span>
                            ) : (
                                <Link to={crumb.href} className="text-muted-foreground hover:text-foreground transition-colors">
                                    {crumb.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Mobile: Just show current page */}
                <span className="sm:hidden font-semibold text-foreground">
                    {breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}
                </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                    <ThemeToggle />
                    <div className="w-[1px] h-4 bg-white/10 mx-1" />
                    <NotificationsPopover />
                </div>

                {/* User Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 md:w-auto md:px-3 md:py-2 gap-2 rounded-full md:rounded-md hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                            <div className={cn(
                                "h-8 w-8 rounded-md flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-indigo-500/10",
                                userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500",
                                userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500",
                                userType === 'admin' && "bg-gradient-to-br from-amber-400 to-orange-500"
                            )}>
                                {userType?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="hidden md:flex flex-col items-start leading-none gap-1">
                                <span className="text-xs font-bold capitalize tracking-tight">
                                    {userType}
                                </span>
                                <span className="text-[10px] text-muted-foreground/60">Cuenta Activa</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-card mt-2">
                        <DropdownMenuLabel className="font-display">Mi Cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                            <Link to="/profile" className="flex items-center gap-3 py-1">
                                <User className="h-4 w-4" />
                                <span>Perfil</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                            <Link to="/settings" className="flex items-center gap-3 py-1">
                                <Settings className="h-4 w-4" />
                                <span>Configuración</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/5" />
                        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-md m-1">
                            <LogOut className="h-4 w-4 mr-3" />
                            <span>Cerrar Sesión</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
