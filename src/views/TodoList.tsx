import { useState, useRef } from 'react';
import InfiniteCardList from '../components/InfiniteCardList';
import { Button } from '@/components/ui/button';
import { todo } from '@/SQLiteClient/TodoRepository';
import KanBoardTool from '@/components/KanBoardTool';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DndContext } from '@dnd-kit/core';

import { useTodayCards } from '@/contexts/todayCards';
import { useInboxCards } from '@/contexts/inboxCards';
function TodoList() {
    // 在组件顶部添加状态管理
    const { todayCards, addTodayCard, updateTodayCard } = useTodayCards();
    const { inboxCards, moveToToday } = useInboxCards();
    const [isExpanded, setIsExpanded] = useState(false);
    const newTodoRef = useRef<todo>();
    // 为参数添加类型注解
    function handleDragEnd(event: any) {
        console.log(event);
        const { active, over, collisions } = event;
        const co = ['inbox', 'today'];
        if (over.id === 'today' && collisions.length > 1) {
            moveToToday(active.id);
        }
    }
    return (
        <div className="flex-1 p-3 overflow-y-auto">
            {/* 修改搜索框区域 */}
            <KanBoardTool></KanBoardTool>
            <div className="h-[90%] flex flex-row relative">
                <DndContext onDragEnd={handleDragEnd}>
                    {/* 左侧可折叠区域 */}
                    {isExpanded && (
                        <InfiniteCardList
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
                    <InfiniteCardList
                        droppableName="today"
                        title="今日待办"
                        cards={todayCards}
                        className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-full'}`}
                    />
                </DndContext>
            </div>
        </div>
    );
}

export default TodoList;
