import { useAuthStore } from '../../store/useAuthStore';
import { Navigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { userType } = useAuthStore();

    if (userType !== 'admin') {
        return <Navigate to="/unauthorized" replace />
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Admin Dashboard</h1>
            <p>System overview and settings.</p>
        </div>
    );
}
