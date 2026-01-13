import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Button } from '@/components/ui/button';

export default function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">Conectian</span>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link to="/auth/role-selection">
                            <Button variant="ghost">Empezar</Button>
                        </Link>
                        <Link to="/auth/login">
                            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25">
                                Iniciar Sesión
                            </Button>
                        </Link>
                        <ThemeToggle />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/50">
                <div className="container mx-auto py-8 px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <div className="h-6 w-6 rounded bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">C</span>
                            </div>
                            <span className="text-sm font-semibold">Conectian</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} Conectian. El ecosistema de innovación B2B.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
