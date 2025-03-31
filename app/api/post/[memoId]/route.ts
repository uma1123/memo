import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prismaClient";

// 取得
export async function GET(
  request: NextRequest,
  context: { params: { memoId: string } } // Corrected type definition
) {
  const { memoId } = context.params; // context.params から取得

  try {
    const memoDetailData = await prisma.post.findUnique({
      where: { id: Number(memoId) },
    });

    if (!memoDetailData) {
      return NextResponse.json(
        { error: "メモが見つかりません" },
        { status: 404 }
      );
    }

    return NextResponse.json(memoDetailData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "メモの取得に失敗しました" },
      { status: 500 }
    );
  }
}

// 削除
export async function DELETE(
  request: NextRequest,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = params;

  try {
    const deleteMemo = await prisma.post.delete({
      where: { id: Number(memoId) },
    });
    return NextResponse.json(deleteMemo, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "メモの削除に失敗しました" },
      { status: 500 }
    );
  }
}

// 更新
export async function PUT(
  request: NextRequest,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = params;
  const { title, content } = await request.json();

  try {
    const updateMemo = await prisma.post.update({
      where: { id: Number(memoId) },
      data: { title, content },
    });
    return NextResponse.json(updateMemo);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "メモの更新に失敗しました" },
      { status: 500 }
    );
  }
}

// お気に入りトグル
export async function PATCH(
  request: NextRequest,
  { params }: { params: { memoId: string } }
) {
  const { memoId } = params;
  const { isFavorite } = await request.json();

  try {
    const updateMemo = await prisma.post.update({
      where: { id: Number(memoId) },
      data: { isFavorite },
    });
    return NextResponse.json(updateMemo, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "メモの更新に失敗しました" },
      { status: 500 }
    );
  }
}
