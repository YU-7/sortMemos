import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArrowUp, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MDEditor from '@uiw/react-md-editor';
import { getMemos } from '@/httpClient/memosService';
import { MemoData } from '@/dataModel/memos';

export default function InfiniteCardList() {
    const [cardItems, setCardItems] = useState(Array.from({ length: 7 }));
    const [hasMore, setHasMore] = useState(true);
    const [showTopButton, setShowTopButton] = useState(true);
    // 控制 Dialog 显示
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // 存储当前选中卡片的数据
    const [selectedCardData, setSelectedCardData] = useState<MemoData | null>(null);

    // 加载更多数据（模拟API调用）
    const fetchMoreData = () => {
        setTimeout(() => {
            getMemos().then((res) => {
                console.log(res.memos);
                setCardItems((prev) => [...prev, ...res.memos]);
                console.log('当前数据:', cardItems);
                if (cardItems.length >= 30) setHasMore(false);
            });
        }, 1500);
    };

    // 处理卡片点击
    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 根据className判断点击的是否是卡片
        const targetCard = (e.target as HTMLElement).closest('.p-6.pt-0');
        if (!targetCard) return;
        const cardId = targetCard.getElementsByClassName('.p-6.pt-0');
        const selectedCard = cardItems.find((card) => card === cardId);
        console.log('选中卡片数据:', cardId);
        setIsDialogOpen(!isDialogOpen);
    };

    // 滚动监听
    useEffect(() => {
        const handleScroll = () => {
            setShowTopButton(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex-1 p-8 overflow-y-auto" onClick={handleCardClick}>
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
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle>TODO #{index + 1}</CardTitle>
                                </CardHeader>
                                <CardContent>{item?.content}</CardContent>
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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedCardData?.content || '详细信息'}</DialogTitle>
                    </DialogHeader>
                    <MDEditor.Markdown
                        source={selectedCardData?.content || '**haha** b**haha** b**haha** b\n1\n1\n1\n'}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
