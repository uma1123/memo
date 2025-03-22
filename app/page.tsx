import MemoCardlist from "./components/MemoCardlist";
import { MemoData } from "./types/types";

//メモデータを全て取得
async function getMemoAllData() {
  const response = await fetch("api/post", {
    cache: "no-store",
  });
  const memoAllData = await response.json();
  return memoAllData;
}
export default async function Home() {
  const memoAllData: MemoData[] = await getMemoAllData();

  return (
    <main>
      <MemoCardlist memoAllData={memoAllData} />
    </main>
  );
}
