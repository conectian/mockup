import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import AppHeader from '../components/AppHeader';


export default function AppLayout() {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 safe-area-top overflow-x-hidden">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8 pb-8">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

        </div>
    );
}
