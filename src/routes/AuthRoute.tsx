import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRepository } from '@/SQLiteClient/UserRepository';
import { saveUserInfo } from '@/lib/StroreLib';

export default function AuthRoute({ children }: { children: ReactNode }) {
    const location = useLocation();
    const { email, password } = location.state || {};
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const repo = new UserRepository();
                const isValid = await repo.vertifyUser(email, password); // 调用异步验证
                if (isValid) {
                    saveUserInfo(email, password); // 保存用户信息到本地
                }
                setIsLogined(isValid);
            } catch (error) {
                setIsLogined(false);
            } finally {
                setIsLoading(false); // 结束加载
            }
        };
        verifyLogin();
    }, []); // 空依赖数组：仅在组件挂载时执行一次

    if (isLoading) {
        return <Skeleton className="h-8" />;
    } // 等待验证完成，先渲染Loading

    // 等到验证完成，再根据结果重新渲染内容
    return isLogined ? children : <Navigate to="/" replace />;
}
