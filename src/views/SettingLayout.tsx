import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
import { Copy } from 'lucide-react';
import { SettingItem, Acknowledgement, copySysInfo, saveAppData } from '@/components/Setting';

function Setting() {
    // 移除手动选中的状态管理，改用Tabs组件管理
    const [autoStartEnabled, setAutoStartEnabled] = useState(false);
    // 初始化自启动状态
    useEffect(() => {
        isEnabled().then(setAutoStartEnabled);
    }, []);

    // 修改切换逻辑
    async function toggleAutoStart(checked: boolean) {
        if (checked) {
            await enable();
        } else {
            await disable();
        }
        setAutoStartEnabled(checked);
    }

    // 在组件内添加导航项配置数组
    const navigationItems = [
        { value: 'autostart', label: '软件基础设置' },
        { value: 'files', label: '数据存储' },
        { value: 'appearance', label: '外观设置' },
        { value: 'advanced', label: '高级设置' },
        { value: 'about', label: '关于' }
    ];

    return (
        <Tabs defaultValue="autostart" orientation="vertical" className="w-full flex p-0 m-0 ">
            {/* 左侧导航 */}
            <TabsList className="w-36 h-auto p-2 bg-white border-r rounded-none shadow-md ">
                <div className="flex flex-col space-y-2 h-full justify-start">
                    {/* space-y-1 改为 space-y-3 */}
                    {navigationItems.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className="w-full justify-start gap-3 text-base px-4 py-4 text-accent-foreground data-[state=active]:bg-gray-100 hover:shadow-sm"
                        >
                            {item.label}
                        </TabsTrigger>
                    ))}
                </div>
            </TabsList>
            {/* 右侧内容区域 */}
            <TabsContent value="autostart" className="flex-1 p-4 mt-0 w-full ">
                <div className="space-y-6">
                    <SettingItem title="开机自启动" description="应用将在系统启动时自动运行">
                        <Switch id="auto-start-switch" checked={autoStartEnabled} onCheckedChange={toggleAutoStart} />
                    </SettingItem>

                    <SettingItem title="自动更新" description="启用后自动下载最新版本">
                        <Switch />
                    </SettingItem>

                    <SettingItem title="软件信息" description="软件版本号、系统版本号等信息">
                        <Button variant="outline" className="px-4 py-2" onClick={copySysInfo}>
                            <Copy className="w-4 h-4 mr-2" />
                        </Button>
                    </SettingItem>
                </div>
            </TabsContent>
            <TabsContent value="files" className="flex-1 p-8 mt-0">
                <div className="space-y-6 max-w-2xl">
                    <SettingItem title="开机自启动" description="应用将在系统启动时自动运行">
                        <Button id="auto-start-switch" onClick={saveAppData}>
                            <Copy className="w-4 h-4 mr-2" />
                        </Button>
                    </SettingItem>
                </div>
            </TabsContent>

            <TabsContent value="about" className="flex-1 p-8 mt-0">
                <Acknowledgement />
            </TabsContent>
        </Tabs>
    );
}

export default Setting;
