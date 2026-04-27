import AuthLayout from '@/components/Auth/AuthLayout';
import AuthFooter from '@/components/Auth/AuthFooter';
import LoginForm from './components/LoginFrom';

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
      <AuthFooter type="login" />
    </AuthLayout>
  );
};

export default Login;
