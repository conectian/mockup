import { useAuthStore, type UserRole } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
    ShieldCheck,
    Store,
    User,
    MonitorSmartphone,
    Minimize2
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function DevToolbar() {
    const { userType, setRole, isAuthenticated } = useAuthStore();
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState(false);

    if (!isAuthenticated) return null;

    const handleSwitchRole = (role: UserRole) => {
        if (!role) return;
        setRole(role);
        toast.info(`Rol cambiado a ${role.toUpperCase()}`, {
            description: 'Vista actualizada correctamente.'
        });

        // Redirect logic based on role
        if (role === 'provider') navigate('/dashboard/provider');
        else if (role === 'client') navigate('/dashboard/client');
        else if (role === 'admin') navigate('/admin');
    };

    if (isMinimized) {
        return (
            <Button
                size="icon"
                className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
                onClick={() => setIsMinimized(false)}
            >
                <MonitorSmartphone className="h-5 w-5" />
            </Button>
        );
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-card border shadow-xl rounded-lg p-2 flex flex-col gap-2 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between px-1 mb-1 border-b pb-2">
                <span className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                    <MonitorSmartphone className="h-3 w-3" />
                    Demo Mode
                </span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={() => setIsMinimized(true)}
                >
                    <Minimize2 className="h-3 w-3" />
                </Button>
            </div>

            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant={userType === 'client' ? 'default' : 'outline'}
                    className={cn("text-xs gap-1", userType === 'client' && "bg-blue-600 hover:bg-blue-700")}
                    onClick={() => handleSwitchRole('client')}
                >
                    <User className="h-3 w-3" />
                    Cliente
                </Button>

                <Button
                    size="sm"
                    variant={userType === 'provider' ? 'default' : 'outline'}
                    className={cn("text-xs gap-1", userType === 'provider' && "bg-emerald-600 hover:bg-emerald-700")}
                    onClick={() => handleSwitchRole('provider')}
                >
                    <Store className="h-3 w-3" />
                    Proveedor
                </Button>

                <Button
                    size="sm"
                    variant={userType === 'admin' ? 'default' : 'outline'}
                    className={cn("text-xs gap-1", userType === 'admin' && "bg-amber-600 hover:bg-amber-700")}
                    onClick={() => handleSwitchRole('admin')}
                >
                    <ShieldCheck className="h-3 w-3" />
                    Admin
                </Button>
            </div>

            <div className="text-[10px] text-center text-muted-foreground pt-1">
                Cambio de rol instantáneo
            </div>
        </div>
    );
}
