import { Outlet } from 'react-router-dom';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import AuthRoute from '@/routes/AuthRoute';
import { TodayCardsProvider } from '@/contexts/cardList';

export default function Home() {
    return (
        <AuthRoute>
            <div className="flex h-screen bg-gray-100">
                {/* 左侧导航栏 */}
                <CollapsibleSidebar />
                <TodayCardsProvider>
                    {/* 右侧内容区域 */}
                    <Outlet />
                </TodayCardsProvider>
            </div>
        </AuthRoute>
    );
}
