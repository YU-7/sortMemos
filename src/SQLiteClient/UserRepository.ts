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
    protected tableName = 'Users';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS Users (
    name TEXT PRIMARY KEY,
    role TEXT NOT NULL CHECK(role IN ('ROLE_UNSPECIFIED','HOST', 'ADMIN', 'USER')), 
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    nickname TEXT NOT NULL,
    avatarUrl TEXT,
    description TEXT,
    password TEXT NOT NULL,
    state TEXT NOT NULL CHECK(state IN ('STATE_UNSPECIFIED','NORMAL', 'ARCHIVED')),
    createTime TEXT NOT NULL,
    updateTime TEXT NOT NULL
);`
    ];

    async createTable(): Promise<void> {
        // 已通过 migrations 实现
    }

    // 自定义查询方法
    async findByEmail(email: string): Promise<User | null> {
        const result = await this.find({ email }, ['createTime', 'DESC'], 1);
        return result[0] || null;
    }

    async vertifyUser(email: string): Promise<boolean> {
        const result = await this.find({ email }, ['createTime', 'DESC'], 1);
        // const close = await this.close();
        return result[0] ? true : false;
    }
}
