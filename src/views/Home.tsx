import { Outlet } from 'react-router-dom';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import AuthRoute from '@/routes/AuthRoute';
import { TodayCardsProvider } from '@/contexts/todayCards';
import { InboxCardsProvider } from '@/contexts/inboxCards';
export default function Home() {
    return (
        <AuthRoute>
            <div className="flex h-screen bg-gray-100">
                {/* 左侧导航栏 */}
                <CollapsibleSidebar />
                <TodayCardsProvider>
                    <InboxCardsProvider>
                        {/* 右侧内容区域 */}

                        <Outlet />
                    </InboxCardsProvider>
                </TodayCardsProvider>
            </div>
        </AuthRoute>
    );
}
