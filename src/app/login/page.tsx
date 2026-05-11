import AuthFooter from '@/components/Auth/AuthFooter';
import AuthLayout from '@/components/Auth/AuthLayout';

import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
      <AuthFooter type="login" />
    </AuthLayout>
  );
};

export default Login;
