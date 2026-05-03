import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="container-layout flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <div className="relative w-full max-w-[400px] aspect-[2/1] mb-10">
        <Image
          src="/not-found.png"
          alt="404"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">페이지를 찾을 수 없습니다.</h2>
        <p className="text-gray-500">
          존재하지 않는 주소를 입력하셨거나, <br />
          요청하신 페이지의 주소가 변경, 삭제되었습니다.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center justify-center w-50 h-10.5 md:h-12.5 bg-black rounded-[4px] font-body-sm md:font-body-md font-medium md:font-bold text-white hover:bg-[hsl(30,2%,19%)] active:bg-[hsl(30,1%,28%)]"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
