import { CalendarPlus, CalendarClock } from 'lucide-react';
import { todo } from '@/SQLiteClient/TodoRepository';
import { timestampToDate } from '@/toolKit/util';
import { PriorityBox } from '../AliveTodo/PriorityBox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CardToolKitProps {
    todo: todo;
}

export function CardToolKit({ todo }: CardToolKitProps) {
    return (
        <div className="flex items-center gap-2 px-5 py-2 rounded-t-lg">
            {/* 日期显示 */}
            <div className="flex items-center gap-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <CalendarPlus className="h-5 w-5 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{timestampToDate(todo.createTime || 0, 'YYYY-MM-DD HH:mm:ss')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {/* 日期显示 - 截止时间 */}
            <div className="flex items-center gap-3 group">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <CalendarClock className="h-5 w-5 text-gray-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{timestampToDate(todo.dueTime || 0, 'YYYY-MM-DD HH:mm:ss')}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {/* 优先级图标 */}
            <PriorityBox todo={todo}></PriorityBox>
        </div>
    );
}
