import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

//取得
export async function GET(
  request: Request,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = await params;
  const memoDetailData = await prisma.post.findUnique({
    where: {
      id: Number(memoId),
    },
  });
  return NextResponse.json(memoDetailData);
}

//削除
export async function DELETE(
  request: Request,
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

//更新
export async function PUT(
  request: Request,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = params;
  const { title, content } = await request.json(); //リクエストボディから取得

  try {
    const updateMemo = await prisma.post.update({
      where: { id: Number(memoId) },
      data: { title, content },
    });
    return NextResponse.json(updateMemo);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "メモの更新に失敗しました" });
  }
}
