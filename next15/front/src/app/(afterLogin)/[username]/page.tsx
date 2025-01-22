import style from "./profile.module.css";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getUserPosts } from "@/app/(afterLogin)/[username]/_lib/getUserPosts";
import UserPosts from "@/app/(afterLogin)/[username]/_component/UserPosts";
import UserInfo from "@/app/(afterLogin)/[username]/_component/UserInfo";
import { getUserServer } from "@/app/(afterLogin)/[username]/_lib/getUserServer";
import { auth } from "@/auth";
import { User } from "@/model/User";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  console.log("username", username);
  const user: User = await getUserServer({ queryKey: ["users", username] });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
  };
}

export default async function Profile(props: Props) {
  const { username } = await props.params;
  const session = await auth();
  const queryClient = new QueryClient();
  // prefetchQuery는 미리 서버에서 가져와 React Query 캐시에 저장
  // 컴포넌트가 렌더링될 때 데이터를 빠르게 사용할 수 있습니다.
  await queryClient.prefetchQuery({ queryKey: ["users", username], queryFn: getUserServer });
  await queryClient.prefetchQuery({ queryKey: ["posts", "users", "recommends"], queryFn: getUserPosts });
  // React Query 캐시 직렬화
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      {/* 서버에서 직렬화된 React Query 캐시 상태를 클라이언트에서 
      복원(hydration)하여 사용하도록 도움. */}
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
