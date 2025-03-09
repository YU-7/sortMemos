import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
interface LoginFormProps {
    className?: string;
    onUpdateParent: (value: boolean) => void;
}

const SignUp: React.FC<LoginFormProps> = ({ className, onUpdateParent }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null); // 新增确认密码ref
    const [validationError, setValidationError] = useState(''); // 验证错误状态
    const navigate = useNavigate();
    const registryUser = () => {
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (password !== confirmPassword) {
            setValidationError('两次输入的密码不一致');
            return;
        }
        navigate('/registry', { state: { email: emailRef.current?.value, password: password } });
    };
    return (
        <div className={cn('max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md', className)}>
            <div className="text-center">
                <h1 className="text-2xl font-bold">用户注册</h1>
                <p className="text-muted-foreground mt-2">输入邮箱和密码以继续</p>
            </div>
            <form className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">邮箱</Label>
                    <Input id="email" type="email" placeholder="name@example.com" ref={emailRef} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">密码</Label>
                    <Input id="password" type="password" placeholder="••••••••" ref={passwordRef} />
                </div>
                {/* 新增确认密码字段 */}
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">确认密码</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        placeholder="请再次输入密码"
                        ref={confirmPasswordRef}
                        onChange={() => setValidationError('')}
                    />
                </div>
                {validationError && <p className="text-red-500 text-sm">{validationError}</p>}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2"></div>
                    <Button variant="link" className="px-0 text-sm" onClick={() => onUpdateParent(true)}>
                        切换到登录
                    </Button>
                </div>
                <Button
                    className="w-full"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        registryUser();
                    }}
                >
                    注册
                </Button>
            </form>
        </div>
    );
};
export default SignUp;
