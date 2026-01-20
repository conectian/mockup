import { type InnovationRequest } from '@/data/marketplace-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Inbox, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ClientRequestCardGridProps {
    request: InnovationRequest;
}

export default function ClientRequestCardGrid({ request }: ClientRequestCardGridProps) {
    const isActive = request.status === 'Active';
    
    // Get professional image based on request content
    const getRequestImage = (request: InnovationRequest): string => {
        const titleLower = request.title.toLowerCase();
        const descriptionLower = request.description.toLowerCase();
        const sectorLower = request.sector.toLowerCase();
        
        // Map to relevant professional images based on use case
        if (titleLower.includes('anomalía') || titleLower.includes('detección') || titleLower.includes('defecto') || descriptionLower.includes('visión artificial')) {
            return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop';
        }
        if (titleLower.includes('recomendación') || titleLower.includes('e-commerce') || titleLower.includes('cross-selling')) {
            return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop';
        }
        if (titleLower.includes('reporte') || titleLower.includes('financiero') || titleLower.includes('erp')) {
            return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop';
        }
        if (titleLower.includes('visión') || titleLower.includes('computador') || titleLower.includes('control de calidad') || titleLower.includes('epi')) {
            return 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop';
        }
        if (titleLower.includes('chatbot') || titleLower.includes('atención al cliente') || titleLower.includes('multiidioma')) {
            return 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop';
        }
        if (titleLower.includes('ruta') || titleLower.includes('logística') || titleLower.includes('carbono') || titleLower.includes('entrega')) {
            return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop';
        }
        // Default: innovation/technology image
        return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop';
    };
    
    const mockImage = getRequestImage(request);

    return (
        <Card className="py-0 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full border border-white/5 rounded-xl bg-card/40 backdrop-blur-sm hover:border-primary/30">
            {/* Header with image */}
            <div className="aspect-[16/10] relative overflow-hidden">
                <img
                    src={mockImage}
                    alt={request.title}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        // Fallback to gradient if image fails
                        e.currentTarget.style.display = 'none';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Status Badge */}
                <Badge className={cn(
                    "absolute top-4 right-4 gap-1.5 px-3 py-1 shadow-lg backdrop-blur-md border-0",
                    isActive
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                )}>
                    <div className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        isActive ? "bg-emerald-400" : "bg-slate-400"
                    )} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isActive ? 'Activo' : 'Cerrado'}
                    </span>
                </Badge>

                {/* Responses Badge (Bottom Left) */}
                <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-md border-white/20 flex items-center gap-2">
                    <Inbox className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tight">
                        {request.responsesCount} respuestas
                    </span>
                </div>
            </div>

            {/* Content */}
            <CardContent className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    {/* Date */}
                    <div className="flex items-center gap-2 mb-3">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                        <span className="text-xs font-bold text-muted-foreground/80 tracking-tight">{request.createdAt}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-tight tracking-tight">
                        {request.title}
                    </h3>

                    {/* Budget Badge */}
                    <div className="flex flex-wrap gap-1.5 mb-6 mt-4">
                        <Badge variant="outline" className="text-[10px] font-bold bg-primary/10 text-primary border-primary/20 px-2 py-0.5 rounded-md">
                            Presupuesto: {request.budgetRange}
                        </Badge>
                    </div>
                </div>

                {/* Footer Action */}
                <div className="border-t border-white/5 mt-auto">
                    <Button asChild className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-md font-bold h-11 bg-white/5 text-foreground border border-white/10 hover:border-primary/50">
                        <Link to={`/client/requests/${request.id}`}>
                            Ver Solicitud
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
