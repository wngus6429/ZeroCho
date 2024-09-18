"use client";

import style from "./logoutButton.module.css";
import { signOut } from "next-auth/react";
import { Session } from "@auth/core/types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  me: Session | null;
};
export default function LogoutButton({ me }: Props) {
  // RQProver 안에 있어야 queryClient 사용이 가능하다
  const queryClient = useQueryClient();

  const onLogout = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
    signOut({ callbackUrl: "/" }).then(() => {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      // router.replace("/");
    });
  };

  if (!me?.user) {
    return null;
  }

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
