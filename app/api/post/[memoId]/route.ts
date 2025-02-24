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
