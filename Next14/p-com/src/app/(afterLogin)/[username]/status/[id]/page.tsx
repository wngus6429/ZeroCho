import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from "./singlePost.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getSinglePost } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost";
import { getComments } from "@/app/(afterLogin)/[username]/status/[id]/_lib/getComments";
import React from "react";
import Comments from "@/app/(afterLogin)/[username]/status/[id]/_component/Comments";
import { getUserServer } from "../../_lib/getUserServer";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { User } from "@/model/User";
import { Post } from "@/model/Post";

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({ queryKey: ["users", params.username] });
  const post: Post = await getSinglePostServer({ queryKey: ["posts", params.id] });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    openGraph: {
      title: `Z에서 ${user.nickname} 님 : ${post.content}`,
      description: post.content,
      images: post.Images?.map((v) => ({
        url: `https://z.nodebird.com${v.link}`, // /upload
        width: 400,
        height: 400,
      })) || [
        {
          url: `https://z.nodebird.com${user.image}`, // /upload
          width: 400,
          height: 400,
        },
      ],
    },
  };
}

type Props = {
  params: { id: string; username: string };
};

export default async function Page({ params }: Props) {
  const { id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey: ["posts", id], queryFn: getSinglePostServer });
  await queryClient.prefetchQuery({ queryKey: ["posts", id, "comments"], queryFn: getComments });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
