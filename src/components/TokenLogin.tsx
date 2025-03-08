import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface LoginFormProps {
    className?: string;
    onUpdateParent: (value: boolean) => void;
}

const TokenLogin: React.FC<LoginFormProps> = ({ className, onUpdateParent }) => {
    return (
        <div className={cn('flex items-center max-w-md w-full  bg-card rounded-lg shadow-md', className)}>
            {/* Label 标签 */}
            <Label htmlFor="username" className="text-lg whitespace-nowrap">
                用户名
            </Label>

            {/* 输入框 */}
            <Input
                id="username"
                type="text"
                placeholder="输入Token"
                className="flex-1 h-12 text-lg px-4 max-w-[400px]"
            />

            {/* 提交按钮 */}
            <Button type="submit" className="h-12 px-8 text-lg hover:bg-blue-700" onClick={() => onUpdateParent(false)}>
                提交
            </Button>
        </div>
    );
};
export default TokenLogin;
