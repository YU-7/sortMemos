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
                const isValid = await repo.addUser({ email, password }); // 调用异步验证
                setIsLogined(isValid);
            } catch (error) {
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
    return <Navigate to="/" replace />;
}
