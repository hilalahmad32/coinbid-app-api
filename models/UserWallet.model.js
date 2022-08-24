import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema({
  coins: { type: Number },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, default: 0 },
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);
export default UserWallet;
