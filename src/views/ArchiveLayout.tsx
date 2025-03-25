import {ArchiveTodoProvider} from '@/contexts/ArchiveTodo'
import ArchiveToolKit from '@/components/ArchiveTodo/ArchiveToolKit';
import ArchiveList from '@/components/ArchiveTodo/ArchiveList'
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
