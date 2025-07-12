import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        const { email, password, name, location, skillsWant = [], skillsNeed = [] } = await req.json();

        if (!email || !password || !name) {
            return new Response("Missing required fields", { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return new Response("User already exists", { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                location,
                profilePhoto: "",
            },
        });
        console.log("Created user:", user);

        const allSkills = [
            ...skillsWant.map((skill) => ({ name: skill, type: "WANT" })),
            ...skillsNeed.map((skill) => ({ name: skill, type: "OFFER" })),
        ];

        for (const { name: skillRaw, type } of allSkills) {
            const skill = await prisma.skill.upsert({
                where: { name: skillRaw },
                update: {},
                create: { name: skillRaw },
            });

            await prisma.userSkill.create({
                data: {
                    userId: user.id,
                    skillId: skill.id,
                    type,
                },
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Register error:", err);
        return new Response("Server error", { status: 500 });
    }
}
