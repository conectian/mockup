import { useAuthStore } from '../../store/useAuthStore';
import ProviderHome from './ProviderHome';
import ClientHome from './ClientHome';
import { Navigate } from 'react-router-dom';

export default function DashboardHome() {
    const { userType } = useAuthStore();

    if (userType === 'provider') {
        return <ProviderHome />;
    }

    if (userType === 'client') {
        return <ClientHome />;
    }

    if (userType === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    // Fallback
    return <Navigate to="/auth/login" replace />;
}
