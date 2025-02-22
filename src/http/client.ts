import { fetch, FetchOptions, Response } from "@tauri-apps/api/http";

class HttpClient {
  private baseURL = 'http:'//locahost:5230;

  async get<T>(url: string) {
    return fetch<T>(this.baseURL + url, { method: 'GET' });
  }

  async post<T>(url: string, data: any) {
    return fetch<T>(this.baseURL + url, {
      method: 'POST',
      body: { type: 'Json', data }
    });
  }
}

export const httpClient = new HttpClient();