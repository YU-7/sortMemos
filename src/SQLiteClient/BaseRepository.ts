import { info } from '@tauri-apps/plugin-log';
import { BaseDatabase } from './BaseDatabase';

type WhereClause = Record<string, any>;
type OrderBy = [string, 'ASC' | 'DESC'];

/**
 * 通用仓储基类
 * 提供标准 CRUD 操作，支持复杂查询
 *
 */
export abstract class BaseRepository<T> extends BaseDatabase {
    protected abstract tableName: string;
    protected migrations: string[] = [];

    /**
     * 动态条件查询
     *
     */
    async find(where?: WhereClause, orderBy?: OrderBy, page?: number, pageSize?: number): Promise<T[]> {
        let sql = `SELECT * FROM ${this.tableName}`;
        const params: any[] = [];

        if (where) {
            const conditions = Object.entries(where)
                .map(([key, value]) => {
                    params.push(value);
                    return `${key} = ?`;
                })
                .join(' AND ');
            sql += ` WHERE ${conditions}`;
        }

        if (orderBy) {
            sql += ` ORDER BY ${orderBy[0]} ${orderBy[1]}`;
        }
        if (page && pageSize) {
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            sql += ` LIMIT ${limit} OFFSET ${offset}`;
        }
    
        const result = (await this.select(sql, params)) as T[];
        info('SQL: ' + sql + ' Params: ' + params);
        console.log(sql);
        return result;
    }
    /**
     * 更新记录（返回影响行数）
     *
     */
    async update(data: Partial<T>, where: WhereClause): Promise<number> {
        const setClause = Object.keys(data)
            .map((key) => `${key} = ?`)
            .join(', ');
        const whereClause = Object.keys(where)
            .map((key) => `${key} = ?`)
            .join(' AND ');

        const sql = `UPDATE ${this.tableName} 
                SET ${setClause} 
                WHERE ${whereClause}`;

        const params = [...Object.values(data), ...Object.values(where)];

        const result = await this.execute(sql, params);
        info('SQL: ' + sql + ' Params: ' + params);
        return result.rowsAffected;
    }

    /**
     * 删除记录（支持软删除）
     *
     */
    async delete(where: WhereClause, softDelete: boolean = true): Promise<number> {
        if (softDelete) {
            return this.update({ isDeleted: true } as any, where);
        }

        const whereClause = Object.keys(where)
            .map((key) => `${key} = ?`)
            .join(' AND ');

        const sql = `DELETE FROM ${this.tableName} WHERE ${whereClause}`;
        const params = Object.values(where);
        info('SQL: ' + sql + ' Params: ' + params);
        const result = await this.execute(sql, params);
        return result.rowsAffected;
    }

    /**
     * 创建新记录（返回插入ID）
     */
    async add(data: Omit<T, 'TODO_ID'>): Promise<number> {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data)
            .map(() => '?')
            .join(', ');

        const sql = `INSERT INTO ${this.tableName} (${columns}) 
                   VALUES (${placeholders})`;
        const params = Object.values(data);

        const result = await this.execute(sql, params);
        info('SQL: ' + sql + ' Params: ' + params);
        return result.lastInsertId || 0;
    }
}
