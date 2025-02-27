import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ArrowUp, Loader2 } from 'lucide-react'

export default function InfiniteCardList() {
  const [items, setItems] = useState(Array.from({ length: 7 })) // 初始加载10项占满高度
  const [hasMore, setHasMore] = useState(true)
  const [showTopButton, setShowTopButton] = useState(false)

  // 加载更多数据（模拟API调用）
  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(prev => [...prev, ...Array.from({ length: 10 })])
      if (items.length >= 50) setHasMore(false)
    }, 1500)
  }

  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex-1 p-8 overflow-y-auto">
      {/* 无限滚动区域 */}
      <div 
        id="scrollableDiv"
        className="h-full overflow-y-auto"
      >
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center text-muted-foreground py-4">
              没有更多内容了
            </p>
          }
        >
          <div className="space-y-4 p-4">
            {items.map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>卡片 #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  无限滚动内容示例 - 当前总数: {items.length}
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
          className="fixed bottom-8 right-8 rounded-full shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}