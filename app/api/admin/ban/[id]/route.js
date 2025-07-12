import prisma from '@/lib/prisma';

export async function POST(_, { params }) {
  const { id } = params;

  await prisma.user.update({
    where: { id: parseInt(id) },
    data: { isBanned: true },
  });

  return Response.json({ success: true });
}
