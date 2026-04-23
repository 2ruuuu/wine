'use client';
import Image from 'next/image';
import Logo from '@/assets/images/logo.svg';
import Link from 'next/link';
import { HeaderProps } from './type';
import Dropdown from '../DropDown/Dropdown';

const Header = ({ isLogIn, HeaderBg = false }: HeaderProps) => {
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
  return (
    <header className="fixed w-full z-10">
      <div
        className={`max-w-285 md:h-17.5 h- md:px-[60px] px-5 flex justify-between items-center rounded m-auto  ${HeaderBg ? 'bg-black mt-10 ' : 'bg-[#171A21]  mt-5'}`}
      >
        <h1>
          <Link href="/">
            <Image src={Logo} alt="" />
          </Link>
        </h1>

        {isLogIn ? (
          <Dropdown variant="basic" options={options}>
            {({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                className=" w-11.25 h-11.25 rounded-full overflow-hidden border border-white cursor-pointer"
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
          <button className="md:text-[16px] text-[12px]  text-white">
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
