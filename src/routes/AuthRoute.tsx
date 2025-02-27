import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';

export default function AuthRoute({ children }: { children: ReactNode }) {
    const isLogged = true; // 登录状态判断
    return isLogged ? children : <Navigate to="/" replace />;
}
