import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return new Response("Unauthorized", { status: 401 });

    const token = auth.split(" ")[1];
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const requestId = parseInt(params.id);

    const request = await prisma.swapRequest.findUnique({ where: { id: requestId } });
    if (!request || request.fromUserId !== userId) {
      return new Response("Unauthorized or not found", { status: 403 });
    }

    await prisma.swapRequest.delete({ where: { id: requestId } });
    return new Response("Deleted", { status: 200 });
  } catch (err) {
    console.error("DELETE swap request error:", err);
    return new Response("Failed to delete", { status: 500 });
  }
}


export async function PATCH(req, { params }) {
  try {
    const auth = req.headers.get("authorization");
    if (!auth?.startsWith("Bearer ")) return new Response("Unauthorized", { status: 401 });

    const token = auth.split(" ")[1];
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const requestId = parseInt(params.id);
    const { status } = await req.json();

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return new Response("Invalid status", { status: 400 });
    }

    const request = await prisma.swapRequest.findUnique({ where: { id: requestId } });
    if (!request || request.toUserId !== userId) {
      return new Response("Unauthorized or not found", { status: 403 });
    }

    await prisma.swapRequest.update({
      where: { id: requestId },
      data: { status },
    });

    return new Response("Updated", { status: 200 });
  } catch (err) {
    console.error("PATCH swap request error:", err);
    return new Response("Failed to update", { status: 500 });
  }
}
