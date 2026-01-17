import { useLocation, Link } from 'react-router-dom';
import { useAuthStore, type UserType } from '../store/useAuthStore';
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
import { User, Settings, LogOut, LayoutDashboard, BarChart3, Heart } from 'lucide-react';
import NotificationsPopover from './NotificationsPopover';
import { cn } from '@/lib/utils';
import { MENU_PROVIDER, MENU_CLIENT, MENU_ADMIN, type MenuItem } from '../config/navigation';


function getMenuForRole(role: UserType): MenuItem[] {
    switch (role) {
        case 'provider':
            return MENU_PROVIDER;
        case 'client':
            return MENU_CLIENT;
        case 'admin':
            return MENU_ADMIN;
        default:
            return [];
    }
}

export default function AppHeader() {
    const location = useLocation();
    const { logout, userType } = useAuthStore();
    const menuItems = getMenuForRole(userType);


    const isActive = (href: string) => location.pathname === href;

    return (
        <>
            <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-xl border-b border-white/5 safe-area-top">
                <div className="h-14 md:h-16 flex items-center justify-between px-3 md:px-4 lg:px-8">
                    {/* Left: Logo + Navigation */}
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="h-8 w-8 md:h-9 md:w-9 flex items-center justify-center shrink-0 transition-all duration-300">
                                <img src="/conectian.png" alt="Conectian" className="h-7 w-7 md:h-8 md:w-8 object-contain" />
                            </div>
                            <span className="font-display font-bold text-lg md:text-xl tracking-tight text-[#243A57] dark:text-white hidden sm:block">
                                Conectian
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {menuItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                                            active
                                                ? "bg-primary/10 text-primary"
                                                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                        )}
                                    >
                                        <item.icon className={cn(
                                            "h-4 w-4",
                                            active ? "text-primary" : "text-muted-foreground/70"
                                        )} />
                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                            <ThemeToggle />
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <NotificationsPopover />
                        </div>

                        {/* Mobile notifications only */}
                        <div className="sm:hidden">
                            <NotificationsPopover />
                        </div>

                        {/* User Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="flex items-center gap-2 h-10 px-2 hover:bg-white/5 rounded-md"
                                >
                                    <div className={cn(
                                        "h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-lg shrink-0",
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
                                    <Link to={userType === 'provider' ? '/provider/profile' : userType === 'client' ? '/client/profile' : '/admin/dashboard'} className="flex items-center gap-3 py-1">
                                        <User className="h-4 w-4" />
                                        <span>Perfil</span>
                                    </Link>
                                </DropdownMenuItem>

                                {/* Dashboard, Analytics, Favoritos */}
                                <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                                    <Link to={userType === 'provider' ? '/provider/dashboard' : userType === 'client' ? '/client/dashboard' : '/admin/dashboard'} className="flex items-center gap-3 py-1">
                                        <LayoutDashboard className="h-4 w-4" />
                                        <span>Dashboard</span>
                                    </Link>
                                </DropdownMenuItem>

                                {userType === 'provider' && (
                                    <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                                        <Link to="/provider/analytics" className="flex items-center gap-3 py-1">
                                            <BarChart3 className="h-4 w-4" />
                                            <span>Analytics</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                {userType === 'client' && (
                                    <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                                        <Link to="/client/favorites" className="flex items-center gap-3 py-1">
                                            <Heart className="h-4 w-4" />
                                            <span>Favoritos</span>
                                        </Link>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator className="bg-white/5" />

                                <DropdownMenuItem asChild className="focus:bg-white/10 cursor-pointer rounded-md m-1">
                                    <Link to={userType === 'provider' ? '/provider/settings' : userType === 'client' ? '/client/settings' : '/admin/settings'} className="flex items-center gap-3 py-1">
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
                </div>
            </header>


        </>
    );
}
