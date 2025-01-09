// import NextAuth, { CredentialsSignin } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
// } = NextAuth({
//   pages: {
//     // 직접 만든 페이지를 로그인 창으로서 등록한다.
//     signIn: "/i/flow/login",
//     newUser: "/i/flow/signup",
//   },
//   providers: [
//     CredentialsProvider({
//       //? credentials는 로그인할 때 입력한 정보
//       async authorize(credentials) {
//         const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             // credentials안에 username, password가 고정으로 들어가있음
//             id: credentials.username,
//             password: credentials.password,
//           }),
//         });

//         if (!authResponse.ok) {
//           const credentialsSignin = new CredentialsSignin();
//           if (authResponse.status === 404) {
//             credentialsSignin.code = "no_user";
//           } else if (authResponse.status === 401) {
//             credentialsSignin.code = "wrong_password";
//           }
//           throw credentialsSignin;
//         }

//         const user = await authResponse.json();
//         console.log("user", user);
//         return {
//           email: user.id,
//           name: user.nickname,
//           image: user.image,
//           ...user,
//         };
//       },
//     }),
//   ],
// });

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
  callbacks: {
    jwt({ token }) {
      // console.log("auth.ts jwt", token);
      return token;
    },
    session({ session, newSession, user }) {
      // console.log("auth.ts session", session, newSession, user);
      return session;
    },
  },
  events: {
    signOut(data) {
      console.log("auth.ts events signout", "session" in data && data.session, "token" in data && data.token);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      // if ('session' in data) {
      //   data.session = null;
      // }
      // if ('token' in data) {
      //   data.token = null;
      // }
    },
    session(data) {
      // console.log("auth.ts events session", "session" in data && data.session, "token" in data && data.token);
    },
  },
  providers: [
    // 밑에 카카오, 네이버, 구글 등 같은거 프로바이더 추가해서 가능
    CredentialsProvider({
      async authorize(credentials) {
        console.log("credentials", credentials);
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
        console.log("유저정보", user);
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
