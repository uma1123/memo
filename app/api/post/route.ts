import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";

export async function GET(request: Request) {
  const allMemoPost = await prisma.post.findMany();
  return NextResponse.json(allMemoPost);
}
