import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const auth = req.headers.get("authorization");
        if (!auth || !auth.startsWith("Bearer ")) {
            return new Response("Unauthorized", { status: 401 });
        }

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            include: {
                skills: {
                    include: {
                        skill: true,
                    },
                },
            },
        });

        if (!user) return new Response("User not found", { status: 404 });

        const skillsOffered = user.skills
            .filter((s) => s.type === "OFFER")
            .map((s) => s.skill.name);

        const skillsWanted = user.skills
            .filter((s) => s.type === "WANT")
            .map((s) => s.skill.name);

        return new Response(
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                location: user.location,
                profilePhoto: user.profilePhoto,
                skillsOffered,
                skillsWanted,
            }),
            { headers: { "Content-Type": "application/json" } }
        );
    } catch (err) {
        console.error("GET /api/user failed", err);
        return new Response("Server error", { status: 500 });
    }
}
