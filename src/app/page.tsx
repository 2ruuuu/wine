"use client";

import useCheckScreenWidth from "@/hooks/useCheckScreenWidth";

export default function Home() {
  const { isMobile, isTablet, isPc } = useCheckScreenWidth();

  return <div>홈 화면</div>;
}