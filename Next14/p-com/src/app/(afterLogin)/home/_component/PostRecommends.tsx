"use client";

import { InfiniteData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import { Fragment, useEffect } from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
  // useInfiniteQuery는 이렇게 관리함 [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]] 2차원배열
  // 오른쪽 끝에 number 타입은 initialPageParam 혹은 getNextPageParam 용이다.
  // hasNextPage에서 다음 페이지 없는거 감지하면 false가 된다. 5개씩 부르는데. 5개 미만으로 오면 끝인걸로 알지
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
    IPost[],
    object,
    InfiniteData<IPost[]>,
    [_1: string, _2: string],
    number
  >({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, //  1,2,3,4,5 여기서 5가 lastId가 되겠지
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId, // 글 삭제도 생각해줘야하니, 마지막 게시글의 포스트아이디
    staleTime: 60 * 1000, // 0초뒤에 fresh에서 -> stale, 1분동안은 fresh 상태임
    gcTime: 300 * 1000,
  });

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 500,
  });

  useEffect(() => {
    if (inView) {
      // fetching이 끝나고 다음페이지가 있을떄 실행
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
}
