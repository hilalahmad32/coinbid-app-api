import mongoose from "mongoose";

const priceCoinSchema = new mongoose.Schema({
  coins: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const PriceCoin = mongoose.model("PriceCoin", priceCoinSchema);
export default PriceCoin;
