import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPostRecommends } from "@/app/(afterLogin)/home/_lib/getPostRecommends";

export default async function TabDeciderSuspense() {
  const queryClient = new QueryClient();
  // post와 recommends의 키가 있는 애들은 getPostRecommend를 항상 실행해라
  // ReactQuery에서는 인피니트 스크롤링을 지원한다.
  // 아랫것이 서버사이드랜더링이라서 로딩화면이 안보임
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommends,
    initialPageParam: 0, // 커서값, 무조건 처음에는 0
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <TabDecider />
    </HydrationBoundary>
  );
}
