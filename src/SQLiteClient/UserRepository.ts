// src/lib/repositories/UserRepository.ts
import { BaseRepository } from './BaseRepository';

export interface User {
    userID?: number;
    username?: string;
    password?: string;
    email?: string;
    createTime?: number;
    updateTime?: number;
    avatarUrl?: string;
    state?: string | null;
}

export class UserRepository extends BaseRepository<User> {
    protected tableName = 'Users';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS Users (
    userID INT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    avatarUrl TEXT,
    password TEXT NOT NULL,
    state TEXT NOT NULL CHECK(state IN ('NORMAL', 'ARCHIVED')),
    createTime INT NOT NULL,
    updateTime INT
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
