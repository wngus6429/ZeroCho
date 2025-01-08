import Home from "@/app/(afterLogin)/home/page";

type Props = {
  params: { username: string; id: string; photoId: string };
};
// [] 슬러그들의 값을 params로 받아올수 있음
export default function Page({ params }: Props) {
  params.username;
  params.id;
  params.photoId;
  return <Home />;
}
