import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const step1Schema = z.object({
    startupName: z.string().min(2, 'Requerido'),
    website: z.string().url('URL inválida').optional().or(z.literal('')),
    slogan: z.string().max(50, 'Máximo 50 caracteres'),
});

const step2Schema = z.object({
    category: z.string().min(1, 'Selecciona una categoría'),
    technologies: z.string().min(2, 'Menciona tus tecnologías'),
});

interface Props {
    step: number;
    setStep: (step: number) => void;
    onFinish: () => void;
}

export default function ProviderOnboarding({ step, setStep, onFinish }: Props) {
    const form1 = useForm<z.infer<typeof step1Schema>>({ resolver: zodResolver(step1Schema) });
    const form2 = useForm<z.infer<typeof step2Schema>>({ resolver: zodResolver(step2Schema) });

    const onStep1Submit = () => setStep(2);
    const onStep2Submit = () => onFinish();

    if (step === 1) {
        return (
            <Form {...form1}>
                <form onSubmit={form1.handleSubmit(onStep1Submit)} className="space-y-4">
                    <FormField control={form1.control} name="startupName" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de la Startup/Agencia</FormLabel>
                            <FormControl><Input placeholder="Tech Solutions S.L." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form1.control} name="website" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Website</FormLabel>
                            <FormControl><Input placeholder="https://tusolucion.com" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form1.control} name="slogan" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slogan corto</FormLabel>
                            <FormControl><Input placeholder="Innovando el futuro..." {...field} /></FormControl>
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
                <FormField control={form2.control} name="category" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Categoría principal</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="fintech">Fintech</SelectItem>
                                <SelectItem value="retail">Retail Tech</SelectItem>
                                <SelectItem value="legal">Legaltech</SelectItem>
                                <SelectItem value="health">Healthtech</SelectItem>
                                <SelectItem value="ai">Inteligencia Artificial</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form2.control} name="technologies" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tecnologías (separadas por coma)</FormLabel>
                        <FormControl><Input placeholder="React, Node.js, Python, AWS..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex justify-between pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Atrás
                    </Button>
                    <Button type="submit" className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                        Finalizar
                        <Check className="h-4 w-4" />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
