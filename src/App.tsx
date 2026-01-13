import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';
import RegisterPage from './pages/auth/RegisterPage';
import OnboardingWizard from './pages/onboarding/OnboardingWizard';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import UseCaseDetailPage from './pages/marketplace/UseCaseDetailPage';
import DealRoomsList from './pages/deal-rooms/DealRoomsList';
import DealRoomPage from './pages/deal-rooms/DealRoomPage';
import ProviderHome from './pages/dashboard/ProviderHome';
import ClientHome from './pages/dashboard/ClientHome';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminMessagesPage from './pages/admin/AdminMessagesPage';
import SettingsPage from './pages/settings/SettingsPage';
import ClientRFPManager from './pages/client/ClientRFPManager';
import ProviderAnalyticsPage from './pages/provider/ProviderAnalyticsPage';
import ProviderMarketplacePage from './pages/provider/ProviderMarketplacePage';
import LeadsPage from './pages/provider/LeadsPage';
import ClientFavoritesPage from './pages/client/ClientFavoritesPage';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import DevToolbar from './components/DevToolbar';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Route>

        {/* Auth Routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="role-selection" element={<RoleSelectionPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route index element={<Navigate to="login" replace />} />
        </Route>

        {/* Protected Routes - Dashboard Layout */}
        <Route element={<DashboardLayout />}>
          {/* Onboarding */}
          <Route path="/onboarding" element={<OnboardingWizard />} />

          {/* Provider Routes */}
          <Route path="/dashboard/provider" element={<ProviderHome />} />
          <Route path="/provider/marketplace" element={<ProviderMarketplacePage />} />
          <Route path="/provider/analytics" element={<ProviderAnalyticsPage />} />
          <Route path="/provider/leads" element={<LeadsPage />} />

          {/* Client Routes */}
          <Route path="/dashboard/client" element={<ClientHome />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<UseCaseDetailPage />} />
          <Route path="/client/rfps" element={<ClientRFPManager />} />
          <Route path="/client/favorites" element={<ClientFavoritesPage />} />

          {/* Shared Routes */}
          <Route path="/deal-rooms" element={<DealRoomsList />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<div className="text-2xl font-bold">Mi Perfil</div>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/messages" element={<AdminMessagesPage />} />
        </Route>

        {/* Deal Room - Full Screen Layout (outside DashboardLayout) */}
        <Route path="/deal-room/:id" element={<DealRoomPage />} />

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DevToolbar />
      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
}

export default App;
