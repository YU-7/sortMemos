import { cn } from '@/lib/utils'; 
import {ArchiveCard} from './ArchiveCard';

interface ArchiveListProps {
    className?: string; 
}

export default function ArchiveList(className: ArchiveListProps) {
    const {archivedCards} = useArchiveTodo();
    console.log(archivedCards);
    return (
        <div className={cn("h-[90%] flex flex-row relative",className)}>
             {archivedCards?.map((item: any) => <ArchiveCard key={item.TODO_ID} todo={item} />)}
        </div>
    )
}