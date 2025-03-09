import { BaseRepository } from './BaseRepository';

export interface todo {
    TODO_ID?: number;
    project?: string;
    keyWords?: string;
    content?: string;
    updateTime?: string | null;
    complteTime?: string | null;
    isToday?: boolean;
}

export class todoRepository extends BaseRepository<todo> {
    protected tableName = 'TodoList';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS TodoList (
            TODO_ID INT PRIMARY KEY,
            usersName TEXT,
            project TEXT,
            keyWords TEXT,  -- 使用TEXT存储JSON数组
            content TEXT,
            createTime INT NOT NULL,
            updateTime INT,
            complteTime INT,
            isToday TEXT CHECK(isToday IN ('true', 'false'))
        );`
    ];

    async createTable(): Promise<void> {
        // 已通过 migrations 实现
    }

    // 自定义查询方法
    async findTodoList(todo: todo, page: number, pageSize: number): Promise<todo[] | null> {
        const result = await this.find(todo, ['createTime', 'DESC'], page, pageSize);
        return result || null;
    }

    async updateTodoList(TODO_ID: number, todo: todo): Promise<number | null> {
        const result = await this.update(todo, { TODO_ID });
        return result || null;
    }
    async addTodo(todo: todo): Promise<number | null> {
        const result = await this.add(todo);
        return result || null;
    }
}
