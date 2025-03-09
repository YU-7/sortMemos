import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Bookmark, Settings } from 'lucide-react';
import { LogOut } from 'lucide-react';

export default function CollapsibleSidebar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navWidth = isCollapsed ? 'w-16' : 'w-36';
    function navTo(url: string) {
        navigate(`/home/${url}`);
    }
    function loginOut() {
        navigate('/');
    }

    // 导航项配置
    const navItems = [
        { icon: Home, label: 'TODO', url: 'todolist' },
        { icon: Bookmark, label: '模板记', url: 'setting' },
        { icon: Settings, label: '频次记录', url: 'setting' },
        { icon: Settings, label: '软件设置', url: 'setting' }
    ];

    return (
        <div className="flex h-screen bg-background">
            <aside className={`${navWidth} transition-all duration-300 border-r p-4 flex flex-col`}>
                <div className="flex flex-col h-full">
                    {/* 收缩按钮 */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto mb-4"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
                    </Button>

                    {/* 导航菜单项 */}
                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                variant="ghost"
                                className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-4'}`}
                                onClick={() => navTo(item.url)}
                            >
                                <item.icon className="h-4 w-4 shrink-0" />
                                <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                            </Button>
                        ))}
                    </nav>
                </div>

                {/* 底部登出按钮 */}
                <Button
                    variant="ghost"
                    className={`mt-auto w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-4'}`}
                    onClick={loginOut}
                >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span className={`${isCollapsed ? 'hidden' : 'block'}`}>退出登录</span>
                </Button>
            </aside>
        </div>
    );
}
