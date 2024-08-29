import style from "./post.module.css";
import Link from "next/link";
import dayjs from "dayjs";
//! 몇분전 글이 쓰여졌다 등등 활용, 옛날에는 모먼트를 많이썻다함
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
// import { faker } from "@faker-js/faker";
import PostImages from "@/app/(afterLogin)/_component/PostImages";
import { Post as IPost } from "@/model/Post";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: IPost;
};
export default function Post({ noImage, post }: Props) {
  const target = post;
  // if (post.Original) {
  //   target = post.Original;
  // }
  // 확률 반반으로 이미지가 있거나 없거나.
  // noImage쓰면 이미지가 뜨지 않음
  // if (Math.random() > 0.5 && !noImage) {
  //   target.Images.push(
  //     { imageId: 1, link: faker.image.urlLoremFlickr() },
  //     { imageId: 2, link: faker.image.urlLoremFlickr() },
  //     { imageId: 3, link: faker.image.urlLoremFlickr() },
  //     { imageId: 4, link: faker.image.urlLoremFlickr() }
  //   );
  // }

  console.log("target", target);

  return (
    // article 하나때문에 useClient 하기 싫어서
    // 클라이언트 컴포넌트 만들고 children에 서버컴포넌트를 넣은거임
    // 부모가 클라, 자식이 서버는 괜찮음
    // 다만 children에 넣어야지 import하면 서버컴포넌트가 클라이언트가 되어버림
    <PostArticle post={target}>
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link href={`/${target.User.id}`} className={style.postUserImage}>
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
          </div>
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons />
        </div>
      </div>
    </PostArticle>
  );
}
