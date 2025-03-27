import { ArchiveTodoProvider } from '@/contexts/ArchiveTodo';
import { ArchiveToolKit, ArchiveList } from '@/components/ArchiveTodo';
export default function ArchiveLayout() {
    return (
        <ArchiveTodoProvider>
            <div className="flex-1 p-3 overflow-y-auto">
                <ArchiveToolKit></ArchiveToolKit>
                <ArchiveList></ArchiveList>
            </div>
        </ArchiveTodoProvider>
    );
}
