import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: check if current user exists by checking JWT

    const { title, price, image, category, description } = body;

    if (!title || !price || !image || !category || !description) {
      return new NextResponse("Missing required fields!", { status: 400 });
    }

    // check if relative category exists
    const matchedCategory = await prismadb.category.findUnique({
      where: {
        name: category,
      },
    });

    // if exist, then create product
    if (matchedCategory) {
      await prismadb.product.create({
        data: {
          categoryId: matchedCategory?.id,
          title,
          image,
          price,
          description,
        },
      });
    } else {
      // else, create category
      await prismadb.category.create({
        data: {
          name: category,
          products: {
            create: {
              title,
              image,
              price,
              description,
            },
          },
        },
      });
    }

    return new NextResponse("successful!", { status: 200 });
  } catch (error) {
    console.log("PRODUCT_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
