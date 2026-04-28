interface NicknameModalProps {
  changeNickname: string;
  onClose: () => void;
  onConfirm: () => void;
}

const NicknameModal = ({
  changeNickname,
  onClose,
  onConfirm,
}: NicknameModalProps) => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: '360px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '28px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ marginBottom: '24px', lineHeight: '1.5' }}>
          ‘{changeNickname}’으로
          <br />
          닉네임을 변경할까요?
        </h3>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              height: '42px',
              border: '1px solid #ddd',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            style={{
              flex: 1,
              height: '42px',
              border: 'none',
              backgroundColor: '#111',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NicknameModal;
