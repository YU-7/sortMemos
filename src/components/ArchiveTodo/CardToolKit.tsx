import { GripVertical, CalendarPlus, CalendarClock, Trash, SquareCheckBig } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { todo } from '@/SQLiteClient/TodoRepository';
import { timestampToDate } from '@/toolKit/util';
import { PriorityBox } from '../AliveTodo/PriorityBox';
import { useTodayCards } from '@/contexts/AcitiveTodo';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CardToolKitProps {
    todo: todo;
}

export default function CardToolKit({ todo }: CardToolKitProps) {
    const { updateTodo, delTodo } = useTodayCards();
    const { attributes, listeners } = useDraggable({
        id: todo && todo.TODO_ID ? todo.TODO_ID : 'default-id',
        data: todo
    });
    function onDelete() {
        delTodo(todo.TODO_ID || 0);
    }
    function onComplete() {
        updateTodo(todo.TODO_ID || 0, { complteTime: Date.now(), isCompleted: true });
    }

    return (
        <div className="flex items-center gap-2 px-2 py-2 bg-green-100 rounded-t-lg">
            {' '}
            {/* 修改 gap-2→gap-3，py-1→py-2 */}
            {/* 拖动手柄 */}
            <GripVertical className="h-5 w-5 cursor-move text-gray-400" {...attributes} {...listeners} />
            {/* 日期显示 */}
            <div className="flex items-center gap-1">
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
            <div className="flex items-center gap-1 group">
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
            {/* 新增完成按钮 */}
            <SquareCheckBig
                className="h-5 w-5 text-green-400 hover:text-green-600 cursor-pointer"
                onClick={onComplete}
            />
            {/* 删除按钮 */}
            <Trash className="h-5 w-5 ml-2 text-red-400 hover:text-red-600 cursor-pointer" onClick={onDelete} />
        </div>
    );
}
