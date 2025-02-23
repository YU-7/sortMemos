import Database from '@tauri-apps/plugin-sql';

class DataBaseClient {
    private async init() {
        const db = await Database.load('sqlite:sortMemos.db');
        return db;
    }
    async createTable() {
        const db = await this.init();
        await db.execute(`
            CREATE TABLE IF NOT EXISTS Memos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
}
export default new DataBaseClient();
