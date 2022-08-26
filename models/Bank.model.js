import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  bank_name: {
    type: String,
    required: true,
  },
  account_number: { type: String, required: true },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ifsc_code: { type: String, required: true },
  upi_id: { type: String, required: true },
  amount: { type: Number, default: 0 },
  status: { type: String, default: "pending" },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;
