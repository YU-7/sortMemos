import { useEffect } from 'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';

type TodayCardsContextType = {
    todayCards: todo[];
    inboxCards: todo[];
    loading: boolean;
    error: Error | null;
    addInboxCard: (content: string) => Promise<void>;
    addTodayCard: (content: string) => Promise<void>;
    refreshTodayCards: () => Promise<void>;
    refreshInboxCards: () => Promise<void>;
    updateInboxCard: (id: number, newData: Partial<todo>) => Promise<void>;
    updateTodayCard: (id: number, newData: Partial<todo>) => Promise<void>;
    moveToToday: (id: number) => Promise<void>;
    moveToInbox: (id: number) => Promise<void>;
};

const TodayCardsContext = createContext<TodayCardsContextType>({} as TodayCardsContextType);

export function TodayCardsProvider({ children }: { children: React.ReactNode }) {
    const [todayCards, setTodayCards] = useState<todo[]>([]);
    const [inboxCards, setInboxCards] = useState<todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const repo = new todoRepository();

    // 新增初始化加载
    useEffect(() => {
        refreshTodayCards();
        refreshInboxCards();
    }, []);

    const refreshTodayCards = useCallback(async () => {
        try {
            setLoading(true);
            const data = await repo.findTodoList({ isToday: true }, 1, 15);
            setTodayCards(data || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('刷新失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    const addTodayCard = useCallback(async (content: string) => {
        try {
            const newTodoID = await repo.addTodo({
                content,
                isToday: true,
                createTime: Date.now()
            });
            setTodayCards((prev) => [
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
    const updateInboxCard = useCallback(async (id: number, newData: Partial<todo>) => {
        try {
            await repo.updateTodoList(id, newData);
            setInboxCards((prev) => prev.map((t) => (t.TODO_ID === id ? { ...t, ...newData } : t)));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('更新失败'));
        }
    }, []);
    const updateTodayCard = useCallback(async (id: number, newData: Partial<todo>) => {
        try {
            await repo.updateTodoList(id, newData);
            setTodayCards((prev) => prev.map((t) => (t.TODO_ID === id ? { ...t, ...newData } : t)));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('更新失败'));
        }
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

            // 获取完整待办项并更新状态
            setInboxCards((prevInbox) => {
                const movedItem = prevInbox.find((t) => t.TODO_ID === id);
                if (movedItem) {
                    setTodayCards((prevToday) => [
                        { ...movedItem, isToday: true }, // 保留原始内容
                        ...prevToday
                    ]);
                }
                return prevInbox.filter((t) => t.TODO_ID !== id);
            });
        } catch (err) {
            setError(err instanceof Error ? err : new Error('移动失败'));
        }
    }, []);

    const moveToInbox = useCallback(async (id: number) => {
        try {
            await repo.updateTodoList(id, { isToday: false });

            // 获取完整待办项并更新状态
            setTodayCards((prevInbox) => {
                const movedItem = prevInbox.find((t) => t.TODO_ID === id);
                if (movedItem) {
                    setInboxCards((prevToday) => [
                        { ...movedItem, isToday: true }, // 保留原始内容
                        ...prevToday
                    ]);
                }
                return prevInbox.filter((t) => t.TODO_ID !== id);
            });
        } catch (err) {
            setError(err instanceof Error ? err : new Error('移动失败'));
        }
    }, []);

    return (
        <TodayCardsContext.Provider
            value={{
                todayCards,
                inboxCards,
                loading,
                error,
                addTodayCard,
                refreshTodayCards,
                updateTodayCard,
                addInboxCard,
                refreshInboxCards,
                moveToToday,
                moveToInbox,
                updateInboxCard
            }}
        >
            {children}
        </TodayCardsContext.Provider>
    );
}

export const useTodayCards = () => useContext(TodayCardsContext);
