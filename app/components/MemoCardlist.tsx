import React from "react";
import MemoCard from "./MemoCard";
import { MemoData } from "../types/types";

interface MemoAllDataProps {
  memoAllData: MemoData[];
}

const MemoCardList = ({ memoAllData }: MemoAllDataProps) => {
  return (
    <div className="grid lg:grid-cols-3 px-4 py-4 gap-4">
      {memoAllData.map((memoData: MemoData) => (
        <MemoCard key={memoData.id} memoData={memoData} />
      ))}
    </div>
  );
};

export default MemoCardList;
