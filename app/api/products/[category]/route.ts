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
          skip: (pageNum - 1) * 9,
          take: 9, // one page display nine products
        });
        return NextResponse.json(products);
      }

      // sort by price
      if (sortStr === "price") {
        // sort all products
        const products = await prismadb.product.findMany({
          orderBy: {
            price: orderStr,
          },
          skip: (pageNum - 1) * 9,
          take: 9, // one page display nine products
        });
        return NextResponse.json(products);
      }

      // sort by default
      const allProducts = await prismadb.product.findMany({
        skip: (pageNum - 1) * 9,
        take: 9, // one page display nine products
      });
      return NextResponse.json(allProducts);
    }

    const currentCategory = await prismadb.category.findUnique({
      where: {
        name: category,
      },
      include: {
        products: true,
      },
    });

    if (sortStr === "date") {
      const categoryProducts = await prismadb.product.findMany({
        where: {
          categoryId: currentCategory?.id,
        },
        skip: (pageNum - 1) * 9,
        take: 9, // one page display nine products
        orderBy: {
          createdAt: orderStr,
        },
      });

      return NextResponse.json(categoryProducts);
    }

    if (sortStr === "price") {
      const categoryProducts = await prismadb.product.findMany({
        where: {
          categoryId: currentCategory?.id,
        },
        skip: (pageNum - 1) * 9,
        take: 9, // one page display nine products
        orderBy: {
          price: orderStr,
        },
      });

      return NextResponse.json(categoryProducts);
    }

    const categoryProducts = await prismadb.product.findMany({
      where: {
        categoryId: currentCategory?.id,
      },
      skip: (pageNum - 1) * 9,
      take: 9, // one page display nine products
    });

    return NextResponse.json(categoryProducts);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
