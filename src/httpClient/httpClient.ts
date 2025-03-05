import { fetch } from '@tauri-apps/plugin-http';
class HttpClient {
    private baseURL = 'http://yupanel.site:5230';

    async getByToken(url: string) {
        const response = await fetch(this.baseURL + url, {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer  ' +
                        'eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoieXpyIiwiaXNzIjoibWVtb3MiLCJzdWIiOiIxIiwiYXVkIjpbInVzZXIuYWNjZXNzLXRva2VuIl0sImlhdCI6MTc0MDk2ODY0OH0.RbYLScIW1q2CaCs_9LOuU3fDzSR9fYanT_FR7PtHDTo' ||
                    ''
            }
        });
        const dataJson = await response.json();
        return dataJson;
    }

    async patchByToken(url: string) {
        const response = await fetch(this.baseURL + url, {
            method: 'patch',
            headers: {
                Authorization:
                    'Bearer  ' +
                        'eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoieXpyIiwiaXNzIjoibWVtb3MiLCJzdWIiOiIxIiwiYXVkIjpbInVzZXIuYWNjZXNzLXRva2VuIl0sImlhdCI6MTc0MDk2ODY0OH0.RbYLScIW1q2CaCs_9LOuU3fDzSR9fYanT_FR7PtHDTo' ||
                    ''
            }
        });
        return await response.json();
    }
}

export const httpClient = new HttpClient();
