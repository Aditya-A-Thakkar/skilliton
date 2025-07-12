import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function PUT(req) {
    try {
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) return new Response("Unauthorized", { status: 401 });

        const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

        const { currentPassword, newPassword } = await req.json();

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return new Response("User not found", { status: 404 });

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) return new Response("Incorrect current password", { status: 403 });

        const hashed = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashed },
        });

        return new Response("Password updated", { status: 200 });
    } catch (err) {
        console.error("Password change error:", err);
        return new Response("Server error", { status: 500 });
    }
}
