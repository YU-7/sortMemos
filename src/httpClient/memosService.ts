import { httpClient } from './httpClient';

async function getMemos() {
    return httpClient.getByToken('/api/v1/memos');
}

export { getMemos };
