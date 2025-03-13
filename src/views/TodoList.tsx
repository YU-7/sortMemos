import { useState, useRef } from 'react';
import InfiniteCardList from '../components/InfiniteCardList';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { todo, todoRepository } from '@/SQLiteClient/TodoRepository';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MDEditor from '@uiw/react-md-editor';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {DndContext} from "@dnd-kit/core";
function TodoList() {
    // 在组件顶部添加状态管理
    const [isDropped, setIsDropped] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [newTodo, setNewTodo] = useState<string>();
    const newTodoRef = useRef<todo>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    async function addNewTodo() {
        const lastTodo = new todoRepository();
        const updateData = { content: newTodo, isToday: false, createTime: 1 };
        try {
            const lastID = await lastTodo.addTodo(updateData);
            newTodoRef.current = {
                TODO_ID: lastID || 0,
                content: newTodo,
                isToday: false
            };
            setIsDialogOpen(false);
        } catch (err) {
            console.error('添加待办事项时出错:', err);
        }
    }
    // 为参数添加类型注解
    function handleDragEnd(event: any) {
        console.log(event);
// 原代码中 'over' 未定义，推测需要从 event 中解构出 'over' 属性
const { active, over, collisions } = event;
        const co = ['inbox','today'];
        console.log(collisions);
        if (co.includes(over.id) && collisions.length > 1) {
            console.log(event.active.data.current);
            newTodoRef.current = active.data.current;
          setIsDropped(true);
        }
    }
    return (
        <div className="flex-1 p-3 overflow-y-auto">
            {/* 修改搜索框区域 */}
            <div className="h-[10%] flex items-center gap-4 px-4">
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
            </div>
            <div className="h-[90%] flex flex-row relative">
            <DndContext onDragEnd={handleDragEnd}>
                {/* 左侧可折叠区域 */}
                {isExpanded && (
                    <InfiniteCardList droppableName='inbox'
                        isToday={false}
                        title="收件箱"
                        newTodo={newTodoRef.current}
                        className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-0'}`}
                    />
                )}
                {/* 折叠按钮（带悬停动画） */}
                <Button
                    onClick={() => setIsExpanded(!isExpanded)}
                    variant={'ghost'}
                    className="absolute top-1/2 -translate-y-1/2 border rounded-lg p-1 z-10 hover:scale-110 transition-transform py-10"
                    style={{
                        left: isExpanded ? 'calc(50% - 13px)' : '7px' // 动态位置
                    }}
                >
                    {/* 箭头图标 */}
                    {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
                {/* 右侧主内容区 */}
                <InfiniteCardList droppableName='today'
                    isToday={true}
                    title="今日待办"
                    className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-full'}`}
                />
                </DndContext>
            </div>
            {/* 共用 Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl w-[80%] h-[80vh]">
                    <DialogHeader className="flex flex-row justify-between items-center">
                        <DialogTitle>新增TODO</DialogTitle>
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

export default TodoList;
