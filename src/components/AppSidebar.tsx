import { Link, useLocation } from 'react-router-dom';
import { useAuthStore, type UserType } from '../store/useAuthStore';
import { MENU_PROVIDER, MENU_CLIENT, MENU_ADMIN, type MenuItem } from '../config/navigation';
import { Button } from '@/components/ui/button';
import { Settings, LogOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    isCollapsed: boolean;
    onToggleCollapse: () => void;
}

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

export default function AppSidebar({ isOpen, onClose, isCollapsed, onToggleCollapse }: AppSidebarProps) {
    const { userType, logout } = useAuthStore();
    const location = useLocation();
    const menuItems = getMenuForRole(userType);

    const isActive = (href: string) => location.pathname === href;

    const sidebarContent = (
        <div className="flex flex-col h-full bg-card/40 backdrop-blur-xl">
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                {!isCollapsed && (
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="h-9 w-9 flex items-center justify-center shrink-0 transition-all duration-300">
                            <img src="/conectian.png" alt="Conectian" className="h-8 w-8 object-contain" />
                        </div>
                        <span className="font-display font-bold text-xl tracking-tight text-[#243A57] dark:text-white">
                            Conectian
                        </span>
                    </Link>
                )}
                {isCollapsed && (
                    <div className="h-12 w-12 flex items-center justify-center mx-auto">
                        <img src="/conectian.png" alt="Conectian" className="h-9 w-9 object-contain" />
                    </div>
                )}

                {/* Mobile close button */}
                <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* User Badge & Toggle */}
            <div className={cn(
                "px-6 py-4 border-b border-white/5 bg-white/5 flex items-center",
                isCollapsed ? "justify-center" : "justify-between"
            )}>
                {!isCollapsed && (
                    <div className="flex-1 min-w-0 mr-2">
                        <div className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-[0.2em] mb-2">Cuenta</div>
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "h-2.5 w-2.5 rounded-full ring-4 ring-offset-0",
                                userType === 'provider' && "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] ring-emerald-500/20",
                                userType === 'client' && "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)] ring-blue-500/20",
                                userType === 'admin' && "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)] ring-amber-500/20"
                            )} />
                            <span className="text-sm font-semibold capitalize tracking-tight truncate">{userType}</span>
                        </div>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleCollapse}
                    className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-md shrink-0"
                >
                    {isCollapsed ? <ChevronRight className="h-4 w-4 cursor-pointer" /> : <ChevronLeft className="h-4 w-4 cursor-pointer" />}
                </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            onClick={onClose}
                            className={cn(
                                "group relative flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-300",
                                active
                                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.1)]"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            {active && (
                                <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-full shadow-[0_0_12px_rgba(var(--primary),0.5)]" />
                            )}
                            <item.icon className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                                active ? "text-primary" : "text-muted-foreground/70"
                            )} />
                            {!isCollapsed && (
                                <div className="flex-1 min-w-0">
                                    <div className="truncate">{item.name}</div>
                                    {item.description && (
                                        <div className="text-[11px] text-muted-foreground/60 truncate font-normal">{item.description}</div>
                                    )}
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>


            {/* Bottom Actions - Spacing fix and visual refinement */}
            <div className="px-3 py-4 border-t border-white/5 space-y-1.5 bg-white/5">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200"
                >
                    <Settings className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>Configuración</span>}
                </Link>
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive/80 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>

        </div>
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={onClose}
                />
            )}

            {/* Mobile Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 border-r transform transition-transform duration-300 ease-out lg:hidden flex flex-col shadow-2xl overflow-hidden",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {sidebarContent}
            </aside>

            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden lg:flex flex-col border-r border-white/5 transition-all duration-300 ease-in-out shadow-sm",
                    isCollapsed ? "w-20" : "w-72"
                )}
            >
                {sidebarContent}
            </aside>
        </>
    );
}
