import { cn } from '@/lib/utils';
import { todo } from '@/SQLiteClient/TodoRepository';
import { MemoCard } from './MemoCard';
import { useDroppable } from '@dnd-kit/core';

interface InfiniteCardListProps {
    className?: string;
    title: string;
    droppableName: string;
    cards: todo[];
}

// 在组件内部添加拖拽逻辑
const InfiniteCardList: React.FC<InfiniteCardListProps> = ({ className, title, cards, droppableName: id }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id
    });
    const style = {
        color: isOver ? 'green' : undefined
    };

    return (
        <div
            className={cn('basis-2/5 p-3 m-1 rounded-md border flex flex-col', className)}
            ref={setNodeRef}
            style={style}
        >
            {/* 新增标题 */}
            <h2 className="text-xl font-bold mb-4 ml-2 text-card-foreground">{title || '待办事项列表'}</h2>
            {/* 无限滚动区域 */}
            <div id="scrollableDiv" className="flex-1 min-h-0 overflow-y-auto">
                <div className="space-y-4 p-2">
                    {cards?.map((item: any) => <MemoCard key={item.TODO_ID} todo={item} />)}
                </div>
            </div>
        </div>
    );
};

export default InfiniteCardList;
