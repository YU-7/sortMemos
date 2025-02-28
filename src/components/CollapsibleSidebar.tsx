import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Search, Home, Bookmark, Settings } from 'lucide-react';

export default function CollapsibleSidebar() {
    const navigate = useNavigate();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navWidth = isCollapsed ? 'w-16' : 'w-64';
    function vertifyUser() {
        navigate(`/home/setting`);
    }

    // 导航项配置
    const navItems = [
        { icon: Home, label: '首页' },
        { icon: Bookmark, label: '收藏夹' },
        { icon: Settings, label: '设置' }
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

                    {/* 搜索区域（折叠时隐藏文字） */}
                    <div className="flex gap-2 mb-6">
                        <Input
                            placeholder={isCollapsed ? '' : '搜索...'}
                            className={`transition-all ${isCollapsed ? 'w-0 px-0' : 'flex-1'}`}
                        />
                        <Button size="icon">
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* 导航菜单项 */}
                    <nav className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <Link to="/home/setting">
                                <Button
                                    key={item.label}
                                    variant="ghost"
                                    className={`w-full justify-start gap-3 ${isCollapsed ? 'px-2' : 'px-4'}`}
                                    onClick={vertifyUser}
                                >
                                    <item.icon className="h-4 w-4 shrink-0" />
                                    <span className={`${isCollapsed ? 'hidden' : 'block'}`}>{item.label}</span>
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>
        </div>
    );
}
