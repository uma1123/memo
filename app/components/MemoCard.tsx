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
import { FaStar, FaRegStar } from "react-icons/fa";
interface MemoDataProps {
  memoData: MemoData;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, content: string) => void;
  onFavoriteToggle: (id: number, newState: boolean) => void; // 型定義を追加
}

const MemoCard = ({
  memoData,
  onDelete,
  onUpdate,
  onFavoriteToggle,
}: MemoDataProps) => {
  const { id, title, content, isFavorite, createdAt } = memoData; // createdAtを追加

  return (
    <Card className="w-100 h-60 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 flex flex-col justify-between relative">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 truncate overflow-hidden">
          {title}
        </CardTitle>
        <button
          className="absolute top-10 right-10"
          onClick={() => onFavoriteToggle(id, !isFavorite)}
        >
          {isFavorite ? (
            <FaStar size={20} className="text-yellow-400" title="お気に入り" />
          ) : (
            <FaRegStar
              size={20}
              className="text-yellow-400"
              title="お気に入り"
            />
          )}
        </button>
      </CardHeader>
      <CardContent className="text-gray-600 truncate overflow-hidden">
        {content}
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Link
          href={`/memo-posts/${id}`}
          className="text-blue-600 hover:text-blue-800 transition"
          onClick={() => onUpdate(id, title, content)}
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
      <div className="text-gray-500 text-sm mt-2">
        作成日時: {new Date(createdAt).toLocaleString()}
      </div>
    </Card>
  );
};

export default MemoCard;
