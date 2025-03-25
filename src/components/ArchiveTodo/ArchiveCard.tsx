import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import CardToolKit from './CardToolKit';
import { todo } from '@/SQLiteClient/TodoRepository';

export const ArchiveCard = ({ todo }: { todo: todo }) => {
    // 在组件顶部添加 useState
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState(todo.content);
    const { TODO_ID, content } = todo;
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function handleDialogClose() {
        todo.content = selectedCardData;
        setIsDialogOpen(!isDialogOpen);
    }
    return (
        <div>
            <Card className="relative max-h-[400px] overflow-hidden transition-all duration-300 bg-green-100">
                <CardToolKit todo={todo} />
                <CardHeader>
                    <CardTitle>TODO #{todo.TODO_ID}</CardTitle>
                </CardHeader>
                <CardContent
                    onClick={() => setIsDialogOpen(!isDialogOpen)}
                    className={isExpanded ? 'max-h-none' : 'max-h-[200px] overflow-y-hidden'}
                >
                    <MDEditor.Markdown source={content} />
                </CardContent>
                {/* 添加展开按钮 */}
                <button
                    className="absolute bottom-1 right-2 text-xs text-blue-500 hover:underline bg-white/80 px-2 rounded"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {isExpanded ? '收起' : '展开更多'}
                </button>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent className="max-w-4xl w-[80%] h-[80vh]">
                    <DialogHeader>
                        <DialogTitle>详细信息</DialogTitle>
                    </DialogHeader>
                    <MDEditor
                        value={selectedCardData?.toString()}
                        onChange={setSelectedCardData}
                        preview="edit"
                        height="70vh"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
