import mongoose from "mongoose";

const bounesCoin = new mongoose.Schema({
  coins: {
    type: Number,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});
const BounesCoin = mongoose.model("BounesCoin", bounesCoin);
export default BounesCoin;
