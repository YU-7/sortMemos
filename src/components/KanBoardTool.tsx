import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import MDEditor from '@uiw/react-md-editor';
import { useTodayCards } from '@/contexts/cardList';

interface KanBoardToolProps {
    className?: string;
}

export default function KanBoardTool({ className }: KanBoardToolProps) {
    const [inputValue, setInputValue] = useState('');
    const { addInboxCard } = useTodayCards();
    const [newTodo, setNewTodo] = useState<string>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    async function addNewTodo() {
        addInboxCard(newTodo || '');
        setNewTodo('');
        setIsDialogOpen(false);
    }
    return (
        <div className={cn('h-[10%] flex items-center gap-4 px-4', className)}>
            <div className="flex-1 max-w-2xl">
                <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="搜索待办事项..."
                        className="pl-8 pr-4 py-2 rounded-full shadow-sm"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
            </div>
            {/* 新增按钮 */}
            <Button className="rounded-full px-4 py-2 whitespace-nowrap" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                新建待办
            </Button>
            {/* 共用 Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl w-[80%] h-[80vh]">
                    <DialogHeader className="flex flex-row justify-between items-center">
                        <DialogTitle>新增TODO</DialogTitle>
                        {/* 添加对话框描述 */}
                        <DialogDescription className="sr-only">Create new todo item form</DialogDescription>
                        <Button
                            onClick={addNewTodo}
                            disabled={!newTodo?.trim()}
                            className={`ml-2 ${!newTodo?.trim() ? 'bg-gray-300' : ''}`}
                        >
                            确定
                        </Button>
                    </DialogHeader>
                    <MDEditor value={newTodo} onChange={setNewTodo} preview="edit" height="60vh" />
                </DialogContent>
            </Dialog>
        </div>
    );
}
