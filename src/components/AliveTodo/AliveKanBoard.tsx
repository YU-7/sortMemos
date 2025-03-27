import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { todo } from '@/SQLiteClient/TodoRepository';
import { MemoCard } from './MemoCard';
import { useDroppable } from '@dnd-kit/core';
import { useTodayCards } from '@/contexts/AcitiveTodo';
import { useDndContext } from '@dnd-kit/core';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from '@/components/ui/pagination';

interface InfiniteCardListProps {
    className?: string;
    title: string;
    droppableName: string;
    cards: todo[];
}

// 在组件内部添加拖拽逻辑
const AliveKanBoard: React.FC<InfiniteCardListProps> = ({ className, title, cards, droppableName: id }) => {
    const { active } = useDndContext(); // 新增拖拽状态检测
    const { refreshInboxCards, refreshTodayCards } = useTodayCards();
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
                    {cards?.map((item: any) => <MemoCard key={item.TODO_ID} todo={item} clsssName='text-card-foreground'/>)}
                </div>
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={prePage} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{currentPage}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={nextPage} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default AliveKanBoard;
