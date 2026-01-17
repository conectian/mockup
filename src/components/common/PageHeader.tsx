import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
    className?: string;
}

export default function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <div className={cn("flex flex-col md:flex-row md:items-end justify-between gap-4", className)}>
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
                {description && <p className="text-muted-foreground text-lg mt-1">{description}</p>}
            </div>
            {children && (
                <div className="flex items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
}
