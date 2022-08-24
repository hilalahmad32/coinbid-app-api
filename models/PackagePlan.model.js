import mongoose from "mongoose";
const packagePlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  expire_date: {
    type: Number,
    required: true,
  },
  banners: {
    type: Number,
    default: 0,
  },
  icons: {
    type: String,
  },
  coins: {
    type: Number,
  },
  recommended: {
    type: Boolean,
    default: false,
  },
});

const PackagePlan = mongoose.model("PackagePlan", packagePlanSchema);
export default PackagePlan;
