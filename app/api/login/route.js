import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
    try {
        const raw = await req.text();
        console.log("Login raw body:", raw); // 🔍

        const { email, password } = JSON.parse(raw);

        if (!email || !password) {
            return new Response("Missing credentials", { status: 400 });
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return new Response("Invalid email or password", { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return new Response("Invalid email or password", { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Login error:", err);
        return new Response("Server error", { status: 500 });
    }
}
