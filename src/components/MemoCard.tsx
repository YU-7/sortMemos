import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import CardToolKit from './CardToolKit';
import { todo} from '@/SQLiteClient/TodoRepository';

export const MemoCard = ({
    id,
    content,
    todo,
    onSave // 新增保存回调
}: {
    id: number;
    content: string;
    todo: todo;
    onSave: (newContent: string) => void; // 新增 props 类型定义
}) => {
    const [selectedCardData, setSelectedCardData] = useState<String>(content);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const {setNodeRef, transform } = useDraggable({
        id: id.toString(),
        data: selectedCardData
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
          }
        : undefined;
    function handleDialogClose() {
        setIsDialogOpen(!isDialogOpen);
        onSave(selectedCardData?.toString() || ''); // 调用保存回调
    }
    return (
        <div id={id.toString()} ref={setNodeRef} style={style}>
            <Card id={id.toString()} >
                <CardToolKit todo={todo} onDelete={() => {}} onComplete={() => {}}/>
                <CardHeader>
                    <CardTitle>TODO #{id}</CardTitle>
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
                        onChange={setSelectedCardData.toString}
                        preview="edit"
                        height="70vh"
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
