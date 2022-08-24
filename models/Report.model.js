import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  ads_watch: {
    type: Number,
    default: 0,
  },
  coin_earned: {
    type: Number,
    default: 0,
  },
  converted_coin: {
    type: Number,
    default: 0,
  },
  today_coin_earned: {
    type: Number,
    default: 0,
  },
  converted_earned: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
