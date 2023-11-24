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
    const sortStr = searchParams.get("sort");
    const orderStr = searchParams.get("order");

    if (category === "everything") {
      // sort by date
      if (sortStr === "date") {
        // sort all products
        const products = await prismadb.product.findMany({
          orderBy: {
            createdAt: orderStr,
          },
        });
        // pick 9 items according to pageNum
        const sortedProducts = products.slice((pageNum - 1) * 9, pageNum * 9);
        return NextResponse.json(sortedProducts);
      }

      // sort by price
      if (sortStr === "price") {
        // sort all products
        // TODO: price is string, there is no api for natural sorting in prisma, use prisma.$queryRaw to write MongoDB query
        const products = await prismadb.product.findMany({
          orderBy: {
            price: orderStr,
          },
        });
        console.log("----product", products);
        // pick 9 items according to pageNum
        const sortedProducts = products.slice((pageNum - 1) * 9, pageNum * 9);
        return NextResponse.json(sortedProducts);
      }

      // sort by default
      const allProducts = await prismadb.product.findMany({
        skip: (pageNum - 1) * 9,
        take: 9, // one page display nine products
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
