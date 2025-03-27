import LinkBanner from '@/components/Setting/LinkBanner'
import { siShadcnui, siLucide, siTauri } from "simple-icons/icons";

export function Acknowledgement() {
    // 使用有意义的示例数据
    const linkItems = [
        {
            title: 'tauri2',
            description: '跨平台程序开发框架',
            url: 'https://tauri.app/',
            iconPath: siTauri.path
        },
        {
            title: 'shadcn-ui',
            description: 'UI 组件库',
            url: 'https://www.shadcn-ui.cn/',
            iconPath: siShadcnui.path
        },
        {
            title: 'lucide-react',
            description: '图标库',
            url: 'https://lucide.dev/',
            iconPath: siLucide.path
        }
    ]

    return (
        <div className="space-y-4">
            {linkItems.map((item, index) => (
                <LinkBanner 
                    key={`link-${index}`} // 更稳定的唯一标识
                    title={item.title}
                    description={item.description}
                    url={item.url}
                    iconPath={item.iconPath}
                />
            ))}
        </div>
    );
}
