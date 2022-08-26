import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  transaction: {
    type: String,
    required: true,
  },
  received: {
    type: Boolean,
  },
  status: {
    type: String,
    default: "Pending",
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
