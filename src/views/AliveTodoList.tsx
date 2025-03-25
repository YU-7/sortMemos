import AliveKanBoard from "@/components/AliveTodo/AliveKanBoard"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DndContext } from '@dnd-kit/core';

export default function AliveTodoList() {
     // 在组件顶部添加状态管理
     const { todayCards, inboxCards, moveToToday, moveToInbox } = useTodayCards();
     const [isExpanded, setIsExpanded] = useState(false);
     // 为参数添加类型注解
     function handleDragEnd(event: any) {
         console.log(event);
         const { active, over, collisions } = event;
         if (over.id === 'inbox' && collisions.length > 1) {
             moveToInbox(active.id);
         }
         if (over.id === 'today' && collisions.length > 1) {
             moveToToday(active.id);
         }
     }
    return (
        <DndContext onDragEnd={handleDragEnd}>
        {/* 左侧可折叠区域 */}
        {isExpanded && (
            <AliveKanBoard
                cards={inboxCards}
                droppableName="inbox"
                title="收件箱"
                className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-0'}`}
            />
        )}
        {/* 折叠按钮（带悬停动画） */}
        <Button
            onClick={() => setIsExpanded(!isExpanded)}
            variant={'ghost'}
            className="absolute top-1/2 -translate-y-1/2 border rounded-lg p-1 z-10 hover:scale-110 transition-transform py-10"
            style={{
                left: isExpanded ? 'calc(50% - 13px)' : '7px' // 动态位置
            }}
        >
            {/* 箭头图标 */}
            {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        {/* 右侧主内容区 */}
        <AliveKanBoard
            droppableName="today"
            title="今日待办"
            cards={todayCards}
            className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-full'}`}
        />
    </DndContext>
    )

}