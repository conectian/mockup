import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ProviderOnboarding from './steps/ProviderOnboarding';
import ClientOnboarding from './steps/ClientOnboarding';
import { Sparkles } from 'lucide-react';

export default function OnboardingWizard() {
    const { userType, completeOnboarding } = useAuthStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 2;

    const handleFinish = () => {
        completeOnboarding();
        if (userType === 'client') navigate('/dashboard/client');
        else if (userType === 'provider') navigate('/dashboard/provider');
        else navigate('/');
    };

    const progress = (step / totalSteps) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Configura tu perfil</h1>
                        <p className="text-sm text-muted-foreground">Paso {step} de {totalSteps}</p>
                    </div>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="border-2">
                <CardHeader>
                    <CardTitle>
                        {step === 1
                            ? (userType === 'provider' ? 'Información de tu empresa' : 'Sobre tu empresa')
                            : (userType === 'provider' ? 'Tu expertise' : 'Tus necesidades')
                        }
                    </CardTitle>
                    <CardDescription>
                        {step === 1
                            ? 'Cuéntanos más para personalizar tu experiencia'
                            : 'Esto nos ayudará a mostrarte lo más relevante'
                        }
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {userType === 'provider' ? (
                        <ProviderOnboarding step={step} setStep={setStep} onFinish={handleFinish} />
                    ) : (
                        <ClientOnboarding step={step} setStep={setStep} onFinish={handleFinish} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
