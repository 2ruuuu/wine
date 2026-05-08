'use client';
import Image from 'next/image';
import Link from 'next/link';
import Dropdown from '@/components/DropDown/Dropdown';
import { LogoBlack } from '@/constants/icons';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';
import { profileImage as defaultProfileImage } from '@/constants/images';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const isLogin = !!user;
  const HiddenHeaderPath = ['/login', '/signup'];
  const isHiddenHeader = HiddenHeaderPath.includes(pathname);
  const profileImage = user?.image || defaultProfileImage;
  const options = [
    {
      label: '마이페이지',
      onSelect: () => {
        router.push('/myprofile');
      },
    },
    {
      label: '로그아웃',
      onSelect: () => {
        clearAuth();
        window.location.replace('/');
      },
    },
  ];
  if (isHiddenHeader) return null;

  return (
    <header
      className={`sticky w-full z-10 top-0 transition-all duration-500 h-[50px] md:px-[60px] px-5 flex justify-between items-center m-auto bg-[#171A21] md:h-17.5`}
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
              className="w-11.25 h-11.25 rounded-full overflow-hidden border border-white cursor-pointer max-[756px]:w-[20px] max-[756px]:h-[20px] align-middle bg-white"
            >
              <Image
                src={profileImage}
                width={45}
                height={45}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            </button>
          )}
        </Dropdown>
      ) : (
        <Link href="/login" className="md:text-[16px] text-[12px]  text-white">
          로그인
        </Link>
      )}
    </header>
  );
};

export default Header;
