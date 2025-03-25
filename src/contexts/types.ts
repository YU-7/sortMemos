import { todo } from '@/SQLiteClient/TodoRepository';

export type ActiveTodoContextType = {
    todayCards: todo[];
    inboxCards: todo[];
    loading: boolean;
    error: Error | null;
    addInboxCard: (content: string) => Promise<void>;
    addTodayCard: (content: string) => Promise<void>;
    refreshTodayCards: () => Promise<void>;
    refreshInboxCards: () => Promise<void>;
    updateTodo: (id: number, newData: Partial<todo>) => Promise<void>;
    moveToToday: (id: number) => Promise<void>;
    moveToInbox: (id: number) => Promise<void>;
    delTodo: (id: number) => Promise<void>;
};

export type ArchiveTodoContextType = {
    archivedCards: todo[];
    loading: boolean;
    error: Error | null;
    refreshArchivedCards: () => Promise<void>;
    moveToActiveTodo: (id: number) => Promise<void>;
};