import mongoose from "mongoose";

const coinSchema = new mongoose.Schema({
  coin_id: {
    type: String,
    required: true,
  },
  coins: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Coin = mongoose.model("Coin", coinSchema);

export default Coin;
