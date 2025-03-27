import { openUrl } from '@tauri-apps/plugin-opener';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface LinkBannerProps {
    title: string;
    iconPath: string;
    url: string;
    description: string;
}

export default function LinkBanner({ title, description, url, iconPath }: LinkBannerProps) {
    const handleOpenLink = async (url: string) => {
        try {
            await openUrl(url);
        } catch (error) {
            console.error('打开链接失败:', error);
        }
    };

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-lg flex justify-start gap-x-4">
                    <CustomIcon iconPath={iconPath} color="currentColor" className="w-6 h-6" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-md text-card-foreground">
                <div>
                    <div className="flex-1">{description}</div>
                    <div 
                        className="flex-1 hover:text-blue-500 hover:underline cursor-pointer" 
                        onClick={() => handleOpenLink(url)}
                    >
                        {url}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// 新增图标组件
function CustomIcon({
    iconPath,
    color = 'currentColor',
    className
}: {
    iconPath: string;
    color?: string;
    className?: string;
}) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${className}`}
            fill={color}
        >
            <path d={iconPath} />
        </svg>
    );
}
