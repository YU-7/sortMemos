import { httpClient } from './httpClient';

async function getMemosPage(pageToken?: string) {
    if (pageToken) {
        return httpClient.getByToken('/api/v1/memos');
    }
    return httpClient.getByToken('/api/v1/memos');
}

async function filterMemos(pageToken?: string) {
    if (pageToken) {
        return httpClient.getByToken('/api/v1/memos');
    }
    return httpClient.getByToken('/api/v1/memos');
}

async function updateMemo(memosName: string) {
    return httpClient.getByToken(`/api/v1/${memosName}`);
}

async function deleteMemo(pageToken?: string) {
    if (pageToken) {
        return httpClient.getByToken('/api/v1/memos');
    }
    return httpClient.getByToken('/api/v1/memos');
}

async function addMemo(pageToken?: string) {
    if (pageToken) {
        return httpClient.getByToken('/api/v1/memos');
    }
    return httpClient.getByToken('/api/v1/memos');
}
export { getMemosPage, filterMemos, updateMemo, deleteMemo, addMemo };
