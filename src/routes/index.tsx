import { lazy} from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // 权限守卫组件

const Login = lazy(() => import('../views/Login'));

export default function RoutesConfig() {
  return (
      <Routes>
        {/* 公共路由 */}
        <Route path="/" element={<Login />} />
        
        {/* 受保护路由 */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route> */}
      </Routes>
  );
}