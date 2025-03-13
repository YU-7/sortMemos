import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';
import { MemoCard } from './MemoCard';import {useDroppable} from '@dnd-kit/core';

interface InfiniteCardListProps {
    className?: string;
    title: string;
    isToday: boolean;
    newTodo?: todo;
    droppableName: string;
    dragTodo?:todo;
}
interface ModifiedCards {
    index: number;
    data: string;
}

// 在组件内部添加拖拽逻辑
const InfiniteCardList: React.FC<InfiniteCardListProps> = ({ className, title, isToday, newTodo,droppableName: id }) => {
    const todolist = new todoRepository();
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [cardItems, setCardItems] = useState<todo[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const {isOver, setNodeRef} = useDroppable({
        id: id,
      });
      const style = {
        color: isOver ? 'green' : undefined,
      };
    // 记录当前修改过的卡片的索引
    const modifiedCardIndexRef = useRef<ModifiedCards[]>([]);
    //  监听 newTodo 的变化
    useEffect(() => {
        if (newTodo) {
            setCardItems((prev) => [newTodo, ...prev]);
        }
    }, [newTodo]); // 仅当 newTodo 变化时触发

    // 在组件卸载时，把修改过的卡片数据保存到数据库
    useEffect(() => {
        // 仅在组件卸载时执行的清理函数
        return () => {
            console.log('component unmounted');
            modifiedCardIndexRef.current.map(({ index, data }) => {
                return todolist.updateTodoList(index, { content: data });
            });

            // 等待所有更新操作完成
        };
    }, []); // 空依赖数组确保只在挂载和卸载时执行

    // 加载更多数据
    const fetchMoreData = () => {
        setTimeout(() => {
            todolist.findTodoList({ isToday: isToday }, 1, 15).then((res) => {
                const newItems = res ? (Array.isArray(res) ? res : [res]) : [];
                setCardItems((prev) => [...prev, ...newItems]);
                if (newItems?.length < 15) {
                    setHasMore(false);
                }
            });
        }, 1500);
    };
    function cardSave(cardId: number, newContent: string) {
        // 更新父组件状态
        setCardItems(items => items.map(i => 
            i.TODO_ID === cardId ? {...i, content: newContent} : i
        ));
        
        // 去重逻辑：查找相同索引的已有记录
        const existingIndex = modifiedCardIndexRef.current.findIndex(item => item.index === cardId);
        if (existingIndex > -1) {
            // 替换已有记录
            modifiedCardIndexRef.current.splice(existingIndex, 1, { index: cardId, data: newContent });
        } else {
            // 添加新记录
            modifiedCardIndexRef.current.push({ index: cardId, data: newContent });
        }
    }
    useEffect(() => {
        const initData = async () => {
            fetchMoreData();
            setIsLoading(false); // 结束加载
        };
        initData();
    }, []); // 空依赖数组：仅在组件挂载时执行一次
    if (isLoading) {
        return <Skeleton className={cn('basis-2/5 p-4', className)}>wait</Skeleton>;
    }
    return (
        <div className={cn('basis-2/5 p-3 m-1 rounded-md border flex flex-col', className)}>
            {/* 新增标题 */}
            <h2 className="text-xl font-bold mb-4 ml-2 text-card-foreground">{title || '待办事项列表'}</h2>
            {/* 无限滚动区域 */}
            <div id="scrollableDiv" className="flex-1 min-h-0 overflow-y-auto">
                <InfiniteScroll
                    dataLength={cardItems?.length || 0}
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
                    <div className="space-y-4 p-2" ref={setNodeRef} style={style} >
                        {cardItems?.map((item: any) => (
                            <MemoCard
                                key={item.TODO_ID}
                                id={item.TODO_ID}
                                content={item.content}
                                onSave={(newContent) => cardSave(item.TODO_ID, newContent)}
                            />
                        ))}
                    </div>
                </InfiniteScroll>
            </div>

        </div>
    );
};

export default InfiniteCardList;

