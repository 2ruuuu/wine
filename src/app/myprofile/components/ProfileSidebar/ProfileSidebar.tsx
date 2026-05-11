import Button from '@/components/Button/Button';
import PhotoInput from '@/components/Input/PhotoInput';
import TextInput from '@/components/Input/TextInput';

import ProfileSidebarProps from './type';

const ProfileSidebar = ({
  nickname,
  imageUrl,
  profileRegister,
  nicknameRegister,
  onClickChange,
  onChangeProfileImage,
}: ProfileSidebarProps) => {
  return (
    <aside className="w-full border-b-0 py-8 min-[744px]:flex min-[744px]:flex-col min-[744px]:items-center min-[1280px]:w-60 min-[1280px]:border-b-0 min-[1280px]:border-r min-[1280px]:border-gray-300 min-[1280px]:px-7 min-[1280px]:py-10">
      <div className="mb-6 flex justify-center">
        <PhotoInput
          label="프로필 사진"
          name="profileImage"
          hideLabel
          variant="circle"
          register={profileRegister}
          imageUrl={imageUrl}
          onChange={onChangeProfileImage}
        />
      </div>

      <h2 className="mb-7 text-center text-[22px] font-bold">{nickname}</h2>

      <div className="mx-auto flex w-full max-w-[343px] flex-col gap-3 min-[744px]:max-w-[448px] min-[744px]:flex-row min-[744px]:items-end min-[1280px]:max-w-none min-[1280px]:flex-col min-[1280px]:items-stretch">
        <div className="flex-1">
          <TextInput
            label="닉네임"
            name="nickname"
            register={nicknameRegister}
            placeholder={nickname}
          />
        </div>

        <div className="min-[744px]:w-[120px] min-[1280px]:w-full">
          <Button fullWidth onClick={onClickChange}>
            변경하기
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
