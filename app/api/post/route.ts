import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";

export async function GET() {
  const allMemoPost = await prisma.post.findMany();
  return NextResponse.json(allMemoPost);
}

export async function POST(request: Request) {
  const { title, content } = await request.json();
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return NextResponse.json(post);
}
