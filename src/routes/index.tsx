import { Routes, Route } from 'react-router-dom';
import Login from '../views/Login';
import Home from '../views/Home';
import Setting from '@/views/Setting';
import InfiniteCardList from '@/components/InfiniteCardList';

export default function RoutesConfig() {
    return (
        <Routes>
            {/* 公共路由 */}
            <Route path="/" element={<Login />} />
            {/* 受保护路由 */}
            <Route path="/home" element={<Home />}>
                <Route index element={<InfiniteCardList />} />
                <Route path="setting" element={<Setting />} />
            </Route>
        </Routes>
    );
}
