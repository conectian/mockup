import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { LayoutGrid, Store, FolderKanban, Settings, LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function AppLayout() {
    const { isAuthenticated, userType, logout } = useAuthStore();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    const navigation = [
        { name: 'Dashboard', href: userType === 'client' ? '/dashboard/client' : userType === 'provider' ? '/dashboard/provider' : '/admin', icon: LayoutGrid },
        { name: 'Marketplace', href: '/marketplace', icon: Store },
        { name: 'Proyectos', href: '/deal-room/demo', icon: FolderKanban },
    ];

    const isActive = (href: string) => location.pathname === href;

    return (
        <div className="min-h-screen flex bg-muted/30">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-card border-r transition-all duration-300 flex flex-col`}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b">
                    {sidebarOpen && (
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-9 flex items-center justify-center shrink-0">
                                <img src="/conectian.png" alt="Conectian" className="h-8 w-8 object-contain" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-[#243A57] dark:text-white">Conectian</span>
                        </div>
                    )}
                </div>

                {/* User Badge & Toggle */}
                <div className={cn(
                    "px-4 py-3 border-b flex items-center",
                    sidebarOpen ? "justify-between" : "justify-center"
                )}>
                    {sidebarOpen && (
                        <div>
                            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Cuenta</div>
                            <div className="mt-1 flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${userType === 'provider' ? 'bg-emerald-500' : userType === 'client' ? 'bg-blue-500' : 'bg-amber-500'}`} />
                                <span className="text-sm font-medium capitalize">{userType}</span>
                            </div>
                        </div>
                    )}
                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="h-8 w-8">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-2 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive(item.href)
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            {sidebarOpen && <span>{item.name}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="p-2 border-t space-y-1">
                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Settings className="h-5 w-5" />
                        {sidebarOpen && <span>Configuración</span>}
                    </button>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && <span>Cerrar Sesión</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Bar */}
                <header className="h-16 border-b bg-card flex items-center justify-between px-6">
                    <h1 className="text-lg font-semibold">
                        {navigation.find((n) => isActive(n.href))?.name || 'Dashboard'}
                    </h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
