"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getFollowingPosts } from "@/app/(afterLogin)/home/_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function FollowingPosts() {
  // 상위에 Suspense를 인식하고, home/page에 있는 TabDeciderSuspense에서 prefetchInfiniteQuery를 통해 데이터를 미리 가져옴
  const { data, isPending } = useSuspenseQuery<IPost[]>({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
    gcTime: 300 * 1000,
  });

  // 위에 useSuspenseQuery로 인해 상위 fallback이 실행되면서 로딩화면이 나옴

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
