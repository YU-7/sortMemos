import { Switch } from '@/components/ui/switch';
import { platform, arch, family, version, locale, exeExtension } from '@tauri-apps/plugin-os';
import { useState, useEffect } from 'react';
import { enable, isEnabled, disable } from '@tauri-apps/plugin-autostart';

function Setting() {
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

    // 在控制台输出需要等待数据加载完成
    useEffect(() => {
        if (systemInfo) {
            console.log('系统信息:', systemInfo);
        }
    }, [systemInfo]);

    // 添加自启动状态
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

    return (
        <div>
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <Switch 
                        checked={autoStartEnabled}
                        onCheckedChange={toggleAutoStart}
                        id="auto-start-switch" 
                    />
                    <label htmlFor="auto-start-switch">开机自启动</label>
                </div>
            </div>
            <div className="flex items-center justify-center h-screen bg-gray-100"></div>
        </div>
    );
}

export default Setting;
