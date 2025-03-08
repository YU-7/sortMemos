import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MDEditor from '@uiw/react-md-editor';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';
interface InfiniteCardListProps {
    className?: string;
    title: string;
    isToday: boolean;
    newTodo?: todo;
}
interface ModifiedCards {
    index: number;
    data: string;
}
const InfiniteCardList: React.FC<InfiniteCardListProps> = ({ className, title, isToday, newTodo }) => {
    const todolist = new todoRepository();
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [cardItems, setCardItems] = useState<todo[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
    // 存储当前选中卡片的数据
    const [selectedCardData, setSelectedCardData] = useState<String>();
    // 记录当前修改过的卡片的索引
    const modifiedCardIndexRef = useRef<ModifiedCards[]>([]);
    //  监听 newTodo 的变化
    useEffect(() => {
        if (newTodo) {
            setCardItems((prev) => [newTodo, ...prev]);
        }
    }, [newTodo]); // 仅当 newTodo 变化时触发
    const closeDialog = () => {
        setCardItems((prev) => {
            const curr = prev;
            curr[currentCardIndex - 1].content = selectedCardData?.toString();
            return curr;
        });
        modifiedCardIndexRef.current.push({ index: currentCardIndex, data: selectedCardData?.toString() || '' });
        setIsDialogOpen(false);
    };
    // 在组件卸载时，把修改过的卡片数据保存到数据库
    useEffect(() => {
        // 仅在组件卸载时执行的清理函数
        return () => {
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

    // 处理卡片点击
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 根据className判断点击的是否是卡片
        const targetCard = (e.target as HTMLElement).closest('.rounded-xl.border.bg-card.text-card-foreground.shadow');
        if (!targetCard) return;
        if (targetCard.id) {
            const id = parseInt(targetCard.id);
            setCurrentCardIndex(id);
            setSelectedCardData(cardItems[id - 1].content);
            setIsDialogOpen(!isDialogOpen);
        }
    };
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
        <div className={cn('basis-2/5 p-3 m-1 rounded-md border', className)} onClick={handleCardClick}>
            {/* 新增标题 */}
            <h2 className="text-xl font-bold mb-4 ml-2 text-card-foreground">{title || '待办事项列表'}</h2>

            {/* 无限滚动区域 */}
            <div id="scrollableDiv" className="h-full overflow-y-auto">
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
                    <div className="space-y-4 p-2 ">
                        {cardItems?.map((item: any, index) => (
                            <Card key={index} id={item.TODO_ID}>
                                <CardHeader>
                                    <CardTitle>TODO #{item.TODO_ID}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MDEditor.Markdown source={item?.content} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>

            {/* 共用 Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="max-w-4xl w-[80%] h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>详细信息</DialogTitle>
                    </DialogHeader>
                    <MDEditor
                        value={selectedCardData?.toString()}
                        onChange={setSelectedCardData}
                        preview="edit"
                        height="70vh"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InfiniteCardList;
