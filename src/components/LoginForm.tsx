import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LoginFormProps {
    className?: string;
    onUpdateParent: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onUpdateParent }) => {
    const { t } = useTranslation();

    return (
        <div className={cn('max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md', className)}>
            <div className="text-center">
                <h1 className="text-2xl font-bold">用户登录</h1>
                <p className="text-muted-foreground mt-2">输入邮箱和密码以继续</p>
            </div>
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t('login')}</Label>
                    <Input id="server" type="server" placeholder="http://memos.yuself.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input id="password" type="password" placeholder="••••••••" />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" />
                        <Label htmlFor="remember">记住我</Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm" onClick={() => onUpdateParent(true)}>
                        使用token来登录
                    </Button>
                </div>
                <Link to="/home" state={{ username: '111', password: 'admin' }}>
                    <Button className="w-full" type="submit">
                        登录
                    </Button>
                </Link>
            </form>
        </div>
    );
};
export default LoginForm;
