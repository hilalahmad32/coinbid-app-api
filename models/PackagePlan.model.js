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
  ads: {
    type: Number,
    default: 0,
  },
  total_ads: {
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
  icon: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const PackagePlan = mongoose.model("PackagePlan", packagePlanSchema);
export default PackagePlan;
