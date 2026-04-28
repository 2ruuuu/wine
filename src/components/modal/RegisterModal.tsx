import PhotoInput from '../Input/PhotoInput';
import TextInput from '../Input/TextInput';

const NickNameModal = () => {
  return (
    <div>
      {/* <PhotoInput label="와인 사진" register={'winePhoto1'} /> */}
      <TextInput
        label="제목"
        type="text"
        placeholder="내용을 입력해주세요"
        register={register('title1')}
      />
    </div>
  );
};

export default NickNameModal;
