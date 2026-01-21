import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuthStore, type UserType } from '../store/useAuthStore';
import ThemeToggle from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
    LayoutDashboard,
    Menu,
    ChevronRight
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

// Mobile navigation items configuration
const MOBILE_NAV_PROVIDER = [
    {
        group: "Crecimiento",
        icon: Store,
        items: [
            { name: "Marketplace", href: "/provider/marketplace?tab=empresas", icon: Building2 },
            { name: "Mis Solicitudes", href: "/provider/marketplace?tab=rfp", icon: FileText },
            { name: "Casos de Uso", href: "/provider/marketplace?tab=casos-de-uso", icon: Store },
        ]
    },
    {
        group: "Ventas",
        icon: FolderKanban,
        items: [
            { name: "Deal Rooms", href: "/provider/deal-rooms?tab=dealrooms", icon: FolderKanban },
            { name: "Dashboard", href: "/provider/deal-rooms?tab=dashboard", icon: LayoutDashboard },
        ]
    }
];

const MOBILE_NAV_CLIENT = [
    {
        group: "Crecimiento",
        icon: Store,
        items: [
            { name: "Marketplace", href: "/client/marketplace?tab=mercado", icon: Globe },
            { name: "Marketplace Privado", href: "/client/marketplace?tab=propuestas", icon: Inbox },
            { name: "Mis Solicitudes", href: "/client/marketplace?tab=innovacion", icon: Lightbulb },
        ]
    },
    {
        group: "ROI",
        icon: LayoutDashboard,
        items: [
            { name: "Deal Rooms", href: "/client/deal-rooms", icon: FolderKanban },
            { name: "Dashboard", href: "/client/dashboard", icon: LayoutDashboard },
        ]
    }
];

