import InfiniteCardList from '../components/InfiniteCardList';
function TodoList() {
    return (
        <div>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <InfiniteCardList />
            </div>
        </div>
    );
}

export default TodoList;
