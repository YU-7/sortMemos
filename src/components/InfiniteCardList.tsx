import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loader2 } from 'lucide-react';
import { todo} from '@/SQLiteClient/TodoRepository';
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
    const [hasMore, setHasMore] = useState(true);
    const { isOver, setNodeRef } = useDroppable({
        id: id
    });
    const style = {
        color: isOver ? 'green' : undefined
    };

    // 在组件卸载时，把修改过的卡片数据保存到数据库
    useEffect(() => {
        if (cards.length < 15) {
            setHasMore(false);
        }
    }, []); // 空依赖数组确保只在挂载和卸载时执行

    // 加载更多数据
    const fetchMoreData = () => {};


    return (
        <div className={cn('basis-2/5 p-3 m-1 rounded-md border flex flex-col', className)}>
            {/* 新增标题 */}
            <h2 className="text-xl font-bold mb-4 ml-2 text-card-foreground">{title || '待办事项列表'}</h2>
            {/* 无限滚动区域 */}
            <div id="scrollableDiv" className="flex-1 min-h-0 overflow-y-auto">
                <InfiniteScroll
                    dataLength={cards?.length || 0}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={
                        <div className="flex justify-center p-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    }
                    scrollableTarget="scrollableDiv"
                    endMessage={<p className="text-center text-muted-foreground py-4">没有更多内容了</p>}
                >
                    <div className="space-y-4 p-2" ref={setNodeRef} style={style}>
                        {cards?.map((item: any) => (
                            <MemoCard key={item.TODO_ID} todo={item} />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default InfiniteCardList;
