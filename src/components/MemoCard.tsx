import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import CardToolKit from './CardToolKit';
import { todo } from '@/SQLiteClient/TodoRepository';

export const MemoCard = ({
    todo,
}: {
    todo: todo;
}) => {
    const [selectedCardData, setSelectedCardData] = useState(todo.content);
    const { TODO_ID, content } = todo;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { setNodeRef, transform } = useDraggable({
        id: TODO_ID || 0,
        data: todo
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 999, // 新增 z-index 提升拖拽层级
          }
        : undefined;
    function handleDialogClose() {
        todo.content = selectedCardData;
        setIsDialogOpen(!isDialogOpen);
    }
    return (
        <div ref={setNodeRef} style={style} className="relative hover:z-600" >
            <Card>
                <CardToolKit todo={todo} onDelete={() => {}} onComplete={() => {}} />
                <CardHeader>
                    <CardTitle>TODO #{todo.TODO_ID}</CardTitle>
                </CardHeader>
                <CardContent onClick={() => setIsDialogOpen(!isDialogOpen)}>
                    <MDEditor.Markdown source={content} />
                </CardContent>
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
