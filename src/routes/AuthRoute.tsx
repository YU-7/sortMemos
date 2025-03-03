import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useState, useEffect } from 'react';
import { UserRepository } from '@/SQLiteClient/UserRepository';

export default function AuthRoute({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [isLogined, setIsLogined] = useState(false);
    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const repo = new UserRepository();
                const isValid = await repo.vertifyUser('111'); // 调用异步验证
                setIsLogined(isValid);
            } catch (error) {
                console.error('验证失败:', error);
                setIsLogined(false);
            } finally {
                setIsLoading(false); // 结束加载
            }
        };
        verifyLogin();
    }, []); // 空依赖数组：仅在组件挂载时执行一次

    if (isLoading) {
        return <div>加载中...</div>; // 等待验证完成，先渲染Loading
    }
    // 等到验证完成，再根据结果重新渲染内容
    return isLogined ? children : <Navigate to="/" replace />;
}
