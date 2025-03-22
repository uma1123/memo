"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Star, Clock } from "lucide-react";
import Link from "next/link";

interface MemoHeaderProps {
  onFilterChange: (filter: string) => void;
}

export default function MemoHeaderAlt({ onFilterChange }: MemoHeaderProps) {
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
              <TabsTrigger value="all" onClick={() => onFilterChange("all")}>
                すべて
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                className="flex items-center gap-1"
                onClick={() => onFilterChange("favorites")}
              >
                <Star className="h-4 w-4" />
                お気に入り
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="flex items-center gap-1"
                onClick={() => onFilterChange("recent")}
              >
                <Clock className="h-4 w-4" />
                最近
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
