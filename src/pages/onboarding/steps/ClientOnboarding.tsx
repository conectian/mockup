import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const step1Schema = z.object({
    companyName: z.string().min(2, 'Requerido'),
    sector: z.string().min(2, 'Requerido'),
    size: z.string().min(1, 'Selecciona tamaño'),
});

const step2Schema = z.object({
    interests: z.string().min(1, 'Selecciona interés principal'),
});

interface Props {
    step: number;
    setStep: (step: number) => void;
    onFinish: () => void;
}

export default function ClientOnboarding({ step, setStep, onFinish }: Props) {
    const form1 = useForm<z.infer<typeof step1Schema>>({ resolver: zodResolver(step1Schema) });
    const form2 = useForm<z.infer<typeof step2Schema>>({ resolver: zodResolver(step2Schema) });

    const onStep1Submit = () => setStep(2);
    const onStep2Submit = () => onFinish();

    if (step === 1) {
        return (
            <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-4">
                    <FormField control={form1.control} name="companyName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de la empresa</FormLabel>
                            <FormControl><Input placeholder="Empresa S.A." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form1.control} name="sector" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sector</FormLabel>
                            <FormControl><Input placeholder="Banca, Retail, Seguros..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form1.control} name="size" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tamaño de empresa</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="small">1-50 empleados</SelectItem>
                                    <SelectItem value="medium">51-200 empleados</SelectItem>
                                    <SelectItem value="large">201-1000 empleados</SelectItem>
                                    <SelectItem value="enterprise">+1000 empleados</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex justify-end pt-4">
                        <Button type="submit" className="gap-2">
                            Siguiente
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </Form>
        );
    }

    return (
        <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onStep2Submit)} className="space-y-4">
                <FormField control={form2.control} name="interests" render={({ field }) => (
                    <FormItem>
                        <FormLabel>¿Qué buscas principalmente?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="cost_reduction">Reducción de costes</SelectItem>
                                <SelectItem value="automation">Automatización de procesos</SelectItem>
                                <SelectItem value="compliance">Compliance y regulación</SelectItem>
                                <SelectItem value="open_innovation">Innovación abierta</SelectItem>
                                <SelectItem value="digital_transformation">Transformación digital</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                    </Button>
                    <Button type="submit" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        Finalizar
                        <Check className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
