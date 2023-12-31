import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prismadb.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
