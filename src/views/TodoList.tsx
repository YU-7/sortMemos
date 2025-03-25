import KanBoardTool from '@/components/KanBoardTool';
import AliveTodoList from './AliveTodoList';
function TodoList() {
    return (
        <div className="flex-1 p-3 overflow-y-auto">
            {/* 修改搜索框区域 */}
            <KanBoardTool></KanBoardTool>
            <div className="h-[90%] flex flex-row relative">
                <AliveTodoList />
            </div>
        </div>
    );
}

export default TodoList;
