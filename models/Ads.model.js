import mongoose from "mongoose";
const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  packages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackagePlan",
  },
  price: {
    type: String,
    required: true,
  },
  video: {
    type: String,
  },
  images: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
});
const Ads = mongoose.model("Ad", adsSchema);
export default Ads;
