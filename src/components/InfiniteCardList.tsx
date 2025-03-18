import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { todo } from '@/SQLiteClient/TodoRepository';
import { MemoCard } from './MemoCard';
import { useDroppable } from '@dnd-kit/core';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTodayCards } from '@/contexts/cardList';
import { useDndContext } from '@dnd-kit/core';
interface InfiniteCardListProps {
    className?: string;
    title: string;
    droppableName: string;
    cards: todo[];
}

// 在组件内部添加拖拽逻辑
const InfiniteCardList: React.FC<InfiniteCardListProps> = ({ className, title, cards, droppableName: id }) => {
    const { active } = useDndContext(); // 新增拖拽状态检测
    const { refreshInboxCards,refreshTodayCards } = useTodayCards();
    const { isOver, setNodeRef } = useDroppable({
        id: id
    });
    const [currentPage, setCurrentPage] = useState(1);
    const style = {
        color: isOver ? 'green' : undefined
    };
    function prePage() {
        setCurrentPage(currentPage - 1);
        refreshInboxCards();
        refreshTodayCards();
        console.log('上一页');
    }
    function nextPage() {
        setCurrentPage(currentPage + 1);
        refreshInboxCards();
        refreshTodayCards();
        console.log('下一页');
    }
    return (
        <div
          className={cn(
            'basis-2/5 p-3 m-1 rounded-md border flex flex-col',
            className,
            isOver && 'bg-blue-50 border-blue-200' // 新增拖拽状态类
          )}
          ref={setNodeRef}
          style={style}
        >
            {/* 卡片列表标题 */}
            <h2 className="text-xl font-bold mb-4 ml-2 text-card-foreground">{title || '待办事项列表'}</h2>
    
            <div className={`flex-1 min-h-0 ${active ? 'overflow-visible' : 'overflow-y-auto'}`}>
                <div className="space-y-4 p-2">
                    {cards?.map((item: any) => <MemoCard key={item.TODO_ID} todo={item} />)}
                </div>
            </div>

            {/* 更新分页按钮组 */}
            <div className="mt-4 flex justify-center items-center space-x-4">
                <Button
                    className="w-8 h-5 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    disabled={currentPage == 1}
                    onClick={prePage}
                >
                    <ChevronLeft className="w-4 h-4 text-current"></ChevronLeft>
                </Button>
                <span className="px-4 text-gray-700">
                    第 {currentPage} 页
                </span>
                <Button
                    className="w-8 h-5 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    onClick={nextPage}
                    disabled={cards.length <= 10}
                >
                    <ChevronRight className="w-4 h-4 text-current"></ChevronRight>
                </Button>
            </div>
        </div>
    );
};

export default InfiniteCardList;
