export async function POST(req) {
  const { message } = await req.json();
  console.log("Broadcast message:", message);
  return Response.json({ success: true });
}
