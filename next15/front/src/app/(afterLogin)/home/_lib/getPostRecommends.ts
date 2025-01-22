type Props = { pageParam?: number };

export async function getPostRecommends({ pageParam }: Props) {
  // 5, 10, 15 이런식으로 불린다.
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/recommends?cursor=${pageParam}`, {
    next: {
      tags: ["posts", "recommends"],
    },
  });
  console.log("res", res);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  // revalidatePath("/home"); //페이지 전체 데이터를 새로고침한다.

  return res.json();
}
