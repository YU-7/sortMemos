import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app';
import { getCurrentWebviewWindow } from '@tauri-apps/api/webviewWindow';
import { exit, relaunch } from '@tauri-apps/plugin-process';
import {getSysInfo} from './SettingLib';

// 在应用初始化后添加
export async function setupTray() {
    const sysInfo = await getSysInfo();
    if (sysInfo.platform === 'android') {
        return;
    }
    const a = getCurrentWebviewWindow();
    a.onCloseRequested((e) => {
        e.preventDefault();
        try {
            a.hide();
        } catch (e) {
            console.log(e);
        }
    });

    const menu = await Menu.new({
        items: [
            {
                id: 'mainPage',
                text: 'mainPage',
                action: () => {
                    a.unminimize();
                    a.show();
                }
            },
            {
                id: 'quit',
                text: 'Quit',
                action: () => {
                    exit();
                }
            },
            {
                id: 'relaunch',
                text: '重启',
                action: () => {
                    relaunch();
                }
            }
        ]
    });
    // 定义托盘图标选项
    const options = {
        id: 'main',
        title: 'sortMemos',
        tooltip: 'sortMemos',
        menu,
        menuOnLeftClick: false,
        icon: (await defaultWindowIcon()) || '',
        action: (event: any) => {
            if (event.type === 'Click' && event.button === 'Left') {
                a.unminimize();
                a.show();
                a.setFocus();
            }
        }
    };
    var tray = await TrayIcon.getById('main');

    if (tray === null) {
        tray = await TrayIcon.new(options);
    }
}
