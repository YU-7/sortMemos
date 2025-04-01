import Login from '../views/Login';
import SignUp from '@/views/SignUp';
import HomeLayout from '../views/HomeLayout';
import TodoList from '@/views/ActiveTodo/ActiveLayout';
import ArchiveLayout from '@/views/ArchiveLayout';
import RouRoutineLayout from '@/views/RoutineLayout';
import Setting from '@/views/SettingLayout';
import FrequenyTrackLayout from '@/views/FrequenyTrackLayout';
import RegistryRoute from './RegistryRoute';

export default function RoutesConfig() {
    return (
        <Routes>
            {/* 公共路由 */}
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/registry" element={<RegistryRoute />} />
            {/* 受保护路由 */}
            <Route path="/home" element={<HomeLayout />}>
                <Route index element={<TodoList />} />
                <Route path="alive-todolist" element={<TodoList />} />
                <Route path="archive-todolist" element={<ArchiveLayout />} />
                <Route path="routine" element={<RouRoutineLayout />} />
                <Route path="frequeny" element={<FrequenyTrackLayout />} />
                <Route path="setting" element={<Setting />} />
            </Route>
        </Routes>
    );
}
