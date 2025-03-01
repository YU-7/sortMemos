// src/lib/repositories/UserRepository.ts
import { BaseRepository } from './BaseRepository';

export interface User {
    id?: number;
    username: string;
    email: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string | null;
}

export class UserRepository extends BaseRepository<User> {
    protected tableName = 'users';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP NULL
    )`,
        'CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)'
    ];

    async createTable(): Promise<void> {
        // 已通过 migrations 实现
    }

    // 自定义查询方法
    async findByEmail(email: string): Promise<User | null> {
        const result = await this.find({ email }, ['created_at', 'DESC'], 1);
        return result[0] || null;
    }

    async vertifyUser(email: string): Promise<boolean> {
        const result = await this.find({ email }, ['created_at', 'DESC'], 1);
        // const close = await this.close();
        return result[0] ? true : false;
    }
}
