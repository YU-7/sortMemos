import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUp, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MDEditor from '@uiw/react-md-editor';
import { getMemosPage } from '@/httpClient/memosService';
import { MemosList } from '@/dataInterface/memos';

interface InfiniteCardListProps {
    className?: string;
    title?: string;
    getUrl?: string;
}
const InfiniteCardList: React.FC<InfiniteCardListProps> = ({ className }) => {
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态
    const [cardItems, setCardItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [showTopButton, setShowTopButton] = useState(false);
    // 控制 Dialog 显示
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // 存储当前选中卡片的数据
    const [selectedCardData, setSelectedCardData] = useState();

    // 加载更多数据（模拟API调用）
    const fetchMoreData = () => {
        setTimeout(() => {
            getMemosPage().then((res) => {
                setCardItems((prev) => [...prev, ...res.memos]);
                if (cardItems.length >= 30) setHasMore(false);
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
            // console.log(cardItems[id].content);
            // setSelectedCardData();
            setIsDialogOpen(!isDialogOpen);
        }
    };
    useEffect(() => {
        const verifyLogin = async () => {
            fetchMoreData();
            setIsLoading(false); // 结束加载
        };
        verifyLogin();
    }, []); // 空依赖数组：仅在组件挂载时执行一次
    // 滚动监听
    useEffect(() => {
        const handleScroll = () => {
            setShowTopButton(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (isLoading) {
        return <Skeleton className={cn('basis-2/5 bg-blue-100 p-4', className)}>wait</Skeleton>;
    }
    return (
        <div className={cn('basis-2/5 bg-blue-100 p-4', className)} onClick={handleCardClick}>
            {/* 无限滚动区域 */}
            <div id="scrollableDiv" className="h-full overflow-y-auto">
                <InfiniteScroll
                    dataLength={cardItems.length}
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
                    <div className="space-y-4 p-4">
                        {cardItems.map((item: any, index) => (
                            <Card key={index} id={index.toString()}>
                                <CardHeader>
                                    <CardTitle>TODO #{index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <MDEditor.Markdown source={item?.content} />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
            {/* 回到顶部按钮 */}
            {showTopButton && (
                <Button
                    size="icon"
                    className="fixed bottom-3 right-3 rounded-full shadow-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>
            )}
            {/* 共用 Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl w-[80%] h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>'详细信息'</DialogTitle>
                    </DialogHeader>
                    <MDEditor value={selectedCardData} preview="edit" height="70vh" />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default InfiniteCardList;
