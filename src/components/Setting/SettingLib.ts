import { platform, arch, family, version, locale, exeExtension } from '@tauri-apps/plugin-os';
import { open,save } from '@tauri-apps/plugin-dialog';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';

export async function getSysInfo() {
    const localeRes = await locale();
    return {
        platform: platform(),
        arch: arch(),
        family: family(),
        version: version(),
        locale: localeRes?.toString(),
        exeExtension: exeExtension()
    };
}

export async function openFile() {
    const file = await open({
        multiple: false,
        directory: false
    });
    console.log(file);
}
export async function copySysInfo() {
    const sysInfo = await getSysInfo();
    await writeText(JSON.stringify(sysInfo));
}

export async function saveAppData() {
    const file = await save({
        filters: [
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    console.log(file);
}
