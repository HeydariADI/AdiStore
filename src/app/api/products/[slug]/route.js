// 
export async function GET(req, context) {
  console.log("CONTEXT:", context);
  console.log("PARAMS:", context.params);
  return Response.json({ ok: true });
}