import CollapsibleSidebar from '@/components/CollapsibleSidebar';
import InfiniteCardList from '@/components/InfiniteCardList';
import AuthRoute from '@/routes/AuthRoute';
export default function Home() {
    return (
        <AuthRoute>
            <div className="flex h-screen bg-gray-100">
                {/* 左侧导航栏 */}
                <CollapsibleSidebar />
                {/* 右侧内容区域 */}
                <InfiniteCardList />
            </div>
        </AuthRoute>
    );
}
