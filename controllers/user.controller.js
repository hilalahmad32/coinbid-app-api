import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const is_email = await User.findOne({ email });
    if (is_email) {
      return res.send({
        success: false,
        message: "Email already Exist",
      });
    } else {
      const hash_password = await bcryptjs.hash(password, 12);
      const users = new User({
        name,
        email,
        password: hash_password,
      });
      const result = await users.save();
      if (result) {
        return res.send({
          success: false,
          message: "Account Create Successfully",
        });
      } else {
        return res.send({
          success: false,
          message: "Server Problem",
        });
      }
    }
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
