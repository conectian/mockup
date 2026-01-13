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
                        <div className="h-16 w-16 flex items-center justify-center mb-4 transition-all duration-300">
                            <img src="/conectian.png" alt="Conectian" className="h-12 w-12 object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#243A57] dark:text-white">Conectian</h1>
                        <p className="text-muted-foreground text-sm font-medium">El ecosistema de innovación B2B</p>
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
