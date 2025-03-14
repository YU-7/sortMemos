import { useEffect } from'react';
import { createContext, useContext, useState, useCallback } from 'react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';

type TodayCardsContextType = {
  todayCards: todo[];
  loading: boolean;
  error: Error | null;
  addTodayCard: (content: string) => Promise<void>;
  refreshTodayCards: () => Promise<void>;
  updateTodayCard: (id: number, newData: Partial<todo>) => Promise<void>;
};

const TodayCardsContext = createContext<TodayCardsContextType>({} as TodayCardsContextType);

export function TodayCardsProvider({ children }: { children: React.ReactNode }) {
  const [todayCards, setTodayCards] = useState<todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const repo = new todoRepository();

  // 新增初始化加载
  useEffect(() => {
    refreshTodayCards();
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
      setTodayCards(prev => [{
        content,
        isToday: true,
        createTime: Date.now(),
        TODO_ID: newTodoID
      }, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('添加失败'));
    }
  }, []);

  const updateTodayCard = useCallback(async (id: number, newData: Partial<todo>) => {
    try {
      await repo.updateTodoList(id, newData);
      setTodayCards(prev => 
        prev.map(t => t.TODO_ID === id ? { ...t, ...newData } : t)
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('更新失败'));
    }
  }, []);

  return (
    <TodayCardsContext.Provider value={{ 
      todayCards, 
      loading,
      error,
      addTodayCard,
      refreshTodayCards,
      updateTodayCard
    }}>
      {children}
    </TodayCardsContext.Provider>
  );
}

export const useTodayCards = () => useContext(TodayCardsContext);