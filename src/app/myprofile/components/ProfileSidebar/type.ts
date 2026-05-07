import { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ProfileSidebarProps {
  nickname: string;
  imageUrl?: string | null;
  profileRegister: UseFormRegisterReturn;
  nicknameRegister: UseFormRegisterReturn;
  onClickChange: () => void;
  onChangeProfileImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default ProfileSidebarProps;
