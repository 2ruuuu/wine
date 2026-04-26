import Link from 'next/link';
import Image from 'next/image';
import { LogoBlack } from '@/constants/icons';
import { AuthLayoutProps } from './type';

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[hsl(0,0%,95%)] px-4 py-15 md:py-30">
      <div className="w-full mx-auto md:max-w-[496px] bg-white px-5 md:px-12 py-12 md:py-20 rounded-2xl shadow-[hsla(0,0%,0%,0.04)]">
        <h1 className="mb-10 md:mb-16 flex justify-center">
          <Link href="/" className="inline-block">
            <Image
              src={LogoBlack}
              alt="WINE"
              className="mx-auto h-auto w-auto"
              priority
            />
          </Link>
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
