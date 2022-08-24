import mongoose from "mongoose";

const bounesCoin = new mongoose.Schema({
  coins: {
    type: Number,
  },
});
const BounesCoin = mongoose.model("BounesCoin", bounesCoin);
export default BounesCoin;
