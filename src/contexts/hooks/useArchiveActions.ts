import { useState, useCallback } from 'react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';

export const useArchiveActions = () => {
    const [archivedCards, setArchivedCards] = useState<todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const repo = new todoRepository();

    const handleError = useCallback((err: unknown) => {
        setError(err instanceof Error ? err : new Error('操作失败'));
    }, []);

    // 新增初始化加载
    useEffect(() => {
        refreshArchivedCards();
    }, []);

    const refreshArchivedCards = useCallback(async () => {
        try {
            setLoading(true);
            const data = await repo.findTodoList({ isToday: true }, 1, 3);
            setArchivedCards(data || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('刷新失败'));
        } finally {
            setLoading(false);
        }
    }, []);

    const moveToActiveTodo = useCallback(async (id: number) => {
        try {
            await repo.updateTodoList(id, { isToday: false });

            // 获取完整待办项并更新状态
            setArchivedCards((prevInbox) => {
                const movedItem = prevInbox.find((t) => t.TODO_ID === id);
                if (movedItem) {
                    setArchivedCards((prevToday) => [
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


    
    return {
        loading,
        error,
        archivedCards,
        refreshArchivedCards,
        moveToActiveTodo,
    };
};