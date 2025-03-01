import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { UserRepository } from '@/SQLiteClient/UserRepository';

// const repo = new UserRepository();
// var a = await repo.vertifyUser(username);
// console.log('登录标志2' + a);

export default function AuthRoute({ children }: { children: ReactNode }) {
    const location = useLocation();
    const { username, password } = location.state || {};
    console.log('登1' + username);
    // const isLogged =  await vertifyUser({ username, password });
    // console.log('登录标志1' + isLogged);
    return false ? children : <Navigate to="/" replace />;
}
