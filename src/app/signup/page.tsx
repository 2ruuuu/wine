import AuthLayout from '@/components/Auth/AuthLayout';
import AuthFooter from '@/components/Auth/AuthFooter';
import SignupForm from './components/SignupForm';

const Signup = () => {
  return (
    <AuthLayout>
      <SignupForm />
      <AuthFooter type="signup" />
    </AuthLayout>
  );
};

export default Signup;
