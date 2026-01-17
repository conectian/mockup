import { ElementType, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: ElementType;
    gradient: string;
    iconColor: string;
    textColor?: string;
    titleColor?: string;
    shadowColor?: string;
    children?: ReactNode;
    className?: string;
    valueClassName?: string;
    showHeaderIcon?: boolean;
}

export default function StatsCard({
    title,
    value,
    icon: Icon,
    gradient,
    iconColor,
    textColor,
    titleColor,
    shadowColor,
    children,
    className,
    valueClassName,
    showHeaderIcon = false
}: StatsCardProps) {
    return (
        <Card className={cn(
            "border-0 relative overflow-hidden rounded-md shadow-xl group transition-all duration-300",
            `bg-gradient-to-br ${gradient}`,
            shadowColor,
            className
        )}>
            {/* Background Icon */}
            <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
                <Icon className={cn("h-16 w-16 md:h-20 md:w-20", iconColor)} />
            </div>

            {showHeaderIcon ? (
                <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className={cn("text-xs font-bold uppercase tracking-[0.2em]", titleColor || "text-muted-foreground/70")}>
                        {title}
                    </CardTitle>
                    <Icon className={cn("h-5 w-5", iconColor)} />
                </CardHeader>
            ) : null}

            <CardContent className={cn("relative z-10", showHeaderIcon ? "" : "p-4 md:pt-6")}>
                 {!showHeaderIcon && (
                    <div className={cn("text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1 md:mb-2", titleColor || "text-muted-foreground/60")}>
                        {title}
                    </div>
                 )}
                <div className={cn("font-display font-bold", textColor, valueClassName || "text-3xl md:text-5xl")}>
                    {value}
                </div>
                {children && <div className="mt-4">{children}</div>}
            </CardContent>
        </Card>
    );
}
