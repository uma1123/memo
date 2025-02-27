"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Star, Clock, Filter, SortAsc } from "lucide-react";
import Link from "next/link";

export default function MemoHeaderAlt() {
  return (
    <div className="border-b bg-background">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">メモ帳</h1>
          </div>
          <div className="flex items-center gap-2 mt-7">
            <Button>
              <Plus className="mr-2 h-5 w-5" />
              <Link href={"/memo-posts/create"} className="text-xl">
                新規メモ
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">すべて</TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-1"
              >
                <Star className="h-4 w-4" />
                お気に入り
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                最近
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-1 items-center gap-2 md:w-auto">
            <div className="relative flex-1 md:max-w-[300px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="メモを検索..." className="pl-8" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">フィルター</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>すべてのカテゴリー</DropdownMenuItem>
                <DropdownMenuItem>仕事</DropdownMenuItem>
                <DropdownMenuItem>個人</DropdownMenuItem>
                <DropdownMenuItem>アイデア</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SortAsc className="h-4 w-4" />
                  <span className="sr-only">並び替え</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>作成日時（新しい順）</DropdownMenuItem>
                <DropdownMenuItem>作成日時（古い順）</DropdownMenuItem>
                <DropdownMenuItem>タイトル（昇順）</DropdownMenuItem>
                <DropdownMenuItem>タイトル（降順）</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
