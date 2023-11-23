import prismadb from "@/lib/prismadb";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    // TODO: check if current user exists by checking JWT

    const category = params.category;

    if (!category) {
      return new NextResponse("Wrong category!", { status: 404 });
    }

    const searchParams = req.nextUrl.searchParams;
    const pageNum = Number(searchParams.get("page"));
    // one page display nine products

    if (category === "everything") {
      const allProducts = await prismadb.product.findMany({
        skip: (pageNum - 1) * 9,
        take: 9,
      });
      return NextResponse.json(allProducts);
    }

    const categoryProducts = await prismadb.category.findUnique({
      where: {
        name: category,
      },
      include: {
        products: true,
      },
    });

    const products = categoryProducts?.products || [];
    const displayProducts = products.slice((pageNum - 1) * 9, pageNum * 9);
    return NextResponse.json(displayProducts);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
