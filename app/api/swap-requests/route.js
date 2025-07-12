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
          offerSkill: { include: { skill: true } },
          wantSkill: { include: { skill: true } },
        },
      }),
      prisma.swapRequest.findMany({
        where: { toUserId: userId },
        include: {
          fromUser: true,
          offerSkill: { include: { skill: true } },
          wantSkill: { include: { skill: true } },
        },
      }),
    ]);

    return Response.json({ sent, received });
  } catch (err) {
    console.error("GET /swap-requests error:", err);
    return new Response("Failed to fetch swap requests", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) {
      return new Response("Unauthorized", { status: 401 });
    }

    const token = auth.split(" ")[1];
    const { id: fromUserId } = jwt.verify(token, process.env.JWT_SECRET);

    const { toUserId, offerSkillName, wantSkillName } = await req.json();

    console.log("Incoming request:", { toUserId, offerSkillName, wantSkillName });

    const offerSkill = await prisma.userSkill.findFirst({
      where: {
        userId: fromUserId,
        type: "OFFER",
        skill: { name: offerSkillName },
      },
    });

    const wantSkill = await prisma.userSkill.findFirst({
      where: {
        userId: toUserId,
        type: "WANT",
        skill: { name: wantSkillName },
      },
    });

    if (!offerSkill || !wantSkill) {
      console.warn("Missing offerSkill or wantSkill:", { offerSkill, wantSkill });
      return new Response("Invalid skills", { status: 400 });
    }

    await prisma.swapRequest.create({
      data: {
        fromUserId,
        toUserId,
        offerSkillId: offerSkill.id,
        wantSkillId: wantSkill.id,
      },
    });

    return new Response("Swap request sent", { status: 201 });
  } catch (err) {
    console.error("POST /swap-requests error:", err);
    return new Response("Failed to send request", { status: 500 });
  }
}
