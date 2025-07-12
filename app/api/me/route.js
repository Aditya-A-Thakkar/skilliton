import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const auth = req.headers.get("authorization");
        const token = auth?.split(" ")[1];
        if (!token) return new Response("Unauthorized", { status: 401 });

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                skills: { include: { skill: true } },
            },
        });

        if (!user) return new Response("User not found", { status: 404 });

        return new Response(JSON.stringify(user), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("GET /me error:", err);
        return new Response("Error fetching user", { status: 500 });
    }
}
