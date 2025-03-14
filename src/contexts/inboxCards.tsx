import { useEffect } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';

type InboxCardsContextType = {
    inboxCards: todo[];
    loading: boolean;
    error: Error | null;
    addInboxCard: (content: string) => Promise<void>;
    refreshInboxCards: () => Promise<void>;
    moveToToday: (id: number) => Promise<void>;
};

const InboxCardsContext = createContext<InboxCardsContextType>({} as InboxCardsContextType);

export function InboxCardsProvider({ children }: { children: React.ReactNode }) {
    const [inboxCards, setInboxCards] = useState<todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const repo = new todoRepository();
    // 新增初始化加载
    useEffect(() => {
        refreshInboxCards();
    }, []);
    const refreshInboxCards = useCallback(async () => {
        try {
            const data = await repo.findTodoList({ isToday: false }, 1, 15);
            setInboxCards(data || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('刷新失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    const addInboxCard = useCallback(async (content: string) => {
        try {
            const newTodoID = await repo.addTodo({
                content,
                isToday: false,
                createTime: Date.now()
            });
            setInboxCards((prev) => [
                {
                    content,
                    isToday: true,
                    createTime: Date.now(),
                    TODO_ID: newTodoID
                },
                ...prev
            ]);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('添加失败'));
        }
    }, []);

    const moveToToday = useCallback(async (id: number) => {
        try {
            await repo.updateTodoList(id, { isToday: true });
            setInboxCards((prev) => prev.filter((t) => t.TODO_ID !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('移动失败'));
        }
    }, []);

    return (
        <InboxCardsContext.Provider
            value={{
                inboxCards,
                loading,
                error,
                addInboxCard,
                refreshInboxCards,
                moveToToday
            }}
        >
            {children}
        </InboxCardsContext.Provider>
    );
}

export const useInboxCards = () => useContext(InboxCardsContext);
