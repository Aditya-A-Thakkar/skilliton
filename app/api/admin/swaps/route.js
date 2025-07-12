import prisma from '@/lib/prisma';

export async function GET() {
  const stats = await prisma.swapRequest.groupBy({
    by: ['status'],
    _count: true,
  });

  const result = {};
  for (const row of stats) {
    result[row.status] = row._count;
  }

  return Response.json(result);
}
