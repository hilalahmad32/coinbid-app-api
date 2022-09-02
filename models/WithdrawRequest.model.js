import mongoose from "mongoose";

const withDrawRequestSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  money: {
    type: String,
    required: true,
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
const WithDrawRequest = mongoose.model(
  "WithDrawRequest",
  withDrawRequestSchema,
);
export default WithDrawRequest;
