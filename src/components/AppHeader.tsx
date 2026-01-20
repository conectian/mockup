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
import {
    User,
    LogOut,
    Store,
    Building2,
    FileText,
    FolderKanban,
    Globe,
    Inbox,
    Lightbulb,
    Users,
    CreditCard,
    LayoutDashboard
} from 'lucide-react';
import { ExpandingNav } from './navigation/ExpandingNav';
import MessagesPopover from './MessagesPopover';
import DealRoomsPopover from './DealRoomsPopover';
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

    return (
        <>
            <header className="h-14 md:h-16 border-b border-white/5 bg-[#0F172A] sticky top-0 z-30 flex items-center justify-between px-3 md:px-4 lg:px-8">
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
                <nav className="hidden md:flex items-center gap-1">
                    {userType === 'provider' ? (
                        <>
                            <ExpandingNav 
                                items={[
                                    {
                                        name: "Crecimiento",
                                        basePath: "/provider/marketplace",
                                        icon: Store,
                                        subItems: [
                                            { name: "Marketplace", value: "empresas", icon: Building2 },
                                            { name: "RFIP", value: "rfip", icon: FileText },
                                            { name: "Casos de Uso", value: "casos-de-uso", icon: Store },
                                        ]
                                    },
                                    {
                                        name: "Ventas",
                                        basePath: "/provider/deal-rooms",
                                        icon: FolderKanban,
                                        subItems: [
                                            { name: "Leads", value: "leads", icon: Users },
                                            { name: "Deal Rooms", value: "dealrooms", icon: FolderKanban },
                                            { name: "Dashboard", value: "dashboard", icon: LayoutDashboard },
                                        ]
                                    }
                                ]}
                            />
                        </>
                    ) : userType === 'client' ? (
                        <>
                            <ExpandingNav 
                                items={[
                                    {
                                        name: "Crecimiento",
                                        basePath: "/client/marketplace",
                                        icon: Store,
                                        subItems: [
                                            { name: "Marketplace", value: "mercado", icon: Globe },
                                            { name: "Marketplace Privado", value: "propuestas", icon: Inbox },
                                            { name: "RFIP", value: "innovacion", icon: Lightbulb },
                                        ]
                                    },
                                    {
                                        name: "ROI",
                                        basePath: "/client",
                                        icon: LayoutDashboard,
                                        subItems: [
                                            { name: "Deal Rooms", value: "deal-rooms", icon: FolderKanban, href: "/client/deal-rooms" },
                                            { name: "Dashboard", value: "dashboard", icon: LayoutDashboard, href: "/client/dashboard" },
                                        ]
                                    }
                                ]}
                            />
                        </>
                    ) : (
                        // ADMIN NAVIGATION (Keep as is or simple map)
                        menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-white/10 text-white shadow-sm border border-white/5"
                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            );
                        })
                    )}
                </nav>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {userType !== 'admin' ? (
                        <>
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                                <ThemeToggle />
                                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                <NotificationsPopover />
                                <DealRoomsPopover />
                                <MessagesPopover />
                            </div>

                            {/* Mobile notifications only */}
                            <div className="sm:hidden flex items-center gap-1">
                                <NotificationsPopover />
                                <DealRoomsPopover />
                                <MessagesPopover />
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/5">
                            <ThemeToggle />
                            <div className="w-[1px] h-4 bg-white/10 mx-1" />
                            <NotificationsPopover />
                        </div>
                    )}

                    {/* User Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2.5 h-11 px-2.5 hover:bg-white/10 rounded-lg transition-all duration-200 group border border-transparent hover:border-white/10"
                            >
                                <div className={cn(
                                    "h-9 w-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg shrink-0 transition-transform duration-200 group-hover:scale-105",
                                    userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500 ring-2 ring-emerald-500/20",
                                    userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500 ring-2 ring-blue-500/20",
                                    userType === 'admin' && "bg-gradient-to-br from-amber-400 to-orange-500 ring-2 ring-amber-500/20"
                                )}>
                                    {userType?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="hidden md:flex flex-col items-start leading-none gap-1.5">
                                    <span className="text-sm font-bold capitalize tracking-tight text-foreground group-hover:text-white transition-colors">
                                        {userType}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground/70 font-medium">Cuenta Activa</span>
                                </div>
                                <svg className="hidden md:block h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-64 bg-[#1E293B] border-white/10 shadow-2xl mt-2 p-3">
                            <div className="px-3 py-2.5 mb-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mi Cuenta</p>
                            </div>
                            
                            <DropdownMenuItem asChild className="focus:bg-white/10 hover:bg-white/10 cursor-pointer rounded-lg px-3 py-3 mb-1 transition-all">
                                <Link to={
                                    userType === 'provider' ? '/provider/profile?tab=profile' : 
                                    userType === 'client' ? '/client/profile?tab=profile' : 
                                    '/admin/profile'
                                } className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-9 w-9 rounded-lg flex items-center justify-center",
                                        userType === 'provider' && "bg-emerald-500/20 text-emerald-400",
                                        userType === 'client' && "bg-blue-500/20 text-blue-400",
                                        userType === 'admin' && "bg-amber-500/20 text-amber-400"
                                    )}>
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="font-semibold text-white">Mi Perfil</span>
                                </Link>
                            </DropdownMenuItem>

                            {/* Referidos - available for provider and client */}
                            {(userType === 'provider' || userType === 'client') && (
                                <>
                                    <DropdownMenuSeparator className="bg-white/10 my-2" />
                                    
                                    <DropdownMenuItem asChild className="focus:bg-white/10 hover:bg-white/10 cursor-pointer rounded-lg px-3 py-3 mb-1 transition-all">
                                        <Link to={userType === 'provider' ? '/provider/referrals' : '/client/referrals'} className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                                <Users className="h-4 w-4" />
                                            </div>
                                            <span className="font-semibold text-white">Referidos</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    {/* Pagos - available for provider and client */}
                                    <DropdownMenuItem asChild className="focus:bg-white/10 hover:bg-white/10 cursor-pointer rounded-lg px-3 py-3 mb-1 transition-all">
                                        <Link to={userType === 'provider' ? '/provider/payments' : '/client/payments'} className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                                                <CreditCard className="h-4 w-4" />
                                            </div>
                                            <span className="font-semibold text-white">Pagos</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}

                            <DropdownMenuSeparator className="bg-white/10 my-2" />
                            
                            <DropdownMenuItem 
                                onClick={logout} 
                                className="hover:bg-red-500/10 focus:bg-red-500/10 cursor-pointer rounded-lg px-3 py-3 transition-all group"
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="h-9 w-9 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 flex items-center justify-center transition-colors">
                                        <LogOut className="h-4 w-4 text-red-400" />
                                    </div>
                                    <span className="font-semibold text-red-400 group-hover:text-red-300 transition-colors">Cerrar Sesión</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>


        </>
    );
}
