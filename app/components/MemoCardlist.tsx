"use client";
import React, { useState } from "react";
import MemoCard from "./MemoCard";
import { MemoData } from "../types/types";
import { useRouter } from "next/navigation";

interface MemoAllDataProps {
  memoAllData: MemoData[];
}

const MemoCardList = ({ memoAllData }: MemoAllDataProps) => {
  const [memos, setMemos] = useState(memoAllData);
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.refresh();
        setMemos((prev) => prev.filter((memo) => memo.id !== id));
      } else {
        console.error("削除に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {memoAllData.map((memoData: MemoData) => (
        <MemoCard
          key={memoData.id}
          memoData={memoData}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MemoCardList;
