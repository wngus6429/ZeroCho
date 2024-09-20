import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import PostRecommends from "./_component/PostRecommends";
import { Suspense } from "react";
import Loading from "./loading";
import TabDeciderSuspense from "./_component/TabDeciderSuspense";
import { auth } from "@/auth";
import { QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "./_lib/getPostRecommends";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "트위터 홈",
  description: "Home에 왔음",
};

export default async function Home() {
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0,
  });
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
        <PostRecommends />
      </TabProvider>
    </main>
  );
}
