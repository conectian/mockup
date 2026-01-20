import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useAuthStore } from '@/store/useAuthStore';

// Import the existing components/pages as content
import ProviderHome from '@/pages/dashboard/ProviderHome';
import ClientHome from '@/pages/dashboard/ClientHome';
import DealRoomsListContent from './DealRoomsListContent';

export default function DealRoomsHub() {
    const { userType } = useAuthStore();
    const [searchParams] = useSearchParams();
    const tabFromUrl = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabFromUrl || 'dealrooms');

    // Sync activeTab with URL search params
    useEffect(() => {
        if (tabFromUrl && ['dashboard', 'dealrooms'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [tabFromUrl]);

    return (
        <div className="space-y-6">
            {/* Header with Tabs */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Mi Espacio</h1>
                        <p className="text-muted-foreground text-lg mt-1">Centro de operaciones y negociaciones</p>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    {/* Tabs Navigation */}
                    {/* TabsList removed as navigation is now in the header */}

                    {/* Deal Rooms Tab */}
                    <TabsContent value="dealrooms" className="mt-6">
                        <DealRoomsListContent />
                    </TabsContent>

                    {/* Dashboard Tab (Includes Analytics for Provider) */}
                    <TabsContent value="dashboard" className="mt-6">
                        {userType === 'provider' ? <ProviderHome /> : <ClientHome />}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
