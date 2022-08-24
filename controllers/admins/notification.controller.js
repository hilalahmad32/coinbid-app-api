import Notification from "../../models/Notification.model.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).populate("users");
    return res.send({
      success: true,
      notifications: notifications,
    });
  } catch (error) {
    return res.send({
      success: true,
      message: error.message,
    });
  }
};
