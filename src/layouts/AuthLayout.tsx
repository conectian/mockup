import { Outlet } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
            {/* Theme Toggle in corner */}
            <div className="fixed top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Auth Card */}
            <div className="w-full max-w-md">
                <div className="glass-card rounded-xl p-6 sm:p-8">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center mb-4">
                            <img src="/conectian.png" alt="Conectian" className="h-10 w-10 sm:h-12 sm:w-12 object-contain" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-display font-bold tracking-tight">Conectian</h1>
                        <p className="text-muted-foreground text-xs sm:text-sm font-medium mt-1">El ecosistema de innovación B2B</p>
                    </div>

                    <Outlet />
                </div>

                <p className="text-center text-[10px] sm:text-xs text-muted-foreground/60 mt-6">
                    Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
                </p>
            </div>
        </div>
    );
}
