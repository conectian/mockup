import { Calendar, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export interface InnovationRequest {
    id: string;
    title: string;
    createdAt: string;
    status: 'Active' | 'Closed';
    budgetRange: string;
    responsesCount: number;
}

interface ClientInnovationRequestCardProps {
    request: InnovationRequest;
}

export default function ClientInnovationRequestCard({ request }: ClientInnovationRequestCardProps) {
    const isActive = request.status === 'Active';

    return (
        <Card className="group relative overflow-hidden bg-white/5 border-white/10 backdrop-blur-sm hover:border-primary/40 hover:shadow-md transition-all duration-200">
            {/* Status Line */}
            <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1",
                isActive ? "bg-emerald-500" : "bg-muted"
            )} />

            <div className="flex flex-col p-4 pl-5 h-full relative">
                {/* Header & Title */}
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {request.title}
                    </h3>
                    <Badge
                        variant={isActive ? 'default' : 'secondary'}
                        className={cn(
                            "flex-shrink-0 h-5 px-1.5 text-[10px] gap-1",
                            isActive
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-white/5 text-muted-foreground border-white/10"
                        )}
                    >
                        <div className={cn("w-1 h-1 rounded-full", isActive ? "bg-emerald-500" : "bg-muted-foreground")} />
                        {isActive ? 'Activo' : 'Cerrado'}
                    </Badge>
                </div>

                {/* Info Metadata */}
                <div className="space-y-2 mt-auto">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 opacity-70" />
                            <span>{request.createdAt}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 opacity-70" />
                            <span>{request.budgetRange}</span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                            <MessageSquare className="h-3.5 w-3.5 text-primary" />
                            <span className="text-foreground">{request.responsesCount}</span> propuestas
                        </div>

                        <Link to={`/client/requests/${request.id}`}>
                            <Button size="sm" className="h-7 px-3 text-xs gap-1.5 bg-white/5 hover:bg-white/10 border-white/10 text-foreground">
                                Detalles
                                <ArrowRight className="h-3 w-3" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </Card>
    );
}
