import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { MemoData } from "../types/types";
import Link from "next/link";

interface MemoDataProps {
  memoData: MemoData;
}

const MemoCard = ({ memoData }: MemoDataProps) => {
  const { id, title, content, createdAt } = memoData;
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
      <Link href={`/memo-posts/${id}`}>詳細</Link>
    </Card>
  );
};

export default MemoCard;
