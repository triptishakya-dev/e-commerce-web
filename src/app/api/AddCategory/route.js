import { dbConnect } from "@/lib/dbConnect";
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
      )}

      console.log("Database is connecting............")
        await dbConnect();
    console.log("Database is connected.....")

   
    const imageURL = await uploadImage(image, "image");
    console.log(imageURL);
    if (!imageURL) {
      return NextResponse.json(
        { message: "Image upload failed" },
        { status: 500 }
      );
    }

    const newcategory = new categoryModal({
      name,
      description,
      image: imageURL.secure_url,
    });
    console.log(newcategory);

    const savedBlog = await newBlog.save();
    

    return NextResponse.json(
      { message: "category added successfully", data: savedcategory },
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

    const allcategory = await categoryModal.find();

    if (!allcategory) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "category fetched sucessfully", data: allcategory },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
