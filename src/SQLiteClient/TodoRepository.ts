import { BaseRepository } from './BaseRepository';

export interface todo {
    TODO_ID?: number;
    project?: string;
    keyWords?: string;
    content?: string;
    createTime?: number;
    dueTime?: number | null;
    complteTime?: number | null;
    priority?: number;
    isToday?: boolean;
    isCompleted?: boolean;
    isDeleted?: boolean;
}

export class todoRepository extends BaseRepository<todo> {
    protected tableName = 'TodoList';
    protected migrations = [
        `CREATE TABLE IF NOT EXISTS TodoList (
            TODO_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            usersEmail TEXT,
            project TEXT,
            keyWords TEXT,  -- 使用TEXT存储JSON数组
            content TEXT,
            createTime INT NOT NULL,
            complteTime INT,
            priority INT,
            isToday TEXT CHECK(isToday IN ('true', 'false')),
            isCompleted TEXT CHECK(isCompleted IN ('true', 'false')),
            isDeleted TEXT CHECK(isDeleted IN ('true', 'false'))
        );`
    ];

    async createTable(): Promise<void> {
        // 已通过 migrations 实现
    }

    // 自定义查询方法
    async findTodoList(todo: todo, page: number, pageSize: number): Promise<todo[]> {
        return await this.find(todo, ['createTime', 'DESC'], page, pageSize);
    }

    async updateTodoList(TODO_ID: number, todo: todo): Promise<number> {
        return await this.update(todo, { TODO_ID });
    }
    async addTodo(todo: todo): Promise<number> {
        return await this.add(todo);
    }

    async deleteTodo(TODO_ID: number): Promise<number> {
        return await this.delete({ TODO_ID });
    }
}
