import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getSearchResult: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string; f?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(`http://localhost:9090/api/posts?${urlSearchParams.toString()}`, {
    next: {
      // 객체로 못 들어가서 searchParams.q 로 함
      tags: ["posts", "search", searchParams.q],
    },
    credentials: "include",
    cache: "no-store",
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};