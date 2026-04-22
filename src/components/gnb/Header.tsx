'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import Link from 'next/link';
import { HeaderProps } from './type';

const Header = ({ isLogIn }: HeaderProps) => {
  return (
    <header className="max-w-[1140px] md:h-[70px] h-[50px] bg-black md:px-[60px] px-[20px] text-white flex justify-between items-center rounded-[4px] mx-auto">
      <h1>
        <Link href="/">
          <Image src={Logo} alt="" />
        </Link>
      </h1>
      {isLogIn ? (
        <button className=" w-[45px] h-[45px] rounded-full overflow-hidden border-1 border-white">
          <img
            src="https://i.namu.wiki/i/QMYkLdvhM3sxErXFfp6f8OooYMjrwqo7nraefN3QIGNMjAtPY3NcLS5ubG4KD70N8AOyPxTQy_-MSsrtxgJhIg.webp"
            alt="프로필 이미지"
            className="w-full h-full object-cover"
          />
        </button>
      ) : (
        <button className="md:text-[16px] text-[12px]">로그인</button>
      )}
    </header>
  );
};

export default Header;
