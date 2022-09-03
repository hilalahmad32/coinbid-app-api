import mongoose from "mongoose";

const userWalletSchema = new mongoose.Schema({
  coins: { type: Number },
  users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  price: { type: Number, default: 0 },
  counter: { type: Number, default: 0 },
  total_ads: { type: Number, default: 5 },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const UserWallet = mongoose.model("UserWallet", userWalletSchema);
export default UserWallet;
