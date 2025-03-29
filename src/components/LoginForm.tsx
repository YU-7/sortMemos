import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { getUserInfo } from '@/lib/StroreLib';
interface LoginFormProps {
    className?: string;
}
const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
    const navigate = useNavigate();
    // 创建 ref
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const rememberRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const verifyLogin = async () => {
            try {
                const userInfo = await getUserInfo();
                if (userInfo) {
                    if (emailRef.current && passwordRef.current) {
                        emailRef.current.value = userInfo.email;
                        passwordRef.current.value = userInfo.password;
                    }
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        verifyLogin();
    }, []); // 空依赖数组：仅在组件挂载时执行一次
    // 验证用户
    const vertifyUser = () => {
        // 获取表单数据
        const email = emailRef.current?.value || '';
        const password = passwordRef.current?.value || '';
        navigate('/home', { replace: true, state: { email: email, password: password } });
        // 验证用户
    };

    return (
        <div className={cn('max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md', className)}>
            <div className="text-center">
                <h1 className="text-2xl font-bold">用户登录</h1>
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
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" ref={rememberRef} />
                        <Label htmlFor="remember">记住我</Label>
                    </div>
                    <Link to="/signup">
                        <Button variant="link" className="px-0 text-sm">
                            切换到注册
                        </Button>
                    </Link>
                </div>
                <Button
                    className="w-full"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        vertifyUser();
                    }}
                >
                    登录
                </Button>
            </form>
        </div>
    );
};

export default LoginForm;
