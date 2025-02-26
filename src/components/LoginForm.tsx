import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useTranslation } from "react-i18next";

export default function LoginForm() {
    const { t , i18n} = useTranslation();
  return (
    <div className="max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-2xl font-bold">用户登录</h1>
        <p className="text-muted-foreground mt-2">输入邮箱和密码以继续</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
            <Label htmlFor="email">{t('login')}</Label>
          <Input id="email" type="txt" placeholder="http://memos.yuself.com" />
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
          <Button variant="link" className="px-0 text-sm">
            忘记密码？
          </Button>
        </div>
        <Button className="w-full" type="submit">
          登录
        </Button>
      </form>
    </div>
  );
}