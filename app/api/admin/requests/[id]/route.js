import prisma from '@/lib/prisma';

export async function PUT(req, { params }) {
  const { id } = params;
  const { status } = await req.json();

  const validStatuses = ['PENDING', 'ACCEPTED', 'REJECTED', 'DELETED'];
  if (!validStatuses.includes(status)) {
    return new Response("Invalid status", { status: 400 });
  }

  const updated = await prisma.swapRequest.update({
    where: { id: parseInt(id) },
    data: { status },
  });

  return Response.json(updated);
}
