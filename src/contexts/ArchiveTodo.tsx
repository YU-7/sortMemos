import { createContext, useContext } from 'react';
import { ArchiveTodoContextType } from './types';
import { useArchiveActions } from './hooks/useArchiveActions';

const ArchiveTodoContext = createContext<ArchiveTodoContextType>({} as ArchiveTodoContextType);

export function ArchiveTodoProvider({ children }: { children: React.ReactNode }) {
    const {
        refreshArchivedCards,
        archivedCards,
        moveToActiveTodo,
        loading,
        error,
    } = useArchiveActions();

    return (
        <ArchiveTodoContext.Provider
            value={{
                refreshArchivedCards,
                archivedCards,
                moveToActiveTodo,
                loading,
                error,
            }}
        >
            {children}
        </ArchiveTodoContext.Provider>
    );
}

export const useArchiveTodo = () => useContext(ArchiveTodoContext);
