import { useNavigate } from 'react-router-dom';
import { useAuthStore, type UserType } from '../../store/useAuthStore';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Building2, ArrowRight } from 'lucide-react';

export default function RoleSelectionPage() {
    const navigate = useNavigate();
    const setTempRole = useAuthStore((state) => state.setTempRole);

    const handleSelectRole = (role: UserType) => {
        setTempRole(role);
        navigate('/auth/register');
    };

    return (
        <div className="space-y-6">
            <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold">¿Cómo quieres usar Conectian?</h2>
                <p className="text-sm text-muted-foreground">Selecciona tu perfil para personalizar tu experiencia</p>
            </div>

            <div className="grid gap-3">
                <Card
                    className="cursor-pointer group border-2 border-transparent hover:border-violet-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-violet-500/10"
                    onClick={() => handleSelectRole('provider')}
                >
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 rounded-md bg-primary flex items-center justify-center shrink-0">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Soy Proveedor</div>
                            <div className="text-sm text-muted-foreground">Vende tus soluciones tecnológicas</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                    </CardContent>
                </Card>

                <Card
                    className="cursor-pointer group border-2 border-transparent hover:border-blue-500/50 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                    onClick={() => handleSelectRole('client')}
                >
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="h-12 w-12 rounded-md bg-[#243A57] flex items-center justify-center shrink-0">
                            <Building2 className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold">Soy Cliente</div>
                            <div className="text-sm text-muted-foreground">Busca soluciones para tu empresa</div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
