import { products } from "@/data/products"; // آرایه محصولات

export async function GET(request, { params }) {
  const { id } = params;

  const product = products.find((p) => p._id === id);

  if (!product) {
    return new Response(JSON.stringify({ message: "محصول یافت نشد" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
