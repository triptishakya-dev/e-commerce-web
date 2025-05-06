import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required : true,
    },

    description: {
       type: mongoose.Schema.Types.ObjectId,
            ref: "category",
    },

    image: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product || mongoose.model("product", productSchema);
