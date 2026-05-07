'use client';
import Image from 'next/image';
import Link from 'next/link';
import { LogoBlack } from '@/constants/icons';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  const HiddenHeaderPath = ['/login', '/signup'];
  const isHiddenHeader = HiddenHeaderPath.includes(pathname);
  if (isHiddenHeader) return null;

  return (
    <footer
      className={`w-full z-10 top-0 transition-all duration-500 h-[50px] md:px-[60px] px-5 flex justify-between items-center m-auto border-1 border-gray-200 md:h-15 mt-40`}
    >
      <h1>
        <Link href="/">
          <Image src={LogoBlack} alt="" height={15} />
        </Link>
      </h1>
      <p className="text-gray-500 text-body-sm">
        Copyright © 2026 codeit 23-3TEAM
      </p>
    </footer>
  );
};

export default Footer;
