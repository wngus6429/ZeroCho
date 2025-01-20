import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  // post와 recommends의 키가 있는 애들은 getPostRecommend를 항상 실행해라
  // ReactQuery에서는 인피니트 스크롤링을 지원한다.
  //! 아랫것이 서버사이드랜더링이라서 로딩화면이 안보임
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 처음엔 커서값을 0으로 설정
  });
  // queryClient.getQueryData(["posts", "recommends"]); 이런식으로 데이터를 불러옴
  // queryClient.setQueryData(["posts", "recommends"], data); 이런식으로 데이터를 수정

  const dehydratedState = dehydrate(queryClient);

  console.log("dehydratedState", dehydratedState);
  return (
    // HydrationBoundary로 감싸서 클라이언트가 이 상태를 재사용할 수 있도록 함
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
