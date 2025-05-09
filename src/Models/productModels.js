import { number } from "framer-motion";
import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: number,
      required: true,
    },

    discountPrice: {
      type: number,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("product", productSchema);
