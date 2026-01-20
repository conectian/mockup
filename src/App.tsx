import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LoginPage from './pages/auth/LoginPage';
import RoleSelectionPage from './pages/auth/RoleSelectionPage';
import RegisterPage from './pages/auth/RegisterPage';
import OnboardingWizard from './pages/onboarding/OnboardingWizard';
import MarketplacePage from './pages/marketplace/MarketplacePage';
import UseCaseDetailPage from './pages/marketplace/UseCaseDetailPage';
import DealRoomsHub from './pages/deal-rooms/DealRoomsHub';
import DealRoomPage from './pages/deal-rooms/DealRoomPage';
import ProviderHome from './pages/dashboard/ProviderHome';
import ClientHome from './pages/dashboard/ClientHome';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminContentPage from './pages/admin/AdminContentPage';
import AdminFinancesPage from './pages/admin/AdminFinancesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminMonitoringPage from './pages/admin/AdminMonitoringPage';
import AdminProfilePage from './pages/admin/AdminProfilePage';

import ClientRFPManager from './pages/client/ClientRFPManager';
import ProviderMarketplacePage from './pages/provider/ProviderMarketplacePage';
import CreateUseCasePage from './pages/provider/CreateUseCasePage';
import CompanyDetailPage from './pages/provider/CompanyDetailPage';
import LeadsPage from './pages/provider/LeadsPage';
import ReferralsPage from './pages/provider/ReferralsPage';
import PaymentsPage from './pages/provider/PaymentsPage';
import ClientFavoritesPage from './pages/client/ClientFavoritesPage';
import ClientProposalDetail from './pages/client/ClientProposalDetail';
import ClientRequestDetail from './pages/client/ClientRequestDetail';
import UnauthorizedPage from './pages/UnauthorizedPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import NotificationsPage from './pages/shared/NotificationsPage';
import DevToolbar from './components/DevToolbar';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
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

          {/* Client Routes - All prefixed with /client */}
          <Route path="/client/dashboard" element={<ClientHome />} />
          <Route path="/client/marketplace" element={<MarketplacePage />} />
          <Route path="/client/marketplace/:id" element={<UseCaseDetailPage />} />
          <Route path="/client/proposals/:id" element={<ClientProposalDetail />} />
          <Route path="/client/requests/:id" element={<ClientRequestDetail />} />
          <Route path="/client/rfps" element={<ClientRFPManager />} />
          <Route path="/client/favorites" element={<ClientFavoritesPage />} />
          <Route path="/client/deal-rooms" element={<DealRoomsHub />} />

          <Route path="/client/profile" element={<ProfilePage />} />
          <Route path="/client/referrals" element={<ReferralsPage />} />
          <Route path="/client/payments" element={<PaymentsPage />} />
          <Route path="/client/notifications" element={<NotificationsPage />} />

          {/* Provider Routes - All prefixed with /provider */}
          <Route path="/provider/dashboard" element={<ProviderHome />} />
          <Route path="/provider/marketplace" element={<ProviderMarketplacePage />} />
          <Route path="/provider/marketplace/create" element={<CreateUseCasePage />} />
          <Route path="/provider/marketplace/company/:id" element={<CompanyDetailPage />} />

          <Route path="/provider/leads" element={<LeadsPage />} />
          <Route path="/provider/deal-rooms" element={<DealRoomsHub />} />

          <Route path="/provider/profile" element={<ProfilePage />} />
          <Route path="/provider/referrals" element={<ReferralsPage />} />
          <Route path="/provider/payments" element={<PaymentsPage />} />
          <Route path="/provider/notifications" element={<NotificationsPage />} />

          {/* Admin Routes - All prefixed with /admin */}
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/content" element={<AdminContentPage />} />
          <Route path="/admin/finances" element={<AdminFinancesPage />} />
          <Route path="/admin/settings" element={<AdminSettingsPage />} />
          <Route path="/admin/monitoring" element={<AdminMonitoringPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/notifications" element={<NotificationsPage />} />

        </Route>

        {/* Deal Room - Full Screen Layout (outside DashboardLayout) */}
        <Route path="/deal-room/:id" element={<DealRoomPage />} />

        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DevToolbar />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
