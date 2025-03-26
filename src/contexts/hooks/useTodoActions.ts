import { useState, useCallback } from 'react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';

export const useTodoActions = () => {
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
            const data = await repo.findTodoList({ isToday: true }, 1, 3);
            setTodayCards(data || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('刷新失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshInboxCards = useCallback(async () => {
        try {
            const data = await repo.findTodoList({ isToday: false }, 1, 3);
            setInboxCards(data || []);
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

    const updateTodo = useCallback(async (id: number, newData: Partial<todo>) => {
        try {
            newData.isToday
                ? setTodayCards((prev) => prev.map((t) => (t.TODO_ID === id ? { ...t, ...newData } : t)))
                : setInboxCards((prev) => prev.map((t) => (t.TODO_ID === id ? { ...t, ...newData } : t)));
            await repo.updateTodoList(id, newData);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('更新失败'));
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

    const delTodo = useCallback(async (id: number) => {
        try {
            await repo.deleteTodo(id);
            setInboxCards((prev) => prev.filter((t) => t.TODO_ID !== id));
        } catch (err) {
            setError(err instanceof Error ? err : new Error('删除失败'));
        }
    }, []);
    
    return {
        loading,
        error,
        refreshTodayCards,
        refreshInboxCards,
        todayCards,
        inboxCards,
        addTodayCard,
        updateTodo,
        addInboxCard,
        moveToToday,
        moveToInbox,
        delTodo
    };
};