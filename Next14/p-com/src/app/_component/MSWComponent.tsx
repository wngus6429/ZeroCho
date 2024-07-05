"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    // 윈도우가 존재한다는거고, 브라우저 라는거지
    if (typeof window !== "undefined") {
      // NEXT_PUBLIC이 붙어야 브라우저에서 접근가능
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser");
      }
    }
  }, []);

  return null;
};
