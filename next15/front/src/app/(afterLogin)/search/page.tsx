import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "./_component/SearchResult";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
  // Next15 searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { q } = await searchParams;
  console.log("parent", parent);
  return {
    title: `${q} - 검색 / Z`,
    description: `${q} - 검색 / Z`,
  };
}

// Next15 export default async function Search({ searchParams }: Props) {
export default async function Search({ searchParams }: Props) {
  // Next15 const { q } = await searchParams;
  const query = await searchParams;
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            {/* <SearchForm q={searchParams.q} /> */}
            <SearchForm q={query.q} f={query.f} pf={query.pf} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={query} />
      </div>
    </main>
  );
}
