import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import CollapsibleSidebar from "@/components/CollapsibleSidebar";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* 左侧导航栏 */}
    <CollapsibleSidebar />

      {/* 右侧内容区域 */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="space-y-6">
          {/* 卡片列表 */}
          {[1, 2, 3, 4, 5].map((item) => (
            <Card key={item}>
              <CardHeader>
                <CardTitle>卡片标题 {item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>卡片内容，这里可以放置相关描述信息...</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}