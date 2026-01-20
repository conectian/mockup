import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

// Keep mock updates for count calculation
const mockUpdates = [
    { id: 1, read: false },
    { id: 2, read: false },
    { id: 3, read: true },
    { id: 4, read: true },
    { id: 5, read: true },
    { id: 6, read: true },
    { id: 7, read: true },
];

export default function DealRoomsPopover() {
    const [updates] = useState(mockUpdates);
    const unreadCount = updates.filter((u) => !u.read).length;
    const { userType } = useAuthStore();

    const linkTo = userType === 'provider' ? '/provider/deal-rooms?tab=dealrooms' : '/client/deal-rooms?tab=dealrooms';

    return (
        <Link to={linkTo}>
            <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground hover:bg-accent">
                <Handshake className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 text-[10px] font-bold flex items-center justify-center rounded-full bg-red-600 text-white border-2 border-background">
                        {unreadCount}
                    </span>
                )}
            </Button>
        </Link>
    );
}
