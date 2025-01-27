export async function getFollowingPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/followings`, {
    // 이건 Next 서버쪽에서 캐싱하는거임
    next: {
      tags: ["posts", "followingPosts"],
    },
    credentials: "include",
    cache: "force-cache",
  });
  // RevalidateTag, RevalidatePath를 사용하기 전까지는 다시 요청을 보내지 않는다.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
