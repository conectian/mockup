import { useLocation, Link } from 'react-router-dom';
import { useAuthStore, type UserType } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';
import { MENU_PROVIDER, MENU_CLIENT, MENU_ADMIN, type MenuItem } from '@/config/navigation';

function getMenuForRole(role: UserType): MenuItem[] {
    switch (role) {
        case 'provider':
            return MENU_PROVIDER.slice(0, 4); // Limit to 4 items for bottom nav
        case 'client':
            return MENU_CLIENT.slice(0, 4);
        case 'admin':
            return MENU_ADMIN.slice(0, 4);
        default:
            return [];
    }
}

export default function BottomNav() {
    const location = useLocation();
    const { userType } = useAuthStore();
    const menuItems = getMenuForRole(userType);

    const isActive = (href: string) => location.pathname === href;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-white/10 safe-area-bottom">
            <div className="flex items-center justify-around h-16 px-2">
                {menuItems.map((item) => {
                    const active = isActive(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 flex-1 h-full rounded-lg transition-all duration-200 active:scale-95",
                                active
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            <div className={cn(
                                "relative p-2 rounded-xl transition-all duration-200",
                                active && "bg-primary/10"
                            )}>
                                <Icon className={cn(
                                    "h-5 w-5",
                                    active && "scale-110"
                                )} />
                                {active && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[10px] font-medium tracking-tight",
                                active ? "font-bold" : "font-normal"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
