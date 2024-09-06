import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
import cookie from "cookie";

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
        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });
        let setCookie = authResponse.headers.get("Set-Cookie");
        console.log("set-cookie", setCookie);
        if (setCookie) {
          const parsed = cookie.parse(setCookie);
          cookies().set("connect.sid", parsed["connect.sid"], parsed);
          // 브라우저에 쿠키를 심어주는 것
          // 프론트서버에는 쿠키를 심으면 안된다. 서버는 공용이기 때문에 심으면 개인정보 유출 발생
        }

        // ok가 아니면 로그인 실패
        if (!authResponse.ok) {
          return null;
        }
        // 여기의 유저정보는 지금 누가 로그인 헀는지
        // 이거 자주 활용해서 중요한거임 ㅋㅋㅋ
        const user = await authResponse.json();
        console.log("user", user);
        return {
          email: user.userId,
          name: user.nickname,
          image: user.image,
          ...user,
        };
      },
    }),
  ],
});
