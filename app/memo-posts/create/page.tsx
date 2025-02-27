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
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください" }),
  content: z
    .string()
    .min(2, { message: "本文は2文字以上で入力してください" })
    .max(1000, { message: "本文は1000文字以内で入力してください" }),
});

const CreateMemoPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const { title, content } = value;
    try {
      await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <div className="max-w-5xl mx-auto my-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-6">メモを追加</h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-3/4 mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="タイトルを入力" {...field} />
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
                    placeholder="メモの内容を入力"
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
              className=" py-2 bg-gray-400 text-white hover:bg-gray-500"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              className="py-2 bg-blue-500 text-white hover:bg-blue-600"
            >
              追加
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default CreateMemoPage;
