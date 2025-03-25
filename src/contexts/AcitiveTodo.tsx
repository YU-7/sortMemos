import { createContext, useContext } from 'react';
import { ActiveTodoContextType } from './types';
import { useTodoActions } from './hooks/useTodoActions';

const TodayCardsContext = createContext<ActiveTodoContextType>({} as ActiveTodoContextType);

export function TodayCardsProvider({ children }: { children: React.ReactNode }) {
    const {
        todayCards,
        inboxCards,
        refreshInboxCards,
        refreshTodayCards,
        addTodayCard,
        updateTodo,
        addInboxCard,
        moveToToday,
        moveToInbox,
        delTodo,
        loading,
        error
    } = useTodoActions();

    return (
        <TodayCardsContext.Provider
            value={{
                todayCards,
                inboxCards,
                loading,
                error,
                addTodayCard,
                refreshTodayCards,
                updateTodo,
                addInboxCard,
                refreshInboxCards,
                moveToToday,
                moveToInbox,
                delTodo
            }}
        >
            {children}
        </TodayCardsContext.Provider>
    );
}

export const useTodayCards = () => useContext(TodayCardsContext);
