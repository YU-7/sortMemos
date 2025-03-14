import { Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRepository } from '@/SQLiteClient/UserRepository';

export default function RegistryRoute() {
    const location = useLocation();
    const { email, password } = location.state || {};
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        const registryUser = async () => {
            try {
                const repo = new UserRepository();
                const username = email;
                const state = 'NORMAL';
                const createTime = 1111;
                const isValid = await repo.addUser({ email, password, username, state, createTime }); // 调用异步验证
                setIsLogined(isValid);
            } catch (error) {
                console.error('注册失败:', error);
                setIsLogined(false);
            } finally {
                setIsLoading(false); // 结束加载
            }
        };
        registryUser();
    }, []); // 空依赖数组：仅在组件挂载时执行一次

    if (isLoading) {
        return <Skeleton className="h-8" />;
    } // 等待验证完成，先渲染Loading
    // 等到验证完成，再根据结果重新渲染内容
    return isLogined ? <Navigate to="/" replace /> : <Navigate to="/signup" replace />;
}
