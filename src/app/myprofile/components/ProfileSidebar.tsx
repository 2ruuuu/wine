interface ProfileSidebarProps {
  nickname: string;
  inputNickname: string;
  onChangeInputNickname: (nickname: string) => void;
  onClickChange: () => void;
}

const ProfileSidebar = ({
  nickname,
  inputNickname,
  onChangeInputNickname,
  onClickChange,
}: ProfileSidebarProps) => {
  return (
    <aside
      style={{
        width: '240px',
        padding: '40px 28px',
        borderRight: '1px solid #ddd',
      }}
    >
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#eee',
          margin: '0 auto 24px',
        }}
      />

      <h2
        style={{ fontSize: '22px', textAlign: 'center', marginBottom: '28px' }}
      >
        {nickname}
      </h2>

      <p style={{ fontSize: '13px', marginBottom: '8px' }}>닉네임</p>

      <input
        value={inputNickname}
        onChange={(e) => onChangeInputNickname(e.target.value)}
        style={{
          width: '100%',
          height: '42px',
          border: '1px solid #ddd',
          padding: '0 12px',
          color: '#777',
          marginBottom: '12px',
        }}
      />

      <button
        onClick={onClickChange}
        style={{
          width: '100%',
          height: '40px',
          backgroundColor: '#111',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        변경하기
      </button>
    </aside>
  );
};

export default ProfileSidebar;
