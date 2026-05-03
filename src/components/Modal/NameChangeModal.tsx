import Button from '../Button/Button';
import { NameChangeModalProps } from './type';
const NameChangeModal = ({ name, onClose }: NameChangeModalProps) => {
  return (
    <div>
      <p className="text-center md:text-heading-md text-heading-sm">
        {name}으로
        <br />
        닉네임을 변경할까요??
      </p>

      <div className="flex gap-2 mt-8">
        <Button variant="outline" className="w-1/2" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" className="w-1/2">
          변경하기
        </Button>
      </div>
    </div>
  );
};

export default NameChangeModal;
