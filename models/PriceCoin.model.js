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
});

const PriceCoin = mongoose.model("PriceCoin", priceCoinSchema);
export default PriceCoin;
