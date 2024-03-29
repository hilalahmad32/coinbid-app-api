import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Banner = mongoose.model("Banner", bannerSchema);
export default Banner;
