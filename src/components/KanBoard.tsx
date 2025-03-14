interface KanBoardProps {
  title?: string;
  content: React.ReactNode;
}

export default function KanBoard({ 
  title = '默认标题',
  content 
}: KanBoardProps) {
  return (
    <div>
      <h2>{title}</h2>
      <div>{content}</div>
    </div>
  );
}
