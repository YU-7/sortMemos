import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import InfiniteCardList from "@/components/InfiniteCardList";
export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧导航栏 */}
    <CollapsibleSidebar />

      {/* 右侧内容区域 */}
    
      <InfiniteCardList />
    </div>
  )
}