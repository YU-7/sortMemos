import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MDEditor from '@uiw/react-md-editor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useState } from 'react';import {useDraggable} from '@dnd-kit/core';

export const MemoCard = ({ 
  id,
  content,
  onSave // 新增保存回调
}: {
  id: number;
  content: string;
  onSave: (newContent: string) => void; // 新增 props 类型定义
}) => {
    const [selectedCardData, setSelectedCardData] = useState<String>();
    const [isDialogOpen, setIsDialogOpen] = useState(false);const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: id.toString(),
    });
    const style = transform ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;
    function openCard() {
        setSelectedCardData(content);
        setIsDialogOpen(!isDialogOpen);
    }
    function handleDialogClose() {
        setIsDialogOpen(!isDialogOpen);
            onSave(selectedCardData?.toString() || ''); // 调用保存回调
    }
  return (
    <div id={id.toString()} ref={setNodeRef} style={style} {...listeners} {...attributes}>
    <Card id={id.toString()} onClick={openCard}>
      <CardHeader>
        <CardTitle>TODO #{id}</CardTitle>
      </CardHeader>
      <CardContent>
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