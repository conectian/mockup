import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '@/components/mobile/BottomNav';

function DashboardLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
                <div className="max-w-[1600px] mx-auto">
                    <Outlet />
                </div>
            </main>
            <BottomNav />
        </div>
    );
}

export default DashboardLayout;
