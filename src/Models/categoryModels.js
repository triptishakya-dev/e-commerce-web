import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required : true,
    },

    description: {
      type: String,
      required : true,
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

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
