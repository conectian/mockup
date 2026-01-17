import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type AvatarVariant = 'brand' | 'neutral' | 'success' | 'warning' | 'info';

interface CompanyAvatarProps {
    src?: string;
    alt: string; // Used for fallback initials
    className?: string;
    fallbackClassName?: string;
    variant?: AvatarVariant;
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const VARIANTS: Record<AvatarVariant, string> = {
    brand: 'bg-gradient-to-br from-violet-400 to-indigo-500 text-white',
    neutral: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-700',
    success: 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white',
    warning: 'bg-gradient-to-br from-amber-400 to-orange-500 text-white',
    info: 'bg-gradient-to-br from-blue-400 to-sky-500 text-white',
};

const SIZES: Record<string, string> = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
};

export default function CompanyAvatar({
    src,
    alt,
    className,
    fallbackClassName,
    variant = 'brand',
    size = 'md',
}: CompanyAvatarProps) {
    const initials = alt
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <Avatar className={cn(SIZES[size], "rounded-md shadow-sm", className)}>
            <AvatarImage src={src} alt={alt} className="object-cover" />
            <AvatarFallback
                className={cn(
                    "font-bold rounded-md",
                    VARIANTS[variant],
                    fallbackClassName
                )}
            >
                {initials}
            </AvatarFallback>
        </Avatar>
    );
}
