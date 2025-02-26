import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // 权限守卫组件
import Login from "../views/Login";
import Home from "../views/Home";

export default function RoutesConfig() {
  return (
      <Routes>
        {/* 公共路由 */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* 受保护路由 */}
        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
        </Route> */}
      </Routes>
  );
}