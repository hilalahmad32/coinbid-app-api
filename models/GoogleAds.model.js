import mongoose from "mongoose";

const googleAdsSchema = new mongoose.Schema({
  app_id: {
    type: String,
  },
  ad_unit_id: {
    type: String,
  },
  coins: {
    type: Number,
    required: true,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const GoogleAds = mongoose.model("GoogleAds", googleAdsSchema);

export default GoogleAds;
