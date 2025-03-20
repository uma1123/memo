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

  // メモ削除処理
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setMemos((prev) => prev.filter((memo) => memo.id !== id));
        router.refresh();
      } else {
        console.error("削除に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  // メモ更新処理
  const handleUpdate = async (id: number, title: string, content: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (response.ok) {
        const updatedMemo = await response.json();
        setMemos((prev) =>
          prev.map((memo) => (memo.id === id ? updatedMemo : memo))
        );
        router.refresh();
      } else {
        console.error("更新に失敗しました");
      }
    } catch (error) {
      console.error("更新時にエラーが発生しました", error);
    }
  };

  // お気に入りトグル処理
  const handleFavoriteToggle = async (id: number, newState: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/api/post/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFavorite: newState }),
      });

      if (response.ok) {
        setMemos((prev) =>
          prev.map((memo) =>
            memo.id === id ? { ...memo, isFavorite: newState } : memo
          )
        );
      } else {
        console.error("お気に入り状態の更新に失敗しました");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
  };

  if (!memos) return <p>読み込み中...</p>;

  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {memos.map((memoData: MemoData) => (
        <MemoCard
          key={memoData.id}
          memoData={memoData}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default MemoCardList;
