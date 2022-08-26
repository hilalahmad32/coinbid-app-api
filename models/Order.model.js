import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  order_id: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  coin: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
