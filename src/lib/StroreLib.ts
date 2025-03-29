import { LazyStore } from '@tauri-apps/plugin-store';

const store = new LazyStore('store.json');

export async function saveUserInfo(email: string, password: string) {
    await store.set('userInfo', { email: email, password: password });
    await store.save();
}

export async function getUserInfo() {
    return await store.get<{ email: string; password: string }>('userInfo');
}
