import mongoose from "mongoose";

const videoAdsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  video: {
    type: String,
    required: true,
  },
  // packages: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "PackagePlan",
  // },
  coins: {
    type: String,
    required: true,
  },
});

const VideoAds = mongoose.model("VideoAds", videoAdsSchema);
export default VideoAds;
