"use client";
import { useRouter } from "next/navigation";
import Main from "../_component/Main";
import { useSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");
  return <Main />;
}
// router.push, 뒤로 가기 하면 한칸 뒤로 가고
//! push 하면 뒤로가기 했을때 계속 3001/login 으로 가서 계속 돌아오겠지.
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login

// router.replace, 뒤로 가기 하면 두칸 뒤로 간다
// localhost:3001 -> localhost:3001/login -> localhost:3001/i/flow/login
