import { openUrl } from '@tauri-apps/plugin-opener';

interface LinkBannerProps {
    title: string, 
    iconPath: string, 
    url: string,
    description: string
}

export default function LinkBanner({title, description, url, iconPath}: LinkBannerProps) {
    const handleOpenLink = async (url: string) => {
        try {
            await openUrl(url);
        } catch (error) {
            console.error('打开链接失败:', error);
        }
    };

    return (
        <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm w-full">
            <CustomIcon iconPath={iconPath}/>
        <div className="flex-1 min-w-0">
          <div className="space-y-1">
            <label className="text-sm font-medium">{title}</label>
            <p className="text-sm font-medium">{description}</p>
            <span className="text-blue-600 hover:underline cursor-pointer text-sm"
                        onClick={() => handleOpenLink(url)}>
                        {url}
                    </span>
          </div>
        </div>
        
      </div>
    );
}

// 新增图标组件
function CustomIcon({ iconPath, color = 'currentColor', className }: { 
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