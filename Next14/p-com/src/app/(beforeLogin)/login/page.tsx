"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import zLogo from "../../../../public/zlogo.jpg";
import styles from "@/app/page.module.css"; //! module.css를 통해서 다른 파일이랑 구별을 해준다
import Main from "../_component/Main";

export default function Login() {
  const router = useRouter();
  router.replace("/i/flow/login");
  return <Main />;
}
// router.push, 뒤로 가기 하면 한칸 뒤로 가고
//! push 하면 뒤로가기 했을때 계속 3001/login 으로 가서 계속 돌아오겠지.
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login

// router.replace, 뒤로 가기 하면 두칸 뒤로 간다
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
