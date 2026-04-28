import { useForm } from 'react-hook-form';
import PhotoInput from '../Input/PhotoInput';
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import StarRating from '../StarRating/StarRating';

const ReviewModal = () => {
  const { register } = useForm();
  const onChange = () => {};
  return (
    <div className="flex flex-col gap-6">
      <div>상품설명</div>
      <StarRating rating={3} />
      <TextInput label="" placeholder="후기를 작성해주세요" />
      <Button fullWidth>리뷰 남기기</Button>
    </div>
  );
};

export default ReviewModal;
