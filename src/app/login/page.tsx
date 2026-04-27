import AuthLayout from '@/components/Auth/AuthLayout';
import AuthFooter from '@/components/Auth/AuthFooter';

const Login = () => {
  return (
    <AuthLayout>
      {/* <LoginForm /> */}
      <AuthFooter type="login" />
    </AuthLayout>
  );
};

export default Login;
