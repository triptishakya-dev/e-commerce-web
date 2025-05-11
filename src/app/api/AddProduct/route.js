import { dbConnect } from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImage";
import productModels from "@/Models/productModels";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");
    const price = formData.get("price");
    const discountPrice = formData.get("discountPrice");
    const colour = formData.get("colour");
    const material = formData.get("material");
    const category = formData.get("category");

    console.log(name);
    console.log(description);
    console.log(image);
    console.log(price);
    console.log(discountPrice);
    console.log(colour);
    console.log(material);
    console.log(category);

    if (
      !name ||
      !description ||
      !image ||
      !price ||
      !discountPrice ||
      !colour ||
      !material ||
      !category
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Database is connecting............");
    await dbConnect();
    console.log("Database is connected.....");

    const imageURL = await uploadImage(image, "Productimage");
    console.log("Image uploaded:", imageURL);

    if (!imageURL) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 400 }
      );
    }

    const newProduct = new productModels({
      name,
      description,
      image: imageURL.secure_url,
      price,
      discountPrice,
      colour,
      material,
      category,
    });

    const savedProduct = await newProduct.save(); // ✅ FIXED: save from instance
    console.log("saved Product :", savedProduct);

    return NextResponse.json(
      { message: "Category added successfully", data: savedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    console.log("connecting to db");

    await dbConnect();
    console.log("connected to db");

    const allproduct = await productModels.find();

    if (!productModels) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Category fetched sucessfully", data: allproduct },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
