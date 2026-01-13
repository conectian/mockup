import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-violet-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-violet-950/20 dark:to-indigo-950/30 p-4">
            {/* Theme Toggle in corner */}
            <div className="fixed top-4 right-4">
                <ThemeToggle />
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-md">
                <div className="bg-card border border-border/50 rounded-md shadow-xl shadow-violet-500/5 p-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center mb-4 shadow-lg shadow-violet-500/30">
                            <span className="text-white font-bold text-2xl">C</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Conectian</h1>
                        <p className="text-muted-foreground text-sm">El ecosistema de innovación B2B</p>
                    </div>

                    <Outlet />
                </div>

                <p className="text-center text-xs text-muted-foreground mt-6">
                    Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
                </p>
            </div>
        </div>
    );
}
