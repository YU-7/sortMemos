import { useState } from 'react';
import InfiniteCardList from '../components/InfiniteCardList';
function TodoList() {
    // 在组件顶部添加状态管理
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div className="flex-1 p-3 overflow-y-auto">
            <div className="h-[10%] flex items-center bg-blue-100 justify-center">搜索框</div>
            <div className="h-[90%] flex flex-row relative">
                {' '}
                {/* 添加 relative 定位 */}
                {/* 左侧可折叠区域 */}
                {isExpanded && (
                    <InfiniteCardList
                        className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-0'}`}
                    />
                )}
                {/* 折叠按钮（带悬停动画） */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="absolute top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 z-10 hover:scale-110 transition-transform"
                    style={{
                        left: isExpanded ? 'calc(50% - 16px)' : '16px', // 动态位置
                        transform: `rotate(${isExpanded ? '180deg' : '0deg'}) translateY(-50%)` // 箭头方向
                    }}
                >
                    {/* SVG 箭头图标 */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                {/* 右侧主内容区 */}
                <InfiniteCardList
                    className={`transition-all duration-300 ${isExpanded ? 'basis-1/2 min-w-0' : 'basis-full'}`}
                />
            </div>
        </div>
    );
}

export default TodoList;
