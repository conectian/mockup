import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useState } from 'react';

const registerSchema = z.object({
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export default function RegisterPage() {
    const navigate = useNavigate();
    const { login, tempRole } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Register values:', values);

        if (tempRole) {
            login(tempRole);
            navigate('/onboarding');
        } else {
            navigate('/auth/role-selection');
        }
        setIsLoading(false);
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-1">
                <h2 className="text-xl font-semibold">Crea tu cuenta</h2>
                <p className="text-sm text-muted-foreground">
                    {tempRole === 'provider' ? 'Para vender tus soluciones' : tempRole === 'client' ? 'Para encontrar soluciones' : 'Únete a Conectian'}
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre completo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Juan Pérez" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email corporativo</FormLabel>
                                <FormControl>
                                    <Input placeholder="juan@empresa.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creando cuenta...
                            </>
                        ) : (
                            'Comenzar'
                        )}
                    </Button>
                </form>
            </Form>

            <div className="text-center">
                <Link
                    to="/auth/role-selection"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="mr-1 h-4 w-4" />
                    Volver a selección de rol
                </Link>
            </div>
        </div>
    );
}
