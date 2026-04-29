import { UseFormRegisterReturn } from 'react-hook-form';

interface ProfileSidebarProps {
  nickname: string;
  profileRegister: UseFormRegisterReturn;
  nicknameRegister: UseFormRegisterReturn;
  onClickChange: () => void;
}

export default ProfileSidebarProps;
