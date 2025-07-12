import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) return new Response('Unauthorized', { status: 401 });

    const token = auth.split(' ')[1];
    const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);

    const swaps = await prisma.swapRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [
          { fromUserId: userId },
          { toUserId: userId }
        ]
      },
      include: {
        fromUser: true,
        toUser: true,
        offerSkill: { include: { skill: true } },
        wantSkill: { include: { skill: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    const formatted = swaps.map(swap => {
      const isSender = swap.fromUserId === userId;
      const partner = isSender ? swap.toUser : swap.fromUser;

      return {
        id: swap.id,
        partnerName: partner.name,
        partnerLocation: partner.location,
        offerSkillName: isSender ? swap.offerSkill.skill.name : swap.wantSkill.skill.name,
        wantSkillName: isSender ? swap.wantSkill.skill.name : swap.offerSkill.skill.name,
        startDate: swap.createdAt.toISOString().split('T')[0],
        endDate: swap.endDate ? swap.endDate.toISOString().split('T')[0] : null,
        rating: swap.rating || null
      };
    });

    return Response.json(formatted);
  } catch (err) {
    console.error('GET /swaps error:', err);
    return new Response('Failed to fetch swap history', { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = req.headers.get('authorization');
    if (!auth?.startsWith('Bearer ')) return new Response('Unauthorized', { status: 401 });

    const token = auth.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET); // Just check valid, userId not needed here

    const swapId = parseInt(params.id);
    const { endDate, rating } = await req.json();

    const data = {};
    if (endDate) data.endDate = new Date(endDate);
    if (rating != null) data.rating = rating;

    await prisma.swapRequest.update({
      where: { id: swapId },
      data
    });

    return new Response('Swap updated', { status: 200 });
  } catch (err) {
    console.error('PATCH /swaps/:id error:', err);
    return new Response('Failed to update swap', { status: 500 });
  }
}
