import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    const handleLogin = (type: 'client' | 'provider' | 'admin') => {
        login(type);
        if (type === 'admin') navigate('/admin/dashboard');
        else if (type === 'client') navigate('/client/marketplace');
        else navigate('/provider/marketplace');
    };

    return (
        <div className="space-y-6">

            <div className="grid gap-3">
                <Card
                    className="cursor-pointer group border-2 border-transparent hover:border-violet-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10"
                    onClick={() => handleLogin('provider')}
                >
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Entrar como Proveedor</div>
                            <div className="text-sm text-muted-foreground">Gestiona tus soluciones y leads</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                    </CardContent>
                </Card>

                <Card
                    className="cursor-pointer group border-2 border-transparent hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                    onClick={() => handleLogin('client')}
                >
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Entrar como Cliente</div>
                            <div className="text-sm text-muted-foreground">Explora y contacta proveedores</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </CardContent>
                </Card>

                <Card
                    className="cursor-pointer group border-2 border-transparent hover:border-slate-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-slate-500/10"
                    onClick={() => handleLogin('admin')}
                >
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 rounded-md bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shrink-0">
                            <ShieldCheck className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Entrar como Admin</div>
                            <div className="text-sm text-muted-foreground">Panel de administración</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
                    </CardContent>
                </Card>
            </div>

            <div className="text-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <Link to="/auth/role-selection" className="text-primary hover:underline font-medium">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
}
