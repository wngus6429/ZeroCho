import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/i/flow/login",
    newUser: "/i/flow/signup",
  },
  providers: [
    // 밑에 카카오, 네이버, 구글 등 같은거 프로바이더 추가해서 가능
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: credentials.username,
              password: credentials.password,
            }),
          }
        );
        // ok가 아니면 로그인 실패
        if (!authResponse.ok) {
          return null;
        }
        // 여기의 유저정보는 지금 누가 로그인 헀는지
        // 이거 자주 활용해서 중요한거임 ㅋㅋㅋ
        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.id,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
