import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Post from "../_component/Post";
import PostForm from "./_component/PostForm";
import Tab from "./_component/Tab";
import TabProvider from "./_component/TabProvider";
import style from "./home.module.css";
import { revalidatePath } from "next/cache";
import PostRecommends from "./_component/PostRecommends";

async function getPostRecommend(): Promise<void> {
  const res = await fetch("http://localhost:9090/api/postRecommends", {
    next: {
      tags: ["posts", "recommends"],
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  // revalidatePath("/home"); //페이지 전체 데이터를 새로고침한다.
  return res.json();
}

export default async function Home() {
  const queryClient = new QueryClient();
  // post와 recommends의 키가 있는 애들은 getPostRecommend를 항상 실행해라
  await queryClient.prefetchQuery({
    queryKey: ["post", "recommends"],
    queryFn: getPostRecommend,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
