import { prisma } from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  //クライアントからのリクエストがDELETEメソッドであるかを確認する
  if (req.method === "DELETE") {
    try {
      //prisma clientのdeleteメソッドを使って、Postテーブルから指定した」IDのメモを削除する
      const deleteMemo = await prisma.post.delete({
        where: { id: Number(id) },
      });
      //削除したメモのデータを200 OKステータスでJSON形式で返す
      res.status(200).json(deleteMemo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ err: "メモの削除に失敗しました" });
    }
    //処理内容がDELETE以外のメソッドの場合
  } else {
    //このエンドポイントがサポートするHTTPメソッドとしてDELETEだけを指定する
    res.setHeader("Allow", ["DELETE"]);
    //このメソッドは許可されていないメッセ―ジを返す
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
