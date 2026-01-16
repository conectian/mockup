import { useAuthStore } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function DashboardHome() {
    const { userType } = useAuthStore();

    if (userType === 'provider') {
        return <Navigate to="/provider/marketplace" replace />;
    }

    if (userType === 'client') {
        return <Navigate to="/marketplace" replace />;
    }

    if (userType === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    // Fallback
    return <Navigate to="/auth/login" replace />;
}
