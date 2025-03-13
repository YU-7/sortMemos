import { platform,arch,family,version,locale,exeExtension } from '@tauri-apps/plugin-os';
import { useState, useEffect } from 'react';

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

    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-gray-100"></div>
        </div>
    );
}

export default Setting;
