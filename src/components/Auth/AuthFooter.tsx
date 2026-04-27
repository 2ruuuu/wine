import Link from 'next/link';
import { AuthFooterProps } from './type';

const AuthFooter = ({ type }: AuthFooterProps) => {
  const isLogin = type === 'login';

  return (
    <div className="mt-9 text-center text-body-sm md:text-body-md">
      <span className="text-[hsl(0,0%,73%)]">
        {isLogin ? '계정이 없으신가요?' : '계정이 이미 있으신가요?'}
      </span>
      <Link
        href={isLogin ? '/signup' : '/login'}
        className="ml-2 text-[hsl(256,68%,56%)] font-medium underline underline-offset-3"
      >
        {isLogin ? '회원가입하기' : '로그인하기'}
      </Link>
    </div>
  );
};

export default AuthFooter;
