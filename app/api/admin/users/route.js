import prisma from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    include: {
      skills: {
        include: { skill: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return Response.json(users);
}
