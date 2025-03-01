import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { UserRepository } from '@/SQLiteClient/UserRepository';

var isLogined = false;
async function vertifyUser(): Promise<boolean> {
    const location = useLocation();
    const { username, password } = location.state || {};
    const repo = new UserRepository();
    var a = await repo.vertifyUser(username);
    return a;
}
isLogined = await vertifyUser();
export default function AuthRoute({ children }: { children: ReactNode }) {
    return isLogined ? children : <Navigate to="/" replace />;
}
