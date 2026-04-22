'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import Link from 'next/link';
import { HeaderProps } from './type';

const Header = ({ isLogIn }: HeaderProps) => {
  return (
    <div className="max-w-[1140px] md:h-[70px] h-[50px] bg-black md:px-[60px] px-[20px] text-white flex justify-between items-center rounded-[4px] mx-auto">
      <h1>
        <Link href="/">
          <Image src={Logo} alt="" />
        </Link>
      </h1>
      {isLogIn ? (
        <button className=" w-[45px] h-[45px] rounded-full overflow-hidden border-1 border-white">
          <img
            src="https://cdn.jk-daily.co.kr/news/photo/202602/37252_29268_3439.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </button>
      ) : (
        <button className="md:text-[16px] text-[12px]">로그인</button>
      )}
    </div>
  );
};

export default Header;
