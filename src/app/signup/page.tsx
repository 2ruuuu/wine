import AuthLayout from '@/components/Auth/AuthLayout';
import AuthFooter from '@/components/Auth/AuthFooter';

const Signup = () => {
  return (
    <AuthLayout>
      {/* <SignupForm /> */}
      <AuthFooter type="signup" />
    </AuthLayout>
  );
};

export default Signup;
