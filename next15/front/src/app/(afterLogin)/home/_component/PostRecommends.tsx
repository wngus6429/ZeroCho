"use client";
import { InfiniteData, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";
import { Fragment, useEffect } from "react";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { useInView } from "react-intersection-observer";
import styles from "../home.module.css";

// 홈 화면, 데이터
export default function PostRecommends() {
  // useInfiniteQuery는 이렇게 관리함 [[1,2,3,4,5], [6,7,8,9,10], [11,12,13,14,15]] 2차원배열
  // 오른쪽 끝에 number 타입은 initialPageParam 혹은 getNextPageParam 용이다.
  // hasNextPage에서 다음 페이지 없는거 감지하면 false가 된다. 5개씩 부르는데. 5개 미만으로 오면 끝인걸로 알지
  // const { data, fetchNextPage, hasNextPage, isFetching, isPending } = useInfiniteQuery<
  const { data, fetchNextPage, hasNextPage, isFetching, isPending } = useSuspenseInfiniteQuery<
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
    staleTime: 60 * 1000, // 이 값이 0 이면 0초뒤에 fresh에서 -> stale,
    // 지금 값은 1분동안은 fresh 상태임, infinite는 캐쉬 무제한
    gcTime: 300 * 1000, // 캐시타임이 5분이면 gcTime이 5분이 지나면 캐시가 삭제됨
  });

  // useInView는 react-intersection-observer 훅으로,
  // DOM 요소가 뷰포트(Viewport)에 들어오거나 나가는 것을 감지하는 데 사용됩니다.
  // 이를 통해 사용자는 스크롤 이벤트를 수동으로 관리하지 않고도 특정 요소가 화면에 보이는지 여부를 쉽게 확인할 수 있습니다.
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 100,
  });

  useEffect(() => {
    // fetching이 끝나고 다음페이지가 있을떄 실행
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage(); // 상태 업데이트는 이 조건이 모두 충족될 때만 실행
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // useEffect(() => {
  //   // Debounce the fetchNextPage call to prevent rapid multiple calls
  //   let timeoutId: NodeJS.Timeout;

  //   if (inView && !isFetching && hasNextPage) {
  //     timeoutId = setTimeout(() => {
  //       fetchNextPage();
  //     }, 100);
  //   }

  //   return () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //   };
  // }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg className={styles.loader} height="100%" viewBox="0 0 32 32" width={40}>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", opacity: 0.2 }}
          ></circle>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="14"
            strokeWidth="4"
            style={{ stroke: "rgb(29, 155, 240)", strokeDasharray: 80, strokeDashoffset: 60 }}
          ></circle>
        </svg>
      </div>
    );
  }

  console.log("data", data);
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
