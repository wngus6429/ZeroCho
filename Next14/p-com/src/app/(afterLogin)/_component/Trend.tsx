import Link from "next/link";
import style from "./trend.module.css";
import { Hashtag } from "@/model/Hashtag";

type Prop = { trend: Hashtag };
export default function Trend({ trend }: Prop) {
  return (
    <Link href={`/search?q=${trend.title}`} className={style.container}>
      <div className={style.count}>실시간트렌드</div>
      <div className={style.title}>{trend.title}</div>
      {/* toLocaleString으로 3자리 넘어가면 알아서 콤마 , 찍어줌 */}
      <div className={style.count}>{trend.count.toLocaleString()} posts</div>
    </Link>
  );
}
