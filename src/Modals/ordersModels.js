import mongoose from "mongoose";

const ordersSchema = mongoose.Schema(
  {
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }],
    totalAmount: {
      type: number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "UPI", "CreditCard", "DebitCard"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Orders || mongoose.model("orders", ordersSchema);
