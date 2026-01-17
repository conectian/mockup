import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType = 'active' | 'pending' | 'closed' | 'verified' | 'draft' | 'blue' | 'purple' | 'neutral';

interface StatusBadgeProps {
    status?: StatusType;
    children: React.ReactNode;
    className?: string;
    variant?: 'dot' | 'outline' | 'solid' | 'subtle';
    dotClassName?: string;
    color?: string; // Manual override for color class "text-red-500", etc if needed, though status is preferred
}

const STATUS_STYLES: Record<string, { bg: string; text: string; dot: string; border?: string }> = {
    active: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        border: 'border-emerald-500/20'
    },
    verified: {
        bg: 'bg-emerald-500/10',
        text: 'text-emerald-600 dark:text-emerald-400',
        dot: 'bg-emerald-500',
        border: 'border-emerald-500/20'
    },
    pending: {
        bg: 'bg-amber-500/10',
        text: 'text-amber-600 dark:text-amber-400',
        dot: 'bg-amber-500 animate-pulse',
        border: 'border-amber-500/20'
    },
    closed: {
        bg: 'bg-slate-500/10',
        text: 'text-slate-600 dark:text-slate-400',
        dot: 'bg-slate-500',
        border: 'border-slate-500/20'
    },
    draft: {
        bg: 'bg-slate-500/10',
        text: 'text-slate-600 dark:text-slate-400',
        dot: 'bg-slate-500',
        border: 'border-slate-500/20'
    },
    neutral: {
        bg: 'bg-muted',
        text: 'text-muted-foreground',
        dot: 'bg-muted-foreground',
        border: 'border-white/10'
    },
    blue: {
        bg: 'bg-blue-500/10',
        text: 'text-blue-600 dark:text-blue-400',
        dot: 'bg-blue-500',
        border: 'border-blue-500/20'
    },
    purple: {
        bg: 'bg-violet-500/10',
        text: 'text-violet-600 dark:text-violet-400',
        dot: 'bg-violet-500',
        border: 'border-violet-500/20'
    }
};

export default function StatusBadge({
    status = 'neutral',
    children,
    className,
    variant = 'dot',
    dotClassName,
}: StatusBadgeProps) {
    // Normalize status to lowercase to match keys
    const statusKey = (typeof status === 'string' ? status.toLowerCase() : 'neutral') as string;
    const style = STATUS_STYLES[statusKey] || STATUS_STYLES.neutral;

    if (variant === 'outline') {
        return (
            <Badge variant="outline" className={cn("font-bold", style.text, style.border, style.bg, className)}>
                {children}
            </Badge>
        );
    }

    if (variant === 'subtle') {
        return (
            <Badge variant="secondary" className={cn("font-bold border-0", style.bg, style.text, className)}>
                {children}
            </Badge>
        );
    }

    // Default 'dot' variant
    return (
        <Badge className={cn("font-bold rounded-full border-0 gap-1.5", style.bg, style.text, className)}>
            <div className={cn("h-1.5 w-1.5 rounded-full", style.dot, dotClassName)} />
            {children}
        </Badge>
    );
}
