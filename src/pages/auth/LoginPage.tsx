import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Briefcase, Building2, ShieldCheck, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = (type: 'client' | 'provider' | 'admin') => {
        login(type);
        if (type === 'admin') navigate('/admin/dashboard');
        else if (type === 'client') navigate('/client/marketplace');
        else navigate('/provider/marketplace');
    };

    const roles = [
        {
            id: 'provider' as const,
            title: 'Proveedor',
            description: 'Gestiona tus soluciones y leads',
            icon: Briefcase,
            color: 'text-violet-500',
            bgColor: 'bg-violet-500/10',
        },
        {
            id: 'client' as const,
            title: 'Cliente',
            description: 'Explora y contacta proveedores',
            icon: Building2,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            id: 'admin' as const,
            title: 'Admin',
            description: 'Panel de administración',
            icon: ShieldCheck,
            color: 'text-slate-400',
            bgColor: 'bg-slate-500/10',
        },
    ];

    return (
        <div className="space-y-6">
            {/* Role Cards */}
            <div className="space-y-3">
                {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                        <button
                            key={role.id}
                            onClick={() => handleLogin(role.id)}
                            className={cn(
                                "w-full flex items-center gap-4 p-4 rounded-lg",
                                "bg-white/5 border border-white/5",
                                "hover:bg-white/10 hover:border-white/10",
                                "transition-all duration-200 group text-left"
                            )}
                        >
                            <div className={cn(
                                "h-11 w-11 rounded-lg flex items-center justify-center shrink-0",
                                role.bgColor
                            )}>
                                <Icon className={cn("h-5 w-5", role.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm">Entrar como {role.title}</div>
                                <div className="text-xs text-muted-foreground truncate">{role.description}</div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                    );
                })}
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 pt-4">
                <p className="text-xs text-center text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <Link to="/auth/role-selection" className="text-primary hover:underline font-medium">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
}
