import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArchiveToolKitProps {
    className?: string;
}

export function ArchiveToolKit({ className }: ArchiveToolKitProps) {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className={cn('h-[10%] flex items-center gap-4 px-4', className)}>
            <div className="flex-1 max-w-2xl">
                <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="搜索完成/删除待办事项..."
                        className="pl-8 pr-4 py-2 rounded-full shadow-sm"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </div>
            </div>

            <Button className="rounded-full px-4 py-2 whitespace-nowrap">
                <NavLink to="/home/alive-todolist">切换到进行中的TODO</NavLink>
            </Button>
        </div>
    );
}
