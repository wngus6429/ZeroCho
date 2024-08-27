"use client";

import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSession } from "next-auth/react";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000, // 0초뒤에 fresh에서 -> stale, 1분동안은 fresh 상태임
    gcTime: 300 * 1000,
  });

  return data?.map((post: IPost) => {
    <Post key={post.postId} post={post} />;
  });
}

// export default function PostRecommends() {
//   const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
//     IPost[],
//     Object,
//     InfiniteData<IPost[]>,
//     [_1: string, _2: string],
//     number
//   >({
//     queryKey: ["posts", "recommends"],
//     queryFn: getPostRecommends,
//     initialPageParam: 0,
//     getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
//     staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
//     gcTime: 300 * 1000,
//   });
//   const { ref, inView } = useInView({
//     threshold: 0,
//     delay: 0,
//   });

//   useEffect(() => {
//     if (inView) {
//       !isFetching && hasNextPage && fetchNextPage();
//     }
//   }, [inView, isFetching, hasNextPage, fetchNextPage]);

//   return (
//     <>
//       {data?.pages.map((page, i) => (
//         <Fragment key={i}>
//           {page.map((post) => (
//             <Post key={post.postId} post={post} />
//           ))}
//         </Fragment>
//       ))}
//       <div ref={ref} style={{ height: 50 }} />
//     </>
//   );
// }