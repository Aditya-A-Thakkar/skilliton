import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth || !auth.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
        }

        const token = auth.split(" ")[1];
        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                skills: {
                    include: { skill: true },
                },
            },
        });

        if (!currentUser) return new Response("User not found", { status: 404 });

        const wants = currentUser.skills
            .filter((s) => s.type === "WANT")
            .map((s) => s.skill.name);

        const offers = currentUser.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => s.skill.name);

        const candidates = await prisma.user.findMany({
            where: {
                id: { not: userId },
                skills: {
                    some: {
                        type: "OFFER",
                        skill: { name: { in: wants } },
                    },
                },
            },
            include: {
                skills: {
                    include: { skill: true },
                },
            },
        });

        const matches = candidates.filter((user) => {
            const userWants = user.skills
                .filter((s) => s.type === "WANT")
                .map((s) => s.skill.name);
            return offers.some((skill) => userWants.includes(skill));
        });

        return new Response(JSON.stringify(matches), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Match API error:", err);
        return new Response("Failed to fetch matches", { status: 500 });
    }
}
