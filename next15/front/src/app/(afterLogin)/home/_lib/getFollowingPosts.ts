export async function getFollowingPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`, {
    // 이건 Next 서버쪽에서 캐싱하는거임
    next: {
      tags: ["posts", "followingPosts"],
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
}
