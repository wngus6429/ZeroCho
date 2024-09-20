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
import { MouseEventHandler } from "react";

dayjs.locale("ko");
dayjs.extend(relativeTime);

type Props = {
  noImage?: boolean;
  post: IPost;
};
export default function Post({ noImage, post }: Props) {
  let target = post;
  if (post.Original) {
    target = post.Original;
  }
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

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
  };

  return (
    // article 하나때문에 useClient 하기 싫어서
    // 클라이언트 컴포넌트 만들고 children에 서버컴포넌트를 넣은거임
    // 부모가 클라, 자식이 서버는 괜찮음
    // 다만 children에 넣어야지 import하면 서버컴포넌트가 클라이언트가 되어버림
    <PostArticle post={target}>
      {post.Original && (
        <div className={style.postReposted}>
          <svg
            viewBox="0 0 24 24"
            width={16}
            aria-hidden="true"
            className="r-14j79pv r-4qtqp9 r-yyyyoo r-10ptun7 r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1janqcz"
          >
            <g>
              <path d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"></path>
            </g>
          </svg>
          재게시했습니다
        </div>
      )}
      <div className={style.postWrapper}>
        <div className={style.postUserSection}>
          <Link
            href={`/${target.User.id}`}
            className={style.postUserImage}
            onClick={stopPropagation}
          >
            <img src={target.User.image} alt={target.User.nickname} />
            <div className={style.postShade} />
          </Link>
        </div>
        <div className={style.postBody}>
          <div className={style.postMeta}>
            <Link href={`/${target.User.id}`} onClick={stopPropagation}>
              <span className={style.postUserName}>{target.User.nickname}</span>
              &nbsp;
              <span className={style.postUserId}>@{target.User.id}</span>
              &nbsp; · &nbsp;
            </Link>
            <span className={style.postDate}>
              {dayjs(target.createdAt).fromNow(true)}
            </span>
          </div>
          {target.Parent && (
            <div>
              <Link
                href={`/${target.Parent.User.id}`}
                style={{ color: "rgb(29, 155, 240)" }}
                onClick={stopPropagation}
              >
                @{target.Parent.User.id}
              </Link>{" "}
              님에게 보내는 답글
            </div>
          )}
          <div>{target.content}</div>
          {!noImage && (
            <div>
              <PostImages post={target} />
            </div>
          )}
          <ActionButtons post={target} />
        </div>
      </div>
    </PostArticle>
  );
}