export default function AppHeader() {
    const location = useLocation();
    const { logout, userType } = useAuthStore();
    const menuItems = getMenuForRole(userType);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mobileNavGroups = userType === 'provider' ? MOBILE_NAV_PROVIDER :
        userType === 'client' ? MOBILE_NAV_CLIENT : [];

    // Helper function to check if a nav item is active
    const isNavItemActive = (itemHref: string) => {
        const currentFullUrl = location.pathname + location.search;

        // Check exact match first
        if (currentFullUrl === itemHref) return true;

        // Check if URL has query params
        if (itemHref.includes('?')) {
            const [basePath, queryString] = itemHref.split('?');
            const itemParams = new URLSearchParams(queryString);
            const currentParams = new URLSearchParams(location.search);

            // Path must match and the specific tab param must match
            if (location.pathname === basePath) {
                const itemTab = itemParams.get('tab');
                const currentTab = currentParams.get('tab');
                if (itemTab && currentTab) {
                    return itemTab === currentTab;
                }
            }
            return false;
        }

        // For URLs without query params, check exact path match
        return location.pathname === itemHref;
    };

    return (
        <>
            <header className="h-14 md:h-16 border-b border-border bg-card sticky top-0 z-30 flex items-center justify-between px-3 md:px-4 lg:px-8">
                {/* Left: Mobile Menu + Logo + Navigation */}
                <div className="flex items-center gap-2 md:gap-6">
                    {/* Mobile Menu Button */}
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-80 p-0 border-r border-border">
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
                                <Link
                                    to="/"
                                    className="flex items-center gap-2"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <img src="/conectian.png" alt="Conectian" className="h-8 w-8 object-contain" />
                                    <span className="font-display font-bold text-lg tracking-tight text-foreground">
                                        Conectian
                                    </span>
                                </Link>
                            </div>

                            {/* User Badge */}
                            <div className="px-4 py-3 border-b border-border bg-muted/20">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md",
                                        userType === 'provider' && "bg-gradient-to-br from-emerald-400 to-teal-500",
                                        userType === 'client' && "bg-gradient-to-br from-blue-400 to-indigo-500",
                                        userType === 'admin' && "bg-gradient-to-br from-amber-400 to-orange-500"
                                    )}>
                                        {userType?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <p className="font-semibold capitalize text-foreground">{userType}</p>
                                        <p className="text-xs text-muted-foreground">Cuenta Activa</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Groups */}
                            <div className="flex-1 overflow-y-auto py-4">
                                {mobileNavGroups.map((group) => (
                                    <div key={group.group} className="mb-4">
                                        <div className="px-4 py-2 flex items-center gap-2">
                                            <group.icon className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                {group.group}
                                            </span>
                                        </div>
                                        <div className="space-y-1 px-2">
                                            {group.items.map((item) => {
                                                const isActive = isNavItemActive(item.href);
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        to={item.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                            isActive
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                        )}
                                                    >
                                                        <item.icon className={cn(
                                                            "h-4 w-4",
                                                            isActive ? "text-primary" : "text-muted-foreground"
                                                        )} />
                                                        {item.name}
                                                        <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}

                                {/* Admin navigation */}
                                {userType === 'admin' && menuItems.length > 0 && (
                                    <div className="mb-4">
                                        <div className="px-4 py-2">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                                Administración
                                            </span>
                                        </div>
                                        <div className="space-y-1 px-2">
                                            {menuItems.map((item) => {
                                                const Icon = item.icon;
                                                const isActive = location.pathname.startsWith(item.href);
                                                return (
                                                    <Link
                                                        key={item.href}
                                                        to={item.href}
                                                        onClick={() => setMobileMenuOpen(false)}
                                                        className={cn(
                                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                                            isActive
                                                                ? "bg-primary/10 text-primary"
                                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                                        )}
                                                    >
                                                        <Icon className={cn(
                                                            "h-4 w-4",
                                                            isActive ? "text-primary" : "text-muted-foreground"
                                                        )} />
                                                        {item.name}
                                                        <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Footer */}
                            <div className="border-t border-border p-4 space-y-2 bg-muted/20">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">Tema</span>
                                    <ThemeToggle />
                                </div>
                                <Button
                                    variant="ghost"
                                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    <LogOut className="h-4 w-4" />
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>

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
                                                { name: "Mis Solicitudes", value: "rfp", icon: FileText },
                                                { name: "Casos de Uso", value: "casos-de-uso", icon: Store },
                                            ]
                                        },
                                        {
                                            name: "Ventas",
                                            basePath: "/provider/deal-rooms",
                                            icon: FolderKanban,
                                            subItems: [
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
                                                { name: "Mis Solicitudes", value: "innovacion", icon: Lightbulb },
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
                                                ? "bg-primary/10 text-primary shadow-sm border border-primary/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 border border-border">
                                <ThemeToggle />
                                <div className="w-[1px] h-4 bg-border mx-1" />
                                <NotificationsPopover />
                                <DealRoomsPopover />
                                <MessagesPopover />
                            </div>

                            {/* Mobile notifications only */}
                            <div className="sm:hidden flex items-center gap-0.5 -mr-1">
                                <ThemeToggle />
                                <NotificationsPopover />
                                <DealRoomsPopover />
                                <MessagesPopover />
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted/50 border border-border">
                            <ThemeToggle />
                            <div className="w-[1px] h-4 bg-border mx-1 shrink-0" />
                            <NotificationsPopover />
                        </div>
                    )}

                    {/* User Dropdown - Hidden on mobile since we have it in the sheet */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="hidden sm:flex items-center gap-2.5 h-11 px-2.5 hover:bg-accent rounded-lg transition-all duration-200 group border border-transparent hover:border-border"
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
                                    <span className="text-sm font-bold capitalize tracking-tight text-foreground group-hover:text-primary transition-colors">
                                        {userType}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground/70 font-medium">Cuenta Activa</span>
                                </div>
                                <svg className="hidden md:block h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 bg-card border-border shadow-xl mt-1 p-1.5 rounded-lg">
                            <DropdownMenuItem asChild className="focus:bg-accent hover:bg-accent cursor-pointer rounded-md px-3 py-2.5 transition-colors">
                                <Link to={
                                    userType === 'provider' ? '/provider/profile?tab=profile' :
                                        userType === 'client' ? '/client/profile?tab=profile' :
                                            '/admin/profile'
                                } className="flex items-center gap-2.5">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm font-medium text-foreground">Mi Perfil</span>
                                </Link>
                            </DropdownMenuItem>

                            {(userType === 'provider' || userType === 'client') && (
                                <>
                                    <DropdownMenuItem asChild className="focus:bg-accent hover:bg-accent cursor-pointer rounded-md px-3 py-2.5 transition-colors">
                                        <Link to={userType === 'provider' ? '/provider/referrals' : '/client/referrals'} className="flex items-center gap-2.5">
                                            <Users className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-foreground">Referidos</span>
                                        </Link>
                                    </DropdownMenuItem>

                                    <DropdownMenuItem asChild className="focus:bg-accent hover:bg-accent cursor-pointer rounded-md px-3 py-2.5 transition-colors">
                                        <Link to={userType === 'provider' ? '/provider/payments' : '/client/payments'} className="flex items-center gap-2.5">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                            <span className="text-sm font-medium text-foreground">Pagos</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </>
                            )}

                            <DropdownMenuSeparator className="bg-border my-1" />

                            <DropdownMenuItem
                                onClick={logout}
                                className="hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer rounded-md px-3 py-2.5 transition-colors"
                            >
                                <div className="flex items-center gap-2.5 w-full">
                                    <LogOut className="h-4 w-4 text-destructive" />
                                    <span className="text-sm font-medium text-destructive">Cerrar Sesión</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>


        </>
    );
}
