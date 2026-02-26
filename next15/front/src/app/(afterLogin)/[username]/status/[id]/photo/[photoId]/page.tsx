import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: Promise<{ username: string; id: string; photoId: string }>;
};
// [] 슬러그들의 값을 params로 받아올수 있음
export default async function Page({ params }: Props) {
  const { username, id, photoId } = await params;
  return <Home />;
}
