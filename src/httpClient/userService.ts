import { fetch } from '@tauri-apps/plugin-http';

class HttpClient {
    private baseURL = 'http://localhost:5230';

    async get(url: string) {
        const response = await fetch(this.baseURL + url, {
            method: 'GET',
            headers: {
                Authorization:
                    'Bearer  ' +
                        'eyJhbGciOiJIUzI1NiIsImtpZCI6InYxIiwidHlwIjoiSldUIn0.eyJuYW1lIjoiIiwiaXNzIjoibWVtb3MiLCJzdWIiOiIxIiwiYXVkIjpbInVzZXIuYWNjZXNzLXRva2VuIl0sImV4cCI6MTc0MDYyNDQ0MSwiaWF0IjoxNzQwMDE5NjQxfQ.IA_VMdMU67i1xRVYUJcrkOOsyQGnF1T39CQuf2Y0G8c' ||
                    ''
            }
        });
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
}

export const httpClient = new HttpClient();
