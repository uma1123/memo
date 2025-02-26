import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

export async function GET(
  request: Request,
  { params }: { params: { memoId: string } }
) {
  const memoId = params.memoId;
  const memoDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(memoId),
    },
  });
  return NextResponse.json(memoDetailData);
}

export async function DELETE(
  req: Request,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = params;

  try {
    //prisma clientのdeleteメソッドを使って、Postテーブルから指定した」IDのメモを削除する
    const deleteMemo = await prisma.post.delete({
      where: { id: Number(memoId) },
    });
    //削除したメモのデータを200 OKステータスでJSON形式で返す
    return NextResponse.json(deleteMemo, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "メモの削除に失敗しました" });
  }
  //処理内容がDELETE以外のメソッドの場合
}
