import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import SignUp from '@/views/SignUp';
import Home from '../views/Home';
import TodoList from '@/views/TodoList';
import Setting from '@/views/Setting';
import RegistryRoute from './RegistryRoute';

export default function RoutesConfig() {
    return (
        <Routes>
            {/* 公共路由 */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/registry" element={<RegistryRoute />} />
            {/* 受保护路由 */}
            <Route path="/home" element={<Home />}>
                <Route index element={<TodoList />} />
                <Route path="todolist" element={<TodoList />} />
                <Route path="setting" element={<Setting />} />
            </Route>
        </Routes>
    );
}
