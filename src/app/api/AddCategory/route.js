import { dbConnect } from "@/lib/dbConnect";
import uploadImage from "@/lib/uploadImage";
import categoryModels from "@/Models/categoryModels";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const image = formData.get("image");

    if (!name || !description || !image) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("Database is connecting............");
    await dbConnect();
    console.log("Database is connected.....");

    const imageURL = await uploadImage(image, "Categoryimage");
    console.log("Image uploaded:", imageURL);

    if (!imageURL) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 400 }
      );
    }

    const newCategory = new categoryModels({
      name,
      description,
      image: imageURL.secure_url,
    });

    const savedCategory = await newCategory.save(); // ✅ FIXED: save from instance
    console.log("Saved category:", savedCategory);

    return NextResponse.json(
      { message: "Category added successfully", data: savedCategory },
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

    const allCategory = await categoryModels.find();

    if (!allCategory) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Category fetched sucessfully", data: allCategory},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
