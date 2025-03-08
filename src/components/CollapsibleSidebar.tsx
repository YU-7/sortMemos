import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home, Bookmark, Settings } from 'lucide-react';

export default function CollapsibleSidebar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navWidth = isCollapsed ? 'w-16' : 'w-36';
    function navTo(url: string) {
        navigate(`/home/${url}`);
    }

    // 导航项配置
    const navItems = [
        { icon: Home, label: 'TODO', url: 'todolist' },
        { icon: Bookmark, label: '收藏夹', url: 'setting' },
        { icon: Settings, label: '设置', url: 'setting' }
    ];

    return (
        <div className="flex h-screen bg-background">
            {/* 可收缩导航栏 */}
            <aside className={`${navWidth} transition-all duration-300 border-r p-4`}>
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
            </aside>
        </div>
    );
}
