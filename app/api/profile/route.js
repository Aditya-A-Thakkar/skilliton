import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function PUT(req) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return new Response("Unauthorized", { status: 401 });

        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { name, location, offerSkills, wantSkills } = await req.json();

        await prisma.user.update({
            where: { id: userId },
            data: { name, location },
        });

        // delete old skills
        await prisma.userSkill.deleteMany({ where: { userId } });

        const allSkills = [...new Set([...offerSkills, ...wantSkills])];

        const skillMap = {};
        for (const skillName of allSkills) {
            const skill = await prisma.skill.upsert({
                where: { name: skillName },
                update: {},
                create: { name: skillName },
            });
            skillMap[skillName] = skill.id;
        }

        const userSkillsData = [
            ...offerSkills.map((name) => ({
                userId,
                skillId: skillMap[name],
                type: "OFFER",
            })),
            ...wantSkills.map((name) => ({
                userId,
                skillId: skillMap[name],
                type: "WANT",
            })),
        ];

        await prisma.userSkill.createMany({ data: userSkillsData });

        return new Response("Profile updated", { status: 200 });
    } catch (err) {
        console.error("Profile update error:", err);
        return new Response("Server error", { status: 500 });
    }
}
