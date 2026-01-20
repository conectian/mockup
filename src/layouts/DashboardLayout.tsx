import { Outlet, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

function DashboardLayout() {
    const location = useLocation();
    const isFullWidthPage = location.pathname === '/provider/marketplace';

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 safe-area-top overflow-x-hidden">
            <AppHeader />
            <main className={`flex-1 ${isFullWidthPage ? '' : 'p-4 md:p-6 lg:p-8 pb-8'}`}>
                <div className={isFullWidthPage ? 'w-full' : 'max-w-[1600px] mx-auto'}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;
