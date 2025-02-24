import { MemoData } from "@/app/types/types";
import Link from "next/link";
import React from "react";

async function getDetailMemoData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  }); // 配列で返ってくる
  const memoDetailData: MemoData = await response.json();
  return memoDetailData;
}

const memoDetailPage = async ({ params }: { params: { memoId: string } }) => {
  const memoId = parseInt(params.memoId, 10);
  const memoDetailData = await getDetailMemoData(memoId);
  const { title, content } = memoDetailData;
  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="mb-8">
        <p className="text-gray-900">{content}</p>
      </div>

      <Link
        href={"/"}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
      >
        戻る
      </Link>
    </div>
  );
};

export default memoDetailPage;
