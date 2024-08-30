import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Post from "../_component/Post";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import PostRecommends from "./_component/PostRecommends";
import { getPostRecommends } from "./_lib/getPostRecommends";
import TabDecider from "./_component/TabDecider";

export default async function Home() {
  const queryClient = new QueryClient();
  // post와 recommends의 키가 있는 애들은 getPostRecommend를 항상 실행해라
  // ReactQuery에서는 인피니트 스크롤링을 지원한다.
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 커서값, 무조건 처음에는 0
  });
  const dehydratedState = dehydrate(queryClient);

  const postCount = 5;

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <TabDecider />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
