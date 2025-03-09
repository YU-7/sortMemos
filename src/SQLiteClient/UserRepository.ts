// src/lib/repositories/UserRepository.ts
import { BaseRepository } from './BaseRepository';

export interface User {
    userID?: number;
    username?: string;
    password?: string;
    email?: string;
    createdTime?: string;
    updatedTime?: string;
    avatarUrl?: string;
    state?: string | null;
}

export class UserRepository extends BaseRepository<User> {
    protected tableName = 'Users';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS Users (
    userID INT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT,
    avatarUrl TEXT,
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
    async addUser(newUser: User): Promise<boolean> {
        const result = await this.add(newUser);
        return result ? true : false;
    }

    async vertifyUser(email: string, password: string): Promise<boolean> {
        const result = await this.find({ email, password }, ['createTime', 'DESC'], 1);
        return result[0] ? true : false;
    }
}
