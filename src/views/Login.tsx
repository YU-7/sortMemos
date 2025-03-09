import { useState } from 'react';
import SignUp from '@/components/SignUp';
import LoginForm from '../components/LoginForm';
function Login() {
    const [changeLoginType, setChangeLoginType] = useState(false);
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {changeLoginType && <SignUp onUpdateParent={(value) => setChangeLoginType(value)} />}
            {!changeLoginType && (
                <LoginForm
                    className="max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md"
                    onUpdateParent={(value) => setChangeLoginType(value)}
                />
            )}
        </div>
    );
}

export default Login;
