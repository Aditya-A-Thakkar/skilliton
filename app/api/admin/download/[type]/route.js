import prisma from '@/lib/prisma';

export async function GET(_, { params }) {
  const { type } = params;

  let data = [];

  if (type === 'user-activity') {
    data = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isBanned: true,
        isPublic: true,
        location: true,
      },
    });
  } else if (type === 'feedback') {
    // Placeholder — make sure feedback model exists
    data = await prisma.feedback.findMany();
  } else if (type === 'swap-stats') {
    data = await prisma.swapRequest.findMany({
      select: {
        id: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        fromUserId: true,
        toUserId: true,
      },
    });
  } else {
    return new Response("Invalid download type", { status: 400 });
  }

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename=${type}.json`,
    },
  });
}
