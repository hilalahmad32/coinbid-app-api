import mongoose from "mongoose";

const exchangeCoinSchema = new mongoose.Schema({
  coins: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ExchangeCoin = mongoose.model("ExchangeCoin", exchangeCoinSchema);
export default ExchangeCoin;
