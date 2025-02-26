import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MemoData } from "../types/types";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";

interface MemoDataProps {
  memoData: MemoData;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, content: string) => void;
}

const MemoCard = ({ memoData, onDelete }: MemoDataProps) => {
  const { id, title, content } = memoData;

  return (
    <Card className="w-100 h-60 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-600">{content}</CardContent>
      <CardFooter className="flex justify-between items-center">
        <Link
          href={`/memo-posts/${id}`}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <CiEdit size={30} title="編集する" />
        </Link>
        <button
          className="text-red-500 hover:text-red-700 transition"
          onClick={() => onDelete(id)}
        >
          <FaRegTrashAlt size={20} title="削除する" />
        </button>
      </CardFooter>
    </Card>
  );
};

export default MemoCard;
