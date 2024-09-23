import { QueryFunction } from "@tanstack/query-core";
import { Post } from "@/model/Post";

export const getSinglePost: QueryFunction<Post, [_1: string, _2: string]> = async ({ queryKey }) => {
  const [_1, id] = queryKey;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`, {
    next: {
      tags: ["posts", id],
    },
    // cache: "no-store", // 이거 없애면 같은거 가져옴
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
