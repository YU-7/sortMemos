import { useState } from 'react';
import LoginForm from '../components/LoginForm';
function Login() {
    const [changeLoginType, setChangeLoginType] = useState(false);
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <LoginForm className="max-w-md w-full space-y-6 p-8 bg-card rounded-lg shadow-md" />
        </div>
    );
}

export default Login;
