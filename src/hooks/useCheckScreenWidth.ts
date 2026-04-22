"use client";

import { useEffect, useState } from "react";

export default function useCheckScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth < 744;
  const isTablet = screenWidth >= 744 && screenWidth < 1280;
  const isPc = screenWidth >= 1280;

  return {
    screenWidth,
    isMobile,
    isTablet,
    isPc,
  };
}