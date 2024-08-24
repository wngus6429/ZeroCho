import { ReactNode } from "react";
import style from "@/app/(afterLogin)/layout.module.css";
import Link from "next/link";
import Image from "next/image";
import ZLogo from "../../../public/zlogo.jpg";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import TrendSection from "@/app/(afterLogin)/_component/TrendSection";
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";
import { auth } from "@/auth";

type Props = { children: ReactNode; modal: ReactNode };
export default async function AfterLoginLayout({ children, modal }: Props) {
  const session = await auth();
  return (
    <div className={style.container}>
      <header className={style.leftSectionWrapper}>
        <section className={style.leftSection}>
          <div className={style.leftSectionFixed}>
            <Link className={style.logo} href={session?.user ? "/home" : "/"}>
              <div className={style.logoPill}>
                <Image src={ZLogo} alt="z.com로고" width={40} height={40} />
              </div>
            </Link>
            {session?.user && (
              <>
                <nav>
                  <ul>
                    <NavMenu />
                  </ul>
                  <Link href="/compose/tweet" className={style.postButton}>
                    <span>게시하기</span>
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="r-jwli3a r-4qtqp9 r-yyyyoo r-1472mwg r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
                    ></svg>
                  </Link>
                </nav>
              </>
            )}
            <LogoutButton />
          </div>
        </section>
      </header>
      <div className={style.rightSectionWrapper}>
        <div className={style.rightSectionInner}>
          <main className={style.main}>{children}</main>
          <section className={style.rightSection}>
            <RightSearchZone />
            <TrendSection />
            <div className={style.followRecommend}>
              <h3>팔로우 추천</h3>
              <FollowRecommend />
              <FollowRecommend />
              <FollowRecommend />
            </div>
          </section>
        </div>
      </div>
      {modal}
    </div>
  );
}
