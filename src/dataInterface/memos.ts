export interface MemoListREquest {
    /**
     * The direction to sort the results by.
     * Default to DESC.
     */
    direction?: Direction;
    /**
     * Filter is a CEL expression to filter memos.
     * Refer to `Shortcut.filter`.
     */
    filter?: string;
    /**
     * [Deprecated] Old filter contains some specific conditions to filter memos.
     * Format: "creator == 'users/{user}' && visibilities == ['PUBLIC', 'PROTECTED']"
     */
    oldFilter?: string;
    /**
     * The maximum number of memos to return.
     */
    pageSize?: number;
    /**
     * A page token, received from a previous `ListMemos` call.
     * Provide this to retrieve the subsequent page.
     */
    pageToken?: string;
    /**
     * The parent is the owner of the memos.
     * If not specified or `users/-`, it will list all memos.
     */
    parent?: string;
    /**
     * What field to sort the results by.
     * Default to display_time.
     */
    sort?: string;
    /**
     * The state of the memos to list.
     * Default to `NORMAL`. Set to `ARCHIVED` to list archived memos.
     */
    state?: State;
    [property: string]: any;
}

/**
 * The direction to sort the results by.
 * Default to DESC.
 */
export enum Direction {
    Asc = 'ASC',
    Desc = 'DESC',
    DirectionUnspecified = 'DIRECTION_UNSPECIFIED'
}

/**
 * The state of the memos to list.
 * Default to `NORMAL`. Set to `ARCHIVED` to list archived memos.
 */
export enum State {
    Archived = 'ARCHIVED',
    Normal = 'NORMAL',
    StateUnspecified = 'STATE_UNSPECIFIED'
}
