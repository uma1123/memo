"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter } from "next/navigation";
import { MemoData } from "@/app/types/types";
import { formSchema } from "../create/page";

const MemoEditPage = () => {
  const router = useRouter();
  const { memoId } = useParams<{ memoId: string }>();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const [loading, setLoading] = useState(true);

  // メモデータ取得
  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/post/${memoId}`);
        if (!res.ok) throw new Error("メモの取得に失敗しました");

        const data: MemoData = await res.json();
        form.reset({
          title: "",
          content: "",
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMemo();
  }, [memoId, form]);

  // メモ更新処理
  const handleUpdate = async (values: { title: string; content: string }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/post/${memoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("メモの更新に失敗しました");

      router.push("/"); // 更新後にトップページへリダイレクト
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p className="text-center mt-10">読み込み中...</p>;

  return (
    <Form {...form}>
      <div className="max-w-5xl mx-auto my-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">メモを編集</h2>
        <form
          onSubmit={form.handleSubmit(handleUpdate)}
          className="space-y-6 w-full sm:w-3/4 md:w-1/2 mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="タイトルを編集" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">本文</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="メモの内容を編集"
                    className="resize-none h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-400 text-white hover:bg-gray-500"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              更新
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default MemoEditPage;
