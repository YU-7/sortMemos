import InfiniteCardList from '../components/InfiniteCardList';
function TodoList() {
    return (
        <div className="flex-1 p-3 overflow-y-auto">
            <div className="h-[10%] bg-blue-100 flex items-center justify-center">搜索框</div>
            <div className="h-[90%] flex flex-row flex">
                <InfiniteCardList className="basis-1/2 bg-gray-100" />
                <InfiniteCardList className="basis-1/2 bg-blue-100" />
            </div>
        </div>
    );
}

export default TodoList;
