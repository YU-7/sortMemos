import InfiniteCardList from '../components/InfiniteCardList';
function TodoList() {
    return (
        <div className="flex-1 p-8 overflow-y-auto flex">
            <div className="basis-1/5 bg-gray-100 p-4">bb</div>
            <InfiniteCardList />
        </div>
    );
}

export default TodoList;
