import prisma from '@/lib/prisma';

export async function GET() {
  const requests = await prisma.swapRequest.findMany({
    include: {
      fromUser: true,
      toUser: true,
      offerSkill: { include: { skill: true } },
      wantSkill: { include: { skill: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const formatted = requests.map(r => ({
    id: r.id,
    senderName: r.fromUser.name,
    receiverName: r.toUser.name,
    skill: `${r.offerSkill.skill.name} ↔ ${r.wantSkill.skill.name}`,
    status: r.status,
  }));

  return Response.json(formatted);
}
