import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  users: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
