import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { platform, arch, family, version, locale, exeExtension } from '@tauri-apps/plugin-os';
import { useState, useEffect } from 'react';
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';
import { open } from '@tauri-apps/plugin-dialog';
import { Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {setupTray}  from '@/views/SystemTray';
import { SettingItem } from '@/components/Setting/SettingItem';

function Setting() {
    // 移除手动选中的状态管理，改用Tabs组件管理
    const [autoStartEnabled, setAutoStartEnabled] = useState(false);

    // 获取所有系统信息的状态
    const [systemInfo, setSystemInfo] = useState<{
        platform: string;
        arch: string;
        family: string;
        version: string;
        exeExtension: string;
        locale: string;
    } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 并行获取所有系统信息
                const localeRes = await locale();

                setSystemInfo({
                    platform: platform(),
                    arch: arch(),
                    family: family(),
                    version: version(),
                    exeExtension: exeExtension(),
                    locale: localeRes?.toString() || ''
                });
            } catch (error) {
                console.error('获取系统信息失败:', error);
            }
        };

        fetchData();
    }, []);
    // 初始化自启动状态
    useEffect(() => {
        isEnabled().then(setAutoStartEnabled);
    }, []);

    useEffect(() => {
        setupTray();
    },[])
    async function openFile() {
        const file = await open({
            multiple: false,
            directory: false
        });
        console.log(file);
    }
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
        { value: 'autostart', label: '系统设置' },
        { value: 'files', label: '文件设置' },
        { value: 'appearance', label: '外观设置' },
        { value: 'advanced', label: '高级设置' },
        { value: 'about', label: '关于' }
    ];

    return (
        <Tabs defaultValue="autostart" orientation="vertical" className="w-full flex bg-green-200 p-0 m-0 ">
            {/* 左侧导航 */}
            <TabsList className="w-36 h-auto p-2 bg-white border-r rounded-none shadow-md ">
                <div className="flex flex-col space-y-3 h-full justify-start">
                    {/* space-y-1 改为 space-y-3 */}
                    {navigationItems.map((item) => (
                        <TabsTrigger
                            key={item.value}
                            value={item.value}
                            className="w-full justify-start data-[state=active]:bg-gray-100 hover:shadow-sm"
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
                    <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                        <Button variant="outline" className="px-4 py-2">
                            <Copy className="w-4 h-4 mr-2" />
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            {"systemInfo"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                        
                    </SettingItem>
                </div>
            </TabsContent>
            <TabsContent value="files" className="flex-1 p-8 mt-0">
                <div className="space-y-6 max-w-2xl">
                    <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm">
                        <div className="space-y-1">
                            <label className="text-sm font-medium">默认存储路径</label>
                            <p className="text-xs text-gray-500">设置文件存储的默认位置</p>
                        </div>
                        <Button variant="outline" onClick={openFile} className="px-4 py-2">
                            选择路径
                        </Button>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="about" className="flex-1 p-8 mt-0">
                kaiyuan
            </TabsContent>
        </Tabs>
    );
}

export default Setting;
