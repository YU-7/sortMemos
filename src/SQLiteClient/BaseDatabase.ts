// src/lib/database/BaseDatabase.ts
import Database, { QueryResult } from '@tauri-apps/plugin-sql';

/**
 * SQLite 基础操作类
 * 封装连接管理、事务控制、CRUD 模板方法
 *
 */
export abstract class BaseDatabase {
    protected dbName: string;
    protected dbInstance: Database | null = null;
    protected abstract migrations: string[];

    constructor(dbName: string = 'sortMemos.db') {
        this.dbName = `sqlite:${dbName}`;
    }

    /**
     * 初始化数据库连接并执行迁移
     *
     */
    async connect(): Promise<void> {
        try {
            this.dbInstance = await Database.load(this.dbName);
            await this.runMigrations();
        } catch (error) {
            throw new Error(`数据库连接失败: ${error}`);
        }
    }

    /**
     * 执行数据库迁移
     *
     */
    private async runMigrations(): Promise<void> {
        if (!this.migrations.length) return;

        await this.dbInstance?.execute('BEGIN TRANSACTION');
        try {
            for (const sql of this.migrations) {
                await this.dbInstance?.execute(sql);
            }
            await this.dbInstance?.execute('COMMIT');
        } catch (error) {
            await this.dbInstance?.execute('ROLLBACK');
            throw error;
        }
    }

    /**
     * 通用 SQL 执行方法（带参数绑定）
     *
     */
    protected async execute(sql: string, params: any[] = []): Promise<QueryResult> {
        if (!this.dbInstance) {
            await this.connect();
        }
        return this.dbInstance!.execute(sql, params);
    }

    protected async select<T>(sql: string, params: any[] = []): Promise<T> {
        if (!this.dbInstance) {
            await this.connect();
        }
        return this.dbInstance!.select(sql, params);
    }

    /**
     * 事务处理封装
     *
     */
    async transaction<T>(callback: () => Promise<T>): Promise<T> {
        await this.execute('BEGIN TRANSACTION');
        try {
            const result = await callback();
            await this.execute('COMMIT');
            return result;
        } catch (error) {
            await this.execute('ROLLBACK');
            throw error;
        }
    }

    async close(): Promise<boolean> {
        if (this.dbInstance) {
            const success = await this.dbInstance.close();
            return success;
        }
        return true;
    }

    // 标准 CRUD 模板方法
    abstract createTable(): Promise<void>;
}
