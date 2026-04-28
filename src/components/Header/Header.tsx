'use client';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '../DropDown/Dropdown';
import { LogoBlack } from '@/constants/icons';
import { HeaderProps } from './type';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = ({ isLogin }: HeaderProps) => {
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  const HiddenHeaderPath = ['/login', '/signup'];
  const isHiddenHeader = HiddenHeaderPath.includes(pathname);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const options = [
    {
      label: '마이페이지',
      onSelect: () => {
        console.log('마이페이지로 이동');
      },
    },
    {
      label: '로그아웃',
      onSelect: () => {
        console.log('로그아웃 실행');
      },
    },
  ];
  if (isHiddenHeader) return null;
  return (
    <header
      className={`w-full z-10 ${isScrolled ? 'fixed' : 'absolute'} transition-all duration-500`}
    >
      <div
        className={`max-w-285 md:h-17.5 max-[756px]:h-[50px] md:px-[60px] px-5 flex justify-between items-center m-auto bg-[#171A21] ${isMainPage ? 'mt-10' : 'mt-5'} ${isScrolled && 'mt-0! w-full rounded-none'} `}
      >
        <h1>
          <Link href="/">
            <Image src={LogoBlack} alt="" height={15} className="invert" />
          </Link>
        </h1>

        {isLogin ? (
          <Dropdown variant="basic" options={options}>
            {({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                className="w-11.25 h-11.25 rounded-full overflow-hidden border border-white cursor-pointer max-[756px]:w-[20px] max-[756px]:h-[20px] align-middle"
              >
                <img
                  src="https://i.namu.wiki/i/QMYkLdvhM3sxErXFfp6f8OooYMjrwqo7nraefN3QIGNMjAtPY3NcLS5ubG4KD70N8AOyPxTQy_-MSsrtxgJhIg.webp"
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              </button>
            )}
          </Dropdown>
        ) : (
          <Link
            href="/login"
            className="md:text-[16px] text-[12px]  text-white"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
