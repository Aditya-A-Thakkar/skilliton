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

export async function POST(req) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return new Response("Unauthorized", { status: 401 });

    const token = auth.split(" ")[1];
    const { id: fromUserId } = jwt.verify(token, process.env.JWT_SECRET);

    const { toUserId, offerSkillName, wantSkillName } = await req.json();

    // Find offered skill by current user
    const offerSkill = await prisma.userSkill.findFirst({
      where: {
        userId: fromUserId,
        type: "OFFER",
        skill: {
          name: offerSkillName,
        },
      },
    });

    if (!offerSkill) return new Response("Offer skill not found", { status: 400 });

    // Find wanted skill from the other user
    const wantSkill = await prisma.userSkill.findFirst({
      where: {
        userId: toUserId,
        type: "OFFER", // <- we want to get what THEY OFFER (you want it)
        skill: {
          name: wantSkillName,
        },
      },
    });

    if (!wantSkill) return new Response("Want skill not found", { status: 400 });

    const newRequest = await prisma.swapRequest.create({
      data: {
        fromUserId,
        toUserId,
        offerSkillId: offerSkill.id,
        wantSkillId: wantSkill.id,
        status: "PENDING",
      },
    });

    return Response.json(newRequest);
  } catch (err) {
    console.error("POST /swap-requests error:", err);
    return new Response("Failed to send request", { status: 500 });
  }
}
