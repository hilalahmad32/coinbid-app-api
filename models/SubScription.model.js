import mongoose from "mongoose";

const subscribeSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  packages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackagePlan",
  },
  status: {
    type: Boolean,
  },
  refound: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const SubscribePlan = mongoose.model("SubscribePlan", subscribeSchema);

export default SubscribePlan;
