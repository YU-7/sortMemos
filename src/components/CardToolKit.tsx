import { GripVertical, Calendar, Trash, CheckCircle } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';
import { todo } from '@/SQLiteClient/TodoRepository';
import { SignalHigh, SignalMedium, SignalLow } from 'lucide-react';
import {timestampToDate} from '@/util';
interface CardToolKitProps {
    todo: todo;
    onDelete: () => void;
    onComplete: () => void; // 新增完成回调
}

export default function CardToolKit({ todo, onDelete, onComplete }: CardToolKitProps) {
    const { attributes, listeners } = useDraggable({
        id: todo && todo.TODO_ID ? todo.TODO_ID : 'default-id',
        data: todo
    });

    return (
        <div className="flex items-center gap-2 px-2 py-2 bg-gray-100 rounded-t-lg"> {/* 修改 gap-2→gap-3，py-1→py-2 */}
            {/* 拖动手柄 */}
            <GripVertical className="h-5 w-5 cursor-move text-gray-400" {...attributes} {...listeners} />

            {/* 日期显示 */}
            <div className="flex items-center gap-1">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">{"创建时间"+timestampToDate(todo.createTime || 0,'YYYY-MM-DD HH:mm:ss')}</span>
            </div>

            {/* 日期显示 */}
            <div className="flex items-center gap-1">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">{"截至时间"+timestampToDate(todo.updateTime || 0,'YYYY-MM-DD HH:mm:ss')}</span>
            </div>

            {/* 优先级图标 */}
            {todo.priority === 1 && <SignalHigh className="h-5 w-5 text-red-500" />}
            {todo.priority === 2 && <SignalMedium className="h-5 w-5 text-yellow-500" />}
            {todo.priority === 3 && <SignalLow className="h-5 w-5 text-gray-400" />}

            {/* 新增完成按钮 */}
            <CheckCircle className="h-5 w-5 text-green-400 hover:text-green-600 cursor-pointer" onClick={onComplete} />

            {/* 删除按钮 */}
            <Trash className="h-5 w-5 ml-2 text-red-400 hover:text-red-600 cursor-pointer" onClick={onDelete} />
        </div>
    );
}
