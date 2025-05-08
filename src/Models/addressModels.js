import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: number,
      required: true,
    },
    streetNo: {
      type: number,
      required: true,
    },
    city: {
      type: string,
      required: true,
    },
    state: {
      type: string,
      required: true,
    },
    landmark: {
        type: string,
        required: true,
    },
    pinCode: {
      type: number,
      required: true,
    },
    country: {
      type: string,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Address || mongoose.model("address", addressSchema);
