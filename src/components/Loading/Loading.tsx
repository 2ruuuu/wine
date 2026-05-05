'use client';

import { useLoadingStore } from '@/stores/useLoadingStore';

const Loading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);
  const text = 'LOADING';

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div className="relative flex flex-col items-center">
        <div className="relative w-8 h-9 border-[1.5px] border-white rounded-b-[16px] overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[75%] bg-white" />
        </div>
        <div className="w-[1.5px] h-4 bg-white" />
        <div className="w-6 h-[1.5px] bg-white" />
      </div>

      <div className="mt-6 flex">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block text-[12px] tracking-[0.4em] text-white animate-text-wave"
            style={{
              animationDelay: `${index * 0.1}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Loading;
