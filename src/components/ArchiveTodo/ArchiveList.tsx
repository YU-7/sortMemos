import { cn } from '@/lib/utils';
import { ArchiveCard } from './ArchiveCard';

interface ArchiveListProps {
    className?: string;
}

export function ArchiveList(className: ArchiveListProps) {
    const { archivedCards } = useArchiveTodo();
    return (
        <div
            className={cn(
                'h-[90%] flex flex-col relative transition-all duration-300 gap-6 border rounded-lg p-1 py-5 px-3 overflow-y-scroll',
                className
            )}
        >
            {archivedCards?.map((item: any) => <ArchiveCard key={item.TODO_ID} todo={item} />)}
        </div>
    );
}
