import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      홈레이아웃
      {children}
    </div>
  );
}
