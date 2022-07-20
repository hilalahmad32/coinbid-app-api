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
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
