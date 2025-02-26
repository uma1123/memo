"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { MemoData } from "@/app/types/types";

interface MemoProps {
  memoData: MemoData;
}

const MemoEditPage = () => {
  const router = useRouter();
  const { memoId } = useParams<{ memoId: string }>();
  const [memo, setMemo] = useState<MemoProps | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // メモデータ取得
  useEffect(() => {
    const fetchMemo = async () => {
      const res = await fetch(`http://localhost:3000/api/post/${memoId}`);
      if (res.ok) {
        const data = await res.json();
        setMemo(data);
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error("メモ取得に失敗しました");
      }
    };
    fetchMemo();
  }, [memoId]);

  // メモ更新処理
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/post/${memoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      router.push("/"); // 更新後にトップページへリダイレクト
    } else {
      console.error("メモの更新に失敗しました");
    }
  };

  if (!memo) return <p>読み込み中...</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">メモを編集</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-full border rounded-lg p-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="内容"
          className="w-full border rounded-lg p-2 h-48"
          required
        />
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            onClick={() => router.back()}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            更新
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemoEditPage;
