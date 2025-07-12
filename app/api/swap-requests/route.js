import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return new Response("Unauthorized", { status: 401 });

    const token = auth.split(" ")[1];
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const [sent, received] = await Promise.all([
      prisma.swapRequest.findMany({
        where: { fromUserId: userId },
        include: {
          toUser: true,
          offerSkill: true,
          wantSkill: true,
        },
      }),
      prisma.swapRequest.findMany({
        where: { toUserId: userId },
        include: {
          fromUser: true,
          offerSkill: true,
          wantSkill: true,
        },
      }),
    ]);

    return Response.json({ sent, received });
  } catch (err) {
    console.error("GET /swap-requests error:", err);
    return new Response("Failed to fetch swap requests", { status: 500 });
  }
}
