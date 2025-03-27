import { Outlet } from 'react-router-dom';
import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import AuthRoute from '@/routes/AuthRoute';

export default function HomeLayout() {
    return (
        <AuthRoute>
            <div className="flex h-screen bg-gray-100">
                {/* 左侧导航栏 */}
                <CollapsibleSidebar />
                    {/* 右侧内容区域 */}
                    <Outlet />
            </div>
        </AuthRoute>
    );
}
