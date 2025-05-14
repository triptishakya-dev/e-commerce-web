import { dbConnect } from "@/lib/dbConnect";
import productModels from "@/Models/productModels";

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = await  params;
    console.log( id);

    await dbConnect();
    console.log("[API] Connected to database");

    const product = await productModels.findById(id);
    console.log("[API] product found:", product);

    if (!product) {
      console.warn("[API] No product found with ID:", id);
      return NextResponse.json({ message: "product not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "product fetched successfully", data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("[API] Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
