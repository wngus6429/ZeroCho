"use client";

import { signOut, useSession } from "next-auth/react";
import style from "./logoutButton.module.css";
import { redirect, useRouter } from "next/navigation";
import { Session } from "@auth/core/types";

type Props = {
  me: Session | null;
};
export default function LogoutButton({ me }: Props) {
  const router = useRouter();
  // client 에서만 useSession부르면 데이터 불러옴
  // const { data: me } = useSession();
  // const me = {
  //   // 임시로 내 정보 있는것처럼
  //   id: "JuhyunPark",
  //   nickname: "주현님",
  //   image: "/5Udwvqim.jpg",
  // };

  const onLogout = () => {
    // 서버리다이렉트는 꺼야함
    signOut({ redirect: false }).then(() => {
      router.replace("/");
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
