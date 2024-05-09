import { ReactNode } from "react";

export default function AfterLoginLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div>
      AfterLogin레이아웃
      {children}
    </div>
  );
}
