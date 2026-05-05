import PhotoInput from '@/components/Input/PhotoInput';
import TextInput from '@/components/Input/TextInput';
import Button from '@/components/Button/Button';
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
    <aside className="w-60 px-7 py-10 border-r border-gray-300">
      <div className="flex justify-center mb-6">
        <PhotoInput
          label="프로필 사진"
          hideLabel
          variant="circle"
          register={profileRegister}
          imageUrl={imageUrl}
          onChange={onChangeProfileImage}
        />
      </div>

      <h2 className="text-center text-[22px] font-bold mb-7">{nickname}</h2>

      <div className="mb-3">
        <TextInput
          label="닉네임"
          register={nicknameRegister}
          placeholder={nickname}
        />
      </div>

      <Button fullWidth onClick={onClickChange}>
        변경하기
      </Button>
    </aside>
  );
};

export default ProfileSidebar;
