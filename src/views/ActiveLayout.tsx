import AliveTodoList from './AliveTodoList';
import { KanBoardTool } from '@/components/AliveTodo';
function TodoList() {
    return (
        <TodayCardsProvider>
        <div className="flex-1 p-3 overflow-y-auto">
            {/* 修改搜索框区域 */}
            <KanBoardTool></KanBoardTool>
            <div className="h-[90%] flex flex-row relative">
                <AliveTodoList />
            </div>
        </div>
        </TodayCardsProvider>
    );
}

export default TodoList;
