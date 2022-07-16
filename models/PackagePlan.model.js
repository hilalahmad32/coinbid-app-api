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
    type: Date,
    required: true,
  },
  banners: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
  },
});

const PackagePlan = mongoose.model("PackagePlan", packagePlanSchema);
export default PackagePlan;
