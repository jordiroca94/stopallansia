import mongoose, { Schema, models } from "mongoose";

const paymentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentID: { type: String, required: true },
  },
  { timestamps: true }
);

const Payment = models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
